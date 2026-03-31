#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build correlation / PCA / cluster graphs from all_wahlomat_answers.csv.

Run from the repository root after the answers CSV exists (see wahlomat.py build-csv / build_dataframe.py).
Optionally restrict to one or more election_id values (CLI or ELECTION_IDS env).
Use --list-elections to print valid election_id values and row counts from the CSV (aligned columns).
"""

from __future__ import annotations

import argparse
import os
import pathlib
import sys

from graph_kinds import GRAPH_KIND_CHOICES

REPO_ROOT = pathlib.Path(__file__).resolve().parent
_DEFAULT_CSV = REPO_ROOT / "all_wahlomat_answers.csv"


def _build_csv_hint_block() -> str:
    return (
        "From the repository root, run either command (they do the same):\n"
        "  python wahlomat.py build-csv\n"
        "  python build_dataframe.py"
    )


def _resolved_csv_from_argv(argv: list[str]) -> pathlib.Path:
    """Path intended for graphs, from --csv=… / --csv … if present, else default."""
    i = 0
    while i < len(argv):
        a = argv[i]
        if a.startswith("--csv="):
            raw = a.split("=", 1)[1]
            p = pathlib.Path(raw).expanduser()
            return p.resolve() if p.is_absolute() else (pathlib.Path.cwd() / p).resolve()
        if a == "--csv" and i + 1 < len(argv):
            p = pathlib.Path(argv[i + 1]).expanduser()
            return p.resolve() if p.is_absolute() else (pathlib.Path.cwd() / p).resolve()
        i += 1
    return _DEFAULT_CSV.resolve()


def _graphs_description(argv: list[str]) -> str:
    path = _resolved_csv_from_argv(argv)
    base = "Generate graphs from all_wahlomat_answers.csv."
    if path.is_file():
        return f"{base}\n\nCSV file found:\n  {path}"
    return f"{base}\n\nCSV file not found:\n  {path}\n\n{_build_csv_hint_block()}"


def _stderr_csv_missing(path: pathlib.Path) -> None:
    print(f"CSV not found: {path.resolve()}", file=sys.stderr)
    print(_build_csv_hint_block(), file=sys.stderr)


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


def _print_election_counts_table(counts) -> None:
    """Fixed-width columns for terminal readability (not strict TSV)."""
    rows: list[tuple[str, int]] = [(str(eid), int(n)) for eid, n in counts.items()]
    col1_h, col2_h = "election_id", "rows"
    w1 = len(col1_h)
    w2 = len(col2_h)
    for eid, n in rows:
        w1 = max(w1, len(eid))
        w2 = max(w2, len(str(n)))
    gap = "  "
    print(f"{col1_h:<{w1}}{gap}{col2_h:>{w2}}")
    for eid, n in rows:
        print(f"{eid:<{w1}}{gap}{n:>{w2}}")


def main(argv: list[str] | None = None) -> int:
    if argv is None:
        argv = list(sys.argv[1:])
    parser = argparse.ArgumentParser(
        description=_graphs_description(argv),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--csv",
        type=pathlib.Path,
        default=_DEFAULT_CSV,
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
    parser.add_argument(
        "--list-elections",
        action="store_true",
        help=(
            "Print election_id values from the CSV, then exit (no graphs). "
            "Not with --election or ELECTION_IDS."
        ),
    )
    parser.add_argument(
        "--with-rows",
        action="store_true",
        help="With --list-elections, also print row counts (aligned columns).",
    )
    parser.add_argument(
        "--graph",
        action="append",
        choices=list(GRAPH_KIND_CHOICES),
        metavar="KIND",
        help=(
            "Only write these plot files per election (repeat for several): "
            "c_matrix (correlation clustermap), pca_map, pca_influences. "
            "Default: all three. Combine with --election to limit elections."
        ),
    )
    args = parser.parse_args(argv)
    csv_path = args.csv.expanduser()
    if not csv_path.is_absolute():
        csv_path = (pathlib.Path.cwd() / csv_path).resolve()

    if args.list_elections:
        import pandas as pd

        if _parse_election_cli(args.elections) or _parse_election_ids_from_env():
            print(
                "--list-elections cannot be combined with --election or ELECTION_IDS.",
                file=sys.stderr,
            )
            return 2
        if not csv_path.is_file():
            _stderr_csv_missing(csv_path)
            return 1
        try:
            list_df = pd.read_csv(csv_path, usecols=["election_id"])
        except ValueError:
            print("CSV missing election_id column.", file=sys.stderr)
            return 1
        counts = list_df["election_id"].astype(str).value_counts().sort_index()
        if args.with_rows:
            _print_election_counts_table(counts)
        else:
            for eid in counts.index.tolist():
                print(eid)
        return 0

    if not csv_path.is_file():
        _stderr_csv_missing(csv_path)
        return 1

    import pandas as pd

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

    graph_kinds: frozenset[str] | None = (
        frozenset(args.graph) if args.graph else None
    )

    os.chdir(REPO_ROOT / "data")
    fail: dict[str, str] = {}
    for eid in want:
        stem = str(eid).replace(" ", "_")
        sub = df.loc[df["election_id"].astype(str) == str(eid)]
        print(f"Running analysis for {eid}")
        try:
            from analysis import long_rows_to_run_analysis, run_analysis

            qdf, pivot = long_rows_to_run_analysis(sub)
            run_analysis(qdf, pivot, stem, graphs=graph_kinds)
        except Exception as ex:
            print(f"Problem {ex} occurred while running analysis for {eid}")
            fail[str(eid)] = str(ex)

    if fail:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
