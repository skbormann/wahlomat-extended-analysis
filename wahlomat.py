#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Unified CLI: download data, build CSV, and generate graphs."""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
from datetime import datetime, timezone

REPO_ROOT = pathlib.Path(__file__).resolve().parent
_REFRESH_STATE_PATH = REPO_ROOT / "data" / ".wahlomat_refresh_state.json"


def _load_refresh_state() -> dict | None:
    try:
        with open(_REFRESH_STATE_PATH, "r", encoding="utf-8") as f:
            obj = json.load(f)
        return obj if isinstance(obj, dict) else None
    except FileNotFoundError:
        return None


def _write_refresh_state(state: dict) -> None:
    _REFRESH_STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(_REFRESH_STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2, sort_keys=True)
        f.write("\n")


def _summarize_bundle_change(prev: dict | None, cur: dict) -> list[str]:
    """
    Human-facing lines about Datensätze bundle change since last run.
    cur must include: stand_date (optional), zip_sha256, bundle_filename.
    """
    stand = cur.get("stand_date") or "unknown"
    sha = cur.get("zip_sha256")
    fname = cur.get("bundle_filename") or "unknown.zip"
    if not isinstance(sha, str) or not sha:
        return [f"Datensätze bundle: Stand {stand} (hash unavailable)"]

    if not prev or prev.get("zip_sha256") is None:
        return [f"Datensätze bundle: Stand {stand} (first run; {fname}; sha256 {sha[:12]}…)"]

    prev_sha = prev.get("zip_sha256")
    prev_stand = prev.get("stand_date") or "unknown"
    if prev_sha == sha:
        return [f"Datensätze bundle unchanged since last run: Stand {stand} ({fname}; sha256 {sha[:12]}…)"]

    lines = [
        f"Datensätze bundle changed since last run: was Stand {prev_stand}, now Stand {stand} ({fname})"
    ]
    if prev_stand == stand:
        lines.append(
            "WARNING: Stand date unchanged but content hash changed; bpb may have replaced the file without updating the label."
        )
    return lines


def main() -> int:
    os.chdir(REPO_ROOT)
    argv = sys.argv[1:]

    # Delegate before parse_args: a graphs subparser with REMAINDER does not reliably
    # forward flags like --election / --graph (parent reports "unrecognized arguments").
    if argv and argv[0] == "graphs":
        import build_graphs_from_csv

        return build_graphs_from_csv.main(argv[1:])

    parser = argparse.ArgumentParser(
        prog="wahlomat.py",
        description="Unified CLI for Wahl-O-Mat extended analysis.",
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
    dl.add_argument(
        "--election-zips-only",
        action="store_true",
        help="Only download and extract archived election ZIPs (no Datensätze bundle).",
    )
    dl.add_argument(
        "--list-election-zips",
        action="store_true",
        help=(
            "List ZIPs from the weitere-Wahlen page (election_id, URL); no download. "
            "Same as get_zip_files.py --list-election-zips. See docs/DATASET.md for what election_id means."
        ),
    )
    dl.add_argument(
        "--election-zip",
        action="append",
        default=None,
        metavar="TOKEN",
        help=(
            "Download only election ZIPs whose URL or derived election_id contains TOKEN "
            "(case-insensitive); repeat for multiple tokens. See --list-election-zips."
        ),
    )
    dl.add_argument(
        "--with-datensaetze",
        action="store_true",
        help=(
            "Only with one or more --election-zip: also download and extract the Datensätze bundle in the same run."
        ),
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

    sub.add_parser(
        "graphs",
        help=(
            "PNG plots from CSV (same as build_graphs_from_csv.py); "
            "run: python wahlomat.py graphs … then pass that script's flags."
        ),
    )

    args = parser.parse_args(argv)
    if args.command is None:
        parser.print_help()
        return 0

    if args.command == "download":
        import get_zip_files

        gargv: list[str] = []
        if args.datensaetze_only:
            gargv.append("--datensaetze-only")
        if args.election_zips_only:
            gargv.append("--election-zips-only")
        if args.list_election_zips:
            gargv.append("--list-election-zips")
        if args.election_zip:
            for tok in args.election_zip:
                gargv.extend(["--election-zip", tok])
        if args.with_datensaetze:
            gargv.append("--with-datensaetze")
        return get_zip_files.main(gargv)
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

        prev = _load_refresh_state()
        url, stand = get_zip_files.fetch_datensaetze_bundle_info()
        rc, st = get_zip_files.download_and_extract_datensaetze_bundle_with_state(
            args.repo_root or REPO_ROOT,
            bundle_url=url,
            stand_date=stand,
        )
        if rc != 0 or st is None:
            return rc

        cur = {
            "saved_at_utc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "bundle_url": st.bundle_url,
            "bundle_filename": st.bundle_filename,
            "stand_date": st.stand_date,
            "zip_sha256": st.zip_sha256,
        }
        for line in _summarize_bundle_change(prev, cur):
            print(line)
        _write_refresh_state(cur)

        # On a fresh clone there may be no answers CSV yet; refresh-excel's update step
        # requires an existing all_wahlomat_answers.csv to merge workbook changes into.
        repo_root = (args.repo_root or REPO_ROOT).resolve()
        answers_path = (args.answers or (repo_root / "all_wahlomat_answers.csv")).resolve()
        if not answers_path.is_file():
            print(
                "refresh-excel: answers CSV not found; run `python wahlomat.py build-csv` first "
                "(or pass --answers PATH to update an existing CSV)."
            )
            return 0

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
