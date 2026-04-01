#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge new/changed bpb Excel sheets into all_wahlomat_answers.csv (JS rows untouched)."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import pandas as pd

_LAND_YEAR_PREFIX_RE = re.compile(r"^([A-Z]{2}\d{2})_")


def discover_bpb_excel_path(*args, **kwargs):
    from wahlomat_extended_analysis.analysis import discover_bpb_excel_path as _impl

    return _impl(*args, **kwargs)


def iter_excel_long_dataframes(*args, **kwargs):
    from wahlomat_extended_analysis.build_dataframe import (
        iter_excel_long_dataframes as _impl,
    )

    return _impl(*args, **kwargs)


def data_sheet_safe_ids(*args, **kwargs):
    from wahlomat_extended_analysis.build_metadata import data_sheet_safe_ids as _impl

    return _impl(*args, **kwargs)


def _land_year_prefix(eid: str) -> str | None:
    m = _LAND_YEAR_PREFIX_RE.match(str(eid).strip())
    return m.group(1) if m else None


def superseded_excel_election_ids(
    answers: pd.DataFrame, excel_ids: set[str]
) -> set[str]:
    """
    election_ids in the CSV that look like versioned bpb sheets (XXyy_v…) and
    share a land+year prefix with some current workbook tab, but are not
    themselves a current tab — e.g. BW26_v1.01 when the workbook has BW26_v1.02.
    """
    prefixes: set[str] = set()
    for eid in excel_ids:
        k = _land_year_prefix(eid)
        if k:
            prefixes.add(k)
    out: set[str] = set()
    for eid in answers["election_id"].astype(str).unique():
        if eid in excel_ids:
            continue
        k = _land_year_prefix(eid)
        if k and k in prefixes:
            out.add(eid)
    return out


def _changed_detail(delta_p: int, delta_rows: int) -> str:
    parts: list[str] = []
    if delta_p != 0:
        if delta_p == 1:
            parts.append("+1 party")
        elif delta_p == -1:
            parts.append("-1 party")
        elif delta_p > 0:
            parts.append(f"+{delta_p} parties")
        else:
            parts.append(f"{delta_p} parties")
    if delta_rows != 0:
        if delta_rows > 0:
            parts.append(f"{delta_rows} rows added")
        else:
            parts.append(f"{-delta_rows} rows removed")
    if parts:
        return ", ".join(parts)
    return f"{delta_rows:+d} rows"


def _sort_election_block(df: pd.DataFrame) -> pd.DataFrame:
    return df.sort_values(["question", "party"], kind="mergesort").reset_index(
        drop=True
    )


_CANONICAL_COMPARE_COLS: tuple[str, ...] = (
    "election_id",
    "question",
    "party",
    "answer",
    "title",
    "these_text",
)


def _canonicalize_for_compare(df: pd.DataFrame, *, sheet_id: str, where: str) -> pd.DataFrame:
    import pandas as pd

    missing = [c for c in _CANONICAL_COMPARE_COLS if c not in df.columns]
    if missing:
        raise ValueError(
            f"Excel sheet {sheet_id!r}: cannot compare/update because {where} is missing "
            f"required column(s): {missing}. The bpb workbook format may have changed."
        )
    out = df.loc[:, list(_CANONICAL_COMPARE_COLS)].copy()
    # Normalize dtypes for stable hashing across pandas versions.
    out["election_id"] = out["election_id"].astype(str)
    out["party"] = out["party"].astype(str)
    out["title"] = out["title"].astype(str)
    out["these_text"] = out["these_text"].astype(str)
    out["question"] = pd.to_numeric(out["question"], errors="raise")
    out["answer"] = pd.to_numeric(out["answer"], errors="raise")
    return _sort_election_block(out)


def _block_fingerprint(df: pd.DataFrame) -> int:
    import pandas as pd

    h = pd.util.hash_pandas_object(df, index=False)
    return int(h.sum())


def run(args: argparse.Namespace) -> tuple[int, bool]:
    import pandas as pd

    """
    Apply update-csv logic. Returns (exit_code, wrote_files).
    wrote_files is True only after a successful answers CSV write (metadata rebuild attempted).
    """
    repo_root = (args.repo_root or Path(__file__).resolve().parent).resolve()
    answers_path = (args.answers or repo_root / "all_wahlomat_answers.csv").resolve()
    if not answers_path.is_file():
        print(f"Answers CSV not found: {answers_path}", file=sys.stderr)
        return 1, False

    xlsx_path = discover_bpb_excel_path(repo_root / "data", repo_root)
    if xlsx_path is None:
        print(
            "No Wahl-O-Mat Excel bundle found under data/ or repo root.",
            file=sys.stderr,
        )
        return 1, False

    answers = pd.read_csv(answers_path)
    dry_run = args.dry_run
    yes = args.yes

    excel_ids = data_sheet_safe_ids(xlsx_path)
    pruned_ids: set[str] = set()
    if getattr(args, "prune_superseded_excel", False):
        pruned_ids = superseded_excel_election_ids(answers, excel_ids)

    new_items: list[tuple[str, str]] = []
    changed_items: list[tuple[str, str]] = []
    unchanged_count = 0
    to_replace: dict[str, pd.DataFrame] = {}

    for safe_id, long_df in iter_excel_long_dataframes(xlsx_path, verbose=False):
        new_n = len(long_df)
        mask = answers["election_id"] == safe_id
        old_n = int(mask.sum())

        if old_n == 0 and new_n == 0:
            print(
                f"Warning: sheet {safe_id!r} produced 0 rows; skipped.",
                file=sys.stderr,
            )
            continue

        if old_n == new_n:
            if old_n == 0:
                unchanged_count += 1
                continue
            new_block = _canonicalize_for_compare(
                long_df, sheet_id=safe_id, where="workbook sheet output"
            )
            old_block = _canonicalize_for_compare(
                answers.loc[mask], sheet_id=safe_id, where="existing answers CSV block"
            )
            if _block_fingerprint(new_block) == _block_fingerprint(old_block):
                unchanged_count += 1
                continue
            # Same row count but different content: treat as changed (Option A).
            changed_items.append((safe_id, f"   {safe_id}: changed (content differs)"))
            to_replace[safe_id] = new_block
            continue

        sorted_block = _canonicalize_for_compare(
            long_df, sheet_id=safe_id, where="workbook sheet output"
        )
        if old_n == 0:
            new_items.append(
                (safe_id, f"   {safe_id}: new election ({new_n} rows)")
            )
            to_replace[safe_id] = sorted_block
            continue

        old_parties = int(answers.loc[mask, "party"].nunique())
        new_parties = int(long_df["party"].nunique())
        delta_rows = new_n - old_n
        delta_p = new_parties - old_parties
        detail = _changed_detail(delta_p, delta_rows)
        changed_items.append(
            (safe_id, f"   {safe_id}: changed ({detail})")
        )
        to_replace[safe_id] = sorted_block

    to_replace_ids = set(to_replace.keys())

    for _, line in sorted(new_items, key=lambda t: t[0]):
        print(line)
    for _, line in sorted(changed_items, key=lambda t: t[0]):
        print(line)
    print(f"   Unchanged: {unchanged_count} sheets")

    if pruned_ids:
        for eid in sorted(pruned_ids):
            n = int((answers["election_id"] == eid).sum())
            print(f"   {eid}: superseded (remove {n} rows; not in workbook)")

    if not to_replace_ids and not pruned_ids:
        print(
            "No Excel updates needed (row counts match for all qualifying sheets)."
        )
        return 0, False

    if dry_run:
        return 0, False

    if not yes:
        if not sys.stdin.isatty():
            print(
                "Not a TTY: use --yes to apply or --dry-run to preview.",
                file=sys.stderr,
            )
            return 1, False
        try:
            r = input("Proceed? [y/N] ")
        except EOFError:
            return 1, False
        if r.strip().lower() not in ("y", "yes"):
            print("Aborted.")
            return 0, False

    answers_work = answers
    if pruned_ids:
        answers_work = answers[~answers["election_id"].isin(pruned_ids)].copy()
        n_drop = len(answers) - len(answers_work)
        print(
            f"Removing superseded election_id(s): {', '.join(sorted(pruned_ids))} "
            f"({n_drop} rows)"
        )

    block_order = answers_work["election_id"].drop_duplicates().tolist()
    existing_ids = set(block_order)
    new_only = sorted(to_replace_ids - existing_ids)

    parts: list[pd.DataFrame] = []
    for eid in block_order:
        if eid in to_replace_ids:
            parts.append(to_replace[eid])
        else:
            parts.append(answers_work[answers_work["election_id"] == eid])

    for eid in new_only:
        parts.append(to_replace[eid])

    out = pd.concat(parts, ignore_index=True)
    out = out.reindex(columns=answers_work.columns)
    out.to_csv(answers_path, index=False)
    print(f"Wrote {len(out)} rows to {answers_path}")

    import build_metadata

    meta_rc = build_metadata.main(
        [
            "--repo-root",
            str(repo_root),
            "--answers",
            str(answers_path),
        ]
    )
    return meta_rc, True


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Update all_wahlomat_answers.csv from the bpb Excel bundle only: "
            "new or row-count-changed sheets replace their election_id blocks; "
            "JS-sourced rows are never removed or altered."
        ),
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=None,
        help="Repository root (default: directory of this script)",
    )
    parser.add_argument(
        "--answers",
        type=Path,
        default=None,
        help="Path to all_wahlomat_answers.csv (default: <repo-root>/)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print change summary only; do not write files",
    )
    parser.add_argument(
        "-y",
        "--yes",
        action="store_true",
        help="Apply updates without confirmation",
    )
    parser.add_argument(
        "--prune-superseded-excel",
        action="store_true",
        help=(
            "Remove versioned Excel election_ids (e.g. BW26_v1.01) that are not "
            "workbook tabs when another tab shares the same XXyy prefix (e.g. "
            "BW26_v1.02). Keeps metadata aligned with current bpb sheets."
        ),
    )
    args = parser.parse_args(argv)
    code, _ = run(args)
    return code


if __name__ == "__main__":
    raise SystemExit(main())
