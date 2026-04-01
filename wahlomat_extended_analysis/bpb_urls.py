# -*- coding: utf-8 -*-
"""Shared bpb.de URLs and HTML fetch helpers (archive listing + downloads)."""

from __future__ import annotations

import urllib.request

# Canonical archive table (verified full listing; same length as legacy politik/.../weitere-wahlen).
WEITERE_WAHLEN_URL = (
    "https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/"
)

BPB_HTML_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "de,en-US;q=0.9,en;q=0.8",
}


def fetch_bpb_html(url: str, *, timeout_s: float = 60) -> str:
    req = urllib.request.Request(url, headers=BPB_HTML_HEADERS)
    with urllib.request.urlopen(req, timeout=timeout_s) as resp:
        return resp.read().decode("utf-8", errors="replace")
