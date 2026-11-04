import json
from pathlib import Path
from PIL import Image, ImageChops

# Screenshot originals (docs/public/screenshots/*.png, kept unedited) -> shot-<stem>-<width>.{webp,avif}.
# Terminal captures (bottom-right pixel is the terminal background) lose only trailing blank rows.
SOURCE = Path('docs/public/screenshots')
OUT = Path('docs/public')
WIDTHS = json.loads(Path('learn-site/.vitepress/illustrations.json').read_text())['widths']
TERMINAL_BG = (239, 241, 245)
MARGIN = 24
QUALITY, AVIF_QUALITY = 90, 75

sizes = {}
for path in sorted(SOURCE.glob('*.png')):
    image = Image.open(path).convert('RGB')
    width, height = image.size
    if image.getpixel((width - 1, height - 1)) == TERMINAL_BG:
        box = ImageChops.difference(image, Image.new('RGB', image.size, TERMINAL_BG)).getbbox()
        image = image.crop((0, 0, width, min(height, box[3] + MARGIN)))
    sizes[path.stem] = {'width': image.width, 'height': image.height}
    for target_width in WIDTHS:
        resized = image.resize((target_width, round(target_width * image.height / image.width)),
                               Image.Resampling.LANCZOS)
        target = OUT / f'shot-{path.stem}-{target_width}'
        resized.save(str(target) + '.webp', quality=QUALITY, method=6)
        resized.save(str(target) + '.avif', quality=AVIF_QUALITY, speed=6, subsampling='4:4:4')
Path('learn-site/.vitepress/screenshots.json').write_text(
    json.dumps(sizes, indent=2, ensure_ascii=False) + '\n')
print(len(sizes), 'screenshots')
