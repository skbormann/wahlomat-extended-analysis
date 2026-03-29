# wahlomat-extended-analysis

This is an extension of the analysis by Reddit user [/u/microraptor](https://www.reddit.com/user/microraptor/) of the questionnaires from [wahl-o-mat.de](https://www.wahl-o-mat.de). See [his repo](https://github.com/microraptor/wahlomat_analysis) for the original approach. That work was inspired by Reddit users [/u/d_loose](https://www.reddit.com/user/d_loose/) and [/u/askLubich](https://www.reddit.com/user/askLubich/).

The analysis script builds a correlation matrix and a PCA map of parties, with clusters marked.

The project is extended so the same analytics can run on **many elections**: either from the classic **`module_definition.js`** exports or from the **bpb Wahl-O-Mat-Datensätze Excel** bundle. Further notes on extensions are in [Changes](#changes).

## Analysis steps

1. **`get_zip_files.py`**  
   Downloads Wahl-O-Mat ZIPs listed on the bpb “weitere Wahlen” page, unpacks them into **`data/`**, and also resolves the current **bundled Datensätze** ZIP from the [Datensätze article](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/) (the exact file URL is read from the page HTML, not hardcoded). Creates **`graphs/`** if missing.

2. **`load_modules.py`**  
   From **`data/`**, finds every **`module_definition.js`**, reads each file (UTF-8 with **latin1** fallback), and calls **`analysis.analysis(...)`** in [analysis.py](analysis.py). Output PNGs go to **`graphs/`**.

3. **`build_dataframe.py`** (optional, run from the **repository root**)  
   Parses all JS modules the same way as the analysis pipeline, then, if an Excel bundle is present under **`data/`** (e.g. a name matching `*Wahl-O-Mat*.xlsx`), reads every data sheet and normalizes rows. Concatenates everything and writes **`all_wahlomat_answers.csv`** at the repo root.

### Excel bundle (bpb)

Place the consolidated workbook (e.g. from the Datensätze ZIP) under **`data/`**. [analysis.py](analysis.py) expects the standard bpb columns (`Partei: Kurzbezeichnung`, `These: Nr.`, `Position: Position`, etc.) and maps positions **stimme zu / stimme nicht zu / neutral** to **1 / -1 / 0**, consistent with the JS data.

Use of bpb data is subject to their [terms on the Datensätze page](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/).

### When questionnaires fail in `load_modules`

Some elections have too few parties or odd data; the default pipeline may still skip or error for those. You can use **`failed_analysis.py`** for elections that need a separate pass (the script uses a fixed list from earlier runs and exposes election-specific dataframes).

## What is the Wahl-O-Mat?

According to [the bpb (German)](https://www.bpb.de/themen/wahl-o-mat/294576/wie-funktioniert-der-wahl-o-mat/):

> The Wahl-O-Mat is a question-and-answer tool that shows which party admitted to an election is closest to one's own political position.

## Explanation of the results

For how to read the plots, see [askLubich's repo](https://github.com/askLubich/Wahl-O-Mat-EU-2019) or the [German Reddit comment](https://www.reddit.com/r/de/comments/bqubdv/wahlomat_analyse_zur_euparlamentswahl_2019_oc/eo7zmaq/).

## Changes

- **`get_zip_files.py`**: download election ZIPs; append **dynamic** download of the **Wahl-O-Mat-Datensätze** bundle from the bpb Datensätze page.
- **`load_modules.py`**: loop over modules; **latin1** fallback; skip analysis if a file cannot be read.
- **`analysis.py`**: shared **`parse_module_js`**, **`parse_excel_election`**, **`run_analysis`**; regex tweaks for `module_definition.js`; optional **`analysis_from_excel`** for a single sheet.
- **`build_dataframe.py`**: uses the same parsers; merges JS + Excel into **`all_wahlomat_answers.csv`**.
- Dependencies: **`openpyxl`** for reading `.xlsx` (see [requirements.txt](requirements.txt)).

## Dependencies

See [requirements.txt](requirements.txt). Use **Python 3.8+**. Core stack: **pandas**, **numpy**, **scikit-learn**, **matplotlib**, **seaborn**, **openpyxl**.
