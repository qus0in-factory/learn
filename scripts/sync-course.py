from pathlib import Path
import argparse
import shutil

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'docs/261102/source'
FILES = ('slides/slides.md', 'course-site/index.md', 'course-site/git-guide.md',
         'course-site/blocks/a.md', 'course-site/blocks/b.md',
         'course-site/blocks/c.md', 'course-site/blocks/d.md',
         'example-site/index.html', 'example-site/style.css')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--force', action='store_true')
    args = parser.parse_args()
    for name in FILES:
        if not (SOURCE / name).is_file():
            parser.error(f'missing source: {name}')
    conflicts = [name for name in FILES if (ROOT / name).exists()
                 and (ROOT / name).read_bytes() != (SOURCE / name).read_bytes()]
    if conflicts and not args.force:
        parser.error('different targets; inspect before --force: ' + ', '.join(conflicts))
    for name in FILES:
        target = ROOT / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(SOURCE / name, target)
        print(name)


if __name__ == '__main__':
    main()
