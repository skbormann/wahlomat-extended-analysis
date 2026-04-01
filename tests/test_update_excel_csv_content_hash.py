"""Tests for update_excel_csv content-hash change detection (no real workbook)."""

from __future__ import annotations

import argparse
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import pandas as pd

from wahlomat_extended_analysis import update_excel_csv


def _answers_block(eid: str, these_text: str) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "election_id": [eid, eid],
            "question": [0, 1],
            "party": ["A", "A"],
            "answer": [1, -1],
            "title": ["t0", "t1"],
            "these_text": [these_text, these_text],
        }
    )


class UpdateExcelCsvContentHashTests(unittest.TestCase):
    def test_same_row_count_but_text_change_is_detected(self) -> None:
        eid = "X1_v1.00"
        old = _answers_block(eid, "old text")
        new = _answers_block(eid, "NEW text")  # same row count, differs in these_text

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            answers_path = root / "all_wahlomat_answers.csv"
            answers_path.write_text(old.to_csv(index=False), encoding="utf-8")

            args = argparse.Namespace(
                dry_run=True,
                yes=False,
                repo_root=root,
                answers=answers_path,
                prune_superseded_excel=False,
            )

            # Avoid touching filesystem workbook discovery; feed one sheet directly.
            with (
                patch.object(update_excel_csv, "discover_bpb_excel_path", return_value=root / "x.xlsx"),
                patch.object(update_excel_csv, "data_sheet_safe_ids", return_value={eid}),
                patch.object(update_excel_csv, "iter_excel_long_dataframes", return_value=[(eid, new)]),
            ):
                rc, wrote = update_excel_csv.run(args)

        self.assertEqual(rc, 0)
        self.assertFalse(wrote)  # dry-run

    def test_schema_mismatch_raises_error(self) -> None:
        eid = "X2_v1.00"
        old = _answers_block(eid, "t")
        new_missing = old.drop(columns=["these_text"])

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            answers_path = root / "all_wahlomat_answers.csv"
            answers_path.write_text(old.to_csv(index=False), encoding="utf-8")

            args = argparse.Namespace(
                dry_run=True,
                yes=False,
                repo_root=root,
                answers=answers_path,
                prune_superseded_excel=False,
            )

            with (
                patch.object(update_excel_csv, "discover_bpb_excel_path", return_value=root / "x.xlsx"),
                patch.object(update_excel_csv, "data_sheet_safe_ids", return_value={eid}),
                patch.object(update_excel_csv, "iter_excel_long_dataframes", return_value=[(eid, new_missing)]),
            ):
                with self.assertRaises(ValueError):
                    update_excel_csv.run(args)


if __name__ == "__main__":
    unittest.main()

