import json
import sys
from pathlib import Path
from subprocess import check_output
from bounds import check_bounds
from samples import render_samples
from verify_text import check_text

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
    check_text(lesson['name'], text, lesson['pages'])
    (root / (lesson['name'] + '.txt')).write_text(text)
    render_samples(root, lesson, pdf)
    print(lesson['name'], lesson['pages'], '16:9/text/bounds OK')
