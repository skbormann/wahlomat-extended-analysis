"""Tests for get_zip_files selective ZIP matching (no network)."""

from __future__ import annotations

import unittest
from unittest.mock import patch

from wahlomat_extended_analysis.get_zip_files import (
    ZipJob,
    filter_zip_jobs,
    local_stem_from_election_zip_url,
)


class LocalStemFromUrlTests(unittest.TestCase):
    def test_wahl_o_mat_host(self) -> None:
        u = "https://www.wahl-o-mat.de/bundestagswahl2021/wahlomat.zip"
        self.assertEqual(local_stem_from_election_zip_url(u), "bundestagswahl2021")

    def test_bpb_system_files(self) -> None:
        u = "https://www.bpb.de/system/files/datei/wahlomat-berlin2011.zip"
        self.assertEqual(local_stem_from_election_zip_url(u), "berlin2011")


class FilterZipJobsTests(unittest.TestCase):
    def setUp(self) -> None:
        self.jobs = [
            ZipJob(
                "https://www.wahl-o-mat.de/berlin2011/wahlomat.zip",
                "berlin2011",
                "/weitere/berlin.zip",
            ),
            ZipJob(
                "https://www.bpb.de/system/files/datei/wahlomat-hamburg2011.zip",
                "hamburg2011",
                "/weitere/hh.zip",
            ),
        ]

    def test_match_url_substring(self) -> None:
        sel, fail = filter_zip_jobs(self.jobs, ["wahl-o-mat.de"])
        self.assertEqual(fail, [])
        self.assertEqual(len(sel), 1)
        self.assertEqual(sel[0].local_stem, "berlin2011")

    def test_match_local_stem(self) -> None:
        sel, fail = filter_zip_jobs(self.jobs, ["hamburg"])
        self.assertEqual(fail, [])
        self.assertEqual(len(sel), 1)
        self.assertEqual(sel[0].local_stem, "hamburg2011")

    def test_failed_token(self) -> None:
        sel, fail = filter_zip_jobs(self.jobs, ["no_such_election_xyz"])
        self.assertEqual(sel, [])
        self.assertEqual(fail, ["no_such_election_xyz"])

    def test_union_multiple_tokens(self) -> None:
        sel, fail = filter_zip_jobs(self.jobs, ["berlin", "hamburg"])
        self.assertEqual(fail, [])
        self.assertEqual({j.local_stem for j in sel}, {"berlin2011", "hamburg2011"})

    def test_dedupe_same_url_two_tokens(self) -> None:
        j = [ZipJob("https://example.com/a/wahlomat.zip", "a", "/h")]
        sel, fail = filter_zip_jobs(j, ["example", "https"])
        self.assertEqual(fail, [])
        self.assertEqual(len(sel), 1)

    @patch(
        "wahlomat_extended_analysis.get_zip_files._election_slug_for_href",
        return_value="bundestag2017",
    )
    def test_match_metadata_slug(self, _mock: object) -> None:
        j = [ZipJob("https://x/y/z.zip", "zzz", "/raw")]
        sel, fail = filter_zip_jobs(j, ["2017"])
        self.assertEqual(fail, [])
        self.assertEqual(len(sel), 1)


if __name__ == "__main__":
    unittest.main()
