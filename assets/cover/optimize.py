"""Generate the web cover without altering the preserved attachment."""
import json
from pathlib import Path
from PIL import Image

config = json.loads(Path('learn-site/.vitepress/cover.json').read_text())
image = Image.open(config['source']).convert('RGB')
image = image.resize((config['width'], config['height']), Image.Resampling.LANCZOS)
image.save(Path('docs/public') / config['src'].lstrip('/'),
           format='WEBP', quality=config['quality'], method=6)
