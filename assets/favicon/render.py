"""Apply the configured palette and rounded white tile after resizing."""
from PIL import Image, ImageColor, ImageDraw


def render(source, size, style, tile=True):
    colors = [ImageColor.getrgb(style[k]) for k in ('background', 'book', 'fire')]
    image = source.convert('RGB').resize((size, size), Image.Resampling.LANCZOS)
    pixels = []
    for r, g, b in image.get_flattened_data():
        fire = r > 100 and r - g > 40 and r - b > 40
        pixels.append(colors[2] if fire else colors[int((r + g + b) / 3 < 128)])
    image.putdata(pixels)
    image = image.convert('RGBA')
    if not tile:
        return image
    mask = Image.new('L', image.size)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=round(size * style['radius']), fill=255)
    image.putalpha(mask)
    return image
