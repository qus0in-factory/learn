import json
import sys
from pathlib import Path
from subprocess import check_output
from bounds import check_bounds
from samples import render_samples

root = Path(sys.argv[1])
manifest = json.loads((root / 'manifest.json').read_text())
assert len(manifest) == 12
for lesson in manifest:
    pdf = root / (lesson['name'] + '.pdf')
    check_bounds(pdf, lesson['pages'])
    info = check_output(['pdfinfo', str(pdf)]).decode()
    title = next(line.split(':', 1)[1].strip() for line in info.splitlines()
                 if line.startswith('Title:'))
    assert title == lesson['title'], (pdf, title)
    text = check_output(['pdftotext', str(pdf), '-']).decode()
    pages = text.split('\f')[:-1]
    assert len(pages) == lesson['pages'] > 1
    assert all(len(p.strip()) > 15 and '\ufffd' not in p for p in pages)
    (root / (lesson['name'] + '.txt')).write_text(text)
    render_samples(root, lesson, pdf)
    print(lesson['name'], len(pages), '16:9/text/bounds OK')
