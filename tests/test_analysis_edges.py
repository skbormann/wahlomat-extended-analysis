"""Edge-case and regression tests for analysis.run_analysis / parse_module_js."""

from __future__ import annotations

import os
import tempfile
import unittest
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import pandas as pd

from analysis import parse_module_js, run_analysis
from build_dataframe import read_module_definition_js

# Minimal module_definition.js-shaped text (documents regex contract for legacy JS).
_MINIMAL_JS = """
WOMT_aThesen[0][0][0] = 'Title A';
WOMT_aThesen[0][0][1] = 'Question A';
WOMT_aThesen[0][1][0] = 'Title B';
WOMT_aThesen[0][1][1] = 'Question B';
WOMT_aParteien[0][0][0] = 'Party One Full';
WOMT_aParteien[0][0][1] = 'P1';
WOMT_aParteien[0][1][0] = 'Party Two Full';
WOMT_aParteien[0][1][1] = 'P2';
WOMT_aThesenParteien[0][0] = '1';
WOMT_aThesenParteien[0][1] = '-1';
WOMT_aThesenParteien[1][0] = '0';
WOMT_aThesenParteien[1][1] = '1';
"""

# Duplicate (question, party): first row wins (would be mean 0.0 with old pivot).
_DUP_ANSWER_JS = _MINIMAL_JS + """
WOMT_aThesenParteien[0][0] = '-1';
"""


class TestAnalysisEdges(unittest.TestCase):
    def test_parse_module_js_minimal_fixture(self) -> None:
        q_df, ans = parse_module_js(_MINIMAL_JS)
        self.assertEqual(len(q_df), 2)
        self.assertEqual(ans.shape, (2, 2))

    def test_parse_module_js_duplicate_answer_rows_keep_first(self) -> None:
        _, ans = parse_module_js(_DUP_ANSWER_JS)
        self.assertEqual(int(ans.loc[0, "P1"]), 1)

    def test_run_analysis_one_party_writes_pngs(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "data").mkdir()
            (root / "graphs").mkdir()
            old = os.getcwd()
            try:
                os.chdir(root / "data")
                question_df = pd.DataFrame(
                    [("t", "q0"), ("t", "q1"), ("t", "q2")],
                    columns=["title", "question"],
                )
                answer_df = pd.DataFrame({"Only": [1, -1, 0]}, index=[0, 1, 2])
                run_analysis(question_df, answer_df, "edge_one_party")
                g = root / "graphs"
                self.assertTrue((g / "edge_one_party_c_matrix.png").is_file())
                self.assertTrue((g / "edge_one_party_pca_map.png").is_file())
                self.assertTrue((g / "edge_one_party_pca_influences.png").is_file())
            finally:
                os.chdir(old)

    def test_run_analysis_constant_party_column_dropped_corr_finite(self) -> None:
        """Correlation NaNs from zero-variance columns are handled for plotting."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "data").mkdir()
            (root / "graphs").mkdir()
            old = os.getcwd()
            try:
                os.chdir(root / "data")
                question_df = pd.DataFrame(
                    [("t", "q0"), ("t", "q1")],
                    columns=["title", "question"],
                )
                answer_df = pd.DataFrame(
                    {"A": [1, -1], "B": [1, 1]},
                    index=[0, 1],
                )
                run_analysis(question_df, answer_df, "edge_const_col")
                self.assertTrue(
                    (root / "graphs" / "edge_const_col_c_matrix.png").is_file()
                )
            finally:
                os.chdir(old)


class TestModuleJsDecode(unittest.TestCase):
    def test_read_utf8_plain(self) -> None:
        with tempfile.NamedTemporaryFile(
            suffix=".js", delete=False, mode="wb"
        ) as f:
            f.write("ascii ütf8".encode("utf-8"))
            path = Path(f.name)
        try:
            s = read_module_definition_js(path)
            self.assertIn("ü", s)
            self.assertNotIn("Ã¼", s)
        finally:
            path.unlink()

    def test_read_latin1_only_umlaut_byte(self) -> None:
        """Single-byte Latin-1 (e.g. 0xFC ü): UTF-8 fails, hybrid decodes."""
        part = "Hallo \xfcber".encode("latin-1")
        with tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="wb") as f:
            f.write(part)
            path = Path(f.name)
        try:
            s = read_module_definition_js(path)
            self.assertEqual(s, "Hallo über")
        finally:
            path.unlink()

    def test_read_mixed_utf8_and_latin1_byte(self) -> None:
        """UTF-8 multibyte + single Latin-1 ü (0xFC): hybrid path."""
        part = "prefix ".encode("utf-8") + b"\xfc" + " suffix".encode("utf-8")
        with tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="wb") as f:
            f.write(part)
            path = Path(f.name)
        try:
            s = read_module_definition_js(path)
            self.assertEqual(s, "prefix ü suffix")
        finally:
            path.unlink()


if __name__ == "__main__":
    unittest.main()
