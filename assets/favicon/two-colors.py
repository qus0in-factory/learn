"""Fix generated favicon assets to exactly two brand colors after resizing."""
import base64
from pathlib import Path
from PIL import Image

public = Path('docs/public')
palette = Image.new('P', (1, 1))
palette.putpalette([32, 33, 36, 242, 106, 33] + [0] * 762)
for path in public.glob('*.png'):
    image = Image.open(path).convert('RGB')
    image.quantize(palette=palette, dither=Image.Dither.NONE).save(path)
source = Image.open(public / 'favicon-96x96.png')
source.save(public / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
data = base64.b64encode((public / 'web-app-manifest-192x192.png').read_bytes()).decode()
(public / 'favicon.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">'
    f'<image href="data:image/png;base64,{data}" width="192" height="192"/></svg>\n')
