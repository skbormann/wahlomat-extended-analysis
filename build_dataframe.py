#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Compatibility wrapper for build_dataframe (root import path)."""

from __future__ import annotations

import sys

from wahlomat_extended_analysis import build_dataframe as _impl

if __name__ == "__main__":
    raise SystemExit(_impl.main())

sys.modules[__name__] = _impl
