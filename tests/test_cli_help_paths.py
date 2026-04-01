"""Regression tests for CLI help/startup paths."""

from __future__ import annotations

import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch

from wahlomat_extended_analysis import build_dataframe

REPO_ROOT = Path(__file__).resolve().parents[1]


class CliHelpPathTests(unittest.TestCase):
    def test_build_dataframe_help_exits_without_running_pipeline(self) -> None:
        with patch.object(build_dataframe, "run_build") as run_build:
            with self.assertRaises(SystemExit) as ex:
                build_dataframe.main(["-h"])
        self.assertEqual(int(ex.exception.code or 0), 0)
        run_build.assert_not_called()

    def test_get_zip_files_import_does_not_eager_import_analysis(self) -> None:
        p = subprocess.run(
            [
                "python",
                "-c",
                (
                    "import sys; import wahlomat_extended_analysis.get_zip_files; "
                    "print(int('wahlomat_extended_analysis.analysis' in sys.modules))"
                ),
            ],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(p.returncode, 0, msg=p.stderr)
        self.assertEqual(p.stdout.strip(), "0")

    def test_update_excel_csv_import_does_not_eager_import_analysis(self) -> None:
        p = subprocess.run(
            [
                "python",
                "-c",
                (
                    "import sys; import wahlomat_extended_analysis.update_excel_csv; "
                    "print(int('wahlomat_extended_analysis.analysis' in sys.modules))"
                ),
            ],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(p.returncode, 0, msg=p.stderr)
        self.assertEqual(p.stdout.strip(), "0")


if __name__ == "__main__":
    unittest.main()
