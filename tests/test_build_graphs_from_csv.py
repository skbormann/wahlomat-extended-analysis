"""Tests for build_graphs_from_csv listing and CLI helpers (no full graph pipeline)."""

from __future__ import annotations

import contextlib
import io
import os
import tempfile
import unittest
from pathlib import Path

import build_graphs_from_csv


class ListElectionsTableTests(unittest.TestCase):
    def test_list_elections_column_alignment(self) -> None:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".csv", delete=False, encoding="utf-8"
        ) as f:
            f.write("election_id,extra\n")
            f.write("short,1\n")
            f.write("very_long_election_id,2\n")
            f.write("very_long_election_id,3\n")
            path = f.name
        try:
            buf = io.StringIO()
            with contextlib.redirect_stdout(buf):
                code = build_graphs_from_csv.main(
                    ["--list-elections", "--with-rows", "--csv", path]
                )
            self.assertEqual(code, 0)
            lines = buf.getvalue().strip().splitlines()
            self.assertEqual(len(lines), 3)
            header, row1, row2 = lines
            self.assertIn("election_id", header)
            self.assertIn("rows", header)
            self.assertTrue(row1.strip().endswith("1"))
            self.assertTrue(row2.strip().endswith("2"))
            self.assertEqual(len(row1), len(row2))
            self.assertEqual(len(header), len(row1))
        finally:
            os.unlink(path)

    def test_help_runs_without_importing_analysis(self) -> None:
        buf = io.StringIO()
        with contextlib.redirect_stdout(buf):
            with self.assertRaises(SystemExit) as ex:
                build_graphs_from_csv.main(["-h"])
        self.assertEqual(int(ex.exception.code or 0), 0)
        out = buf.getvalue()
        self.assertIn("--list-elections", out)
        self.assertIn("--graph", out)


if __name__ == "__main__":
    unittest.main()
