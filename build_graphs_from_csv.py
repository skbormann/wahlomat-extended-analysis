"""Compatibility wrapper for build_graphs_from_csv (root import path)."""

from __future__ import annotations

from wahlomat_extended_analysis.build_graphs_from_csv import main

__all__ = ["main"]


if __name__ == "__main__":
    raise SystemExit(main())
