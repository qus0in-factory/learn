from subprocess import run


def render_samples(root, lesson, pdf):
    for number in lesson['samples']:
        target = root / f"{lesson['name']}-p{number}"
        run(['pdftoppm', '-f', str(number), '-l', str(number),
             '-singlefile', '-scale-to', '1280', '-png',
             str(pdf), str(target)], check=True)
