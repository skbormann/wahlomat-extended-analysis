# wahlomat-extended-analysis

This repo analyzes questionnaires from [wahl-o-mat.de](https://www.wahl-o-mat.de) (Bundeszentrale für politische Bildung / bpb). It builds, per election, a **correlation matrix** and a **PCA “party map”** (plus **PCA question influences**), with cluster markings.

It is an extension of the analysis by Reddit user [/u/microraptor](https://www.reddit.com/user/microraptor/) (see [microraptor/wahlomat_analysis](https://github.com/microraptor/wahlomat_analysis)), inspired by [/u/d_loose](https://www.reddit.com/user/d_loose/) and [/u/askLubich](https://www.reddit.com/user/askLubich/) (see [askLubich/Wahl-O-Mat-EU-2019](https://github.com/askLubich/Wahl-O-Mat-EU-2019)). Unlike many single-election notebooks (e.g. [uioreanu/german-elections](https://github.com/uioreanu/german-elections)), this project can process **many elections at once** via a shared CSV.

## Where the data comes from

This repo can build the combined CSV from two sources:

- **bpb Excel bundle (“Wahl-O-Mat-Datensätze”)**: the consolidated workbook published by bpb. The pipeline **downloads it automatically** from the bpb Datensätze page: [https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/). This is the easiest starting point and is what `refresh-excel` uses.
- **Legacy JS exports (archived Wahl-O-Mat ZIPs)**: older elections are available as downloadable ZIP archives via the bpb “Wahl-O-Mat-Archiv: Weitere Wahlen” page: [https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/](https://www.bpb.de/themen/wahl-o-mat/45817/wahl-o-mat-archiv-weitere-wahlen/). After you run `python wahlomat.py download`, these ZIPs are extracted into `data/` and contain files like `module_definition.js`. They are included when you run a full rebuild with `build-csv`.

## Quickstart (first-time users)

From the repository root:

### Step 1 — Get the code

```bash
git clone https://github.com/skbormann/wahlomat-extended-analysis.git
cd <REPO_FOLDER>
```

Alternatively, use GitHub’s “Download ZIP”, unzip it, then `cd` into the extracted folder.

### Step 2 — Install dependencies

```bash
python -m pip install -r requirements.txt
```

### Step 3 — Download the current bpb “Datensätze” bundle and update the CSV

(Fast path for “new sheets/parties”.)

```bash
python wahlomat.py refresh-excel
```

### Optional — Download older elections (archived ZIPs / JS exports)

This fetches and extracts the “Weitere Wahlen” ZIP archives into `data/` (used on a full rebuild via `build-csv`).

```bash
# Download and extract all archived election ZIPs (plus the Datensätze bundle)
python wahlomat.py download

# Or: download/extract only specific elections (substring match on URL/stem/slug)
python wahlomat.py download --list-election-zips
python wahlomat.py download --election-zip berlin2021 --election-zip bundestagswahl2021
```

### Step 4 — List elections (`election_id`) and build graphs

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

- **English**: `[docs/ANALYSIS_GUIDE_EN.md](docs/ANALYSIS_GUIDE_EN.md)`
- **Deutsch**: `[docs/ANALYSIS_GUIDE_DE.md](docs/ANALYSIS_GUIDE_DE.md)`

They explain the dataset structure, how to join `all_wahlomat_answers.csv` with `election_metadata.csv`, which questions the data can and cannot answer, and recommended analysis approaches. For a concise CSV schema reference, see `[docs/DATASET.md](docs/DATASET.md)`.

## Docs (recommended)

Start here for the longer-form documentation index: `[docs/README.md](docs/README.md)`.

## Usage (recommended entry point)

`wahlomat.py` is the recommended entry point (all commands are run from the repository root):

- `python wahlomat.py download`
- `python wahlomat.py refresh-excel`
- `python wahlomat.py build-csv`
- `python wahlomat.py update-csv`
- `python wahlomat.py graphs ...`
- `python wahlomat.py run-all`

Detailed usage and options:

- **Usage & CLI**: `[docs/USAGE.md](docs/USAGE.md)`
- **Pipeline reference**: `[docs/PIPELINE_REFERENCE.md](docs/PIPELINE_REFERENCE.md)`

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

## Troubleshooting

See `[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)`.

## Development

See `[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)`.

## License

- **Code**: MIT License (see `[LICENSE](LICENSE)`).
- **Data**: the bpb “Wahl-O-Mat-Datensätze” are subject to the terms on the bpb Datensätze page: [https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/).
