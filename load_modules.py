#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Deprecated: graph generation now uses all_wahlomat_answers.csv via
build_graphs_from_csv.py (after build_dataframe.py).

Set WAHLOMAT_LEGACY_LOAD_MODULES=1 to run the old JS-only loop (skips Excel-only
elections and bypasses the CSV).
"""

from __future__ import annotations

import os
import pathlib
import sys

if os.environ.get("WAHLOMAT_LEGACY_LOAD_MODULES", "").strip().lower() not in (
    "1",
    "yes",
    "true",
):
    print(
        "load_modules.py is deprecated.\n"
        "  1. python build_dataframe.py   # writes all_wahlomat_answers.csv\n"
        "  2. python build_graphs_from_csv.py\n"
        "Optional: --election ID or ELECTION_IDS=id1,id2 for a subset.\n"
        "To force the legacy JS-only path: WAHLOMAT_LEGACY_LOAD_MODULES=1 python load_modules.py",
        file=sys.stderr,
    )
    sys.exit(2)

from wahlomat_extended_analysis.analysis import analysis

os.chdir("data")
p = pathlib.Path(".")
module_list = list(p.glob("**/module_definition.js"))

success = []
fail: dict[str, str] = {}
for module in module_list:
    module_stem_folder = module.parts[0]
    module_content = None
    try:
        with open(module) as f:
            module_content = f.read()
    except UnicodeDecodeError:
        try:
            with open(module, encoding="latin-1") as f:
                module_content = f.read()
        except Exception as e:
            print(f"Unexpected error {e}")
            fail[f"{module_stem_folder}"] = f"{e}"

    if module_content is None:
        continue

    print(f"Running analysis for {module_stem_folder}")
    try:
        analysis(module_content, module_stem_folder)
        success.append(f"{module_stem_folder}")
    except Exception as e:
        print(
            f"Problem {e} occurred while running analysis for {module_stem_folder}"
        )
        fail[f"{module_stem_folder}"] = f"{e}"
