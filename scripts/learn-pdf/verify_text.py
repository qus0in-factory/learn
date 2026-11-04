import json
import re
from pathlib import Path


def check_text(name, text, count):
    source = Path(__file__).parent / 'pilot' / f'step{name[:2]}.json'
    deck = json.loads(source.read_text())
    pages = text.split('\f')[:-1]
    assert len(pages) == len(deck) == count > 1
    for i, (page, slide) in enumerate(zip(pages, deck), 1):
        value = re.sub(r'\s+', '', page)
        assert value and '\ufffd' not in page
        if slide['type'] == 'eof':
            assert page.strip() == '- EOF -'
        elif slide['type'] in ('cover', 'section'):
            expected = slide['title'] + f'{i}/{count}'
            assert value == re.sub(r'\s+', '', expected), (name, i, page)
        else:
            assert len(page.strip()) > 15, (name, i, page)
