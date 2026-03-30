#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov  6, 19:53:15 2021

@author: sven-kristjanbormann
Download the list of available wahlomat zip files, create new list to download
the zip files with the wahlomat definitions, download the zip files and extract
the content.

Also downloads the bundled Wahl-O-Mat-Datensätze zip linked from the bpb
article (URL discovered from HTML so it survives filename updates). Use of the
data is subject to the terms on that page:
https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/
"""
from __future__ import annotations

import argparse
import pathlib
import re
import sys
import time
import urllib.error
import urllib.request
import os
import zipfile
from urllib.parse import urlparse

from analysis import discover_bpb_excel_path
from bpb_urls import BPB_HTML_HEADERS, WEITERE_WAHLEN_URL, fetch_bpb_html

INTERNAL_LINK_START = "https://www.bpb.de"
DATENSAETZE_PAGE_URL = (
    "https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/"
)


def fetch_html(url: str) -> str:
    return fetch_bpb_html(url)


def fetch_datensaetze_bundle_url() -> str:
    """Resolve the current Datensätze bundle ZIP URL from the bpb article page."""
    html = fetch_html(DATENSAETZE_PAGE_URL)
    return pick_datensaetze_bundle_url(html)


def _zipfile_for_extract(path: str | os.PathLike[str]) -> zipfile.ZipFile:
    """ZipFile for extract; use metadata_encoding on Python 3.11+ for bpb archives."""
    if sys.version_info >= (3, 11):
        return zipfile.ZipFile(path, "r", metadata_encoding="cp437")
    return zipfile.ZipFile(path, "r")


def _download_request_headers(url: str) -> dict:
    """
    Referer / Origin matter: wahl-o-mat.de often 403s without a same-origin
    referer; bpb /system/files/ expects a bpb page referer.
    """
    p = urlparse(url)
    path = p.path or ""
    host = (p.netloc or "").lower()
    scheme = p.scheme or "https"
    base = f"{scheme}://{p.netloc}" if p.netloc else "https://www.bpb.de"

    if "bpb.de" in host and "/system/files/" in path:
        referer = DATENSAETZE_PAGE_URL
    elif "wahl-o-mat" in host or "wahlomat" in host:
        # Same-site referer; many hosts reject bpb as referer for direct ZIP GETs.
        referer = f"{base}/"
    else:
        referer = WEITERE_WAHLEN_URL

    headers = {
        **BPB_HTML_HEADERS,
        "Accept": "*/*",
        "Referer": referer,
    }
    if p.netloc:
        headers["Origin"] = base
    return headers


def download_to_file(url: str, path: str) -> None:
    """Download binary file (ZIP) with headers that avoid 403 on bpb / wahl-o-mat."""
    headers = _download_request_headers(url)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()
    except urllib.error.HTTPError as e:
        if e.code == 403:
            # Retry once: some stacks want the listing page as referer for external zips.
            retry_headers = {**headers, "Referer": WEITERE_WAHLEN_URL}
            req2 = urllib.request.Request(url, headers=retry_headers)
            with urllib.request.urlopen(req2, timeout=120) as resp:
                data = resp.read()
        else:
            raise
    with open(path, "wb") as out:
        out.write(data)


def extract_zip_hrefs(html: str) -> list:
    """
    bpb uses href=\"/path/file.zip?download=1\". A naive .+?\\.zip\" match fails
    because the next double-quote is after ?download=1, so the regex can span
    the whole page and produce invalid URLs.
    """
    matches = re.findall(
        r'href\s*=\s*["\'](https?://[^"\']*\.zip(?:\?[^"\']*)?|/[^"\']*\.zip(?:\?[^"\']*)?)["\']',
        html,
        re.IGNORECASE | re.MULTILINE,
    )
    out = []
    for m in matches:
        m = m.strip()
        if not m or "<" in m or ">" in m:
            continue
        out.append(m)
    return out


def resolve_internal_bpb_zip(href: str) -> str:
    if href.startswith(("http://", "https://")):
        return href
    if href.startswith("/system"):
        return f"{INTERNAL_LINK_START}{href}"
    return href


def upgrade_wahl_o_mat_zip_url(url: str) -> str:
    """
    Listing pages still link http://www.wahl-o-mat.de/.../wahlomat.zip .
    That host returns 403 on HTTP; HTTPS works (verified 2026-03).
    """
    if url.startswith("http://www.wahl-o-mat.de"):
        return "https://www.wahl-o-mat.de" + url[len("http://www.wahl-o-mat.de") :]
    if url.startswith("http://wahl-o-mat.de"):
        return "https://wahl-o-mat.de" + url[len("http://wahl-o-mat.de") :]
    return url


def pick_datensaetze_bundle_url(html: str) -> str:
    """Return the newest matching bundle URL (by zip basename) or raise."""
    candidates = []
    prefix = "https://www.bpb.de/system/files/datei/"
    for href in extract_zip_hrefs(html):
        url = resolve_internal_bpb_zip(href)
        if url.startswith(prefix) and "datensaetze" in url.lower():
            candidates.append(url)
    if not candidates:
        raise RuntimeError(
            "No Wahl-O-Mat-Datensätze zip link found under "
            "/system/files/datei/ on the bpb Datensätze page."
        )
    return max(candidates, key=lambda u: u.split("/")[-1])


def download_and_extract_datensaetze_bundle(repo_root: pathlib.Path) -> int:
    """
    Download only the Datensätze bundle ZIP and extract that archive into data/<stem>/.
    Does not scan or extract other ZIPs under data/.
    """
    repo_root = repo_root.resolve()
    data_dir = repo_root / "data"
    graphs_dir = repo_root / "graphs"
    data_dir.mkdir(parents=True, exist_ok=True)
    graphs_dir.mkdir(parents=True, exist_ok=True)

    url = fetch_datensaetze_bundle_url()
    zip_name = pathlib.Path(urlparse(url).path).name
    if not zip_name.lower().endswith(".zip"):
        zip_name = f"{zip_name}.zip"
    zip_path = data_dir / zip_name
    stem = zip_path.stem
    extract_dir = data_dir / stem

    print(f"Downloading {zip_name} …")
    download_to_file(url, str(zip_path))

    extract_dir.mkdir(parents=True, exist_ok=True)
    with _zipfile_for_extract(zip_path) as zf:
        zf.extractall(path=str(extract_dir))
    zip_path.unlink(missing_ok=True)

    prev = os.getcwd()
    try:
        os.chdir(data_dir)
        _xlsx = discover_bpb_excel_path(pathlib.Path("."), pathlib.Path(".."))
        if _xlsx is not None and _xlsx.is_file() and _xlsx.stat().st_size > 0:
            print(
                "Datensätze workbook OK (matches build_dataframe discovery): "
                f"{_xlsx.resolve()}"
            )
        else:
            print(
                "WARNING: Under data/, no non-empty *Wahl-O-Mat*.xlsx (or *Datens*.xlsx "
                "with 'wahl' in the name) was found after extraction. "
                "The bundle from the Datensätze page may have changed its inner layout; "
                "see analysis.discover_bpb_excel_path(..., repo root) and "
                "https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/"
            )
    finally:
        os.chdir(prev)
    return 0


def download_all_election_zips_plus_datensaetze(repo_root: pathlib.Path) -> int:
    """Download and extract all election ZIPs plus Datensätze bundle into data/."""
    repo_root = repo_root.resolve()
    os.chdir(repo_root)
    try:
        election_html = fetch_html(WEITERE_WAHLEN_URL)
        zip_files = extract_zip_hrefs(election_html)

        zip_files_links: list[str] = []
        for f in zip_files:
            zip_files_links.append(
                upgrade_wahl_o_mat_zip_url(resolve_internal_bpb_zip(f))
            )

        datensaetze_html = fetch_html(DATENSAETZE_PAGE_URL)
        zip_files_links.append(pick_datensaetze_bundle_url(datensaetze_html))

        zip_files_names: list[str] = []
        for f in zip_files_links:
            if re.search(r"wahl-o-mat.de", f):
                zip_files_names.append(f.split(sep="/")[3])
            elif f.split(sep="/")[2] == "www.bpb.de":
                zip_files_names.append(f.split(sep="/")[6].split(sep=".")[0])
        zip_files_names = [
            x.replace("wahlomat-", "").replace("-", "") for x in zip_files_names
        ]

        try:
            os.mkdir(os.path.join(os.getcwd(), "data"))
        except FileExistsError:
            print("Folder 'data' already exists.")

        try:
            os.mkdir(os.path.join(os.getcwd(), "graphs"))
        except FileExistsError:
            print("Folder 'graphs' already exists.")

        os.chdir(repo_root / "data")

        for i, f in enumerate(zip_files_links):
            dest = f"{os.getcwd()}/{zip_files_names[i]}.zip"
            print(f"Downloading {zip_files_names[i]}.zip …")
            download_to_file(f, dest)
            time.sleep(0.8)

        for file in os.listdir():
            if zipfile.is_zipfile(file):
                file_name = os.path.abspath(file)
                try:
                    os.mkdir(
                        os.path.join(os.getcwd(), file.split(sep=".")[0])
                    )
                except FileExistsError:
                    pass
                with _zipfile_for_extract(file_name) as zf:
                    zf.extractall(
                        path=os.path.join(
                            os.getcwd(), file.split(sep=".")[0]
                        )
                    )
                os.remove(file_name)

        _xlsx = discover_bpb_excel_path(pathlib.Path("."), pathlib.Path(".."))
        if _xlsx is not None and _xlsx.is_file() and _xlsx.stat().st_size > 0:
            print(
                "Datensätze workbook OK (matches build_dataframe discovery): "
                f"{_xlsx.resolve()}"
            )
        else:
            print(
                "WARNING: Under data/, no non-empty *Wahl-O-Mat*.xlsx (or *Datens*.xlsx "
                "with 'wahl' in the name) was found after extraction. "
                "The bundle from the Datensätze page may have changed its inner layout; "
                "see analysis.discover_bpb_excel_path(..., repo root) and "
                "https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/"
            )
    finally:
        os.chdir(repo_root)
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Download Wahl-O-Mat ZIPs from bpb weitere Wahlen plus the Datensätze bundle, "
            "or only the Datensätze bundle."
        ),
    )
    parser.add_argument(
        "--datensaetze-only",
        action="store_true",
        help="Download and extract only the Wahl-O-Mat-Datensätze bundle (no election ZIPs).",
    )
    args = parser.parse_args(argv)
    repo_root = pathlib.Path(__file__).resolve().parent
    if args.datensaetze_only:
        return download_and_extract_datensaetze_bundle(repo_root)
    return download_all_election_zips_plus_datensaetze(repo_root)


if __name__ == "__main__":
    raise SystemExit(main())
