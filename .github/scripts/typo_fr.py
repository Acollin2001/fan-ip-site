#!/usr/bin/env python3
"""French typography for the fr/ pages and the French texts of the generator.

    python3 .github/scripts/typo_fr.py fr/pricing.html .github/scripts/door-pages-fr.mjs

Write the French with ordinary spaces; this turns them into the right ones:
a no-break space before ":" and "€" and "%", a narrow no-break space before
"; ? !", inside « » and between groups of thousands (1 500). It is safe to run
again. In HTML it only touches text, a few attributes (content, alt,
aria-label, placeholder, title) and JSON-LD, never markup, scripts or styles.
In other files (.mjs, .js) it touches the text between quotes only.
"""
import re
import sys

NBSP, NNBSP = " ", " "


def fix(t):
    t = re.sub(r"(?<=\d) (?=\d{3}(?!\d))", NNBSP, t)
    t = re.sub(r"(?<=\d) (?=\d{3}(?!\d))", NNBSP, t)  # 1 000 000
    t = re.sub(r"(?<=\d) (?=[€%])", NBSP, t)
    t = re.sub(r"(?<=\d) (?=M\b)", NBSP, t)
    # a small number stays with its unit: "12 mois", "7 jours", "3 missions"
    t = re.sub(r"(?<![\d,.])(\d{1,2}) (?=(?:mois|jours?|ans?|missions?|récompenses?|niveaux?|dates?|accès|concerts?)\b)", r"\1" + NBSP, t)
    t = re.sub(r"(?<=\S) :(?=\s|$|<)", NBSP + ":", t)
    t = re.sub(r"(?<=\S) ([;?!])", NNBSP + r"\1", t)
    t = t.replace("« ", "«" + NNBSP).replace(" »", NNBSP + "»")
    return t


ATTRS = re.compile(r'(\s(?:content|alt|aria-label|placeholder|title)=")([^"]*)(")')


def html(src):
    out = []
    pos = 0
    token = re.compile(r"<!--.*?-->|<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>|<[^>]+>", re.S)
    for m in token.finditer(src):
        out.append(fix(src[pos:m.start()]))
        tok = m.group(0)
        if tok.startswith("<script") and "application/ld+json" in tok[: tok.index(">")]:
            head_end = tok.index(">") + 1
            body = tok[head_end:-len("</script>")]
            body = re.sub(r'"((?:[^"\\]|\\.)*)"', lambda s: '"' + fix(s.group(1)) + '"', body)
            tok = tok[:head_end] + body + "</script>"
        elif tok.startswith("<") and not tok.startswith(("<!--", "<script", "<style")):
            tok = ATTRS.sub(lambda a: a.group(1) + fix(a.group(2)) + a.group(3), tok)
        out.append(tok)
        pos = m.end()
    out.append(fix(src[pos:]))
    return "".join(out)


def code(src, start=None, end=None):
    a = src.index(start) if start else 0
    b = src.index(end, a) if end else len(src)
    part = re.sub(r'"((?:[^"\\\n]|\\.)*)"', lambda s: '"' + fix(s.group(1)) + '"', src[a:b])
    part = re.sub(r"'((?:[^'\\\n]|\\.)*)'", lambda s: "'" + fix(s.group(1)) + "'", part)
    return src[:a] + part + src[b:]


for path in sys.argv[1:]:
    with open(path, encoding="utf-8") as f:
        src = f.read()
    if path.endswith(".html"):
        new = html(src)
    elif path.endswith("doors.js"):
        new = code(src, "var DOORS_FR", "\n  };")
    else:
        new = code(src)
    if new != src:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        print("typeset", path)
