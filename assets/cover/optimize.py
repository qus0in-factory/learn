"""Generate the web cover without altering the preserved attachment."""
import json
from pathlib import Path
from PIL import Image

config = json.loads(Path('learn-site/.vitepress/cover.json').read_text())
image = Image.open(config['source']).convert('RGB')
for width in config['widths']:
    height = round(width * image.height / image.width)
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(Path('docs/public') / f'cover-{width}.webp',
                 format='WEBP', quality=config['quality'], method=6)
