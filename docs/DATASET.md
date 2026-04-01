# Dataset / CSV schema

Back to landing page: [`../README.md`](../README.md)

This document describes the generated dataset files and how to use them for your own analysis.

**See also:** for interpretation, recommended methods, and analysis examples, see [`ANALYSIS_GUIDE_EN.md`](ANALYSIS_GUIDE_EN.md) / [`ANALYSIS_GUIDE_DE.md`](ANALYSIS_GUIDE_DE.md).

## Files

- `all_wahlomat_answers.csv` — long table (one row per election × party × question)
- `election_metadata.csv` — one row per `election_id` (human-readable labels, state, year, level)

## What is `election_id`?

`election_id` is the **stable election identifier used throughout this repo**:

- It is the join key between `all_wahlomat_answers.csv` and `election_metadata.csv`.
- It is what you pass to commands like `python wahlomat.py graphs --election <election_id>`.

When you download older archived elections from the bpb “Weitere Wahlen” archive, `--list-election-zips` prints a two-column table:

- `election_id`: a short identifier derived from the archive entry (best-effort and stable for this repo)
- `url`: the ZIP download link as shown on the bpb archive page

If you are unsure which election you want, use the `url` column to match the election name/year you recognize from the bpb archive page, then use the corresponding `election_id` for filtering and graphing.

## `all_wahlomat_answers.csv` columns

| Column | Type | Description |
| --- | --- | --- |
| `election_id` | string | Stable identifier for one Wahl-O-Mat instance (versioned Excel sheet id or legacy JS folder id). |
| `question` | integer | Zero-based thesis index within that election. |
| `party` | string | Party label as in the source (abbreviation / short name). |
| `answer` | integer | Coded agreement: `1` agree, `0` neutral, `-1` disagree. |
| `title` | string | Short thesis title from the source. |
| `these_text` | string | Full thesis wording from the source. |

## `election_metadata.csv` columns

| Column | Description |
| --- | --- |
| `election_id` | Join key into `all_wahlomat_answers.csv`. |
| `display_name_de` | German election name (e.g. `Bundestagswahl 2021`). |
| `display_name_en` | English label (e.g. `Federal election 2021`). |
| `state` | German Land name, or `Federal` / `European`. |
| `year` | Four-digit year. |
| `level` | `federal`, `state`, or `european`. |

## Analysis guides (recommended)

- **English**: [`ANALYSIS_GUIDE_EN.md`](ANALYSIS_GUIDE_EN.md)
- **Deutsch**: [`ANALYSIS_GUIDE_DE.md`](ANALYSIS_GUIDE_DE.md)

## Joining the files (example)

```python
import pandas as pd

answers = pd.read_csv("all_wahlomat_answers.csv")
metadata = pd.read_csv("election_metadata.csv")

# Example: all federal elections
federal_ids = metadata[metadata["level"] == "federal"]["election_id"]
federal = answers[answers["election_id"].isin(federal_ids)]
```

## Caveats (important for analysis)

- **Questions are not comparable across elections.** Each election has its own questionnaire.
- **Some elections have very few parties** (as few as 2–3), which limits or breaks multivariate analyses.
- **Party names are not normalised** across elections; the same party can appear under different strings.

For additional caveats and recommended methods, see the analysis guides linked above.
