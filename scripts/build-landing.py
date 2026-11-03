from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'landing'
TARGET = ROOT / 'dist/hdai/git'


def main():
    for name in ('index.html', 'base.css', 'links.css'):
        if not (SOURCE / name).is_file():
            raise SystemExit(f'missing landing asset: {SOURCE / name}')
    TARGET.mkdir(parents=True, exist_ok=True)
    for name in ('index.html', 'base.css', 'links.css'):
        shutil.copyfile(SOURCE / name, TARGET / name)
        print((TARGET / name).relative_to(ROOT))


if __name__ == '__main__':
    main()
