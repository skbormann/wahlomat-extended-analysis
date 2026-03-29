#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build correlation / PCA / cluster graphs from all_wahlomat_answers.csv.

Run from the repository root after build_dataframe.py has written the CSV.
Optionally restrict to one or more election_id values (CLI or ELECTION_IDS env).
"""

from __future__ import annotations

import argparse
import os
import pathlib
import sys

import pandas as pd

from analysis import long_rows_to_run_analysis, run_analysis

REPO_ROOT = pathlib.Path(__file__).resolve().parent


def _parse_election_ids_from_env() -> list[str]:
    raw = os.environ.get("ELECTION_IDS", "").strip()
    if not raw:
        return []
    return [x.strip() for x in raw.split(",") if x.strip()]


def _parse_election_cli(values: list[str] | None) -> list[str]:
    if not values:
        return []
    out: list[str] = []
    for v in values:
        for part in v.split(","):
            p = part.strip()
            if p:
                out.append(p)
    return out


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Generate graphs from all_wahlomat_answers.csv (run build_dataframe.py first)."
        )
    )
    parser.add_argument(
        "--csv",
        type=pathlib.Path,
        default=REPO_ROOT / "all_wahlomat_answers.csv",
        help="Path to CSV (default: ./all_wahlomat_answers.csv)",
    )
    parser.add_argument(
        "--election",
        action="append",
        dest="elections",
        metavar="ID",
        help=(
            "Only these election_id values (repeat or comma-separated). "
            "If omitted, use ELECTION_IDS when set, otherwise all elections in the CSV."
        ),
    )
    args = parser.parse_args()
    csv_path = args.csv
    if not csv_path.is_file():
        print(f"CSV not found: {csv_path.resolve()}", file=sys.stderr)
        return 1

    df = pd.read_csv(csv_path)
    if "election_id" not in df.columns:
        print("CSV missing election_id column.", file=sys.stderr)
        return 1

    cli_ids = _parse_election_cli(args.elections)
    env_ids = _parse_election_ids_from_env()
    if cli_ids:
        want = cli_ids
    elif env_ids:
        want = env_ids
    else:
        want = sorted(df["election_id"].astype(str).unique())

    missing = [e for e in want if e not in set(df["election_id"].astype(str))]
    if missing:
        print(f"Unknown election_id (not in CSV): {missing}", file=sys.stderr)
        return 1

    os.chdir(REPO_ROOT / "data")
    fail: dict[str, str] = {}
    for eid in want:
        stem = str(eid).replace(" ", "_")
        sub = df.loc[df["election_id"].astype(str) == str(eid)]
        print(f"Running analysis for {eid}")
        try:
            qdf, pivot = long_rows_to_run_analysis(sub)
            run_analysis(qdf, pivot, stem)
        except Exception as ex:
            print(f"Problem {ex} occurred while running analysis for {eid}")
            fail[str(eid)] = str(ex)

    if fail:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
