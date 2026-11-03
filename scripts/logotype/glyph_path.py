"""Return the glyph outlines of a text as one SVG path (integer coordinates, y-down)."""
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from glyph_layout import glyph_layout

EM = 200  # output units per em: integer coordinates stay precise but small


def glyph_path(font_path, text):
    font = TTFont(font_path)
    glyphs = font.getGlyphSet()
    k = EM / font["head"].unitsPerEm
    order, (x0, y0, x1, y1) = glyph_layout(font, text)
    pen = SVGPathPen(glyphs, ntos=lambda v: str(int(round(v))))
    for name, ox in order:
        # font y-up -> svg y-down, move the ink box to the origin
        glyphs[name].draw(TransformPen(pen, (k, 0, 0, -k, (ox - x0) * k, y1 * k)))
    return pen.getCommands(), round((x1 - x0) * k), round((y1 - y0) * k)
