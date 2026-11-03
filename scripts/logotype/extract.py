#!/usr/bin/env python3
"""Extract the outlines of a few glyphs from a font into one minimal single-colour SVG.

Usage: extract.py FONT TEXT OUT.svg
Requires fontTools (use an isolated venv, never a project dependency). The font file is only
read, never copied. Source, SHA-256 and license basis of the font: see source.json.
"""
import gzip
import sys
from glyph_path import glyph_path


def build_svg(font_path, text):
    d, w, h = glyph_path(font_path, text)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{text}">'
           f'<title>{text}</title><path fill="currentColor" d="{d}"/></svg>')
    return svg.encode("utf8"), w, h


if __name__ == "__main__":
    src, text, out = sys.argv[1:4]
    svg, w, h = build_svg(src, text)
    open(out, "wb").write(svg)
    print(f"{out}: {len(svg)} B raw, {len(gzip.compress(svg, 9))} B gzip, viewBox {w}x{h}")
