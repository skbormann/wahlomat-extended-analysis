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

## Restructure compatibility policy

During folder restructuring, keep root-level module filenames importable as
compatibility shims until all imports, tools, and docs are migrated.

- Package namespace is the long-term home (`wahlomat_extended_analysis.*`).
- Root modules should re-export package symbols (and preserve `main()` where applicable).
- Avoid mixing behavior changes with move-only PRs.

### Optional src-layout switch

The project can switch to `src/` layout later, after package namespace migration
is stable and compatibility shims have been exercised in CI. This is optional
for now and should be done in a dedicated follow-up PR.

## Pre-commit hooks (recommended)

This repo uses optional local hooks to prevent documentation drift.

One-time setup (from the repository root):

```bash
python -m pip install pre-commit
pre-commit install
```

After that, `git commit` will run checks like “is `docs/ARCHITECTURE.md` up to date?”. If a hook fails, run the suggested command (e.g. `python tools/gen_architecture.py`), stage the resulting changes, and retry the commit.

### Keeping CLI help and docs in sync

This repo also checks that user-facing CLI help text and a few key doc snippets are up to date.

- **Update snapshots/snippets** (after changing CLI flags/help): `python tools/gen_cli_contracts.py`
- **Verify only** (what CI runs): `python tools/gen_cli_contracts.py --check`

## Dependency upgrades

After upgrading packages, re-run `build-csv` and `graphs` for at least one election before committing new pins.

## Local state files

`refresh-excel` writes `data/.wahlomat_refresh_state.json` for “unchanged since last run” reporting. It is safe to ignore (and safe to delete); consider adding it to `.gitignore` if it appears in `git status`.
