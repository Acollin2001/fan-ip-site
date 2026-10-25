#!/usr/bin/env python3
"""Builds assets/nnbsp.woff2: a font with a single blank glyph, the narrow
no-break space (U+202F) that French puts between thousands (1 500) and before
; ? ! and inside « ». Clash Display and General Sans have no such glyph, so
browsers borrowed one from whatever system font they found, sometimes almost
zero wide. assets/lang.css adds this face to both families for U+202F only.

    python3 .github/scripts/make-nnbsp-font.py
"""
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

UPM = 1000
WIDTH = 170  # a little under the word space of Clash Display and General Sans

fb = FontBuilder(UPM, isTTF=True)
fb.setupGlyphOrder([".notdef", "nnbsp"])
fb.setupCharacterMap({0x202F: "nnbsp"})
empty = TTGlyphPen(None).glyph()
# .notdef gets a small box: browsers refuse a font whose glyf table is empty.
pen = TTGlyphPen(None)
pen.moveTo((20, 0)); pen.lineTo((20, 600)); pen.lineTo((100, 600)); pen.lineTo((100, 0)); pen.closePath()
fb.setupGlyf({".notdef": pen.glyph(), "nnbsp": empty})
fb.setupHorizontalMetrics({".notdef": (WIDTH, 0), "nnbsp": (WIDTH, 0)})
fb.setupHorizontalHeader(ascent=800, descent=-200)
fb.setupNameTable({"familyName": "FANIP NNBSP", "styleName": "Regular"})
fb.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200)
fb.setupPost()
fb.font.flavor = "woff2"
out = Path(__file__).resolve().parents[2] / "assets" / "nnbsp.woff2"
fb.save(str(out))
print("wrote", out, out.stat().st_size, "bytes")
