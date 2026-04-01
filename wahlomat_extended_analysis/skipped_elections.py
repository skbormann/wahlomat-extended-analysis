# Elections omitted from build_dataframe aggregation (historic / fragile JS).
# Keep in sync with any tooling that targets the same set (failed_analysis.py).
#
# Re-verified: all former slugs (schleswigholstein2005 … bw2006) passed
# `python failed_analysis.py` (parse_module_js + run_analysis) with current
# analysis.py. The list is empty until a new fragile case is found — then add
# the top-level data/ folder name here and document why.
OMIT_FROM_BUILD_DATAFRAME: tuple[str, ...] = ()
