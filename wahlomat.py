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
    )
    sub = parser.add_subparsers(dest="command", required=True, metavar="COMMAND")

    sub.add_parser(
        "download",
        help="Download and extract election ZIPs into data/",
    )
    sub.add_parser(
        "build-csv",
        help="Build all_wahlomat_answers.csv from data/",
    )
    sub.add_parser(
        "run-all",
        help="Run download, then build-csv, then graphs (default graph options)",
    )

    args = parser.parse_args(argv)

    if args.command == "download":
        import get_zip_files

        return get_zip_files.main()
    if args.command == "build-csv":
        import build_dataframe

        return build_dataframe.main()
    if args.command == "run-all":
        import build_dataframe
        import build_graphs_from_csv
        import get_zip_files

        r = get_zip_files.main()
        if r != 0:
            return r
        r = build_dataframe.main()
        if r != 0:
            return r
        return build_graphs_from_csv.main([])

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
