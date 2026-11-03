from subprocess import check_output
import xml.etree.ElementTree as ET


def check_bounds(pdf, count):
    xml = check_output(['pdftotext', '-bbox', str(pdf), '-'])
    tree = ET.fromstring(xml)
    pages = tree.findall('.//{*}page')
    assert len(pages) == count
    for page in pages:
        w, h = (float(page.attrib[k]) for k in ('width', 'height'))
        assert abs(w / h - 16 / 9) < .001, (pdf, w, h)
        for word in page.findall('.//{*}word'):
            x0, y0, x1, y1 = (float(word.attrib[k]) for k in
                                ('xMin', 'yMin', 'xMax', 'yMax'))
            assert 0 <= x0 <= x1 <= w and 0 <= y0 <= y1 <= h, (pdf, word.text)
