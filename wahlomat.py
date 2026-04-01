#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Compatibility wrapper for wahlomat (root CLI entrypoint)."""

from __future__ import annotations

import sys

from wahlomat_extended_analysis import wahlomat as _impl

sys.modules[__name__] = _impl

if __name__ == "__main__":
    raise SystemExit(_impl.main())
