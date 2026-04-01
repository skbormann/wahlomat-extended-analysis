#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 11 01:23:25 2022

@author: sven-kristjanbormann

Build dataframe:
    Build a dataframe which contains the results of all wahlomats and export
    the result as a CSV.

Uses parse_module_js / parse_excel_election from analysis.py for both legacy JS
modules and the bpb Wahl-O-Mat-Datensätze Excel bundle under data/.
"""

# %% Setup
from __future__ import annotations

import argparse
import pathlib
from collections.abc import Iterator
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import pandas as pd


def iter_excel_long_dataframes(
    xlsx_path: pathlib.Path,
    *,
    verbose: bool = True,
) -> Iterator[tuple[str, "pd.DataFrame"]]:
    """
    Yield (election_id, long_df) for each workbook sheet that has bpb data columns.
    election_id is the sheet name with spaces replaced by underscores.
    """
    import pandas as pd

    from wahlomat_extended_analysis.analysis import (
        election_to_long_rows,
        excel_sheet_has_data_columns,
        parse_excel_election,
    )

    xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(
            xlsx_path, sheet_name=sheet_name, engine="openpyxl"
        )
        if not excel_sheet_has_data_columns(df.columns):
            continue
        safe_id = sheet_name.replace(" ", "_")
        if verbose:
            print(f"  sheet {sheet_name}")
        try:
            qdf, pivot = parse_excel_election(df)
            yield safe_id, election_to_long_rows(qdf, pivot, safe_id)
        except (ValueError, KeyError, TypeError, IndexError) as e:
            if verbose:
                print(f"  skip {sheet_name}: {e}")


def _decode_utf8_latin1_hybrid(raw: bytes) -> str:
    """
    Bytes that are not valid UTF-8 as a whole may mix UTF-8 multibyte sequences
    with single-byte Latin-1 (e.g. 0xFC for ü). Walk the buffer: prefer the
    longest valid UTF-8 sequence from each position, else one Latin-1 byte.
    """
    out: list[str] = []
    n = len(raw)
    i = 0
    while i < n:
        b = raw[i]
        if b < 0x80:
            out.append(chr(b))
            i += 1
            continue
        decoded = False
        for length in (4, 3, 2):
            if i + length <= n:
                try:
                    out.append(raw[i : i + length].decode("utf-8"))
                    i += length
                    decoded = True
                    break
                except UnicodeDecodeError:
                    continue
        if not decoded:
            out.append(raw[i : i + 1].decode("latin-1"))
            i += 1
    return "".join(out)


def read_module_definition_js(module: pathlib.Path) -> str:
    """
    Decode module_definition.js: utf-8, then utf-8-sig, then Latin-1 with
    mojibake repair (encode Latin-1 → decode UTF-8). If repair fails (mixed
    UTF-8 + Latin-1 bytes), fall back to a UTF-8/Latin-1 hybrid byte walk.
    """
    raw = module.read_bytes()
    for enc in ("utf-8", "utf-8-sig"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    s_latin = raw.decode("latin-1")
    try:
        return s_latin.encode("latin-1").decode("utf-8")
    except UnicodeDecodeError:
        return _decode_utf8_latin1_hybrid(raw)


def run_build(repo_root: pathlib.Path) -> int:
    import pandas as pd

    import build_metadata
    from wahlomat_extended_analysis.analysis import (
        discover_bpb_excel_path,
        election_to_long_rows,
        parse_module_js,
    )
    from wahlomat_extended_analysis.election_id_policy import (
        JS_FOLDER_CANONICAL_ELECTION_ID,
        JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET,
        excel_sheet_safe_ids,
    )
    from wahlomat_extended_analysis.skipped_elections import OMIT_FROM_BUILD_DATAFRAME

    data_dir = repo_root / "data"
    module_list = list(data_dir.glob("**/module_definition.js"))
    all_parts: list[pd.DataFrame] = []

    xlsx_path = discover_bpb_excel_path(data_dir, repo_root)
    excel_safe_ids: set[str] = set()
    if xlsx_path is not None:
        xl_preview = pd.ExcelFile(xlsx_path, engine="openpyxl")
        excel_safe_ids = excel_sheet_safe_ids(list(xl_preview.sheet_names))

    for module in module_list:
        module_stem_folder = module.relative_to(data_dir).parts[0]
        if module_stem_folder in OMIT_FROM_BUILD_DATAFRAME:
            continue
        try:
            module_content = read_module_definition_js(module)
        except OSError as e:
            print(f"Unexpected error reading {module}: {e}")
            continue
        canonical = JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET.get(module_stem_folder)
        if canonical is not None and canonical in excel_safe_ids:
            print(
                f"Skipping JS module {module_stem_folder} "
                f"(superseded by Excel election_id {canonical})"
            )
            continue
        election_id = JS_FOLDER_CANONICAL_ELECTION_ID.get(
            module_stem_folder, module_stem_folder
        )
        if election_id != module_stem_folder:
            print(
                f"Parsing JS module {module_stem_folder} "
                f"(election_id {election_id})"
            )
        else:
            print(f"Parsing JS module {module_stem_folder}")
        try:
            qdf, pivot = parse_module_js(module_content)
            all_parts.append(election_to_long_rows(qdf, pivot, election_id))
        except (ValueError, KeyError, TypeError, IndexError) as e:
            print(f"Problem {e} occurred while parsing JS module {module_stem_folder}")

    if xlsx_path is not None:
        print(f"Reading Excel bundle {xlsx_path.resolve()}")
        for _, long_df in iter_excel_long_dataframes(xlsx_path, verbose=True):
            all_parts.append(long_df)
    else:
        print("No Wahl-O-Mat Excel bundle found under data/ (optional).")

    if not all_parts:
        print("No data collected; CSV not written.")
        return 1

    out = pd.concat(all_parts, ignore_index=True)
    out_path = repo_root / "all_wahlomat_answers.csv"
    out.to_csv(out_path, index=False)
    print(f"Wrote {len(out)} rows to {out_path.resolve()}")

    meta_rc = build_metadata.main(
        [
            "--repo-root",
            str(repo_root),
            "--answers",
            str(out_path.resolve()),
        ]
    )
    if meta_rc != 0:
        return meta_rc
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Build all_wahlomat_answers.csv from datasets under data/ and rebuild "
            "election_metadata.csv."
        )
    )
    parser.add_argument(
        "--repo-root",
        type=pathlib.Path,
        default=pathlib.Path(__file__).resolve().parent,
        help="Repository root (default: directory of this script)",
    )
    args = parser.parse_args(argv)
    return run_build(args.repo_root.resolve())


if __name__ == "__main__":
    raise SystemExit(main())
