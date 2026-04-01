"""Repository path helpers shared across CLI wrappers and modules."""

from __future__ import annotations

from pathlib import Path


def repo_root(start: Path | None = None) -> Path:
    """
    Resolve repository root by walking upwards for pyproject.toml.
    Falls back to cwd when no marker is found.
    """
    p = (start or Path(__file__)).resolve()
    if p.is_file():
        p = p.parent
    for candidate in [p, *p.parents]:
        if (candidate / "pyproject.toml").is_file():
            return candidate
    return Path.cwd().resolve()
