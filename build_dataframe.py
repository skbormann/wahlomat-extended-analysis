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
from skipped_elections import OMIT_FROM_BUILD_DATAFRAME

os.chdir("data")
p = pathlib.Path(".")
module_list = list(p.glob("**/module_definition.js"))

all_parts: list[pd.DataFrame] = []

# %% Loop over JS modules
for module in module_list:
    module_stem_folder = module.parts[0]
    if module_stem_folder in OMIT_FROM_BUILD_DATAFRAME:
        continue
    module_content = None
    try:
        with open(module, encoding="utf-8") as f:
            module_content = f.read()
    except UnicodeDecodeError:
        try:
            with open(module, encoding="latin1") as f:
                module_content = f.read()
        except Exception as e:
            print(f"Unexpected error {e}")
    if module_content is None:
        continue
    print(f"Parsing JS module {module_stem_folder}")
    try:
        qdf, pivot = parse_module_js(module_content)
        all_parts.append(
            election_to_long_rows(qdf, pivot, module_stem_folder, "js")
        )
    except Exception as e:
        print(
            f"Problem {e} occurred while parsing JS module {module_stem_folder}"
        )

# %% bpb Excel bundle (optional)
xlsx_path = discover_bpb_excel_path(p, pathlib.Path(".."))
if xlsx_path is not None:
    print(f"Reading Excel bundle {xlsx_path}")
    xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(xlsx_path, sheet_name=sheet_name, engine="openpyxl")
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

# %% Export
if all_parts:
    out = pd.concat(all_parts, ignore_index=True)
    out_path = pathlib.Path("..") / "all_wahlomat_answers.csv"
    out.to_csv(out_path, index=False)
    print(f"Wrote {len(out)} rows to {out_path.resolve()}")
else:
    print("No data collected; CSV not written.")
