"""Tests for get_zip_files full download extraction scope (no network)."""

from __future__ import annotations

import io
import os
import pathlib
import tempfile
import unittest
import zipfile
from unittest.mock import patch

from wahlomat_extended_analysis import get_zip_files


def _zip_bytes(inner_name: str = "x.txt", payload: bytes = b"x") -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        zf.writestr(inner_name, payload)
    return buf.getvalue()


class FullDownloadExtractScopeTests(unittest.TestCase):
    def test_full_download_extracts_only_zips_downloaded_this_run(self) -> None:
        # Build a fake repo root with a stray zip already in data/.
        with tempfile.TemporaryDirectory() as tmp:
            root = pathlib.Path(tmp)
            data = root / "data"
            graphs = root / "graphs"
            data.mkdir()
            graphs.mkdir()

            stray_zip = data / "stray.zip"
            stray_zip.write_bytes(_zip_bytes("stray.txt", b"stray"))

            # Fake network listing: one election zip + one datensaetze zip.
            election_html = '<a href="https://www.wahl-o-mat.de/foo/wahlomat.zip">x</a>'
            datensaetze_html = '<a href="https://www.bpb.de/system/files/datei/wahlomat-datensaetze-unit.zip">y</a>'

            def fake_fetch_html(url: str) -> str:
                if url == get_zip_files.WEITERE_WAHLEN_URL:
                    return election_html
                if url == get_zip_files.DATENSAETZE_PAGE_URL:
                    return datensaetze_html
                raise AssertionError(f"unexpected url {url}")

            def fake_download_to_file(url: str, path: str) -> None:
                # Only write bytes for the expected destinations; never touch stray.zip.
                pathlib.Path(path).write_bytes(_zip_bytes("downloaded.txt", b"dl"))

            old = os.getcwd()
            try:
                os.chdir(root)
                with (
                    patch.object(get_zip_files, "fetch_html", side_effect=fake_fetch_html),
                    patch.object(get_zip_files, "download_to_file", side_effect=fake_download_to_file),
                    patch.object(get_zip_files, "_print_workbook_discovery_status"),
                ):
                    rc = get_zip_files.download_all_election_zips_plus_datensaetze(root)
                self.assertEqual(rc, 0)

                # Stray zip is untouched and not extracted.
                self.assertTrue(stray_zip.is_file())
                self.assertFalse((data / "stray" / "stray.txt").exists())

                # Downloaded zips should be extracted into folders and removed.
                self.assertTrue((data / "foo" / "downloaded.txt").is_file())
                # bpb bundle stem normalization removes 'wahlomat-' and '-' (see local_stem rules)
                self.assertTrue((data / "datensaetzeunit" / "downloaded.txt").is_file())
                self.assertFalse((data / "foo.zip").exists())
                self.assertFalse((data / "datensaetzeunit.zip").exists())
            finally:
                os.chdir(old)


if __name__ == "__main__":
    unittest.main()

