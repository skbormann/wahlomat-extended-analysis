# wahlomat-extended-analysis

This is an extension of the analysis by Reddit user [/u/microraptor](https://www.reddit.com/user/microraptor/) of the questionnaires from [wahl-o-mat.de](https://www.wahl-o-mat.de). See [his repo](https://github.com/microraptor/wahlomat_analysis) for the original approach. That work was inspired by Reddit users [/u/d_loose](https://www.reddit.com/user/d_loose/) and [/u/askLubich](https://www.reddit.com/user/askLubich/).

The analysis script builds a correlation matrix and a PCA map of parties, with clusters marked.

Unlike single-election tutorials (e.g. [microraptor/wahlomat_analysis](https://github.com/microraptor/wahlomat_analysis), [uioreanu/german-elections](https://github.com/uioreanu/german-elections), [askLubich/Wahl-O-Mat-EU-2019](https://github.com/askLubich/Wahl-O-Mat-EU-2019)), this project can process **many elections** at once. Graphs are driven from **`all_wahlomat_answers.csv`** so you can optionally restrict runs to selected `election_id` values (similar to changing one dataset in those projects).

Data sources: classic **`module_definition.js`** exports under **`data/`** and the **bpb Wahl-O-Mat-Datensätze Excel** bundle. Further notes are in [Changes](#changes).

## Analysis steps

1. **`get_zip_files.py`** (run from the **repository root**)  
   Downloads Wahl-O-Mat ZIPs listed on the bpb “weitere Wahlen” page, unpacks them into **`data/`**, and also resolves the current **bundled Datensätze** ZIP from the [Datensätze article](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/) (the exact file URL is read from the page HTML, not hardcoded). Creates **`graphs/`** if missing.  
   After extraction it prints **`Datensätze workbook OK`** with the path to the `.xlsx` if a file matching **`discover_bpb_excel_path`** was found under **`data/`** or the **repository root** (same discovery as **`build_dataframe.py`**); otherwise it prints a **WARNING**.

2. **`build_dataframe.py`** (run from the **repository root**)  
   Parses all JS modules under **`data/`** (optionally skipping folder names listed as **`OMIT_FROM_BUILD_DATAFRAME`** in [skipped_elections.py](skipped_elections.py); currently empty), then reads every qualifying sheet from the bpb Excel workbook if found (**`data/`** or repo root). Writes **`all_wahlomat_answers.csv`** and **`election_metadata.csv`** at the repo root ([build_metadata.py](build_metadata.py); see [CSV structure and known caveats](#csv-structure-and-known-caveats)).  
   **JS vs Excel overlap:** [election_id_policy.py](election_id_policy.py) lists folders whose JS export is **not** ingested when the same election appears in the workbook under the mapped **versioned sheet id** (e.g. skip JS `bundestagswahl2021` when Excel has `BT21_v1.02`). The resolved workbook path is printed when Excel is read — use a current Datensätze bundle if you expect sheets such as **`BW26_v1.01`** / **`RP26_v1.00`** in the CSV.  
   **JS answers:** [analysis.py](analysis.py) `parse_module_js` deduplicates `(thesis, party)` before pivoting and uses **`aggfunc="first"`** so multi-language duplicates are not averaged into fractional codes.

3. **`update_excel_csv.py`** / **`python wahlomat.py update-csv`** (repository root) — **recommended when only the bpb Excel workbook changed** (e.g. new sheets or extra parties on existing sheets). Compares each qualifying workbook sheet to the current **`all_wahlomat_answers.csv`** by **`election_id`** (sheet name with spaces → underscores): **new** ids or **changed** row counts trigger a replace for those elections only; rows for elections not in the workbook (including all JS-sourced **`election_id`s**) are left unchanged; removed sheets do not delete CSV rows. **`election_metadata.csv`** is regenerated in the **same run** when the answers CSV is written ([build_metadata.py](build_metadata.py)). If **`update-csv`** errors **after** **`Wrote … rows`** (metadata build failed), the CSV is already updated—run **`python build_metadata.py`** (and **`--answers`** if you use a non-default path). **`--prune-superseded-excel`** drops older **versioned** bpb `election_id`s left in the CSV when the workbook has another tab with the same land+year prefix (e.g. remove `BW26_v1.01` / `RP26_v1.00` when `BW26_v1.02` / `RP26_v1.01` are sheets), so **`election_metadata.csv`** matches current workbook tabs. Without pruning, superseded ids stay in both files until a full **`build-csv`**. **`build_metadata`** can still attach display rows for orphaned versioned ids if they remain in the answers CSV. Flags: **`--dry-run`** (print summary, exit), **`-y` / `--yes`** (apply without prompt; default asks **`Proceed? [y/N]`**). Non-interactive terminals must use **`--dry-run`** or **`--yes`**. Detection uses row-count equality only (same count but edited cells is not detected).

4. **`build_graphs_from_csv.py`** (run from the **repository root**)  
   Reads **`all_wahlomat_answers.csv`**, rebuilds each election’s matrices, and writes PNGs to **`graphs/`** (same plots as before: correlation / PCA / influences).  
   - **List valid `election_id` values** (and row counts): `python build_graphs_from_csv.py --list-elections` (or `python wahlomat.py graphs --list-elections`; optional `--csv` path)  
   - **All elections:** `python build_graphs_from_csv.py`  
   - **Subset:** `python build_graphs_from_csv.py --election bundestagswahl2021 --election berlin2021` or comma-separated `--election a,b`  
   - **Environment:** `ELECTION_IDS=bundestagswahl2021,berlin2021 python build_graphs_from_csv.py` (CLI wins if both are set)  
   - **`--list-elections`** cannot be combined with **`--election`** or **`ELECTION_IDS`**.

### Unified CLI (`wahlomat.py`)

From the repository root you can run the same pipeline with one entry point:

- `python wahlomat.py download` — same as `get_zip_files.py`
- `python wahlomat.py build-csv` — same as `build_dataframe.py`
- `python wahlomat.py update-csv` — same as `update_excel_csv.py` (see step 3; use **`update-csv -h`** for flags)
- `python wahlomat.py graphs …` — forwards all arguments after `graphs` to `build_graphs_from_csv.py` (e.g. `python wahlomat.py graphs --list-elections`, `python wahlomat.py graphs --election bundestagswahl2021`, or `python wahlomat.py graphs -h` for graph options)
- `python wahlomat.py run-all` — runs download, then build-csv, then graphs with default graph options (stops on the first non-zero exit)

The individual scripts above remain supported.

### Legacy JS-only path

**`load_modules.py`** is **deprecated** and exits with instructions unless you set **`WAHLOMAT_LEGACY_LOAD_MODULES=1`**. That legacy mode only reads **`module_definition.js`** files and **does not** include Excel-only elections.

### Excel bundle (bpb)

Prefer placing the consolidated workbook under **`data/`** (e.g. from the Datensätze ZIP). Discovery also checks the **repository root**, so a copy next to the scripts is picked up when **`data/`** has no match.

[analysis.py](analysis.py) expects the standard bpb columns (`Partei: Kurzbezeichnung`, `These: Nr.`, `Position: Position`, etc.) and maps positions **stimme zu / stimme nicht zu / neutral** to **1 / -1 / 0**, consistent with the JS data.

Use of bpb data is subject to their [terms on the Datensätze page](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/).

### CSV structure and known caveats

**`all_wahlomat_answers.csv`** (written by **`build_dataframe.py`** / **`python wahlomat.py build-csv`**) is a long table: one row per thesis index, party, and answer.

| Column | Type | Description |
|--------|------|-------------|
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

**Caveats for analysts**

- **Questions are not comparable across elections.** Each election has its own questionnaire (often on the order of 38 theses; older elections may have fewer).
- **Some elections have very few parties** (as few as 2–3), which limits or breaks multivariate analyses (correlation, PCA, etc.).
- **Schleswig-Holstein 2005 and 2017** include multilingual theses (e.g. German, Danish, North Frisian). After deduplication in the JS parser, **`title`** and **`these_text`** keep the **first** language variant encountered per thesis.
- **Folder names `wahlomat_0` and `wahlomat_1`** in the original ZIPs correspond to **`hamburg2011`** and **`berlin2011`** in the CSV (`election_id`); see [election_id_policy.py](election_id_policy.py).
- **Party names are not normalised** across elections; the same grouping may appear under different strings (e.g. `GRÜNE`, `BÜNDNIS 90/DIE GRÜNEN`, `GRÜNE/B 90`).
- **`update-csv`** only treats a sheet as changed when the **row count** for that `election_id` differs from the workbook; same row count with edited cells is not detected.
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

- **`wahlomat.py`**: unified CLI (`download`, `build-csv`, `update-csv`, `graphs`, `run-all`); **`graphs`** forwards flags to **`build_graphs_from_csv`**.
- **`get_zip_files.py`**: download election ZIPs; append **dynamic** download of the **Wahl-O-Mat-Datensätze** bundle from the bpb Datensätze page; workbook discovery via **`discover_bpb_excel_path(data, repo_root)`**.
- **`build_dataframe.py`**: JS + Excel → **`all_wahlomat_answers.csv`** and **`election_metadata.csv`** ([build_metadata.py](build_metadata.py)); **`update_excel_csv.py`** / **`wahlomat.py update-csv`** for incremental Excel-only updates.
- **`bpb_urls.py`**: shared bpb **`WEITERE_WAHLEN_URL`** and HTML fetch headers (used by **`get_zip_files.py`** and **`build_metadata.py`**).
- **`election_id_policy.py`**: JS folders superseded by canonical Excel **`election_id`** when both exist; extend the map when bpb adds overlapping cases.
- **`build_graphs_from_csv.py`**: CSV-first graphs; optional **`--election`** / **`ELECTION_IDS`**; **`--list-elections`** prints IDs and row counts from the CSV.
- **`load_modules.py`**: deprecated; set **`WAHLOMAT_LEGACY_LOAD_MODULES=1`** for the old JS-only loop.
- **`analysis.py`**: **`parse_module_js`**, **`parse_excel_election`**, **`long_rows_to_run_analysis`**, **`run_analysis`**; **`analysis_from_excel`** for a single sheet.
- Dependencies: **`openpyxl`** for reading `.xlsx`; pinned versions in [requirements.txt](requirements.txt) and [pyproject.toml](pyproject.toml).
- **`skipped_elections.py`**: optional **`OMIT_FROM_BUILD_DATAFRAME`** folder names skipped by **`build_dataframe`** (empty by default); **`failed_analysis.py`** diagnoses that list when non-empty.
- **`tests/test_analysis_edges.py`**: **`unittest`** checks for **`parse_module_js`** minimal fixture and **`run_analysis`** edge cases (run with `python -m unittest discover` from the repo root).
- **Python 3.10+**, pinned dependencies in [requirements.txt](requirements.txt), and [pyproject.toml](pyproject.toml) (`pip install .` also works; a tiny **`wahlomat_extended_analysis`** package exists only so setuptools can build while **`data/`** / **`graphs/`** live at the repo root).

## Roadmap (things to add / change)

This continues the intent of the older **“Things to add/change”** list on [skbormann/wahlomat-extended-analysis](https://github.com/skbormann/wahlomat-extended-analysis) **main**, updated for the CSV-first pipeline.

| Idea | Status |
|------|--------|
| Select and download **individual** elections (index / menu / by name) | **Open** — [get_zip_files.py](get_zip_files.py) / `python wahlomat.py download` still fetches **all** ZIPs from the weitere Wahlen page plus the Datensätze bundle. A natural extension is CLI filtering on top of the same HTML parsing ([`extract_zip_hrefs`](get_zip_files.py), URL normalization, download loop). |
| Run analysis for an **individual** election | **Mostly done** — After **`build_dataframe.py`**, run **`--list-elections`** to see valid **`election_id`** values, then [build_graphs_from_csv.py](build_graphs_from_csv.py) **`--election`** (repeat or comma-separated) or **`ELECTION_IDS`**; see [Analysis steps](#analysis-steps). |
| **Update** **`build_dataframe.py`** when new elections appear | **Open** — Today the script **rebuilds the full CSV** from all JS modules and Excel sheets. A future mode could append or merge rows for new **`election_id`** values only; until then, a full rebuild is usually fine. |

## Dependencies

- **Python 3.10+** (the code uses PEP 604 type hints, e.g. `Path | None`; Python 3.8 is EOL).
- **Last verified:** Python **3.12.8** with the pinned packages below (adjust the README when you re-verify).
- Install: `pip install -r requirements.txt` from the repository root, or `pip install .` for the same pins via [pyproject.toml](pyproject.toml) (the latter installs a minimal **`wahlomat_extended_analysis`** package so the build is unambiguous next to **`data/`** and **`graphs/`**).

[requirements.txt](requirements.txt) pins **matplotlib**, **seaborn**, **numpy**, **pandas**, **scikit-learn**, and **openpyxl** for reproducible installs. After upgrading packages, re-run **`build_dataframe.py`** and **`build_graphs_from_csv.py`** on at least one election before committing new pins.
