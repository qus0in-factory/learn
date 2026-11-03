"""Export only the book and flame on transparency, without a white tile."""
from PIL import ImageColor
from render import render


def header(source, public, style):
    config = style['header']
    image = render(source, config['size'], style, tile=False)
    background = ImageColor.getrgb(style['background'])
    image.putdata([
        (*pixel[:3], 0 if pixel[:3] == background else pixel[3])
        for pixel in image.get_flattened_data()
    ])
    image.crop(image.getbbox()).save(public / config['file'])
