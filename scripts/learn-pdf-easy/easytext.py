import json
from pathlib import Path
import verify_text
from subprocess import check_output


def check_text(name, text, count, decks):
    class DeckPath(Path):
        @property
        def parent(self):
            return self

        def __truediv__(self, other):
            return DeckPath(decks) if other == 'pilot' else super().__truediv__(other)

        def read_text(self, *args, **kwargs):
            cli = Path(__file__).with_name('easy-deck-json.mjs')
            deck = json.loads(check_output(['node', str(cli), str(self)]))
            # Raster images have no body text; SVG diagrams keep the shared check.
            for slide in deck:
                if slide['type'] == 'image' and not slide['image'].endswith('.svg'):
                    slide['type'] = 'section'
            return json.dumps(deck)

    original = verify_text.Path
    try:
        verify_text.Path = DeckPath
        verify_text.check_text(name, text, count)
    finally:
        verify_text.Path = original
