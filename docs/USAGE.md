# Usage & CLI

Back to landing page: [`../README.md`](../README.md)

This document focuses on “how to run the tooling” (commands, options, examples). For the deep step-by-step reference with edge cases, see [`PIPELINE_REFERENCE.md`](PIPELINE_REFERENCE.md).

## Recommended entry point

Use `wahlomat.py` from the repository root (the primary supported entrypoint).

To see available commands and flags:

```bash
python wahlomat.py -h
python wahlomat.py download -h
python wahlomat.py build-csv -h
python wahlomat.py update-csv -h
python wahlomat.py graphs -h
```

## Common workflows (copy/paste)

### Fast first run (Excel bundle only)

```bash
python wahlomat.py download --datensaetze-only
python wahlomat.py build-csv
python wahlomat.py graphs --list-elections --with-rows
python wahlomat.py graphs --election BT21_v1.02
```

### Later: refresh only the Excel bundle and merge updates

```bash
python wahlomat.py refresh-excel
```

### Download older elections (archived ZIPs / JS exports)

Download and extract **all** archived election ZIPs (plus the Datensätze bundle):

```bash
python wahlomat.py download
python wahlomat.py build-csv
```

Download and extract **all archived election ZIPs only** (skip Datensätze bundle):

```bash
python wahlomat.py download --election-zips-only
python wahlomat.py build-csv
```

Download and extract a **subset** of archived elections (repeat `--election-zip`):

```bash
python wahlomat.py download --list-election-zips
python wahlomat.py download --election-zip berlin2021 --election-zip bundestagswahl2021 --with-datensaetze
python wahlomat.py build-csv
```

<!-- AUTOGEN:CLI_SNIPPET:USAGE_DOWNLOAD_SELECTIVE:START -->
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
<!-- AUTOGEN:CLI_SNIPPET:USAGE_DOWNLOAD_SELECTIVE:END -->

## Command reference (practical notes)

### `download`

- **Full**: `python wahlomat.py download` downloads/extracts all archived election ZIPs and the Datensätze bundle.
- **Datensätze only**: `python wahlomat.py download --datensaetze-only` downloads/extracts only the consolidated bpb workbook.
- **Election ZIPs only**: `python wahlomat.py download --election-zips-only` downloads/extracts only archived election ZIPs (no workbook bundle).
- **Selective**: use `--list-election-zips` to discover tokens and `--election-zip TOKEN` (repeatable) to download/extract matching archives; add `--with-datensaetze` to include the workbook bundle in the same run.

### `build-csv`

```bash
python wahlomat.py build-csv
```

Builds/overwrites:

- `all_wahlomat_answers.csv`
- `election_metadata.csv`

from whatever is currently available under `data/` (Excel sheets + extracted JS exports).

### `update-csv`

Use this when **only** the bpb workbook changed and you want to merge workbook-only updates into an existing `all_wahlomat_answers.csv` without a full rebuild.

```bash
python wahlomat.py update-csv --dry-run
python wahlomat.py update-csv -y --prune-superseded-excel
```

### `graphs`

List available elections (and row counts) from the built CSV:

```bash
python wahlomat.py graphs --list-elections --with-rows
```

Generate all default graphs for one election:

```bash
python wahlomat.py graphs --election BT21_v1.02
```

Generate only a PCA map:

```bash
python wahlomat.py graphs --election BT21_v1.02 --graph pca_map
```

## See also

- Pipeline details: [`PIPELINE_REFERENCE.md`](PIPELINE_REFERENCE.md)
- Codebase map (entrypoints & responsibilities): [`ARCHITECTURE.md`](ARCHITECTURE.md)
- CSV schema and analysis guides: [`DATASET.md`](DATASET.md)
