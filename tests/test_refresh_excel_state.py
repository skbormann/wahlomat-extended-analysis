"""Tests for refresh-excel persisted state helpers (no network)."""

from __future__ import annotations

import unittest

from wahlomat_extended_analysis import get_zip_files, wahlomat


class StandDateParseTests(unittest.TestCase):
    def test_pick_stand_date_from_matching_anchor(self) -> None:
        html = """
        <html><body>
          <a href="https://www.bpb.de/system/files/datei/wahlomat-datensaetze-foo.zip">
            Download der Wahl-O-Mat-Datensätze, Stand: 30.03.2026
          </a>
        </body></html>
        """
        url = "https://www.bpb.de/system/files/datei/wahlomat-datensaetze-foo.zip"
        self.assertEqual(
            get_zip_files.pick_datensaetze_bundle_stand_date(html, bundle_url=url),
            "2026-03-30",
        )

    def test_pick_stand_date_fallback_latest_on_page(self) -> None:
        html = """
        <div>Stand: 01.01.2025</div>
        <div>Stand: 30.03.2026</div>
        """
        url = "https://www.bpb.de/system/files/datei/wahlomat-datensaetze-foo.zip"
        self.assertEqual(
            get_zip_files.pick_datensaetze_bundle_stand_date(html, bundle_url=url),
            "2026-03-30",
        )


class RefreshStateMessageTests(unittest.TestCase):
    def test_first_run_message(self) -> None:
        cur = {
            "stand_date": "2026-03-30",
            "bundle_filename": "wahlomat-datensaetze-foo.zip",
            "zip_sha256": "a" * 64,
        }
        lines = wahlomat._summarize_bundle_change(None, cur)
        self.assertTrue(any("first run" in s for s in lines))

    def test_unchanged_message(self) -> None:
        prev = {"stand_date": "2026-03-30", "zip_sha256": "a" * 64}
        cur = {
            "stand_date": "2026-03-30",
            "bundle_filename": "wahlomat-datensaetze-foo.zip",
            "zip_sha256": "a" * 64,
        }
        lines = wahlomat._summarize_bundle_change(prev, cur)
        self.assertTrue(any("unchanged since last run" in s for s in lines))

    def test_warning_when_stand_same_but_hash_diff(self) -> None:
        prev = {"stand_date": "2026-03-30", "zip_sha256": "a" * 64}
        cur = {
            "stand_date": "2026-03-30",
            "bundle_filename": "wahlomat-datensaetze-foo.zip",
            "zip_sha256": "b" * 64,
        }
        lines = wahlomat._summarize_bundle_change(prev, cur)
        self.assertTrue(any("WARNING" in s for s in lines))


if __name__ == "__main__":
    unittest.main()

