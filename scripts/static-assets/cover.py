import json, sys
from pathlib import Path
from PIL import Image

config = json.loads(Path('learn-site/.vitepress/cover.json').read_text())
config.update(json.loads(Path(sys.argv[1]).read_text()))
source = Image.open(config['source']).convert('RGB')
assert source.size == tuple(config['intrinsic'].values())
stem = config.get('stem', 'cover')
for width in config['widths']:
    height = round(width * source.height / source.width)
    image = source.resize((width, height), Image.Resampling.LANCZOS)
    target = Path('docs/public') / f'{stem}-{width}'
    image.save(str(target) + '.avif', quality=config['avifQuality'],
               speed=6, subsampling='4:4:4')
    image.save(str(target) + '.webp', quality=config['quality'], method=6)
