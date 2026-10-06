// Writes brands.html, sport.html and artists.html from index.html: the same
// page, already set to its world, so each door has its own address and search
// engines read the door's words. Run after any change to index.html or to the
// DOORS texts in assets/doors.js:  node .github/scripts/build-doors.mjs
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (f) => readFileSync(new URL(f, root), "utf8");
const js = read("assets/doors.js");
const DOORS = Function(`return ${js.slice(js.indexOf("{", js.indexOf("var DOORS")), js.indexOf("\n  };", js.indexOf("var DOORS")) + 4)}`)();
const index = read("index.html");

const PAGES = {
  brand: {
    file: "brands.html",
    title: "FAN/IP for brands · Get your customers posting about you",
    description:
      "Give your customers a reason to post about your brand, reward them for it and see how many people they reached. A fan club under your brand's name, for beauty, fashion, food and lifestyle brands.",
  },
  sport: {
    file: "sport.html",
    title: "FAN/IP for sport and esports · Supporters who post, reach your sponsors can see",
    description:
      "Give your supporters a reason to post about the club, reward them for it and show your sponsors how many people they reached. A fan club under your name, for sports clubs, esports teams and gaming venues.",
  },
  artist: {
    file: "artists.html",
    title: "FAN/IP for artists and creators · Fans who post after every show",
    description:
      "Give your fans a reason to post about you, reward them for it and see how many people they reached. A fan club under your name, for bands, DJs, rappers, festivals and creators.",
  },
};

const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function swap(html, re, fn) {
  const m = html.match(re);
  if (!m) throw new Error(`not found: ${re}`);
  return html.replace(re, fn);
}

for (const [key, page] of Object.entries(PAGES)) {
  const d = DOORS[key];
  const text = {
    step1: d.step1, vigTitle: d.vigTitle, vigText: d.vigText, vigPoints: d.vigPoints,
    reachTitle: d.reachTitle, vigGoal: d.vigGoal,
  };
  const url = `https://fan-ip.com/${page.file}`;
  let h = index;
  h = swap(h, /<html lang="en">/, `<html lang="en" data-door="${key}">`);
  h = swap(h, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  h = swap(h, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.description)}">`);
  h = swap(h, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(page.description)}">`);
  h = swap(h, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(page.description)}">`);
  h = swap(h, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  h = swap(h, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  for (const [slot, value] of Object.entries(text)) {
    h = swap(h, new RegExp(`(<[a-z0-9]+ [^>]*?)data-slot="${slot}">([^<]*)<`), (_, open, generic) =>
      `${open}data-slot="${slot}" data-generic="${esc(generic)}">${esc(value)}<`);
  }
  h = swap(h, /<p class="prod-adapt t-small" data-slot="adapt" hidden><\/p>/, () =>
    `<p class="prod-adapt t-small" data-slot="adapt">${esc(d.adapt)}</p>`);
  h = swap(h, new RegExp(`data-door-pick="${key}" aria-pressed="false"`), `data-door-pick="${key}" aria-pressed="true"`);
  // In-page anchors stay on this page; links to the home page stay on "./".
  writeFileSync(new URL(page.file, root), h);
  console.log(`wrote ${page.file}`);
}
