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
from build_metadata import (
    display_name_de,
    election_slug_from_zip_href,
    excel_row_from_election_id,
)
from update_excel_csv import _changed_detail, superseded_excel_election_ids

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


class TestBuildMetadataSlugs(unittest.TestCase):
    def test_slug_wahl_o_mat_de_path(self) -> None:
        h = "https://www.wahl-o-mat.de/bundestagswahl2021/wahlomat.zip"
        self.assertEqual(election_slug_from_zip_href(h), "bundestagswahl2021")

    def test_slug_bpb_system_hyphen_year(self) -> None:
        h = "/system/files/datei/wahlomat-nordrheinwestfalen-2012.zip?download=1"
        self.assertEqual(election_slug_from_zip_href(h), "nordrheinwestfalen2012")

    def test_slug_bpb_wahlomat_prefix(self) -> None:
        h = "/system/files/datei/wahlomat-bw11.zip?download=1"
        self.assertEqual(election_slug_from_zip_href(h), "bw11")

    def test_excel_bt_prefix(self) -> None:
        r = excel_row_from_election_id("BT21_v1.02")
        self.assertIsNotNone(r)
        self.assertEqual(r["level"], "federal")
        self.assertEqual(r["year"], 2021)
        self.assertEqual(r["display_name_en"], "Federal election 2021")
        self.assertEqual(r["display_name_de"], "Bundestagswahl 2021")

    def test_excel_by_landtagswahl_bavaria(self) -> None:
        r = excel_row_from_election_id("BY23_v1.00")
        self.assertIsNotNone(r)
        self.assertEqual(r["display_name_de"], "Landtagswahl Bayern 2023")

    def test_excel_st_sachsen_anhalt_hyphen(self) -> None:
        r = excel_row_from_election_id("ST21_v1.03")
        self.assertIsNotNone(r)
        self.assertEqual(r["state"], "Sachsen-Anhalt")
        self.assertIn("Sachsen-Anhalt", r["display_name_de"])
        self.assertNotIn("Sachsenanhalt", r["display_name_de"])
        self.assertEqual(
            r["display_name_de"],
            display_name_de(r["level"], r["state"], r["year"]),
        )

    def test_excel_mv_mecklenburg_hyphen(self) -> None:
        r = excel_row_from_election_id("MV21_v1.00")
        self.assertIsNotNone(r)
        self.assertEqual(r["state"], "Mecklenburg-Vorpommern")
        self.assertIn("Mecklenburg-Vorpommern", r["display_name_de"])
        self.assertNotIn("MecklenburgVorpommern", r["display_name_de"])

    def test_excel_version_suffix_parsed_for_superseded_ids(self) -> None:
        """Older bpb sheet ids (not in current workbook) still parse for metadata."""
        for eid in ("BW26_v1.00", "BW26_v1.01", "RP26_v1.00"):
            r = excel_row_from_election_id(eid)
            self.assertIsNotNone(r, msg=eid)
            self.assertEqual(r["election_id"], eid)


class TestSupersededExcelIds(unittest.TestCase):
    def test_superseded_when_workbook_has_newer_version(self) -> None:
        import pandas as pd

        answers = pd.DataFrame(
            {
                "election_id": ["BW26_v1.01", "BW26_v1.02", "bundestagswahl2021"]
                * 2,
                "x": range(6),
            }
        )
        excel_ids = {"BW26_v1.02"}
        s = superseded_excel_election_ids(answers, excel_ids)
        self.assertEqual(s, {"BW26_v1.01"})


class TestUpdateExcelCsvDetail(unittest.TestCase):
    def test_changed_one_party_rows_added(self) -> None:
        self.assertEqual(
            _changed_detail(1, 38), "+1 party, 38 rows added"
        )

    def test_changed_rows_only(self) -> None:
        self.assertEqual(_changed_detail(0, -10), "10 rows removed")

    def test_changed_party_only_unusual(self) -> None:
        self.assertEqual(_changed_detail(2, 0), "+2 parties")

    def test_changed_remove_party_and_rows(self) -> None:
        self.assertEqual(
            _changed_detail(-1, -38), "-1 party, 38 rows removed"
        )


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
