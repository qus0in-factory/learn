"""Regenerate the favicon set with deterministic colors and corner radius."""
import json
from pathlib import Path
from PIL import Image
from render import render
from export import export

style = json.loads(Path('assets/favicon/style.json').read_text())
public = Path('docs/public')
source = Image.open(style['source'])
for name, size in style['sizes'].items():
    render(source, size, style).save(public / name)
export(source, public, style)
