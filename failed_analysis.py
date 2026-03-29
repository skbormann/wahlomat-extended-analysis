#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Diagnostics for elections omitted from build_dataframe (see skipped_elections.py).

Run from the repository root:
    python failed_analysis.py

For each listed election folder under data/, loads module_definition.js, runs
parse_module_js, then optionally run_analysis to surface parse vs plot errors
(e.g. KMeans when fewer parties than N_CLUSTERS).
"""

from __future__ import annotations

import os
import pathlib

from analysis import parse_module_js, run_analysis
from skipped_elections import OMIT_FROM_BUILD_DATAFRAME


def _read_module(path: pathlib.Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        try:
            return path.read_text(encoding="latin1")
        except OSError as e:
            print(f"  read error: {e}")
            return None


def main() -> None:
    os.chdir("data")
    root = pathlib.Path(".")
    for stem in OMIT_FROM_BUILD_DATAFRAME:
        matches = list(root.glob(f"{stem}/**/module_definition.js"))
        if not matches:
            print(f"{stem}: no module_definition.js found")
            continue
        mod_path = matches[0]
        print(f"\n=== {stem} ({mod_path}) ===")
        text = _read_module(mod_path)
        if text is None:
            continue
        try:
            q_df, ans = parse_module_js(text)
            print(
                f"  parse_module_js: {len(q_df)} theses, "
                f"pivot {ans.shape}, {ans.shape[1]} parties"
            )
        except Exception as e:
            print(f"  parse_module_js FAILED: {e!r}")
            continue
        try:
            run_analysis(q_df, ans, f"debug_{stem}")
            print("  run_analysis: OK (graphs in ../graphs/)")
        except Exception as e:
            print(f"  run_analysis FAILED: {e!r}")


if __name__ == "__main__":
    main()
