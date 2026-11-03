"""Place the glyphs of a text on one baseline and measure the ink box (font units)."""
from fontTools.pens.boundsPen import BoundsPen

TRACK = -0.01  # letter-spacing in em (negative = tighter)


def glyph_layout(font, text):
    cmap, glyphs, hmtx = font.getBestCmap(), font.getGlyphSet(), font["hmtx"]
    upm = font["head"].unitsPerEm
    x, boxes, order = 0, [], []
    for ch in text:
        name = cmap[ord(ch)]
        bp = BoundsPen(glyphs)
        glyphs[name].draw(bp)
        order.append((name, x))
        boxes.append((bp.bounds[0] + x, bp.bounds[1], bp.bounds[2] + x, bp.bounds[3]))
        x += hmtx[name][0] + TRACK * upm
    ink = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
    return order, ink
