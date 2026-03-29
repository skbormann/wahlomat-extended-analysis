#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov  6 19:53:15 2021

@author: sven-kristjanbormann
Download the list of available wahlomat zip files, create new list to download
the zip files with the wahlomat definitions, download the zip files and extract
the content.

Also downloads the bundled Wahl-O-Mat-Datensätze zip linked from the bpb
article (URL discovered from HTML so it survives filename updates). Use of the
data is subject to the terms on that page:
https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/
"""
import pathlib
import re
import time
import urllib.error
import urllib.request
import os
import zipfile
from urllib.parse import urlparse

from analysis import discover_bpb_excel_path

INTERNAL_LINK_START = "https://www.bpb.de"
WEITERE_WAHLEN_URL = (
    "https://www.bpb.de/politik/wahlen/wahl-o-mat/45817/weitere-wahlen"
)
DATENSAETZE_PAGE_URL = (
    "https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/"
)

# bpb (and similar) often return 403 for Python's default urllib user-agent.
_BPB_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de,en-US;q=0.9,en;q=0.8",
}


def fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers=_BPB_HEADERS)
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode()


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
        **_BPB_HEADERS,
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


def main() -> int:
    """Download and extract all election ZIPs plus Datensätze bundle into data/."""
    repo_root = pathlib.Path(__file__).resolve().parent
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
                with zipfile.ZipFile(file_name) as zf:
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


if __name__ == "__main__":
    raise SystemExit(main())
