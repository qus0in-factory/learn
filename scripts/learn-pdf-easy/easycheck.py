from pathlib import Path
from subprocess import check_output
from bounds import check_bounds
from samples import render_samples
from verify_text import check_text
import verify_text

_decks = None

class DeckPath(Path):
    @property
    def parent(self):
        return self
    def __truediv__(self, other):
        return _decks if other == 'pilot' else Path.__truediv__(self, other)

def check_pdf(root, lesson, decks):
    global _decks
    _decks = decks
    verify_text.Path = DeckPath
    pdf = root / (lesson['name'] + '.pdf')
    check_bounds(pdf, lesson['pages'])
    info = check_output(['pdfinfo', str(pdf)]).decode()
    title = next(line.split(':', 1)[1].strip()
                 for line in info.splitlines() if line.startswith('Title:'))
    assert title == lesson['title'], (pdf, title)
    text = check_output(['pdftotext', str(pdf), '-']).decode()
    check_text(lesson['name'], text, lesson['pages'])
    (root / (lesson['name'] + '.txt')).write_text(text)
    render_samples(root, lesson, pdf)
