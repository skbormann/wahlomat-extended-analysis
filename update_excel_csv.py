#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Compatibility wrapper for update_excel_csv (root import path)."""

from __future__ import annotations

import sys

from wahlomat_extended_analysis import update_excel_csv as _impl

if __name__ == "__main__":
    raise SystemExit(_impl.main())

sys.modules[__name__] = _impl
