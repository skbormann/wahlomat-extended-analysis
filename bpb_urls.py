"""Compatibility shim for bpb URL helpers (root import path)."""

from __future__ import annotations

from wahlomat_extended_analysis.bpb_urls import (
    BPB_HTML_HEADERS,
    WEITERE_WAHLEN_URL,
    fetch_bpb_html,
)

__all__ = ["BPB_HTML_HEADERS", "WEITERE_WAHLEN_URL", "fetch_bpb_html"]
