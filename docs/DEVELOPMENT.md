# Development

Back to landing page: [`../README.md`](../README.md)

## Python version

See `../README.md` for the supported Python version range.

## Installing dependencies

From the repository root:

```bash
python -m pip install -r requirements.txt
```

Alternatively (same pins via `pyproject.toml`):

```bash
python -m pip install .
```

## Running tests

From the repository root:

```bash
python -m unittest discover -s tests -p "test*.py"
```

## Static checks

Run the lightweight static gate used in CI:

```bash
ruff check . --select E9,F821
```

## Pre-commit hooks (recommended)

This repo uses optional local hooks to prevent documentation drift.

One-time setup (from the repository root):

```bash
python -m pip install pre-commit
pre-commit install
```

After that, `git commit` will run checks like “is `docs/ARCHITECTURE.md` up to date?”. If a hook fails, run the suggested command (e.g. `python tools/gen_architecture.py`), stage the resulting changes, and retry the commit.

## Dependency upgrades

After upgrading packages, re-run `build-csv` and `graphs` for at least one election before committing new pins.

## Local state files

`refresh-excel` writes `data/.wahlomat_refresh_state.json` for “unchanged since last run” reporting. It is safe to ignore (and safe to delete); consider adding it to `.gitignore` if it appears in `git status`.
