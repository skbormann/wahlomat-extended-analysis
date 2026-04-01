"""Compatibility shim for election-id policy (root import path)."""

from __future__ import annotations

from wahlomat_extended_analysis.election_id_policy import (
    JS_FOLDER_CANONICAL_ELECTION_ID,
    JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET,
    excel_sheet_safe_ids,
)

__all__ = [
    "JS_FOLDER_CANONICAL_ELECTION_ID",
    "JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET",
    "excel_sheet_safe_ids",
]
