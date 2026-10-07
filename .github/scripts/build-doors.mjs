// Writes brands.html, sport.html and artists.html from index.html. Each page
// keeps the home page's design and sections, so changes to index.html flow
// through, but speaks to its own world: its own h1 and intro under the big
// "Turn fandom into impact.", a world section, a world FAQ (with FAQPage
// JSON-LD), and the home sections in that world's words. The words live in
// door-pages.mjs; the live slots (mission card, step 1) in assets/doors.js.
// Run after any change to index.html, door-pages.mjs or the DOORS texts:
//   node .github/scripts/build-doors.mjs
// It stops with "not found" if a piece of index.html it rewrites has moved.
import { readFileSync, writeFileSync } from "node:fs";
import { PAGES } from "./door-pages.mjs";

const root = new URL("../../", import.meta.url);
const read = (f) => readFileSync(new URL(f, root), "utf8");
const js = read("assets/doors.js");
const DOORS = Function(`return ${js.slice(js.indexOf("{", js.indexOf("var DOORS")), js.indexOf("\n  };", js.indexOf("var DOORS")) + 4)}`)();
const index = read("index.html");

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const plain = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function swap(html, re, fn) {
  const m = html.match(re);
  if (!m) throw new Error(`not found: ${re}`);
  return html.replace(re, fn);
}
// A whole section of the home page, with the one-line comment above it.
const sectionRe = (id) => new RegExp(`[ \\t]*(?:<!--[^\\n]*-->\\n[ \\t]*)?<section id="${id}"[\\s\\S]*?<\\/section>\\n`);
function cut(html, re) {
  const m = html.match(re);
  if (!m) throw new Error(`not found: ${re}`);
  return [html.replace(re, ""), m[0]];
}

const ticker = (items) => {
  const ul = `<ul role="list">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  return `<div class="door-ticker__track">${ul}${ul}</div>`;
};

function worldSection(key, w) {
  const cols = w.cols
    .map((c, i) => {
      const body = c.list
        ? `<ul class="dw-list" role="list">${c.list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>${c.after ? `\n              <p class="dw-after t-small">${esc(c.after)}</p>` : ""}`
        : `<p class="dw-p t-body">${c.pHtml}</p>`;
      return `            <div class="dw-col${c.list ? " dw-col--list" : ""}">
              <h3 class="dw-h"><span class="dw-n" aria-hidden="true">0${i + 1}</span>${esc(c.h)}</h3>
              ${body}
            </div>`;
    })
    .join("\n");
  return `    <!-- W. This world in its own words (written by build-doors.mjs from door-pages.mjs) -->
    <section id="for-you" class="dw" data-surface="light" data-for="${key}" aria-labelledby="dw-title">
      <div class="container dw-grid">
        <div class="dw-head">
          <p class="dw-k t-small">${esc(w.kicker)}</p>
          <h2 id="dw-title" class="dw-title t-h2">${esc(w.title)}</h2>
        </div>
        <p class="dw-lead t-lead">${esc(w.lead)}</p>
        <div class="dw-cols">
${cols}
        </div>
        <p class="dw-foot t-small">${w.footHtml} <span aria-hidden="true">→</span></p>
      </div>
    </section>

`;
}

function faqSection(page) {
  const items = page.faq
    .map((f, i) => `          <div class="dq-item">
            <h3 class="dq-q" id="dq-${i + 1}">${esc(f.q)}</h3>
            <p class="dq-a t-body">${f.aHtml}</p>
          </div>`)
    .join("\n");
  return `    <!-- Q. This world's questions (FAQPage JSON-LD in the head) -->
    <section id="questions" class="dq" data-surface="warm" aria-labelledby="dq-title">
      <div class="container dq-grid">
        <div class="dq-head">
          <h2 id="dq-title" class="dq-title t-h2">${esc(page.faqTitle)}</h2>
          <p class="dq-more t-body">More answers, for every world, in the <a href="faq.html">full FAQ</a>.</p>
        </div>
        <div class="dq-list">
${items}
        </div>
      </div>
    </section>

`;
}

function jsonLd(html, page, url) {
  return swap(html, /<script type="application\/ld\+json">\n([\s\S]*?)\n  <\/script>/, (_, body) => {
    const data = JSON.parse(body);
    const web = data["@graph"].find((n) => n["@type"] === "WebPage");
    if (!web) throw new Error("not found: WebPage in JSON-LD");
    Object.assign(web, { "@id": `${url}#webpage`, url, name: page.title, description: page.description });
    data["@graph"].push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage: "en",
      isPartOf: { "@id": "https://fan-ip.com/#website" },
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(f.aHtml) },
      })),
    });
    const out = JSON.stringify(data, null, 2).replace(/\n/g, "\n  ");
    return `<script type="application/ld+json">\n  ${out}\n  </script>`;
  });
}

for (const [key, page] of Object.entries(PAGES)) {
  const d = DOORS[key];
  if (!d) throw new Error(`no DOORS entry for ${key}`);
  for (const [field, max] of [["title", 60], ["description", 155]]) {
    if (page[field].length > max) throw new Error(`${page.file}: ${field} is ${page[field].length} characters (max ${max})`);
  }
  const url = `https://fan-ip.com/${page.file}`;
  let h = index;

  // Head: title, description, social cards, canonical, JSON-LD with the FAQ.
  h = swap(h, /<html lang="en">/, `<html lang="en" data-door="${key}">`);
  h = swap(h, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  h = swap(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.description)}">`);
  h = swap(h, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(page.ogTitle)}">`);
  h = swap(h, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(page.ogTitle)}">`);
  h = swap(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(page.description)}">`);
  h = swap(h, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(page.description)}">`);
  h = swap(h, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  h = swap(h, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  h = jsonLd(h, page, url);

  // Hero: "Turn fandom into impact." stays big, as the brand line; the
  // world's promise becomes the h1, with its own lead and a trial button.
  h = swap(h, /<h1 id="hero-title" class="([^"]*)">([\s\S]*?)<\/h1>/, (_, cls, inner) => `<p id="hero-title" class="${cls}">${inner}</p>`);
  h = swap(h, /(<section id="top"[^>]*?)aria-labelledby="hero-title"/, `$1aria-labelledby="door-title"`);
  h = swap(h, /<p class="hero-promise">[\s\S]*?<\/p>/, `<h1 id="door-title" class="hero-promise">${page.h1Html}</h1>`);
  h = swap(h, /<p class="hero-lead t-lead">[\s\S]*?<\/p>/, `<p class="hero-lead t-lead">${esc(page.lead)}</p>`);
  h = swap(h, /<div class="hero-actions">[\s\S]*?<\/div>/, `<div class="hero-actions">
          <a class="btn btn--primary" href="https://app.fan-ip.com/start?for=${key}" data-start-link>Start my free trial</a>
          <a class="hero-link" href="book-a-demo.html">Book a demo</a>
        </div>`);
  h = swap(h, /(<div class="door">\s*<p class="sr-only">)[^<]*(<\/p>)/, `$1${esc(page.tickerLabel)}$2`);
  h = swap(h, /<div class="door-ticker__track">[\s\S]*?<\/ul><\/div>/, ticker(page.ticker));

  // Why: the same argument, in the world's words.
  const w = page.why;
  h = swap(h, /(<h2 id="why-title" class="[^"]*">)[^<]*(<\/h2>)/, `$1${esc(w.title)}$2`);
  h = swap(h, /<div class="why-old">[\s\S]*?<\/div>/, `<div class="why-old">
          <p class="why-small t-small">${esc(w.oldLabel)}</p>
${w.oldLines.map((l) => `          <p class="why-line t-body">${esc(l)}</p>`).join("\n")}
        </div>`);
  h = swap(h, /(<ul class="why-verbs t-h2">)[\s\S]*?(\s*<\/ul>)/, `$1\n${w.verbs
    .map(([v, hint]) => `            <li><span class="why-verb">${esc(v)} <span aria-hidden="true">/</span></span><span class="why-hint"><span class="sr-only">, </span>${esc(hint)}</span></li>`)
    .join("\n")}$2`);
  h = swap(h, /(<p class="why-outcome">)[^<]*(<\/p>)/, `$1${esc(w.outcome)}$2`);
  h = swap(h, /(<p class="why-note t-body">)[^<]*(<\/p>)/, `$1${esc(w.note)}$2`);

  // The world section, right under the hero.
  h = swap(h, sectionRe("why"), (m) => worldSection(key, page.world) + m);

  // Three steps: the live slots from DOORS, then this world's lines.
  const text = {
    step1: d.step1, vigTitle: d.vigTitle, vigText: d.vigText, vigPoints: d.vigPoints,
    reachTitle: d.reachTitle, vigGoal: d.vigGoal,
  };
  for (const [slot, value] of Object.entries(text)) {
    h = swap(h, new RegExp(`(<[a-z0-9]+ [^>]*?)data-slot="${slot}">([^<]*)<`), (_, open, generic) =>
      `${open}data-slot="${slot}" data-generic="${esc(generic)}">${esc(value)}<`);
  }
  h = swap(h, /<p class="prod-adapt t-small" data-slot="adapt" hidden><\/p>/, () =>
    `<p class="prod-adapt t-small" data-slot="adapt">${esc(d.adapt)}</p>`);
  const p = page.product;
  h = swap(h, /(<h2 id="product-title" class="[^"]*">)[\s\S]*?(<\/h2>)/, `$1${p.titleHtml}$2`);
  h = swap(h, /(<span class="steps3__n">2<\/span><h3 class="steps3__h">[^<]*<\/h3><p class="t-body">)[^<]*(<\/p>)/, `$1${esc(p.step2)}$2`);
  h = swap(h, /(<span class="steps3__n">3<\/span><h3 class="steps3__h">[^<]*<\/h3><p class="t-body">)[^<]*(<\/p>)/, `$1${esc(p.step3)}$2`);
  h = swap(h, /(<p class="prod-caption t-small">)[^<]*/, `$1${esc(p.caption)}`);

  // What you see: this world's result screen only.
  h = swap(h, /(<h2 id="result-title" class="[^"]*">)[^<]*(<\/h2>)/, `$1${esc(page.resultTitle)}$2`);
  h = swap(h, /[ \t]*<li class="rs-card" data-for="(\w+)">[\s\S]*?<\/li>\n/g, (m, k) => (k === key ? m : ""));
  if (!h.includes(`<li class="rs-card" data-for="${key}">`)) throw new Error(`not found: result card ${key}`);
  h = swap(h, /[ \t]*<p class="rs-swipe[^"]*"[^>]*>[^<]*<\/p>\n/, "");
  h = swap(h, /<p class="rs-caption t-small">[\s\S]*?<\/p>/, `<p class="rs-caption t-small">${page.resultCaptionHtml}</p>`);

  // Live demos: all three stay, this world's first (CSS).
  h = swap(h, /(<p class="wl-lead t-lead">)[^<]*(<\/p>)/, `$1${esc(page.demosLead)}$2`);

  // "Built for anyone with fans" points to the three pages: not needed here.
  h = swap(h, sectionRe("for"), "");

  // The world picker moves down, before the prices, with this world's FAQ.
  h = swap(h, /(<p class="world-lead t-lead">)[^<]*(<\/p>)/, `$1${esc(page.worldLead)}$2`);
  h = swap(h, new RegExp(`data-door-pick="${key}" aria-pressed="false"`), `data-door-pick="${key}" aria-pressed="true"`);
  let picker;
  [h, picker] = cut(h, /[ \t]*(?:<!--[^\n]*-->\n[ \t]*)?<section id="world"[\s\S]*?<\/section>\n[ \t]*<a class="world-chip"[\s\S]*?<\/a>\n/);
  h = swap(h, sectionRe("pricing"), (m) => faqSection(page) + picker + "\n" + m);

  // Prices: this world's lines, this world's "which plan".
  const pr = page.pricing;
  h = swap(h, /(<p class="price-lead t-lead">)[^<]*(<\/p>)/, `$1${esc(pr.lead)}$2`);
  let n = 0;
  h = swap(h, /(<p class="plan-for t-body">)[^<]*(<\/p>)/g, (_, a, b) => `${a}${esc(pr.planFor[n++])}${b}`);
  if (n !== pr.planFor.length) throw new Error(`${page.file}: ${n} plan lines in index.html, ${pr.planFor.length} in door-pages.mjs`);
  h = swap(h, /[ \t]*<li data-for="(\w+)"><b>[\s\S]*?<\/li>\n/g, (m, k) => (k === key ? m : ""));
  h = swap(h, /href="https:\/\/app\.fan-ip\.com\/start" data-start-link/, `href="https://app.fan-ip.com/start?for=${key}" data-start-link`);

  // See it with your name, the closing line and the footer.
  h = swap(h, /(<p class="ytry-lead t-body">)[^<]*(<\/p>)/, `$1${esc(page.tryLead)}$2`);
  h = swap(h, /(id="door-name"[^>]*placeholder=")[^"]*"/, `$1${esc(page.tryPlaceholder)}"`);
  h = swap(h, /<a data-for="(\w+)" href="[^"]*">[^<]*<\/a>/g, (m, k) => (k === key ? m : ""));
  h = swap(h, /(<p class="close-lead t-lead">)[^<]*(<\/p>)/, `$1${esc(page.closeLead)}$2`);
  h = swap(h, /(<p class="foot-sentence t-body">)[^<]*(<\/p>)/, `$1${esc(page.footSentence)}$2`);

  if ((h.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`${page.file}: not exactly one h1`);
  writeFileSync(new URL(page.file, root), h);
  console.log(`wrote ${page.file} (title ${page.title.length}, description ${page.description.length} characters)`);
}
