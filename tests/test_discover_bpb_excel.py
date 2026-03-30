"""Tests for analysis.discover_bpb_excel_path (mtime-first selection)."""

from __future__ import annotations

import os
import tempfile
import unittest
from pathlib import Path

from analysis import discover_bpb_excel_path


class DiscoverBpbExcelMtimeTests(unittest.TestCase):
    def test_prefers_newer_mtime(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            older = root / "Wahl-O-Mat-older.xlsx"
            newer = root / "Wahl-O-Mat-newer.xlsx"
            older.write_bytes(b"")
            newer.write_bytes(b"")
            old_t = 1_000_000.0
            new_t = 2_000_000.0
            os.utime(older, (old_t, old_t))
            os.utime(newer, (new_t, new_t))
            picked = discover_bpb_excel_path(root)
            self.assertIsNotNone(picked)
            assert picked is not None
            self.assertEqual(picked.resolve(), newer.resolve())

    def test_tie_break_name_descending(self) -> None:
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            a = root / "Wahl-O-Mat-aaa.xlsx"
            z = root / "Wahl-O-Mat-zzz.xlsx"
            a.write_bytes(b"")
            z.write_bytes(b"")
            t = 3_000_000.0
            os.utime(a, (t, t))
            os.utime(z, (t, t))
            picked = discover_bpb_excel_path(root)
            self.assertIsNotNone(picked)
            assert picked is not None
            self.assertEqual(picked.name, "Wahl-O-Mat-zzz.xlsx")


if __name__ == "__main__":
    unittest.main()
