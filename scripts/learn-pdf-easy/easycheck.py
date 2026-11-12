from subprocess import check_output
from bounds import check_bounds
from samples import render_samples
from easytext import check_text

def check_pdf(root, lesson, decks):
    pdf = root / (lesson['name'] + '.pdf')
    check_bounds(pdf, lesson['pages'])
    info = check_output(['pdfinfo', str(pdf)]).decode()
    title = next(line.split(':', 1)[1].strip()
                 for line in info.splitlines() if line.startswith('Title:'))
    assert title == lesson['title'], (pdf, title)
    text = check_output(['pdftotext', str(pdf), '-']).decode()
    check_text(lesson['name'], text, lesson['pages'], decks)
    (root / (lesson['name'] + '.txt')).write_text(text)
    render_samples(root, lesson, pdf)
