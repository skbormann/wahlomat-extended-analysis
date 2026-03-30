# -*- coding: utf-8 -*-
"""
Election identity policy for merging JS exports and the bpb Excel bundle.

When the same logical election appears both as a folder under data/ (JS) and as
a sheet in the Datensätze workbook, the CSV should contain one canonical row set.
Excel sheet names are versioned (bpb naming); use them as canonical election_id.
"""

from __future__ import annotations

# data/<folder>/ from JS → Excel sheet name as used after spaces → underscores.
# Skip JS ingestion only when the Excel workbook is present AND that sheet exists.
JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET: dict[str, str] = {
    "bundestagswahl2021": "BT21_v1.02",
    "berlin2021": "BE21_v1.01",
}

# ZIP layout uses opaque top-level folder names; CSV election_id should match election.
JS_FOLDER_CANONICAL_ELECTION_ID: dict[str, str] = {
    "wahlomat_0": "hamburg2011",
    "wahlomat_1": "berlin2011",
}


def excel_sheet_safe_ids(sheet_names: list[str]) -> set[str]:
    """Match build_dataframe / build_graphs safe_id: sheet_name.replace(' ', '_')."""
    return {name.replace(" ", "_") for name in sheet_names}
