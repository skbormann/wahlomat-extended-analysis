#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import difflib
import os
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"
SNAPSHOT_DIR = DOCS_DIR / "cli-help"


PIPELINE_REFERENCE_MD = DOCS_DIR / "PIPELINE_REFERENCE.md"
USAGE_MD = DOCS_DIR / "USAGE.md"


PIPELINE_BLOCK_START = "<!-- AUTOGEN:CLI_SNIPPET:PIPELINE_DOWNLOAD_SELECTIVE:START -->"
PIPELINE_BLOCK_END = "<!-- AUTOGEN:CLI_SNIPPET:PIPELINE_DOWNLOAD_SELECTIVE:END -->"

USAGE_BLOCK_START = "<!-- AUTOGEN:CLI_SNIPPET:USAGE_DOWNLOAD_SELECTIVE:START -->"
USAGE_BLOCK_END = "<!-- AUTOGEN:CLI_SNIPPET:USAGE_DOWNLOAD_SELECTIVE:END -->"


MATPLOTLIB_NOISE_PATTERNS: list[re.Pattern[str]] = [
    re.compile(r".*\.matplotlib is not a writable directory\s*$"),
    re.compile(r"Matplotlib created a temporary cache directory at .* because there was an issue with the default path .*"),
    re.compile(r"Matplotlib is building the font cache; this may take a moment\.?\s*$"),
]


@dataclass(frozen=True)
class CommandSpec:
    name: str
    argv: list[str]
    snapshot_path: Path


def _run_capture(argv: list[str], *, columns: int = 100) -> str:
    """
    Run a command and return combined stdout+stderr as text.

    Normalization goal:
    - stable wrapping for argparse help (COLUMNS)
    - avoid matplotlib warnings by forcing writable MPLCONFIGDIR
    """
    env = dict(os.environ)
    env["COLUMNS"] = str(columns)
    with tempfile.TemporaryDirectory(prefix="wahlomat-cli-contracts-") as tmp:
        env["MPLCONFIGDIR"] = tmp
        proc = subprocess.run(
            argv,
            cwd=str(REPO_ROOT),
            env=env,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=False,
        )
    out = proc.stdout or ""
    return out


def _strip_noise_lines(text: str) -> str:
    lines = text.splitlines()
    kept: list[str] = []
    for line in lines:
        if any(p.search(line) for p in MATPLOTLIB_NOISE_PATTERNS):
            continue
        kept.append(line.rstrip())
    # Trim leading/trailing blanks and ensure single trailing newline on write.
    while kept and kept[0] == "":
        kept.pop(0)
    while kept and kept[-1] == "":
        kept.pop()
    return "\n".join(kept) + "\n"


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def _replace_block(doc_text: str, *, start: str, end: str, replacement: str) -> str:
    if start not in doc_text or end not in doc_text:
        raise ValueError(f"Missing AUTOGEN block markers: {start} / {end}")
    pre, rest = doc_text.split(start, 1)
    _, post = rest.split(end, 1)
    # Keep markers and put content on its own lines.
    replacement = replacement.rstrip("\n") + "\n"
    return pre + start + "\n" + replacement + end + post


def _extract_help_option_block(help_text: str, *, option: str) -> str:
    """
    Extract the argparse help entry for a specific long option, including wrapped lines,
    until the next option or end of options section.
    """
    lines = help_text.splitlines()
    # Match: two spaces + --flag (argparse default formatting)
    start_idx = None
    opt_re = re.compile(rf"^\s{{2}}{re.escape(option)}(\s|$)")
    for i, line in enumerate(lines):
        if opt_re.search(line):
            start_idx = i
            break
    if start_idx is None:
        raise ValueError(f"Option not found in help output: {option}")

    collected = [lines[start_idx].rstrip()]
    for j in range(start_idx + 1, len(lines)):
        nxt = lines[j]
        # next option starts with two spaces then '-' (covers -h/--help too)
        if re.match(r"^\s{2}-", nxt):
            break
        if nxt.strip() == "" and collected:
            break
        collected.append(nxt.rstrip())
    return "\n".join(collected).rstrip()


def _build_markdown_snippet(help_text: str) -> str:
    """
    Small, user-facing snippet: only the relevant options.
    """
    parts = [
        _extract_help_option_block(help_text, option="--list-election-zips"),
        _extract_help_option_block(help_text, option="--election-zip"),
        _extract_help_option_block(help_text, option="--with-datensaetze"),
    ]
    # Render as a fenced code block with the exact help formatting for those lines.
    return "```text\n" + "\n".join(parts) + "\n```\n"


def _diff(a: str, b: str, *, fromfile: str, tofile: str) -> str:
    return "".join(
        difflib.unified_diff(
            a.splitlines(keepends=True),
            b.splitlines(keepends=True),
            fromfile=fromfile,
            tofile=tofile,
        )
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Generate and verify CLI contracts: golden help snapshots + small AUTOGEN snippets in docs.\n\n"
            "Update mode (default) rewrites snapshots and docs. Use --check to fail if anything is out of date."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check whether snapshots/docs match; do not modify files.",
    )
    args = parser.parse_args(argv)

    specs = [
        CommandSpec(
            name="wahlomat_download_help",
            argv=[sys.executable, "wahlomat.py", "download", "-h"],
            snapshot_path=SNAPSHOT_DIR / "wahlomat_download_help.txt",
        ),
    ]

    # 1) Golden snapshots
    computed_snapshots: dict[str, str] = {}
    for spec in specs:
        raw = _run_capture(spec.argv)
        normalized = _strip_noise_lines(raw)
        computed_snapshots[spec.name] = normalized

        if args.check:
            if not spec.snapshot_path.exists():
                sys.stderr.write(f"Missing snapshot file: {spec.snapshot_path}\n")
                return 2
            current = _read_text(spec.snapshot_path)
            if current != normalized:
                sys.stderr.write(
                    _diff(current, normalized, fromfile=str(spec.snapshot_path), tofile=f"{spec.snapshot_path} (generated)")
                )
                return 2
        else:
            _write_text(spec.snapshot_path, normalized)

    # 2) AUTOGEN blocks (keep short; derive from wahlomat download -h)
    snippet_md = _build_markdown_snippet(computed_snapshots["wahlomat_download_help"])

    def update_doc(path: Path, start: str, end: str) -> None:
        doc = _read_text(path)
        updated = _replace_block(doc, start=start, end=end, replacement=snippet_md)
        if args.check:
            if doc != updated:
                sys.stderr.write(f"{path} AUTOGEN block out of date. Run: python tools/gen_cli_contracts.py\n")
                return  # caller handles error code
        else:
            _write_text(path, updated)

    # check mode needs to detect drift without writing
    drift = False
    for path, start, end in [
        (PIPELINE_REFERENCE_MD, PIPELINE_BLOCK_START, PIPELINE_BLOCK_END),
        (USAGE_MD, USAGE_BLOCK_START, USAGE_BLOCK_END),
    ]:
        doc = _read_text(path)
        updated = _replace_block(doc, start=start, end=end, replacement=snippet_md)
        if args.check:
            if doc != updated:
                sys.stderr.write(f"{path} AUTOGEN block out of date. Run: python tools/gen_cli_contracts.py\n")
                drift = True
        else:
            _write_text(path, updated)

    return 2 if drift else 0


if __name__ == "__main__":
    raise SystemExit(main())

