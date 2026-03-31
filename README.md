# wahlomat-extended-analysis

This repo analyzes questionnaires from [wahl-o-mat.de](https://www.wahl-o-mat.de) (Bundeszentrale für politische Bildung / bpb). It builds, per election, a **correlation matrix** and a **PCA “party map”** (plus **PCA question influences**), with cluster markings.

It is an extension of the analysis by Reddit user [/u/microraptor](https://www.reddit.com/user/microraptor/) (see [microraptor/wahlomat_analysis](https://github.com/microraptor/wahlomat_analysis)), inspired by [/u/d_loose](https://www.reddit.com/user/d_loose/) and [/u/askLubich](https://www.reddit.com/user/askLubich/) (see [askLubich/Wahl-O-Mat-EU-2019](https://github.com/askLubich/Wahl-O-Mat-EU-2019)). Unlike many single-election notebooks (e.g. [uioreanu/german-elections](https://github.com/uioreanu/german-elections)), this project can process **many elections at once** via a shared CSV.

## Data sources

- **JS exports**: classic `module_definition.js` exports under `data/`
- **bpb Excel bundle**: “Wahl-O-Mat-Datensätze” workbook

## Quickstart (first-time users)

From the repository root:

1. Install dependencies:

```bash
python -m pip install -r requirements.txt
```

1. Download the current bpb “Datensätze” bundle and update the CSV from the workbook (fast path for “new sheets/parties”):

```bash
python wahlomat.py refresh-excel
```

1. List elections (`election_id`) and build graphs for one of them:

```bash
python wahlomat.py graphs --list-elections
python wahlomat.py graphs --election BT21_v1.02 --graph pca_map
```

If you want to (re)build the full CSV from **all extracted JS modules + Excel sheets**, run:

```bash
python wahlomat.py build-csv
```

## What you get (outputs)

- **`graphs/`**: PNGs per election (correlation clustermap, PCA party map, PCA question influences). The CLI prints `Saved: <absolute path>` after writing each file.
- **`all_wahlomat_answers.csv`** (repo root): long table of answers used to generate graphs.
- **`election_metadata.csv`** (repo root): one row per `election_id` with display names + year + level.
- **`data/`**: extracted Wahl-O-Mat datasets (JS exports) and/or extracted Datensätze bundle contents.

## Using the CSV for your own analysis

If you want to work directly with the generated CSV files (beyond the built-in graphs), see the analysis guides:

- **English**: [`ANALYSIS_GUIDE_EN.md`](ANALYSIS_GUIDE_EN.md)
- **Deutsch**: [`ANALYSIS_GUIDE_DE.md`](ANALYSIS_GUIDE_DE.md)

They explain the dataset structure, how to join `all_wahlomat_answers.csv` with `election_metadata.csv`, which questions the data can and cannot answer, and recommended analysis approaches.

## Usage (recommended entry point)

`wahlomat.py` is the recommended entry point (all commands are run from the repository root):

- `python wahlomat.py download` — same as `get_zip_files.py` (see “Download options” below)
- `python wahlomat.py refresh-excel` — Datensätze-only download, then `update-csv -y --prune-superseded-excel` by default
- `python wahlomat.py build-csv` — same as `build_dataframe.py`
- `python wahlomat.py update-csv` — same as `update_excel_csv.py` (see details below; use `update-csv -h`)
- `python wahlomat.py graphs ...` — same as `build_graphs_from_csv.py` (use `python wahlomat.py graphs -h`)
- `python wahlomat.py run-all` — download → build-csv → graphs with defaults (stops on first non-zero exit)

The individual scripts remain supported.

## Common workflows

### “I just want graphs for one election”

```bash
python wahlomat.py refresh-excel
python wahlomat.py graphs --list-elections
python wahlomat.py graphs --election <ID_FROM_LIST>
```

### “I pulled fresh data and want a clean rebuild”

```bash
python wahlomat.py download
python wahlomat.py build-csv
python wahlomat.py graphs
```

### Updating only from the Excel workbook

Use this when **only** the bpb workbook changed (new sheets, new parties, updated positions).

`python wahlomat.py update-csv` compares each qualifying workbook sheet to the current `all_wahlomat_answers.csv` by `election_id` (sheet name with spaces → underscores). New ids or changed row counts trigger a replace for those elections only; JS-sourced elections are left unchanged; removed sheets do not delete CSV rows.

Change detection: `update-csv` treats a sheet as unchanged only if its **content matches** the existing CSV block (not just the row count). If bpb edits answers or wording without changing the row count, `update-csv` will still replace that `election_id` block.

## Download options

`python wahlomat.py download` / `python get_zip_files.py` downloads Wahl-O-Mat ZIPs listed on the bpb “weitere Wahlen” page, unpacks them into `data/`, and also resolves the current bundled Datensätze ZIP from the bpb Datensätze page (the exact file URL is read from the page HTML, not hardcoded). Creates `graphs/` if missing. Full `download` extracts **only** the ZIPs fetched in that invocation and does not scan `data/` for other `.zip` files.

### Datensätze only

- `python get_zip_files.py --datensaetze-only` (or `python wahlomat.py download --datensaetze-only`) downloads only that Datensätze bundle, extracts into `data/<zip-stem>/`, and does not fetch election ZIPs or scan other ZIPs in `data/` for extraction.

### Selective election ZIPs

- `--list-election-zips` prints `local_stem`, metadata slug (from `build_metadata.py` `election_slug_from_zip_href`), and URL for each ZIP on the weitere-Wahlen page (no download).
- `--election-zip TOKEN` (repeatable) downloads and extracts only archives where TOKEN matches (case-insensitive substring) the URL, `local_stem`, or that slug; only those ZIPs are extracted (other `.zip` files already in `data/` are left alone).
- Add `--with-datensaetze` to include the Datensätze bundle in the same run.
- `--datensaetze-only` cannot be combined with these flags.

### Workbook line

After a full download, `--datensaetze-only`, or a selective download that included `--with-datensaetze`, the script prints `Datensätze workbook OK` with the path to the `.xlsx` if `discover_bpb_excel_path` finds one under `data/` or the repository root; otherwise a WARNING. Selective `--election-zip` only (no bundle in that run) skips this check.

## Troubleshooting (first-time pain points)

- **No `.xlsx` found / wrong `.xlsx` picked**: discovery checks `data/` and the repository root. If several matching `.xlsx` exist, `discover_bpb_excel_path` chooses the newest by filesystem mtime, then breaks ties by filename descending. Rename or move stale copies (e.g. `*.xlsx.old`) if the wrong file wins.
- **No network / firewall**: metadata generation fetches the bpb archive page by default. Use `WAHLOMAT_ARCHIVE_HTML=/path/to/saved.html` before `build-csv`, or run `python build_metadata.py --archive-html PATH` after building the answers CSV.
- **`update-csv` didn’t detect edits**: `update-csv` compares **sheet content** to the existing CSV block. If you still see no changes, verify you’re reading the intended workbook (see `.xlsx` discovery rules above) and that the sheet/tab corresponds to the `election_id` you expect.

## Analysis steps (detailed reference)

1. **`get_zip_files.py`** (run from the **repository root**)  
   Downloads Wahl-O-Mat ZIPs listed on the bpb “weitere Wahlen” page, unpacks them into **`data/`**, and also resolves the current **bundled Datensätze** ZIP from the [Datensätze article](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/) (the exact file URL is read from the page HTML, not hardcoded). Creates **`graphs/`** if missing.  
   **`python get_zip_files.py --datensaetze-only`** (or **`python wahlomat.py download --datensaetze-only`**) downloads **only** that Datensätze bundle, extracts **that** ZIP into **`data/<zip-stem>/`**, and does **not** fetch election ZIPs or scan other ZIPs in **`data/`** for extraction.  
   **Selective election ZIPs:** **`--list-election-zips`** prints **`local_stem`**, metadata **slug** (from [build_metadata.py](build_metadata.py) `election_slug_from_zip_href`), and **URL** for each ZIP on the weitere-Wahlen page (no download). **`--election-zip TOKEN`** (repeatable) downloads and extracts **only** archives where **TOKEN** matches (case-insensitive substring) the URL, **`local_stem`**, or that slug; only those ZIPs are extracted (other **`.zip`** files already in **`data/`** are left alone). Add **`--with-datensaetze`** to include the Datensätze bundle in the same run. **`--datensaetze-only`** cannot be combined with these flags.  
   **Workbook line:** After a **full** download, **`--datensaetze-only`**, or **selective download that included `--with-datensaetze`**, the script prints **`Datensätze workbook OK`** with the path to the `.xlsx` if **`discover_bpb_excel_path`** finds one under **`data/`** or the **repository root**; otherwise a **WARNING**. Selective **`--election-zip` only** (no bundle in that run) **skips** this check so an older `.xlsx` already in **`data/`** is not reported as if this fetch had added it.

2. **`build_dataframe.py`** (run from the **repository root**)  
   Parses all JS modules under **`data/`** (optionally skipping folder names listed as **`OMIT_FROM_BUILD_DATAFRAME`** in [skipped_elections.py](skipped_elections.py); currently empty), then reads every qualifying sheet from the bpb Excel workbook if found (**`data/`** or repo root). Writes **`all_wahlomat_answers.csv`** and **`election_metadata.csv`** at the repo root ([build_metadata.py](build_metadata.py); see [CSV structure and known caveats](#csv-structure-and-known-caveats)).  
   **JS vs Excel overlap:** [election_id_policy.py](election_id_policy.py) lists folders whose JS export is **not** ingested when the same election appears in the workbook under the mapped **versioned sheet id** (e.g. skip JS `bundestagswahl2021` when Excel has `BT21_v1.02`). The resolved workbook path is printed when Excel is read — use a current Datensätze bundle if you expect sheets such as **`BW26_v1.01`** / **`RP26_v1.00`** in the CSV.  
   **JS answers:** [analysis.py](analysis.py) `parse_module_js` deduplicates `(thesis, party)` before pivoting and uses **`aggfunc="first"`** so multi-language duplicates are not averaged into fractional codes.

3. **`update_excel_csv.py`** / **`python wahlomat.py update-csv`** (repository root) — **recommended when only the bpb Excel workbook changed** (e.g. new sheets or extra parties on existing sheets). Compares each qualifying workbook sheet to the current **`all_wahlomat_answers.csv`** by **`election_id`** (sheet name with spaces → underscores): **new** ids or **changed** row counts trigger a replace for those elections only; rows for elections not in the workbook (including all JS-sourced **`election_id`s**) are left unchanged; removed sheets do not delete CSV rows. **`election_metadata.csv`** is regenerated in the **same run** when the answers CSV is written ([build_metadata.py](build_metadata.py)). If **`update-csv`** errors **after** **`Wrote … rows`** (metadata build failed), the CSV is already updated—run **`python build_metadata.py`** (and **`--answers`** if you use a non-default path). **`--prune-superseded-excel`** drops older **versioned** bpb `election_id`s left in the CSV when the workbook has another tab with the same land+year prefix (e.g. remove `BW26_v1.01` / `RP26_v1.00` when `BW26_v1.02` / `RP26_v1.01` are sheets), so **`election_metadata.csv`** matches current workbook tabs. Without pruning, superseded ids stay in both files until a full **`build-csv`**. **`build_metadata`** can still attach display rows for orphaned versioned ids if they remain in the answers CSV. Flags: **`--dry-run`** (print summary, exit), **`-y` / `--yes`** (apply without prompt; default asks **`Proceed? [y/N]`**). Non-interactive terminals must use **`--dry-run`** or **`--yes`**. Detection uses row-count equality only (same count but edited cells is not detected).

   **`python wahlomat.py refresh-excel`** runs **`download --datensaetze-only`** and then **`update-csv`** with **`-y`** and **`--prune-superseded-excel`** by default (use **`refresh-excel --no-prune`** to skip pruning). Optional **`--answers`** matches **`update-csv`**. There is no combined dry-run on this subcommand: preview with **`download --datensaetze-only`** then **`update-csv --dry-run`**. \n+\n+   **Persisted state:** `refresh-excel` stores a small state record under **`data/.wahlomat_refresh_state.json`** containing the resolved bundle URL/filename, best-effort **Stand date** (from the bpb link label), and a **SHA-256** of the downloaded ZIP. On subsequent runs it prints whether the bundle is **unchanged/changed since last run** using the hash as the truth (the Stand date is a human label; if it stays the same but the hash changes, a warning is printed).\n+\n+   If the download succeeds but **this run** writes nothing to the answers CSV or metadata, **`refresh-excel`** still prints a short **no updates needed** line (that refers to the current invocation, not necessarily “since last time”).

4. **`build_graphs_from_csv.py`** (run from the **repository root**)  
   Reads **`all_wahlomat_answers.csv`**, rebuilds each election’s matrices, and writes PNGs to **`graphs/`** (correlation clustermap, PCA party map, PCA question influences). After each file, the CLI prints **`Saved: <absolute path>`**.  
   - **List valid `election_id` values** (and row counts): `python build_graphs_from_csv.py --list-elections` (or `python wahlomat.py graphs --list-elections`; optional `--csv` path). Output uses **aligned columns** for readability.  
   - **All elections:** `python build_graphs_from_csv.py`  
   - **Subset:** `python build_graphs_from_csv.py --election bundestagswahl2021 --election berlin2021` or comma-separated `--election a,b`  
   - **Plot types:** **`--graph`** (repeatable): `c_matrix`, `pca_map`, `pca_influences` — default is all three. Example (one election, PCA map only): `python wahlomat.py graphs --election BT21_v1.02 --graph pca_map`  
   - **Environment:** `ELECTION_IDS=bundestagswahl2021,berlin2021 python build_graphs_from_csv.py` (CLI wins if both are set)  
   - **`--list-elections`** cannot be combined with **`--election`** or **`ELECTION_IDS`**.

### Unified CLI (`wahlomat.py`)

From the repository root you can run the same pipeline with one entry point:

- `python wahlomat.py download` — same as `get_zip_files.py` (**`--datensaetze-only`**, **`--list-election-zips`**, **`--election-zip TOKEN`** / **`--with-datensaetze`**; see step 1)
- `python wahlomat.py refresh-excel` — Datensätze-only download, then **`update-csv -y`** with **`--prune-superseded-excel`** (see step 3; **`refresh-excel -h`**)
- `python wahlomat.py build-csv` — same as `build_dataframe.py`
- `python wahlomat.py update-csv` — same as `update_excel_csv.py` (see step 3; use **`update-csv -h`** for flags)
- `python wahlomat.py graphs …` — same as `build_graphs_from_csv.py` ( **`graphs`** appears in `wahlomat.py -h` for discoverability; everything after **`graphs`** is forwarded unchanged, so **`--election`**, **`--graph`**, **`--list-elections`**, etc. work. Use **`python wahlomat.py graphs -h`** for the full graph CLI.)
- `python wahlomat.py run-all` — runs download, then build-csv, then graphs with default graph options (stops on the first non-zero exit)

The individual scripts above remain supported.

### Legacy JS-only path

**`load_modules.py`** is **deprecated** and exits with instructions unless you set **`WAHLOMAT_LEGACY_LOAD_MODULES=1`**. That legacy mode only reads **`module_definition.js`** files and **does not** include Excel-only elections.

### Excel bundle (bpb)

Prefer placing the consolidated workbook under **`data/`** (e.g. from the Datensätze ZIP). Discovery also checks the **repository root**, so a copy next to the scripts is picked up when **`data/`** has no match.

When several matching **`.xlsx`** files exist under those roots, **`discover_bpb_excel_path`** chooses the **newest by filesystem mtime**, then breaks ties by **filename** descending. Rename or move stale copies (e.g. to **`*.xlsx.old`**) if the wrong file wins.

[analysis.py](analysis.py) expects the standard bpb columns (`Partei: Kurzbezeichnung`, `These: Nr.`, `Position: Position`, etc.) and maps positions **stimme zu / stimme nicht zu / neutral** to **1 / -1 / 0**, consistent with the JS data.

Use of bpb data is subject to their [terms on the Datensätze page](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/).

### CSV structure and known caveats

**`all_wahlomat_answers.csv`** (written by **`build_dataframe.py`** / **`python wahlomat.py build-csv`**) is a long table: one row per thesis index, party, and answer.

| Column | Type | Description |
| ------ | ---- | ----------- |
| `election_id` | string | Stable identifier for one Wahl-O-Mat instance (versioned Excel sheet id or legacy JS folder id). |
| `question` | integer | Zero-based thesis index within that election. |
| `party` | string | Party label as in the source (abbreviation / short name). |
| `answer` | integer | Coded agreement (see below). |
| `title` | string | Short thesis title from the source. |
| `these_text` | string | Full thesis wording from the source. |

**Answer values:** **`1`** = *stimme zu* (agree), **`0`** = *neutral*, **`-1`** = *stimme nicht zu* (disagree). The same mapping is used for bpb Excel positions and legacy JS modules.

**Companion file:** **`election_metadata.csv`** (same build step) has one row per `election_id`, in this column order: **`display_name_de`** (German election wording), **`display_name_en`** (English label), German **`state`** name (or **`Federal`** / **`European`**), four-digit **`year`**, and **`level`** (`federal` | `state` | `european`). JS rows are taken from the bpb [archive / weitere Wahlen](https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/) table; Excel rows use sheet-name prefixes (e.g. `BT` = federal, `EU` = European Parliament). Regenerate with [build_metadata.py](build_metadata.py) if needed.

**Using the metadata:** The **`level`** column is one of **`federal`**, **`state`**, or **`european`**. For state-level elections, **`state`** holds the full German Land name as in standard usage (e.g. Bayern, Schleswig-Holstein, Nordrhein-Westfalen); for Bundestag and European Parliament rows it is **`Federal`** or **`European`** respectively. Join on **`election_id`** to filter the long answers table:

```python
import pandas as pd

answers = pd.read_csv('all_wahlomat_answers.csv')
metadata = pd.read_csv('election_metadata.csv')

# All Schleswig-Holstein elections
sh_ids = metadata[metadata['state'] == 'Schleswig-Holstein']['election_id']
sh = answers[answers['election_id'].isin(sh_ids)]

# All federal elections
federal = answers[answers['election_id'].isin(
    metadata[metadata['level'] == 'federal']['election_id']
)]
```

**Offline metadata build:** If the archive page cannot be fetched (no network, firewall), save that page as HTML and set **`WAHLOMAT_ARCHIVE_HTML=/path/to/saved.html`** before **`build-csv`**, or run **`python build_metadata.py --archive-html PATH`** after building the answers CSV.

### Caveats for analysts

- **Questions are not comparable across elections.** Each election has its own questionnaire (often on the order of 38 theses; older elections may have fewer).
- **Some elections have very few parties** (as few as 2–3), which limits or breaks multivariate analyses (correlation, PCA, etc.).
- **Schleswig-Holstein 2005 and 2017** include multilingual theses (e.g. German, Danish, North Frisian). After deduplication in the JS parser, **`title`** and **`these_text`** keep the **first** language variant encountered per thesis.
- **Folder names `wahlomat_0` and `wahlomat_1`** in the original ZIPs correspond to **`hamburg2011`** and **`berlin2011`** in the CSV (`election_id`); see [election_id_policy.py](election_id_policy.py).
- **Party names are not normalised** across elections; the same grouping may appear under different strings (e.g. `GRÜNE`, `BÜNDNIS 90/DIE GRÜNEN`, `GRÜNE/B 90`).
- **`update-csv`** detects changes even when the row count is unchanged (content comparison). If you need perfect reproducibility/provenance, treat the workbook as the source of truth and prefer a full rebuild (`build-csv`) when in doubt.
- **Sheets removed from the Excel bundle** are not removed from **`all_wahlomat_answers.csv`** by **`update-csv`**; run a full **`build-csv`** if you need the CSV to match the workbook exactly.

### When questionnaires fail

**`run_analysis`** (correlation / PCA / clustering plots) can still hit unusual cases; [analysis.py](analysis.py) now handles single-party PCA, NaN correlations from zero-variance columns, and tiny matrices more defensively. If a specific election under **`data/`** keeps breaking the pipeline, add its top-level folder name to **`OMIT_FROM_BUILD_DATAFRAME`** in [skipped_elections.py](skipped_elections.py) until it is fixed.

**`failed_analysis.py`** (repository root: `python failed_analysis.py`) runs **`parse_module_js`** and then **`run_analysis`** for each slug in **`OMIT_FROM_BUILD_DATAFRAME`** (if any), printing parse/plot outcomes. Debug plots use names like **`debug_<folder>_*.png`** under **`graphs/`**. When the omit list is empty, the script prints a short notice and exits.

## What is the Wahl-O-Mat?

According to [the bpb (German)](https://www.bpb.de/themen/wahl-o-mat/294576/wie-funktioniert-der-wahl-o-mat/):

> The Wahl-O-Mat is a question-and-answer tool that shows which party admitted to an election is closest to one's own political position.

## Explanation of the results

For how to read the plots, see [askLubich's repo](https://github.com/askLubich/Wahl-O-Mat-EU-2019) or the [German Reddit comment](https://www.reddit.com/r/de/comments/bqubdv/wahlomat_analyse_zur_euparlamentswahl_2019_oc/eo7zmaq/).

## Changes

- **`wahlomat.py`**: unified CLI (`download`, `build-csv`, `update-csv`, **`refresh-excel`**, **`graphs`**, `run-all`); **`graphs`** is a normal subcommand delegating to **`build_graphs_from_csv`**.
- **`get_zip_files.py`**: download election ZIPs; append **dynamic** download of the **Wahl-O-Mat-Datensätze** bundle from the bpb Datensätze page; **`--datensaetze-only`**; **`--list-election-zips`** / **`--election-zip`** / **`--with-datensaetze`** for selective weitere-Wahlen downloads (extract only chosen archives); workbook discovery via **`discover_bpb_excel_path(data, repo_root)`**; on Python **3.11+**, bundle extract uses **`ZipFile(..., metadata_encoding="cp437")`** for inner paths.
- **`build_dataframe.py`**: JS + Excel → **`all_wahlomat_answers.csv`** and **`election_metadata.csv`** ([build_metadata.py](build_metadata.py)); **`update_excel_csv.py`** / **`wahlomat.py update-csv`** for incremental Excel-only updates.
- **`bpb_urls.py`**: shared bpb **`WEITERE_WAHLEN_URL`** and HTML fetch headers (used by **`get_zip_files.py`** and **`build_metadata.py`**).
- **`election_id_policy.py`**: JS folders superseded by canonical Excel **`election_id`** when both exist; extend the map when bpb adds overlapping cases.
- **`build_graphs_from_csv.py`**: CSV-first graphs; optional **`--election`** / **`ELECTION_IDS`**; **`--graph`** limits plot types; **`--list-elections`** prints aligned ID/row-count table; **`Saved:`** lines with absolute paths after each PNG.
- **`load_modules.py`**: deprecated; set **`WAHLOMAT_LEGACY_LOAD_MODULES=1`** for the old JS-only loop.
- **`analysis.py`**: **`parse_module_js`**, **`parse_excel_election`**, **`long_rows_to_run_analysis`**, **`run_analysis`**; **`analysis_from_excel`** for a single sheet.
- Dependencies: **`openpyxl`** for reading `.xlsx`; pinned versions in [requirements.txt](requirements.txt) and [pyproject.toml](pyproject.toml).
- **`skipped_elections.py`**: optional **`OMIT_FROM_BUILD_DATAFRAME`** folder names skipped by **`build_dataframe`** (empty by default); **`failed_analysis.py`** diagnoses that list when non-empty.
- **`tests/test_analysis_edges.py`**: **`unittest`** checks for **`parse_module_js`** minimal fixture and **`run_analysis`** edge cases (run with `python -m unittest discover -s tests -p 'test*.py'` from the repo root).
- **`tests/test_discover_bpb_excel.py`**: **`discover_bpb_excel_path`** prefers newer **mtime**, then descending name on ties.
- **`tests/test_get_zip_files_filter.py`**: **`local_stem_from_election_zip_url`** and **`filter_zip_jobs`** (selective download matching).
- **`tests/test_get_zip_files_datensaetze_only.py`**: **`pick_datensaetze_bundle_url`** and **`download_and_extract_datensaetze_bundle`** with mocks (no network).
- **`tests/test_build_graphs_from_csv.py`**: **`--list-elections`** table formatting.
- **Python 3.10+**, pinned dependencies in [requirements.txt](requirements.txt), and [pyproject.toml](pyproject.toml) (`pip install .` also works; a tiny **`wahlomat_extended_analysis`** package exists only so setuptools can build while **`data/`** / **`graphs/`** live at the repo root).

## Roadmap (things to add / change)

This continues the intent of the older **“Things to add/change”** list on [skbormann/wahlomat-extended-analysis](https://github.com/skbormann/wahlomat-extended-analysis) **main**, updated for the CSV-first pipeline. Rows below are a **backlog** (features, behaviour changes, tests, polish) you may tackle before merging or keep for later. **Open** and **Later** items are **not** release blockers for publishing or using the repository—they are optional follow-ups.

| Idea | Status |
| ---- | ------ |
| Select and download **individual** elections (index / menu / by name) | **Done (CLI)** — **`download --list-election-zips`**, **`--election-zip TOKEN`** (repeat), optional **`--with-datensaetze`**. Substring match on URL, **`local_stem`**, or metadata slug; extract **only** matched ZIPs. Interactive menu / numeric index not implemented. |
| Run analysis for an **individual** election | **Mostly done** — After **`build-csv`**, use **`python wahlomat.py graphs --list-elections`** or [build_graphs_from_csv.py](build_graphs_from_csv.py) **`--list-elections`** to list valid **`election_id`** values, then **`--election ID`** (repeat or comma-separated) or **`ELECTION_IDS`**; optional **`--graph`** limits plot types (`c_matrix`, `pca_map`, `pca_influences`). Same flags work via **`python wahlomat.py graphs …`** (passthrough). You must pass the **exact** CSV **`election_id`** (no interactive menu, no selection by display name from **`election_metadata.csv`**). See [Analysis steps (detailed reference)](#analysis-steps-detailed-reference). |
| **Update** **`build_dataframe.py`** when new elections appear | **Open** — Today **`build_dataframe.py`** rebuilds the full **`all_wahlomat_answers.csv`** from all JS modules and Excel sheets every time. For most first-time users this is fine; a future incremental mode would speed up repeated runs by appending/merging only new **`election_id`** values (lower compute, same outputs). |
| Full **`download`**: extract **only ZIPs from this run** | **Done** — Full `download` now extracts only the ZIPs it fetched in the current invocation and does not scan `data/` for other `.zip` files. |
| **`update-csv`**: detect workbook edits when **row count unchanged** | **Done** — `update-csv` now detects same-row-count sheet edits by hashing the canonical long block (including `title` / `these_text`) and replaces the CSV block when content differs; schema mismatches raise a clear error. |
| **Tests** for **`get_zip_files --datensaetze-only`** | **Done** — [`tests/test_get_zip_files_datensaetze_only.py`](tests/test_get_zip_files_datensaetze_only.py): mocked fetch/download and ZIP extract layout under **`data/<stem>/`**; HTML parsing for **`pick_datensaetze_bundle_url`**. |
| **`refresh-excel`**: “unchanged since last run” using **persisted state** | **Done** — `refresh-excel` persists **`data/.wahlomat_refresh_state.json`** with bundle URL/filename, Stand date label, and ZIP SHA-256; prints unchanged/changed since last run based on the hash. |
| **`wahlomat.py`**: register **`graphs`** as a normal subcommand | **Done** — **`graphs`** appears next to other commands in **`wahlomat.py -h`**; **`python wahlomat.py graphs -h`** shows **`build_graphs_from_csv`** options. |

## Dependencies

- **Python 3.10+** (the code uses PEP 604 type hints, e.g. `Path | None`; Python 3.8 is EOL).
- **Last verified:** Python **3.12.8** with the pinned packages below (adjust the README when you re-verify).
- Install: `pip install -r requirements.txt` from the repository root, or `pip install .` for the same pins via [pyproject.toml](pyproject.toml) (the latter installs a minimal **`wahlomat_extended_analysis`** package so the build is unambiguous next to **`data/`** and **`graphs/`**).

[requirements.txt](requirements.txt) pins **matplotlib**, **seaborn**, **numpy**, **pandas**, **scikit-learn**, and **openpyxl** for reproducible installs. After upgrading packages, re-run **`build_dataframe.py`** and **`build_graphs_from_csv.py`** on at least one election before committing new pins.

### Running tests

From the repository root:

```bash
python -m unittest discover -s tests -p "test*.py"
```
