from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parent
SOURCE = Path('C:/Users/yusuf/Desktop/Лента новостей.html')
ASSETS = SOURCE.with_name('Лента новостей_files')
target = ROOT / 'assets'
target.mkdir(exist_ok=True)
for p in ASSETS.iterdir():
    if p.suffix.lower() in {'.css', '.svg', '.png', '.jpg', '.jpeg', '.woff', '.woff2'}:
        shutil.copy2(p, target / p.name)
s = SOURCE.read_text(encoding='utf-8')
s = re.sub(r'<script\b[^>]*>[\s\S]*?</script\s*>', '', s, flags=re.I)
s = re.sub(r'<!--.*?-->', '', s, flags=re.S)
s = re.sub(r'<iframe\b[^>]*>[\s\S]*?</iframe\s*>', '', s, flags=re.I)
s = re.sub(r'\s+on\w+\s*=\s*("[^"]*"|\x27[^\x27]*\x27)', '', s, flags=re.I)
s = re.sub(r'<meta[^>]+http-equiv="Content-Security-Policy"[^>]*>', '', s, flags=re.I)
s = re.sub(r'<link[^>]+(?:rel="manifest"|rel="(?:shortcut )?icon")[^>]*>', '', s)
s = s.replace('./Лента новостей_files/', './assets/')
s = re.sub(r'(<a\b[^>]*?href=)["\x27][^"\x27]*["\x27]', r'\1"#"', s, flags=re.I)
s = re.sub(r'\s+target="[^"]*"', '', s)
s = s.replace('</head>', '<link rel="stylesheet" href="./app.css"></head>')
s = s.replace('</body>', '<script src="./app.js"></script></body>')
(ROOT / 'index.html').write_text(s, encoding='utf-8')
print('Created index.html and copied styles/images. Original scripts excluded.')
