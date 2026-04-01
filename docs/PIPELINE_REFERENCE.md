# Pipeline reference

Back to landing page: [`../README.md`](../README.md)

This is the detailed reference for the end-to-end pipeline (download → build/update CSV → graphs), including edge cases and exact behaviors.

## Analysis steps (detailed reference)

## When to use which command (quick decision guide)

- **I want the latest bpb workbook and to update my CSV**: `python wahlomat.py refresh-excel`
- **First run from the workbook only**: `python wahlomat.py download --datensaetze-only` → `python wahlomat.py build-csv`
- **I want older archived elections too (JS ZIPs)**: `python wahlomat.py download` (or `--election-zips-only` / selective) → `python wahlomat.py build-csv`
- **The workbook changed and I want to merge updates without a full rebuild**: `python wahlomat.py update-csv` (use `--dry-run` first)

### 1) Download datasets

Use `python wahlomat.py download ...` (recommended). The underlying implementation is in `get_zip_files.py`.

`download` fetches Wahl-O-Mat ZIPs listed on the bpb “weitere Wahlen” page, unpacks them into **`data/`**, and can also resolve the current **bundled Datensätze** ZIP from the bpb Datensätze page (the exact file URL is read from the page HTML, not hardcoded). It creates **`graphs/`** if missing.

- **Datensätze only**: `python get_zip_files.py --datensaetze-only` (or `python wahlomat.py download --datensaetze-only`) downloads **only** that Datensätze bundle, extracts **that** ZIP into **`data/<zip-stem>/`**, and does **not** fetch election ZIPs or scan other ZIPs in **`data/`** for extraction.
- **Election ZIPs only**: `python get_zip_files.py --election-zips-only` (or `python wahlomat.py download --election-zips-only`) downloads and extracts **only** the archived election ZIPs (no Datensätze bundle).
- **Selective election ZIPs**:
  - `--list-election-zips` prints `election_id` and URL for each ZIP on the weitere-Wahlen page (no download). See [`DATASET.md`](DATASET.md) for what `election_id` means.
  - `--election-zip TOKEN` (repeatable) downloads/extracts **only** archives where TOKEN matches (case-insensitive substring) the URL or derived `election_id`.
  - Add `--with-datensaetze` to include the Datensätze bundle in the same run.
  - `--datensaetze-only` cannot be combined with these flags.

<!-- AUTOGEN:CLI_SNIPPET:PIPELINE_DOWNLOAD_SELECTIVE:START -->
```text
  --list-election-zips  List ZIPs from the weitere-Wahlen page (election_id, URL); no download.
                        Same as get_zip_files.py --list-election-zips. See docs/DATASET.md for
                        what election_id means.
  --election-zip TOKEN  Download only election ZIPs whose URL or derived election_id contains
                        TOKEN (case-insensitive); repeat for multiple tokens. See --list-election-
                        zips.
  --with-datensaetze    Only with one or more --election-zip: also download and extract the
                        Datensätze bundle in the same run.
```
<!-- AUTOGEN:CLI_SNIPPET:PIPELINE_DOWNLOAD_SELECTIVE:END -->

**Workbook line:** After a full download, `--datensaetze-only`, or a selective download that included `--with-datensaetze`, the script prints **`Datensätze workbook OK`** with the path to the `.xlsx` if `discover_bpb_excel_path` finds one under `data/` or the repository root; otherwise a WARNING. Selective `--election-zip` only (no bundle in that run) skips this check.

**Outputs:**

- extracted datasets under `data/<stem>/...`
- optionally a workbook discovery line when the run included the Datensätze bundle

### 2) Build the combined CSV

**`build_dataframe.py`** (run from the **repository root**) parses all JS modules under **`data/`** (optionally skipping folder names listed as **`OMIT_FROM_BUILD_DATAFRAME`** in `skipped_elections.py`), then reads every qualifying sheet from the bpb Excel workbook if found (`data/` or repo root).

Outputs at the repo root:

- `all_wahlomat_answers.csv`
- `election_metadata.csv` (via `build_metadata.py`)

**JS vs Excel overlap:** `election_id_policy.py` lists folders whose JS export is not ingested when the same election appears in the workbook under the mapped versioned sheet id (e.g. skip JS `bundestagswahl2021` when Excel has `BT21_v1.02`).

**JS answers:** `analysis.py` `parse_module_js` deduplicates `(thesis, party)` before pivoting and uses `aggfunc="first"` so multi-language duplicates are not averaged into fractional codes.

### 3) Update from the Excel workbook only

**`update_excel_csv.py`** / `python wahlomat.py update-csv` (repository root) is recommended when only the bpb Excel workbook changed. It compares each qualifying workbook sheet to the current `all_wahlomat_answers.csv` by `election_id` (sheet name with spaces → underscores):

- **new** ids or **changed** row counts trigger a replace for that `election_id`
- **same row count but changed content** also triggers a replace (content comparison)
- rows for elections not in the workbook (including JS-sourced `election_id`s) are left unchanged
- removed sheets do not delete CSV rows

`election_metadata.csv` is regenerated in the same run when the answers CSV is written.

If `update-csv` errors **after** `Wrote … rows` (metadata build failed), the CSV is already updated—run `python build_metadata.py` (and `--answers` if you use a non-default path).

`--prune-superseded-excel` drops older versioned bpb `election_id`s left in the CSV when the workbook has another tab with the same land+year prefix (e.g. remove `BW26_v1.01` when the workbook has `BW26_v1.02`), so `election_metadata.csv` matches current workbook tabs.

Flags:

- `--dry-run` (print summary, exit)
- `-y` / `--yes` (apply without prompt; default asks `Proceed? [y/N]`)

Non-interactive terminals must use `--dry-run` or `--yes`.

**Outputs:**

- updates `all_wahlomat_answers.csv` in-place
- regenerates `election_metadata.csv` when the answers CSV is written

### 4) Refresh from the bpb bundle and update CSV

`python wahlomat.py refresh-excel` runs `download --datensaetze-only` and then `update-csv -y` with `--prune-superseded-excel` by default (use `refresh-excel --no-prune` to skip pruning). Optional `--answers` matches `update-csv`.

**Persisted state:** `refresh-excel` stores a small state record under `data/.wahlomat_refresh_state.json` containing the resolved bundle URL/filename, best-effort **Stand date** (from the bpb link label), and a **SHA-256** of the downloaded ZIP. On subsequent runs it prints whether the bundle is unchanged/changed since last run using the hash as the truth (the Stand date is a human label; if it stays the same but the hash changes, a warning is printed).

If the download succeeds but this run writes nothing to the answers CSV or metadata, `refresh-excel` prints a short “no updates needed” line (this refers to the current invocation).

**Outputs:**

- updates `data/` with the extracted workbook bundle
- writes `data/.wahlomat_refresh_state.json` (persisted state for “unchanged since last run” reporting)
- may update `all_wahlomat_answers.csv` and `election_metadata.csv` (via `update-csv`)

### 5) Build graphs from the CSV

**`build_graphs_from_csv.py`** (run from the **repository root**) reads `all_wahlomat_answers.csv`, rebuilds each election’s matrices, and writes PNGs to `graphs/` (correlation clustermap, PCA party map, PCA question influences). After each file, the CLI prints `Saved: <absolute path>`.

- List valid `election_id` values: `python build_graphs_from_csv.py --list-elections` (or `python wahlomat.py graphs --list-elections`; optional `--csv` path). Add `--with-rows` to also print aligned row counts.
- All elections: `python build_graphs_from_csv.py`
- Subset: `python build_graphs_from_csv.py --election bundestagswahl2021 --election berlin2021` or comma-separated `--election a,b`
- Plot types: `--graph` (repeatable): `c_matrix`, `pca_map`, `pca_influences` (default is all three)
- Environment: `ELECTION_IDS=bundestagswahl2021,berlin2021 python build_graphs_from_csv.py` (CLI wins if both are set)
- `--list-elections` cannot be combined with `--election` or `ELECTION_IDS`.

**Outputs:**

- PNG files under `graphs/` and `Saved: ...` lines on stdout

## Unified CLI (`wahlomat.py`)

From the repository root you can run the same pipeline with one entry point:

- `python wahlomat.py download`
- `python wahlomat.py refresh-excel`
- `python wahlomat.py build-csv`
- `python wahlomat.py update-csv`
- `python wahlomat.py graphs …`
- `python wahlomat.py run-all`

## Legacy JS-only path

`legacy/load_modules.py` is deprecated and exits with instructions unless you set `WAHLOMAT_LEGACY_LOAD_MODULES=1`. That legacy mode only reads `module_definition.js` files and does not include Excel-only elections.

## Excel bundle (bpb)

Prefer placing the consolidated workbook under `data/` (e.g. from the Datensätze ZIP). Discovery also checks the repository root.

When several matching `.xlsx` files exist under those roots, `discover_bpb_excel_path` chooses the newest by filesystem mtime, then breaks ties by filename descending. Rename or move stale copies (e.g. to `*.xlsx.old`) if the wrong file wins.

`analysis.py` expects the standard bpb columns (`Partei: Kurzbezeichnung`, `These: Nr.`, `Position: Position`, etc.) and maps positions **stimme zu / stimme nicht zu / neutral** to `1 / -1 / 0`, consistent with the JS data.

Use of bpb data is subject to their terms on the bpb Datensätze page: <https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/>.

## `build_metadata.py` (metadata-only rebuild)

Normally you do not need to run this manually because `build-csv` and `update-csv` regenerate `election_metadata.csv` when they write `all_wahlomat_answers.csv`.

Run it manually if:

- `update-csv` wrote `all_wahlomat_answers.csv` but then failed while rebuilding metadata (you’ll see an error after a `Wrote … rows` line), or
- you want to regenerate metadata after editing/moving the answers CSV.

### Usage

From the repository root:

```bash
python build_metadata.py -h
python build_metadata.py
```

### Options

- **`--repo-root PATH`**: repository root (default: parent of `build_metadata.py`)
- **`--answers PATH`**: path to `all_wahlomat_answers.csv` (default: `<repo-root>/all_wahlomat_answers.csv`)
- **`--out PATH`**: output path for `election_metadata.csv` (default: `<repo-root>/election_metadata.csv`)
- **`--archive-html PATH`**: use a saved bpb archive HTML file and skip network access

### Offline mode

If the bpb archive page can’t be fetched (no network/firewall), save the “Weitere Wahlen” archive page HTML and provide it via either:

- `--archive-html /path/to/saved.html`, or
- environment variable `WAHLOMAT_ARCHIVE_HTML=/path/to/saved.html`

The page to save is: <https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/>

### Output

Writes `election_metadata.csv` and prints:

- `Wrote <N> rows to <path>`

## Failure diagnosis helpers

If a specific election under `data/` keeps breaking the pipeline, add its top-level folder name to `OMIT_FROM_BUILD_DATAFRAME` in `skipped_elections.py` until it is fixed.

`failed_analysis.py` runs `parse_module_js` and then `run_analysis` for each slug in `OMIT_FROM_BUILD_DATAFRAME` (if any), printing parse/plot outcomes. Debug plots use names like `debug_<folder>_*.png` under `graphs/`.

## See also

- Usage & examples: [`USAGE.md`](USAGE.md)
- Codebase map (entrypoints & responsibilities): [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Troubleshooting: [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md)
- Dataset schema: [`DATASET.md`](DATASET.md)
