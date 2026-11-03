import json
import re
import sys
from pathlib import Path
from subprocess import check_output

root = Path(sys.argv[1])
result = []
for item in json.loads((root / 'manifest.json').read_text()):
    pdf = str(root / (item['name'] + '.pdf'))
    rows = check_output(['pdffonts', pdf]).decode().splitlines()[2:]
    assert rows and all(row.split()[-5] == 'yes' for row in rows)
    fonts = sorted({re.sub(r'^[A-Z]{6}\+', '', row.split()[0]) for row in rows})
    assert all(name.startswith(('NotoSansKR', 'NotoSansMono')) for name in fonts)
    text = check_output(['pdftotext', pdf, '-']).decode()
    result.append(dict(name=item['name'], pages=item['pages'], size=[960, 540],
                       text=re.sub(r'\s+', '', text), fonts=fonts))
(root / 'repro.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
