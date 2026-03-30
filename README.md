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
   Parses all JS modules under **`data/`** (optionally skipping folder names listed as **`OMIT_FROM_BUILD_DATAFRAME`** in [skipped_elections.py](skipped_elections.py); currently empty), then reads every qualifying sheet from the bpb Excel workbook if found (**`data/`** or repo root). Writes **`all_wahlomat_answers.csv`** at the repo root.

3. **`build_graphs_from_csv.py`** (run from the **repository root**)  
   Reads **`all_wahlomat_answers.csv`**, rebuilds each election’s matrices, and writes PNGs to **`graphs/`** (same plots as before: correlation / PCA / influences).  
   - **All elections:** `python build_graphs_from_csv.py`  
   - **Subset:** `python build_graphs_from_csv.py --election bundestagswahl2021 --election berlin2021` or comma-separated `--election a,b`  
   - **Environment:** `ELECTION_IDS=bundestagswahl2021,berlin2021 python build_graphs_from_csv.py` (CLI wins if both are set)

### Unified CLI (`wahlomat.py`)

From the repository root you can run the same pipeline with one entry point:

- `python wahlomat.py download` — same as `get_zip_files.py`
- `python wahlomat.py build-csv` — same as `build_dataframe.py`
- `python wahlomat.py graphs …` — forwards all arguments after `graphs` to `build_graphs_from_csv.py` (e.g. `python wahlomat.py graphs --election bundestagswahl2021` or `python wahlomat.py graphs -h` for graph options)
- `python wahlomat.py run-all` — runs download, then build-csv, then graphs with default graph options (stops on the first non-zero exit)

The individual scripts above remain supported.

### Legacy JS-only path

**`load_modules.py`** is **deprecated** and exits with instructions unless you set **`WAHLOMAT_LEGACY_LOAD_MODULES=1`**. That legacy mode only reads **`module_definition.js`** files and **does not** include Excel-only elections.

### Excel bundle (bpb)

Prefer placing the consolidated workbook under **`data/`** (e.g. from the Datensätze ZIP). Discovery also checks the **repository root**, so a copy next to the scripts is picked up when **`data/`** has no match.

[analysis.py](analysis.py) expects the standard bpb columns (`Partei: Kurzbezeichnung`, `These: Nr.`, `Position: Position`, etc.) and maps positions **stimme zu / stimme nicht zu / neutral** to **1 / -1 / 0**, consistent with the JS data.

Use of bpb data is subject to their [terms on the Datensätze page](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/).

### When questionnaires fail

**`run_analysis`** (correlation / PCA / clustering plots) can still hit unusual cases; [analysis.py](analysis.py) now handles single-party PCA, NaN correlations from zero-variance columns, and tiny matrices more defensively. If a specific election under **`data/`** keeps breaking the pipeline, add its top-level folder name to **`OMIT_FROM_BUILD_DATAFRAME`** in [skipped_elections.py](skipped_elections.py) until it is fixed.

**`failed_analysis.py`** (repository root: `python failed_analysis.py`) runs **`parse_module_js`** and then **`run_analysis`** for each slug in **`OMIT_FROM_BUILD_DATAFRAME`** (if any), printing parse/plot outcomes. Debug plots use names like **`debug_<folder>_*.png`** under **`graphs/`**. When the omit list is empty, the script prints a short notice and exits.

## What is the Wahl-O-Mat?

According to [the bpb (German)](https://www.bpb.de/themen/wahl-o-mat/294576/wie-funktioniert-der-wahl-o-mat/):

> The Wahl-O-Mat is a question-and-answer tool that shows which party admitted to an election is closest to one's own political position.

## Explanation of the results

For how to read the plots, see [askLubich's repo](https://github.com/askLubich/Wahl-O-Mat-EU-2019) or the [German Reddit comment](https://www.reddit.com/r/de/comments/bqubdv/wahlomat_analyse_zur_euparlamentswahl_2019_oc/eo7zmaq/).

## Changes

- **`wahlomat.py`**: unified CLI (`download`, `build-csv`, `graphs`, `run-all`); **`graphs`** forwards flags to **`build_graphs_from_csv`**.
- **`get_zip_files.py`**: download election ZIPs; append **dynamic** download of the **Wahl-O-Mat-Datensätze** bundle from the bpb Datensätze page; workbook discovery via **`discover_bpb_excel_path(data, repo_root)`**.
- **`build_dataframe.py`**: JS + Excel → **`all_wahlomat_answers.csv`**.
- **`build_graphs_from_csv.py`**: CSV-first graphs; optional **`--election`** / **`ELECTION_IDS`**.
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
| Run analysis for an **individual** election | **Mostly done** — After **`build_dataframe.py`**, use [build_graphs_from_csv.py](build_graphs_from_csv.py) **`--election`** (repeat or comma-separated) or **`ELECTION_IDS`**; see [Analysis steps](#analysis-steps). |
| **Update** **`build_dataframe.py`** when new elections appear | **Open** — Today the script **rebuilds the full CSV** from all JS modules and Excel sheets. A future mode could append or merge rows for new **`election_id`** values only; until then, a full rebuild is usually fine. |

## Dependencies

- **Python 3.10+** (the code uses PEP 604 type hints, e.g. `Path | None`; Python 3.8 is EOL).
- **Last verified:** Python **3.12.8** with the pinned packages below (adjust the README when you re-verify).
- Install: `pip install -r requirements.txt` from the repository root, or `pip install .` for the same pins via [pyproject.toml](pyproject.toml) (the latter installs a minimal **`wahlomat_extended_analysis`** package so the build is unambiguous next to **`data/`** and **`graphs/`**).

[requirements.txt](requirements.txt) pins **matplotlib**, **seaborn**, **numpy**, **pandas**, **scikit-learn**, and **openpyxl** for reproducible installs. After upgrading packages, re-run **`build_dataframe.py`** and **`build_graphs_from_csv.py`** on at least one election before committing new pins.
