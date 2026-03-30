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
import pathlib
import os
import pandas as pd

from analysis import (
    discover_bpb_excel_path,
    election_to_long_rows,
    excel_sheet_has_data_columns,
    parse_excel_election,
    parse_module_js,
)
from election_id_policy import (
    JS_FOLDER_CANONICAL_ELECTION_ID,
    JS_FOLDER_SUPERSEDED_BY_EXCEL_SHEET,
    excel_sheet_safe_ids,
)
from skipped_elections import OMIT_FROM_BUILD_DATAFRAME


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


def main() -> int:
    repo_root = pathlib.Path(__file__).resolve().parent
    os.chdir(repo_root / "data")
    try:
        p = pathlib.Path(".")
        module_list = list(p.glob("**/module_definition.js"))

        all_parts: list[pd.DataFrame] = []

        xlsx_path = discover_bpb_excel_path(p, pathlib.Path(".."))
        excel_safe_ids: set[str] = set()
        if xlsx_path is not None:
            xl_preview = pd.ExcelFile(xlsx_path, engine="openpyxl")
            excel_safe_ids = excel_sheet_safe_ids(list(xl_preview.sheet_names))

        for module in module_list:
            module_stem_folder = module.parts[0]
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
                all_parts.append(
                    election_to_long_rows(qdf, pivot, election_id, "js")
                )
            except Exception as e:
                print(
                    f"Problem {e} occurred while parsing JS module {module_stem_folder}"
                )

        if xlsx_path is not None:
            print(f"Reading Excel bundle {xlsx_path.resolve()}")
            xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
            for sheet_name in xl.sheet_names:
                df = pd.read_excel(
                    xlsx_path, sheet_name=sheet_name, engine="openpyxl"
                )
                if not excel_sheet_has_data_columns(df.columns):
                    continue
                safe_id = sheet_name.replace(" ", "_")
                print(f"  sheet {sheet_name}")
                try:
                    qdf, pivot = parse_excel_election(df)
                    all_parts.append(
                        election_to_long_rows(qdf, pivot, safe_id, "excel")
                    )
                except Exception as e:
                    print(f"  skip {sheet_name}: {e}")
        else:
            print("No Wahl-O-Mat Excel bundle found under data/ (optional).")

        if all_parts:
            out = pd.concat(all_parts, ignore_index=True)
            out_path = pathlib.Path("..") / "all_wahlomat_answers.csv"
            out.to_csv(out_path, index=False)
            print(f"Wrote {len(out)} rows to {out_path.resolve()}")
            return 0
        print("No data collected; CSV not written.")
        return 1
    finally:
        os.chdir(repo_root)


if __name__ == "__main__":
    raise SystemExit(main())
