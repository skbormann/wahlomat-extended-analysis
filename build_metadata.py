#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build election_metadata.csv from all_wahlomat_answers.csv.

JS elections: bpb archive table (WEITERE_WAHLEN_URL) — Wahl, Datum, ZIP link.
Excel elections: sheet-name prefix → level, state, year; display_name_de / display_name_en.
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import TYPE_CHECKING, Any, cast

from wahlomat_extended_analysis.bpb_urls import WEITERE_WAHLEN_URL, fetch_bpb_html
from wahlomat_extended_analysis.election_id_policy import JS_FOLDER_CANONICAL_ELECTION_ID

if TYPE_CHECKING:
    import pandas as pd


def _strip_tags(html_fragment: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html_fragment)
    return re.sub(r"\s+", " ", text).strip()


def election_slug_from_zip_href(href: str) -> str:
    """Map a ZIP href to folder-style election slug (matches CSV JS election_id)."""
    # Local import to keep `python build_metadata.py -h` fast (avoid importing analysis/matplotlib).
    from wahlomat_extended_analysis.get_zip_files import (
        resolve_internal_bpb_zip,
        upgrade_wahl_o_mat_zip_url,
    )

    url = upgrade_wahl_o_mat_zip_url(resolve_internal_bpb_zip(href.strip()))
    path = url.split("?")[0]
    low = path.lower()
    if "wahl-o-mat.de" in low or "archiv.wahl-o-mat.de" in low:
        parts = [p for p in path.rstrip("/").split("/") if p]
        for i, p in enumerate(parts):
            pl = p.lower()
            if pl.endswith(".zip") and "wahlomat" in pl:
                if i == 0:
                    return ""
                return parts[i - 1]
        return ""
    if "/system/files/" in path:
        name = path.split("/")[-1]
        if not name.lower().endswith(".zip"):
            return ""
        stem = name[:-4]
        if stem.startswith("wahlomat_"):
            return stem
        if stem.startswith("wahlomat-"):
            body = stem[len("wahlomat-") :]
            segs = body.split("-")
            if (
                len(segs) >= 2
                and segs[-1].isdigit()
                and len(segs[-1]) == 4
            ):
                return "".join(segs[:-1]) + segs[-1]
            return body.replace("-", "")
        return stem
    return ""


def parse_german_date(s: str) -> datetime:
    s = s.strip()
    return datetime.strptime(s, "%d.%m.%Y")


# German Land → English for display_name_en (state column stays German).
STATE_DE_TO_EN: dict[str, str] = {
    "Baden-Württemberg": "Baden-Württemberg",
    "Bayern": "Bavaria",
    "Berlin": "Berlin",
    "Brandenburg": "Brandenburg",
    "Bremen": "Bremen",
    "Hamburg": "Hamburg",
    "Hessen": "Hesse",
    "Mecklenburg-Vorpommern": "Mecklenburg-Western Pomerania",
    "Niedersachsen": "Lower Saxony",
    "Nordrhein-Westfalen": "North Rhine-Westphalia",
    "Rheinland-Pfalz": "Rhineland-Palatinate",
    "Saarland": "Saarland",
    "Sachsen": "Saxony",
    "Sachsen-Anhalt": "Saxony-Anhalt",
    "Schleswig-Holstein": "Schleswig-Holstein",
    "Thüringen": "Thuringia",
}


def js_level_state(wahl_label: str) -> tuple[str, str]:
    w = wahl_label.strip()
    if w in ("Bundestagswahl", "Bundestag"):
        return "federal", "Federal"
    if w == "Europäisches Parlament":
        return "european", "European"
    return "state", w


def display_name_en(level: str, state_de: str, year: int) -> str:
    if level == "federal":
        return f"Federal election {year}"
    if level == "european":
        return f"European Parliament election {year}"
    en = STATE_DE_TO_EN.get(state_de, state_de)
    return f"{en} state election {year}"


def display_name_de(level: str, state_de: str, year: int) -> str:
    if level == "federal":
        return f"Bundestagswahl {year}"
    if level == "european":
        return f"Europawahl {year}"
    if level == "state":
        if state_de == "Berlin":
            return f"Abgeordnetenhauswahl Berlin {year}"
        if state_de == "Hamburg":
            return f"Bürgerschaftswahl Hamburg {year}"
        if state_de == "Bremen":
            return f"Bürgerschaftswahl Bremen {year}"
        return f"Landtagswahl {state_de} {year}"
    return f"Landtagswahl {state_de} {year}"


def parse_archive_table(html: str) -> list[dict]:
    """Rows from bpb weitere-Wahlen HTML: election_id (canonical), wahl, year, level, state_de, slug_raw."""
    trs = re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.DOTALL | re.IGNORECASE)
    out: list[dict] = []
    for tr in trs[1:]:
        mth = re.search(
            r'<th[^>]*scope="row"[^>]*>(.*?)</th>', tr, re.DOTALL | re.I
        )
        if not mth:
            continue
        wahl_label = _strip_tags(mth.group(1))
        tds = re.findall(r"<td[^>]*>(.*?)</td>", tr, re.DOTALL | re.I)
        if not tds:
            continue
        datum_str = _strip_tags(tds[0])
        hrefm = re.search(
            r'href\s*=\s*["\']([^"\']*\.zip[^"\']*)["\']', tr, re.I
        )
        if not hrefm:
            continue
        slug_raw = election_slug_from_zip_href(hrefm.group(1))
        if not slug_raw:
            continue
        election_id = JS_FOLDER_CANONICAL_ELECTION_ID.get(slug_raw, slug_raw)
        try:
            dt = parse_german_date(datum_str)
        except ValueError:
            continue
        level, state_de = js_level_state(wahl_label)
        year = dt.year
        out.append(
            {
                "election_id": election_id,
                "slug_raw": slug_raw,
                "wahl_label": wahl_label,
                "datum": datum_str,
                "year": year,
                "level": level,
                "state": state_de,
                "display_name_en": display_name_en(level, state_de, year),
                "display_name_de": display_name_de(level, state_de, year),
            }
        )
    return out


# Sheet id prefix (two letters) → (level, state_de). Year from following two digits.
EXCEL_PREFIX_META: dict[str, tuple[str, str]] = {
    "BT": ("federal", "Federal"),
    "EU": ("european", "European"),
    "BE": ("state", "Berlin"),
    "BW": ("state", "Baden-Württemberg"),
    "BY": ("state", "Bayern"),
    "HB": ("state", "Bremen"),
    "HH": ("state", "Hamburg"),
    "HE": ("state", "Hessen"),
    "MV": ("state", "Mecklenburg-Vorpommern"),
    "NI": ("state", "Niedersachsen"),
    "NW": ("state", "Nordrhein-Westfalen"),
    "RP": ("state", "Rheinland-Pfalz"),
    "SL": ("state", "Saarland"),
    "SN": ("state", "Sachsen"),
    "ST": ("state", "Sachsen-Anhalt"),
    "SH": ("state", "Schleswig-Holstein"),
    "TH": ("state", "Thüringen"),
    "BB": ("state", "Brandenburg"),
}

_EXCEL_ID_RE = re.compile(r"^([A-Z]{2})(\d{2})(?:_|$|[^0-9])")


def excel_row_from_election_id(safe_id: str) -> dict | None:
    m = _EXCEL_ID_RE.match(safe_id.strip())
    if not m:
        return None
    prefix, yy = m.group(1), m.group(2)
    meta = EXCEL_PREFIX_META.get(prefix)
    if not meta:
        return None
    level, state_de = meta
    year = 2000 + int(yy)
    if year > datetime.now().year + 2:
        year -= 100
    return {
        "election_id": safe_id,
        "display_name_en": display_name_en(level, state_de, year),
        "display_name_de": display_name_de(level, state_de, year),
        "state": state_de,
        "year": year,
        "level": level,
    }


def data_sheet_safe_ids(xlsx_path: Path) -> set[str]:
    import pandas as pd
    from wahlomat_extended_analysis.analysis import excel_sheet_has_data_columns

    xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
    ids: set[str] = set()
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(xlsx_path, sheet_name=sheet_name, engine="openpyxl")
        if excel_sheet_has_data_columns(df.columns):
            ids.add(sheet_name.replace(" ", "_"))
    return ids


def build_election_metadata(
    answers_path: Path,
    repo_root: Path,
    *,
    archive_html: str | None = None,
    archive_html_path: Path | None = None,
) -> "pd.DataFrame":
    import pandas as pd
    from wahlomat_extended_analysis.analysis import discover_bpb_excel_path

    answers = pd.read_csv(answers_path)
    csv_ids = sorted(answers["election_id"].astype(str).unique())
    if archive_html_path is not None:
        html = archive_html_path.read_text(encoding="utf-8", errors="replace")
    elif archive_html is not None:
        html = archive_html
    else:
        html = fetch_bpb_html(WEITERE_WAHLEN_URL)
    archive_rows = parse_archive_table(html)
    by_eid: dict[str, dict] = {}
    for row in archive_rows:
        eid = row["election_id"]
        if eid not in by_eid:
            by_eid[eid] = row

    xlsx_path = discover_bpb_excel_path(repo_root / "data", repo_root)
    excel_ids: set[str] = set()
    if xlsx_path is not None:
        excel_ids = data_sheet_safe_ids(xlsx_path)

    built: list[dict] = []
    missing: list[str] = []
    for eid in csv_ids:
        if eid in excel_ids:
            er = excel_row_from_election_id(eid)
            if er is None:
                missing.append(eid)
                continue
            built.append(er)
        else:
            js = by_eid.get(eid)
            if js is not None:
                built.append(
                    {
                        "election_id": eid,
                        "display_name_de": js["display_name_de"],
                        "display_name_en": js["display_name_en"],
                        "state": js["state"],
                        "year": int(js["year"]),
                        "level": js["level"],
                    }
                )
                continue
            # Superseded Excel sheet ids still in answers CSV (e.g. BW26_v1.01
            # while the workbook only lists BW26_v1.02): derive from prefix rules.
            er = excel_row_from_election_id(eid)
            if er is not None:
                built.append(er)
                continue
            missing.append(eid)
    if missing:
        raise ValueError(
            "No metadata for election_id(s): " + ", ".join(sorted(missing))
        )
    meta_df = pd.DataFrame(built)
    meta_df = meta_df.sort_values("election_id").reset_index(drop=True)
    meta_df["year"] = meta_df["year"].astype(int)
    _cols = [
        "election_id",
        "display_name_de",
        "display_name_en",
        "state",
        "year",
        "level",
    ]
    # pandas stubs sometimes type DataFrame selection as Series; here we select multiple
    # columns, so the runtime value is a DataFrame.
    return cast(Any, meta_df.loc[:, _cols])


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Build election_metadata.csv from all_wahlomat_answers.csv.",
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=None,
        help="Repository root (default: parent of this script)",
    )
    parser.add_argument(
        "--answers",
        type=Path,
        default=None,
        help="Path to all_wahlomat_answers.csv (default: <repo-root>/...)",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Output CSV (default: <repo-root>/election_metadata.csv)",
    )
    parser.add_argument(
        "--archive-html",
        type=Path,
        default=None,
        metavar="PATH",
        help=(
            "Saved bpb 'Wahl-O-Mat-Archiv: Weitere Wahlen' HTML (skip network). "
            "Save: https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/"
        ),
    )
    args = parser.parse_args(argv)
    repo_root = (args.repo_root or Path(__file__).resolve().parent).resolve()
    answers_path = (args.answers or repo_root / "all_wahlomat_answers.csv").resolve()
    out_path = (args.out or repo_root / "election_metadata.csv").resolve()
    env_path = os.environ.get("WAHLOMAT_ARCHIVE_HTML", "").strip()
    archive_path = args.archive_html
    if archive_path is None and env_path:
        archive_path = Path(env_path)
    if not answers_path.is_file():
        print(f"Answers CSV not found: {answers_path}", file=sys.stderr)
        return 1
    if archive_path is not None and not archive_path.is_file():
        print(f"--archive-html / WAHLOMAT_ARCHIVE_HTML not a file: {archive_path}", file=sys.stderr)
        return 1
    try:
        meta = build_election_metadata(
            answers_path,
            repo_root,
            archive_html_path=archive_path,
        )
    except ValueError as e:
        print(str(e), file=sys.stderr)
        return 1
    except OSError as e:
        print(
            f"Failed to fetch archive listing ({WEITERE_WAHLEN_URL}): {e}\n"
            "Save the page HTML (Wahl-O-Mat-Archiv: Weitere Wahlen) and set "
            "WAHLOMAT_ARCHIVE_HTML or use --archive-html PATH.\n"
            "URL: https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/",
            file=sys.stderr,
        )
        return 1
    meta.to_csv(out_path, index=False)
    print(f"Wrote {len(meta)} rows to {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
