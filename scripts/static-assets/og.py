import json
from pathlib import Path
from PIL import Image, ImageOps

config = json.loads(Path('learn-site/.vitepress/og.json').read_text())
size = (config['width'], config['height'])
inner = tuple(value - 2 * config['padding'] for value in size)
for image in config['images'].values():
    source = Image.open(image['source']).convert('RGB')
    cover = ImageOps.contain(source, inner, Image.Resampling.LANCZOS)
    canvas = Image.new('RGB', size, config['background'])
    canvas.paste(cover, ((size[0] - cover.width) // 2, (size[1] - cover.height) // 2))
    canvas.save('docs/public' + image['path'], quality=config['quality'], optimize=True)
