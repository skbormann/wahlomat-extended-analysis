"""Tests for get_zip_files --datensaetze-only path (no network)."""

from __future__ import annotations

import io
import pathlib
import tempfile
import unittest
import zipfile
from unittest.mock import patch

import get_zip_files


def _minimal_zip_bytes(inner_name: str = "nested/readme.txt", payload: bytes = b"fixture") -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr(inner_name, payload)
    return buf.getvalue()


class PickDatensaetzeBundleUrlTests(unittest.TestCase):
    def test_picks_newest_basename_among_candidates(self) -> None:
        html = """
        <a href="https://www.bpb.de/system/files/datei/wahlomat-datensaetze-aaa.zip">a</a>
        <a href="https://www.bpb.de/system/files/datei/wahlomat-datensaetze-zzz.zip">z</a>
        """
        url = get_zip_files.pick_datensaetze_bundle_url(html)
        self.assertTrue(url.endswith("wahlomat-datensaetze-zzz.zip"))

    def test_runtime_error_when_no_datensaetze_zip(self) -> None:
        html = '<a href="https://www.bpb.de/system/files/datei/other.zip">x</a>'
        with self.assertRaises(RuntimeError):
            get_zip_files.pick_datensaetze_bundle_url(html)


class DownloadAndExtractDatensaetzeBundleTests(unittest.TestCase):
    def test_extracts_under_data_stem_and_removes_outer_zip(self) -> None:
        fake_url = (
            "https://www.bpb.de/system/files/datei/"
            "wahlomat-datensaetze-unit_fixture_v9.zip"
        )

        def fake_download(url: str, path: str) -> None:
            self.assertEqual(url, fake_url)
            pathlib.Path(path).write_bytes(_minimal_zip_bytes())

        with tempfile.TemporaryDirectory() as tmp:
            root = pathlib.Path(tmp)
            with (
                patch.object(
                    get_zip_files,
                    "fetch_datensaetze_bundle_url",
                    return_value=fake_url,
                ),
                patch.object(
                    get_zip_files,
                    "download_to_file",
                    side_effect=fake_download,
                ),
                patch.object(get_zip_files, "_print_workbook_discovery_status"),
            ):
                rc = get_zip_files.download_and_extract_datensaetze_bundle(root)
            self.assertEqual(rc, 0)
            stem = "wahlomat-datensaetze-unit_fixture_v9"
            extract_dir = root / "data" / stem
            self.assertTrue(extract_dir.is_dir())
            inner = extract_dir / "nested" / "readme.txt"
            self.assertTrue(inner.is_file())
            self.assertEqual(inner.read_bytes(), b"fixture")
            self.assertFalse((root / "data" / f"{stem}.zip").exists())


if __name__ == "__main__":
    unittest.main()
