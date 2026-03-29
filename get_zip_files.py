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
import re
import urllib.request
import os
import zipfile

INTERNAL_LINK_START = "https://www.bpb.de"
WEITERE_WAHLEN_URL = (
    "https://www.bpb.de/politik/wahlen/wahl-o-mat/45817/weitere-wahlen"
)
DATENSAETZE_PAGE_URL = (
    "https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/"
)


def fetch_html(url: str) -> str:
    return urllib.request.urlopen(url).read().decode()


def extract_zip_hrefs(html: str) -> list:
    zip_attrs = re.findall(r'href=\".+?\.zip\"', html, re.MULTILINE)
    return [f.replace("href=", "").strip('"') for f in zip_attrs]


def resolve_internal_bpb_zip(href: str) -> str:
    if re.search('/system', href):
        return f"{INTERNAL_LINK_START}{href}"
    return href


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


# %% Download the raw html website which lists the available zip files.
election_html = fetch_html(WEITERE_WAHLEN_URL)

# %% Extract the zip files, clean the links and create working links
zip_files = extract_zip_hrefs(election_html)

zip_files_links = []
for f in zip_files:
    zip_files_links.append(resolve_internal_bpb_zip(f))

# %% Bundled datasets archive (dynamic link from article)
datensaetze_html = fetch_html(DATENSAETZE_PAGE_URL)
zip_files_links.append(pick_datensaetze_bundle_url(datensaetze_html))

# %% Create folder names
zip_files_names = []
for f in zip_files_links:
    if re.search(r'wahl-o-mat.de', f):
        zip_files_names.append(f.split(sep="/")[3])
    elif f.split(sep="/")[2] == "www.bpb.de":
        zip_files_names.append(f.split(sep="/")[6].split(sep=".")[0])
zip_files_names = [f.replace("wahlomat-", "").replace("-", "")
                   for f in zip_files_names]

# %% Create data and graphs folder
try:
    os.mkdir(f"{os.path.join(os.getcwd(),'data')}")
except FileExistsError:
    print("Folder 'data' already exists.")

try:
    os.mkdir(f"{os.path.join(os.getcwd(), 'graphs')}")
except FileExistsError:
    print("Folder 'graphs' already exists.")

os.chdir('data')
# %%Download all zip files and extract them

for i, f in enumerate(zip_files_links):
    urllib.request.urlretrieve(
        f, filename=f"{os.getcwd()}/{zip_files_names[i]}.zip")

# Based on https://stackoverflow.com/questions/31346790/unzip-all-zipped-files-in-a-folder-to-that-same-folder-using-python-2-7-5
for file in os.listdir():
    if zipfile.is_zipfile(file):
        file_name = os.path.abspath(file)
        try:
            os.mkdir(f"{os.path.join(os.getcwd(),file.split(sep='.')[0])}")
        except FileExistsError:
            pass
        with zipfile.ZipFile(file_name) as f:
            f.extractall(
                path=f"{os.path.join(os.getcwd(),file.split(sep='.')[0])}")
        os.remove(file_name)
