#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 12 01:37:35 2021

@author: sven-kristjanbormann
Copy of the original wahlomat script stripped of the downloading part
and modified to allow looping

Based on the code found on
https://github.com/microraptor/wahlomat_analysis
https://www.reddit.com/r/de/comments/bqubdv/wahlomat_analyse_zur_euparlamentswahl_2019_oc/eo7zmaq/

Supports legacy module_definition.js and bpb Excel bundle sheets (see parse_excel_election).
"""

from __future__ import annotations

import pathlib
from typing import Any, cast
import re
import os
import math
import numpy as np
import pandas as pd
from pandas.core.frame import DataFrame
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from matplotlib import ticker
from matplotlib.patches import Rectangle
import seaborn as sns

# %% Settings
N_CLUSTERS: int = 6
from graph_kinds import GRAPH_KIND_CHOICES

GRAPH_KINDS_ALL: frozenset[str] = frozenset(GRAPH_KIND_CHOICES)
EMPHASIZED_PARTIES: list = [  # only lowercase (casefold)
    "die linke",
    "linke",
    "die grünen",
    "grüne",
    "spd",
    "fdp",
    "cdu",
    "csu",
    "union",
    "cdu/csu",
    "cdu / csu",
    "afd",
]

# bpb Excel (Wahl-O-Mat-Datensätze): column labels and position strings
EXCEL_COL_PARTY_ABBR = "Partei: Kurzbezeichnung"
EXCEL_COL_PARTY_NAME = "Partei: Name"
EXCEL_COL_THESIS_NR = "These: Nr."
EXCEL_COL_THESIS_TITLE = "These: Titel"
EXCEL_COL_THESIS_TEXT = "These: These"
EXCEL_COL_POSITION = "Position: Position"
EXCEL_REQUIRED_COLUMNS = (
    EXCEL_COL_PARTY_ABBR,
    EXCEL_COL_PARTY_NAME,
    EXCEL_COL_THESIS_NR,
    EXCEL_COL_THESIS_TITLE,
    EXCEL_COL_THESIS_TEXT,
    EXCEL_COL_POSITION,
)

# Set seaborn theme and config
sns.set(rc={"savefig.dpi": 300, "figure.dpi": 300})
sns.set_theme()
sns.set_context("paper")
sns.set_style("darkgrid")
# DejaVu ships with matplotlib and covers German text; avoids Arial missing glyphs.
plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = [
    "DejaVu Sans",
    "DejaVu Sans Display",
    "Arial",
    "Helvetica",
    "sans-serif",
]


def _fix_cp1252_c1_glyphs(s: str) -> str:
    """
    Map U+0080–U+009F to Windows-1252 characters. Those code points often appear
    when CP1252 text was decoded as Latin-1; fonts like Arial have no glyphs for
    the raw C1 controls.
    """
    out: list[str] = []
    for c in s:
        o = ord(c)
        if 0x80 <= o <= 0x9F:
            out.append(bytes([o]).decode("cp1252", errors="replace"))
        else:
            out.append(c)
    return "".join(out)


def _excel_answer_code(val) -> float:
    """Map bpb Excel position text to -1 / 0 / 1; NaN if unknown."""
    if pd.isna(val):
        return float("nan")
    k = str(val).strip().casefold()
    if k == "stimme zu":
        return 1.0
    if k == "stimme nicht zu":
        return -1.0
    if k == "neutral":
        return 0.0
    return float("nan")


def parse_module_js(module_content: str) -> tuple[DataFrame, DataFrame]:
    """
    Parse module_definition.js into question_df (title, question) and pivoted
    answers (index = thesis index 0..n-1, columns = party abbrev).
    Duplicate (thesis, party) rows keep the first (no averaging).
    """
    raw_data_js: str = module_content
    titles: list = re.findall(
        r"^WOMT_aThesen\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$",
        raw_data_js,
        re.MULTILINE,
    )
    questions: list = re.findall(
        r"^WOMT_aThesen\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$",
        raw_data_js,
        re.MULTILINE,
    )
    party_names: list = re.findall(
        r"^WOMT_aParteien\[\d+\]\[\d+\]\[0] ?= ?\'(.+?)\';$",
        raw_data_js,
        re.MULTILINE,
    )
    party_abbrevs: list = re.findall(
        r"^WOMT_aParteien\[\d+\]\[\d+\]\[1] ?= ?\'(.+?)\';$",
        raw_data_js,
        re.MULTILINE,
    )
    raw_answers: list = re.findall(
        r"^WOMT_aThesenParteien\[(\d+)\]\[(\d+)\] ?= ?\'(.+?)\';$",
        raw_data_js,
        re.MULTILINE,
    )

    titles = [_fix_cp1252_c1_glyphs(t) for t in titles]
    questions = [_fix_cp1252_c1_glyphs(q) for q in questions]
    party_names = [_fix_cp1252_c1_glyphs(n) for n in party_names]
    party_abbrevs = [_fix_cp1252_c1_glyphs(a) for a in party_abbrevs]

    question_df: DataFrame = pd.DataFrame(
        zip(titles, questions), columns=["title", "question"]
    )
    party_df: DataFrame = pd.DataFrame(
        zip(party_names, party_abbrevs), columns=["full_name", "party"]
    )
    answer_df: DataFrame = pd.DataFrame(
        raw_answers, columns=["question", "party", "answer"]
    ).astype("int")

    zero_std = answer_df.groupby("party")["answer"].std() == 0
    bad_party_ids = list(zero_std[zero_std].index)
    if bad_party_ids:
        answer_df = answer_df.loc[~answer_df["party"].isin(bad_party_ids)]

    answer_df = answer_df.copy()
    answer_df["party_name"] = answer_df["party"].apply(
        lambda x: party_df.loc[x, "party"]
    )
    # Duplicate (question, party) rows (e.g. multi-language blocks) would be
    # averaged by pivot_table's default aggfunc="mean", producing non-integer codes.
    answer_df = answer_df.drop_duplicates(
        subset=["question", "party"], keep="first"
    )
    answer_pivot = pd.pivot_table(
        answer_df,
        values="answer",
        index="question",
        columns="party_name",
        aggfunc="first",
    )
    _validate_js_answer_pivot(answer_pivot)
    return question_df, answer_pivot


def _validate_js_answer_pivot(answer_pivot: DataFrame) -> None:
    """Ensure no fractional / non-trinary codes after JS pivot (defensive)."""
    arr = answer_pivot.to_numpy(dtype=float)
    fin = arr[np.isfinite(arr)]
    if fin.size == 0:
        return
    allowed = np.array([-1.0, 0.0, 1.0])
    if not np.all(np.isin(fin, allowed)):
        bad = sorted({float(x) for x in fin if float(x) not in (-1.0, 0.0, 1.0)})
        raise ValueError(
            "parse_module_js produced non-trinary answers in pivot "
            f"(expected -1, 0, 1): {bad[:8]}"
        )


def parse_excel_election(df: DataFrame) -> tuple[DataFrame, DataFrame]:
    """
    One sheet from the bpb Wahl-O-Mat-Datensätze workbook (long / tidy rows).
    Returns the same shapes as parse_module_js.
    """
    missing = [c for c in EXCEL_REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(f"Excel sheet missing columns: {missing}")

    work = cast(
        DataFrame,
        df.loc[:, list(EXCEL_REQUIRED_COLUMNS)].copy(),
    )
    work.columns = [
        "abbr",
        "pname",
        "tnr",
        "ttitle",
        "ttext",
        "pos",
    ]
    # Older sheets: Position: Position = stimme zu / neutral / …; These: Titel + These: These = thesis.
    # Newer sheets (e.g. BW26): These: Titel = answer label; Position: Position = full thesis text;
    # These: These = short keyword (same for all parties per thesis).
    n_ans_pos = work["pos"].map(_excel_answer_code).notna().sum()
    n_ans_tit = work["ttitle"].map(_excel_answer_code).notna().sum()
    excel_answers_in_thesis_titel = n_ans_tit > n_ans_pos
    if excel_answers_in_thesis_titel:
        work["answer"] = work["ttitle"].map(lambda v: _excel_answer_code(v))
        q_title_key, q_text_key = "ttext", "pos"
    else:
        work["answer"] = work["pos"].map(lambda v: _excel_answer_code(v))
        q_title_key, q_text_key = "ttitle", "ttext"

    work = work.dropna(subset=["answer"])  # type: ignore[arg-type]
    work["answer"] = work["answer"].astype(int)

    work["tnr"] = pd.to_numeric(work["tnr"], errors="coerce")
    work = work.dropna(subset=["tnr"])
    work["tnr"] = work["tnr"].astype(int)
    work = work.drop_duplicates(subset=["tnr", "abbr"], keep="last")

    for col in ("ttitle", "ttext", "pos", "pname", "abbr"):
        work[col] = work[col].astype(str).map(_fix_cp1252_c1_glyphs)

    these_order = sorted(work["tnr"].unique())
    tnr_to_q = {t: i for i, t in enumerate(these_order)}
    work["question"] = work["tnr"].map(lambda v: tnr_to_q[int(v)])

    question_rows = []
    for t in these_order:
        row = work.loc[work["tnr"] == t].iloc[0]
        question_rows.append((row[q_title_key], row[q_text_key]))
    question_df = pd.DataFrame(question_rows, columns=["title", "question"])

    abbrevs = sorted(work["abbr"].unique())
    party_df = pd.DataFrame(
        {
            "full_name": [
                work.loc[work["abbr"] == a, "pname"].iloc[0] for a in abbrevs
            ],
            "party": abbrevs,
        }
    )
    abbrev_to_pid = {a: i for i, a in enumerate(abbrevs)}
    work["party"] = work["abbr"].map(lambda v: abbrev_to_pid[v])

    answer_long = work.loc[:, ["question", "party", "answer"]].copy()
    std_by_party = answer_long.groupby("party")["answer"].std()
    bad_pids = list(std_by_party[std_by_party == 0].index)
    if bad_pids:
        answer_long = answer_long.loc[~answer_long["party"].isin(bad_pids)]

    answer_long = answer_long.copy()
    answer_long["party_name"] = answer_long["party"].apply(
        lambda x: party_df.loc[x, "party"]
    )
    answer_pivot = pd.pivot_table(
        answer_long, values="answer", index="question", columns="party_name"
    )
    return question_df, answer_pivot


def excel_sheet_has_data_columns(df_columns) -> bool:
    colset = set(pd.Index(df_columns).astype(str))
    return set(EXCEL_REQUIRED_COLUMNS) <= colset


def _bpb_xlsx_candidates_under(root: pathlib.Path) -> list[pathlib.Path]:
    matches = sorted(
        set(root.glob("**/*Wahl-O-Mat*.xlsx"))
        | set(root.glob("**/*Wahl-o-mat*.xlsx")),
        key=lambda p: p.name,
        reverse=True,
    )
    if not matches:
        alt = list(root.glob("**/*Datens*.xlsx"))
        matches = sorted(
            (p for p in alt if "wahl" in p.name.casefold()),
            key=lambda p: p.name,
            reverse=True,
        )
    return matches


def _path_mtime_or_zero(p: pathlib.Path) -> float:
    try:
        return float(p.stat().st_mtime)
    except OSError:
        return 0.0


def discover_bpb_excel_path(*roots: pathlib.Path) -> pathlib.Path | None:
    """
    Pick one matching workbook under the given roots: **newest by file mtime**,
    then tie-break by **filename** descending (lexicographic), same as the old
    basename-only ordering when mtimes tie.

    Pass e.g. ``Path("data")`` and ``Path(".")`` (repo root) so a workbook
    placed next to the project root is still found after ``chdir("data")``.
    """
    if not roots:
        roots = (pathlib.Path("."),)
    pooled: list[pathlib.Path] = []
    for root in roots:
        try:
            r = root.resolve()
        except OSError:
            r = root
        if not r.exists():
            continue
        pooled.extend(_bpb_xlsx_candidates_under(r))
    if not pooled:
        return None
    pooled = sorted(
        set(pooled),
        key=lambda p: (_path_mtime_or_zero(p), p.name),
        reverse=True,
    )
    return pooled[0]


def _print_saved_graph_png(filename: str) -> None:
    print(f"Saved: {pathlib.Path(filename).resolve()}")


def run_analysis(
    question_df: DataFrame,
    answer_df: DataFrame,
    module_stem_folder: str,
    *,
    graphs: frozenset[str] | None = None,
) -> None:
    """
    Correlation / PCA / KMeans plots. answer_df is pivoted (question x party).
    graphs: which PNGs to write; None means all of GRAPH_KINDS_ALL.
    """
    want = GRAPH_KINDS_ALL if graphs is None else frozenset(graphs)
    if not want:
        raise ValueError("run_analysis: graphs must not be empty")
    unknown = want - GRAPH_KINDS_ALL
    if unknown:
        raise ValueError(f"Unknown graph kind(s): {sorted(unknown)}")

    if answer_df.shape[1] < 1:
        raise ValueError("run_analysis needs at least one party column")

    need_cm = "c_matrix" in want
    need_pca_map = "pca_map" in want
    need_infl = "pca_influences" in want
    need_pca = need_pca_map or need_infl
    in_graphs = False

    def _ensure_graphs_dir() -> None:
        nonlocal in_graphs
        if not in_graphs:
            os.chdir("../graphs")
            in_graphs = True

    def _leave_graphs_if_needed() -> None:
        nonlocal in_graphs
        if in_graphs:
            os.chdir("../data")
            in_graphs = False

    if need_cm:
        answer_corr = answer_df.corr()
        answer_corr = answer_corr.fillna(0.0)
        ac = answer_corr.to_numpy(dtype=float, copy=True)
        np.fill_diagonal(ac, 1.0)
        answer_corr = pd.DataFrame(
            ac, index=answer_corr.index, columns=answer_corr.columns
        )

        def _corr_overlay_cell(x: Any) -> str:
            v = float(x)
            if not np.isfinite(v):
                return ""
            if v == 1.0:
                return ""
            return str(int(100 * v))

        corr_overlay = answer_corr.apply(
            lambda s: pd.Series([_corr_overlay_cell(v) for v in s])
        )

        do_cluster = answer_corr.shape[0] > 1
        c_matrix: sns.matrix.ClusterGrid = sns.clustermap(
            data=answer_corr,
            cmap="RdYlGn",
            center=0,
            cbar_pos=None,
            annot=corr_overlay,
            fmt="",
            annot_kws={"fontsize": 8},
            linewidths=0.8,
            figsize=(12, 12),
            row_cluster=do_cluster,
            col_cluster=do_cluster,
        )
        ax_cd = getattr(c_matrix, "ax_col_dendrogram", None)
        if ax_cd is not None:
            try:
                c_matrix.figure.delaxes(ax_cd)
            except (AttributeError, ValueError):
                pass
        c_matrix.ax_heatmap.set(xlabel=None, ylabel=None)
        c_matrix.ax_row_dendrogram.set(title="Cluster-Hierarchie")
        c_matrix.figure.suptitle("Übereinstimmungen der Parteien (in %)", y=0.86)
        labels_row: list = c_matrix.ax_heatmap.get_yticklabels()
        labels_col: list = c_matrix.ax_heatmap.get_xticklabels()
        for party_label in labels_row:
            if party_label.get_text().casefold() in EMPHASIZED_PARTIES:
                party_label.set_color("darkblue")
                party_label.set_fontweight("bold")
                pos_x, pos_y = party_label.get_position()
                c_matrix.ax_heatmap.add_patch(
                    Rectangle(
                        xy=(pos_x - 1.0, pos_y - 0.5),
                        width=len(labels_col),
                        height=1,
                        fill=False,
                        edgecolor="black",
                        lw=2,
                        clip_on=False,
                    )
                )
        for party_label in labels_col:
            if party_label.get_text().casefold() in EMPHASIZED_PARTIES:
                party_label.set_color("darkblue")
                party_label.set_fontweight("bold")
                pos_x, pos_y = party_label.get_position()
                c_matrix.ax_heatmap.add_patch(
                    Rectangle(
                        xy=(pos_x - 0.5, pos_y),
                        width=1,
                        height=len(labels_row),
                        fill=False,
                        edgecolor="black",
                        lw=2,
                        clip_on=False,
                    )
                )
        _ensure_graphs_dir()
        cm_name = f"{module_stem_folder}_c_matrix.png"
        c_matrix.figure.savefig(cm_name, bbox_inches="tight")
        _print_saved_graph_png(cm_name)
        plt.close(c_matrix.figure)

    party_pca: DataFrame | None = None
    pca_xvr = 0.0
    pca_yvr = 0.0
    pca_influences: DataFrame | None = None

    if need_pca:
        n_parties = answer_df.shape[1]
        n_questions = answer_df.shape[0]

        if n_parties < 2:
            party_pca = pd.DataFrame(
                {"pca_x": np.zeros(n_parties), "pca_y": np.zeros(n_parties)},
                index=answer_df.columns,
            )
            party_pca["cluster"] = 0
            pca_xvr = 0.0
            pca_yvr = 0.0
            comps = np.zeros((n_questions, 2))
        else:
            n_pca = int(min(2, n_parties, n_questions))
            X = answer_df.T.to_numpy(dtype=float)
            pca: PCA = PCA(n_components=n_pca)
            Xt = pca.fit_transform(X)
            evr = pca.explained_variance_ratio_
            pca_xvr = float(evr[0])
            pca_yvr = float(evr[1]) if len(evr) > 1 else 0.0

            if n_pca == 1:
                party_pca = pd.DataFrame(
                    {"pca_x": Xt.ravel(), "pca_y": 0.0},
                    index=answer_df.columns,
                )
            else:
                party_pca = pd.DataFrame(
                    Xt,
                    columns=["pca_x", "pca_y"],
                    index=answer_df.columns,
                )

            n_clusters = min(N_CLUSTERS, max(1, n_parties))
            km: KMeans = KMeans(n_clusters, random_state=0)
            party_pca["cluster"] = km.fit_predict(
                party_pca.loc[:, ["pca_x", "pca_y"]].to_numpy(dtype=float)
            )

            comps = pca.components_.T
            if comps.shape[1] == 1:
                comps = np.column_stack([comps, np.zeros(comps.shape[0])])

        pca_influences = question_df.join(
            pd.DataFrame(comps, columns=["pca_x", "pca_y"], index=question_df.index)
        ).join(answer_df.sum(axis="columns").rename("answers_sum"))

    if need_pca_map:
        assert party_pca is not None
        _ensure_graphs_dir()
        plt.figure(figsize=(10, 10))
        pca_map = sns.scatterplot(
            data=party_pca,
            x="pca_x",
            y="pca_y",
            hue="cluster",
            palette="bright",
            legend="full",
        )
        pca_map.set(
            title="Hauptkomponentenanalyse (PCA) der Parteien",
            xlabel=f"Komponente X (PC1)\n{round(pca_xvr * 100)}% Varianzanteil",
            ylabel=f"Komponente Y (PC2)\n{round(pca_yvr * 100)}% Varianzanteil",
            xticklabels=[],
            yticklabels=[],
        )
        pca_map.legend(
            title="Clusters",
            handles=pca_map.get_legend_handles_labels()[0],
            labels=[""] * party_pca["cluster"].nunique(),
            facecolor="white",
            markerscale=1.5,
            ncol=2,
            handletextpad=0,
            columnspacing=0.2,
            shadow=True,
            borderaxespad=1,
        )
        pca_map.set_xticks([0])
        pca_map.set_yticks([0])
        pca_map.xaxis.set_minor_locator(ticker.AutoLocator())
        pca_map.yaxis.set_minor_locator(ticker.AutoLocator())
        pca_map.grid(True, which="major", linewidth=1.2)
        pca_map.grid(True, which="minor", linewidth=0.3)
        for party_name in party_pca.index:
            color: str = "black"
            fontweight: str = "normal"
            if party_name.casefold() in EMPHASIZED_PARTIES:
                color = "darkblue"
                fontweight = "bold"
            pca_map.text(
                x=party_pca.loc[party_name, "pca_x"] + 0.05,
                y=party_pca.loc[party_name, "pca_y"] + 0.05,
                s=party_name,
                color=color,
                fontweight=fontweight,
                fontsize="small",
            )
        pm_name = f"{module_stem_folder}_pca_map.png"
        plt.savefig(pm_name, bbox_inches="tight")
        _print_saved_graph_png(pm_name)
        plt.close()

    if need_infl:
        assert pca_influences is not None
        _ensure_graphs_dir()
        infl_prep = pca_influences.copy()
        denom = float(np.nanmax(infl_prep["answers_sum"].abs().to_numpy()))
        numer = float(np.nanmax(infl_prep[["pca_x", "pca_y"]].abs().to_numpy()))
        if math.isfinite(denom) and math.isfinite(numer) and denom != 0.0:
            infl_prep["answers_sum"] *= numer / denom
        infl_prep = infl_prep.melt(
            id_vars=["title"],
            value_vars=["pca_x", "pca_y", "answers_sum"],
            var_name="component",
            value_name="influence",
        )
        plt.figure(figsize=(5, 18))
        inf_barplot = sns.barplot(
            data=infl_prep,
            x="influence",
            y="title",
            hue="component",
            orient="h",
        )
        inf_barplot.set(
            xlabel=r"$\longleftarrow -$ /  Nein "
            + r"$\qquad\qquad\qquad\qquad +$"
            + r" /  Ja$\longrightarrow\qquad$",
            ylabel=None,
            xticklabels=[],
        )
        inf_barplot.legend(
            title=None,
            handles=inf_barplot.get_legend_handles_labels()[0],
            labels=[
                "Komponente X (PC1)",
                "Komponente Y (PC2)",
                "Antworten aller Parteien kumuliert",
            ],
            loc="lower center",
            bbox_to_anchor=(0.5, 1.02),
            facecolor="white",
            shadow=True,
        )
        inf_barplot.set_yticks(
            [x - 0.5 for x in inf_barplot.get_yticks()], minor=True
        )
        inf_barplot.grid(False, axis="x")
        inf_barplot.grid(True, which="minor", axis="y", linewidth=1)
        inf_barplot.xaxis.set_label_position("top")
        plt.suptitle("Einfluss der Fragen", y=0.95)
        infl_name = f"{module_stem_folder}_pca_influences.png"
        plt.savefig(infl_name, bbox_inches="tight")
        _print_saved_graph_png(infl_name)
        plt.close()

    _leave_graphs_if_needed()


def analysis(module_content: str, module_stem_folder: str) -> None:
    """Analyse from legacy module_definition.js text."""
    run_analysis(*parse_module_js(module_content), module_stem_folder)


def analysis_from_excel(df: DataFrame, module_stem_folder: str) -> None:
    """Analyse from one bpb Excel data sheet."""
    run_analysis(*parse_excel_election(df), module_stem_folder)


def election_to_long_rows(
    question_df: DataFrame,
    answer_pivot: DataFrame,
    election_id: str,
) -> DataFrame:
    """Stack pivot + metadata for CSV export (one row per thesis/party)."""
    meta = question_df.copy()
    meta["these_index"] = range(len(meta))
    long = answer_pivot.reset_index().melt(
        id_vars="question", var_name="party", value_name="answer"
    )
    long = long.merge(
        meta.rename(columns={"question": "these_text"}),
        left_on="question",
        right_on="these_index",
        how="left",
    ).drop(columns=["these_index"])
    long.insert(0, "election_id", election_id)
    return long


def long_rows_to_run_analysis(long_df: DataFrame) -> tuple[DataFrame, DataFrame]:
    """
    Rebuild (question_df, answer_pivot) from one election's rows as produced by
    election_to_long_rows / all_wahlomat_answers.csv.
    """
    required = {"question", "party", "answer", "title", "these_text"}
    missing = required - set(long_df.columns)
    if missing:
        raise ValueError(f"long_df missing columns: {sorted(missing)}")
    work = long_df.copy()
    work["answer"] = pd.to_numeric(work["answer"], errors="coerce")
    work = work.dropna(subset=["answer"])
    work["answer"] = work["answer"].astype(int)
    work = work.drop_duplicates(subset=["question", "party"], keep="last")
    work["_q"] = pd.to_numeric(work["question"], errors="coerce")
    if work["_q"].isna().sum() > 0:
        raise ValueError("long_df 'question' must be numeric thesis indices")
    work["_q"] = work["_q"].astype(int)
    q_order = sorted(work["_q"].unique())
    rows: list[tuple[str, str]] = []
    for qi in q_order:
        sub = work.loc[work["_q"] == qi]
        rows.append((str(sub.iloc[0]["title"]), str(sub.iloc[0]["these_text"])))
    question_df = pd.DataFrame(rows, columns=["title", "question"])
    party_order = work.loc[work["_q"] == q_order[0]]["party"].astype(str).tolist()
    answer_pivot = work.pivot(index="_q", columns="party", values="answer")
    answer_pivot = answer_pivot.reindex(index=q_order)
    answer_pivot.index.name = "question"
    answer_pivot = answer_pivot.reindex(columns=party_order)
    answer_pivot.columns.name = "party_name"
    return question_df, answer_pivot
