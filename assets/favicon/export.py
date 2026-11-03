"""Export ICO, embedded SVG and matching manifest colors."""
import base64
import json
from render import render


def export(source, public, style):
    icons = [render(source, size, style) for size in (16, 32, 48)]
    icons[-1].save(public / 'favicon.ico', append_images=icons[:-1],
                   sizes=[i.size for i in icons], bitmap_format='png')
    data = base64.b64encode((public / 'web-app-manifest-192x192.png').read_bytes()).decode()
    (public / 'favicon.svg').write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">'
        f'<image href="data:image/png;base64,{data}" width="192" height="192"/></svg>\n')
    path = public / 'site.webmanifest'
    manifest = json.loads(path.read_text())
    for key in ('theme_color', 'background_color'):
        manifest[key] = style['background']
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
