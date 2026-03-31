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

## Dependency upgrades

After upgrading packages, re-run `build-csv` and `graphs` for at least one election before committing new pins.

## Local state files

`refresh-excel` writes `data/.wahlomat_refresh_state.json` for “unchanged since last run” reporting. It is safe to ignore (and safe to delete); consider adding it to `.gitignore` if it appears in `git status`.
