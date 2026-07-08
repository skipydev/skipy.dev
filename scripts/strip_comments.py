import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
patterns = [
    # JSX comments: {/* ... */}
    (re.compile(r"\{\/\*[\s\S]*?\*\/\}"), ''),
    # HTML comments
    (re.compile(r"<!--([\s\S]*?)-->"), ''),
    # Block comments /* ... */
    (re.compile(r"/\*[\s\S]*?\*/"), ''),
    # Line comments //... but not after : (avoid http://)
    (re.compile(r"(?<!:)//.*$", re.MULTILINE), ''),
]
exts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html', '.md']
changed_files = []

for p in root.rglob('*'):
    if p.suffix.lower() in exts and p.is_file():
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            continue
        new = text
        for pat, repl in patterns:
            new = pat.sub(repl, new)
        if new != text:
            p.write_text(new, encoding='utf-8')
            changed_files.append(str(p.relative_to(root)))

print('changed', len(changed_files))
for f in changed_files:
    print(f)
