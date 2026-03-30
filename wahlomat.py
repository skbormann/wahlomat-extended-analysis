#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Unified CLI: download data, build CSV, and generate graphs."""

from __future__ import annotations

import argparse
import os
import pathlib
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parent


def main() -> int:
    os.chdir(REPO_ROOT)
    argv = sys.argv[1:]

    if argv and argv[0] == "graphs":
        import build_graphs_from_csv

        rest = argv[1:]
        return build_graphs_from_csv.main(rest if rest else [])

    parser = argparse.ArgumentParser(
        prog="wahlomat.py",
        description=(
            "Unified CLI for Wahl-O-Mat extended analysis. "
            "For graphs, run: python wahlomat.py graphs [OPTIONS] "
            "(same as build_graphs_from_csv.py; use graphs -h)."
        ),
        epilog="Also: python wahlomat.py graphs …  (PNG plots from CSV; use graphs -h).",
    )
    sub = parser.add_subparsers(dest="command", metavar="COMMAND", required=False)

    dl = sub.add_parser(
        "download",
        help="Download and extract election ZIPs into data/",
    )
    dl.add_argument(
        "--datensaetze-only",
        action="store_true",
        help="Only download and extract the bpb Wahl-O-Mat-Datensätze bundle ZIP.",
    )

    sub.add_parser(
        "build-csv",
        help="Build all_wahlomat_answers.csv from data/",
    )
    uc = sub.add_parser(
        "update-csv",
        help=(
            "Merge Excel-only changes into all_wahlomat_answers.csv "
            "(use when the bpb workbook changed; see update-csv -h)"
        ),
    )
    uc.add_argument(
        "--dry-run",
        action="store_true",
        help="Print change summary only; do not write files",
    )
    uc.add_argument(
        "-y",
        "--yes",
        action="store_true",
        help="Apply updates without confirmation",
    )
    uc.add_argument(
        "--repo-root",
        type=pathlib.Path,
        default=None,
        help="Repository root (default: directory of wahlomat.py)",
    )
    uc.add_argument(
        "--answers",
        type=pathlib.Path,
        default=None,
        help="Path to all_wahlomat_answers.csv (default: <repo-root>/)",
    )
    uc.add_argument(
        "--prune-superseded-excel",
        action="store_true",
        help=(
            "Drop old versioned sheet ids (e.g. BW26_v1.01) when the workbook "
            "has a newer XXyy_v… tab (e.g. BW26_v1.02)"
        ),
    )

    rx = sub.add_parser(
        "refresh-excel",
        help=(
            "Download Datensätze bundle only, then update answers CSV + metadata "
            "from the workbook (-y, prune superseded Excel ids by default)."
        ),
    )
    rx.add_argument(
        "--no-prune",
        action="store_true",
        help="Do not pass --prune-superseded-excel to update-csv.",
    )
    rx.add_argument(
        "--answers",
        type=pathlib.Path,
        default=None,
        help="Path to all_wahlomat_answers.csv (default: <repo-root>/)",
    )
    rx.add_argument(
        "--repo-root",
        type=pathlib.Path,
        default=None,
        help="Repository root (default: directory of wahlomat.py)",
    )

    sub.add_parser(
        "run-all",
        help="Run download, then build-csv, then graphs (default graph options)",
    )

    args = parser.parse_args(argv)
    if args.command is None:
        parser.print_help()
        return 0

    if args.command == "download":
        import get_zip_files

        if args.datensaetze_only:
            return get_zip_files.main(["--datensaetze-only"])
        return get_zip_files.main([])
    if args.command == "build-csv":
        import build_dataframe

        return build_dataframe.main()
    if args.command == "update-csv":
        import update_excel_csv

        code, _ = update_excel_csv.run(args)
        return code
    if args.command == "refresh-excel":
        import get_zip_files
        import update_excel_csv

        r = get_zip_files.main(["--datensaetze-only"])
        if r != 0:
            return r
        uc_args = argparse.Namespace(
            dry_run=False,
            yes=True,
            repo_root=args.repo_root or REPO_ROOT,
            answers=args.answers,
            prune_superseded_excel=not args.no_prune,
        )
        code, wrote = update_excel_csv.run(uc_args)
        if code != 0:
            return code
        if not wrote:
            print(
                "refresh-excel: no updates needed (answers CSV and metadata already "
                "match the workbook for this run; nothing written)."
            )
        return 0
    if args.command == "run-all":
        import build_dataframe
        import build_graphs_from_csv
        import get_zip_files

        r = get_zip_files.main([])
        if r != 0:
            return r
        r = build_dataframe.main()
        if r != 0:
            return r
        return build_graphs_from_csv.main([])

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
