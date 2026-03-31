# Troubleshooting

Back to landing page: [`../README.md`](../README.md)

## Common first-time issues

### No `.xlsx` found / wrong `.xlsx` picked

The workbook discovery checks `data/` and the repository root. If multiple matching `.xlsx` exist, it prefers the newest by filesystem mtime (then breaks ties by filename descending). Move/rename stale copies (e.g. `*.xlsx.old`) if the wrong file wins.

### `refresh-excel` says “unchanged since last run”

`refresh-excel` stores a small persisted state record at `data/.wahlomat_refresh_state.json` (bundle URL/filename, best-effort Stand date label, and ZIP SHA-256). Subsequent runs compare the ZIP hash and print whether the bundle is unchanged/changed since last run.

If you want a clean slate, you can delete that JSON file; it only affects the reporting message (not the actual CSV update logic).

### No network / firewall

Metadata generation normally fetches the bpb archive page. For offline builds, save the HTML and set `WAHLOMAT_ARCHIVE_HTML=/path/to/saved.html` before running `build-csv`, or run `python build_metadata.py --archive-html PATH` after the answers CSV exists.

### `update-csv` shows no changes

`update-csv` compares sheet content to the existing CSV block for that `election_id`. If you expect changes but see none, verify you are reading the intended workbook and that the tab name maps to the `election_id` you expect.

### “Datensätze workbook OK” is missing after download

The download step prints a workbook discovery status only when the run included the Datensätze bundle. If you downloaded only election ZIPs (selective mode without `--with-datensaetze`), the workbook check is skipped to avoid implying that this run provided the `.xlsx`.

### PCA / correlation failures for tiny elections

Some elections have very few parties or degenerate matrices. Use the pipeline’s omit mechanism and the debug runner (`failed_analysis.py`) to isolate problematic elections.
