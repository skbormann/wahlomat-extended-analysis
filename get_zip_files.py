"""Compatibility wrapper for get_zip_files (root import path)."""

from __future__ import annotations

import sys

from wahlomat_extended_analysis import get_zip_files as _impl

# Make `import get_zip_files` return the *same module object* as
# `import wahlomat_extended_analysis.get_zip_files`, so patching works even when
# callers (and tests) target the legacy import path.
if __name__ == "__main__":
    raise SystemExit(_impl.main())

sys.modules[__name__] = _impl
