"""Lightweight constants for graph selection.

Kept separate so `graphs -h` doesn't import the plotting stack.
"""

from __future__ import annotations

GRAPH_KIND_CHOICES: tuple[str, ...] = ("c_matrix", "pca_map", "pca_influences")

