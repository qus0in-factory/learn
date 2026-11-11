import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / 'learn-pdf'))
sys.path.insert(0, str(Path(__file__).parent))
from easycheck import check_pdf
root = Path(sys.argv[1])
manifest = json.loads((root / 'manifest.json').read_text())
assert len(manifest) == 12
decks = Path(__file__).parent / 'decks'
for lesson in manifest:
    check_pdf(root, lesson, decks)
    print(lesson['name'], lesson['pages'], 'OK')
