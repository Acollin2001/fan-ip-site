// Reach calculator: views of members' posts and their media value, the same
// sum as Post impact in the FAN/IP admin (views / 1,000 x CPM; typical niche prices: sport €7, music €5, brands €8).
// Runs only in the browser: no requests, no cookies, no storage.

function init(form) {
  const fields = ["members", "share", "posts", "views", "cpm"];
  const intFields = new Set(["members", "views"]);
  const input = Object.fromEntries(fields.map((f) => [f, form.elements[f]]));
  const defaults = Object.fromEntries(fields.map((f) => [f, parse(f, input[f].defaultValue)]));
  const out = (k) => document.querySelector(`[data-o="${k}"]`);
  const ones = document.querySelector("[data-ones]");
  const copy = document.querySelector("[data-copy]");
  const values = { ...defaults };

  // 100 small "1"s, one per member out of 100. Posting members light up in a
  // fixed scattered order so the crowd doesn't fill from the top-left corner.
  const cells = Array.from({ length: 100 }, () => ones.appendChild(document.createElement("span")));
  const order = shuffled(100, 7);

  const params = new URLSearchParams(location.search);
  // ?for=sport|artist|brand starts from that niche's typical ad price.
  const niche = form.querySelector(`[data-for="${params.get("for")}"]`);
  if (niche && !params.has("cpm")) {
    values.cpm = Number(niche.getAttribute("data-cpm"));
    input.cpm.value = show("cpm", values.cpm);
  }
  form.querySelectorAll("[data-cpm]").forEach((b) =>
    b.addEventListener("click", () => {
      input.cpm.value = b.getAttribute("data-cpm");
      input.cpm.dispatchEvent(new Event("input", { bubbles: true }));
      input.cpm.dispatchEvent(new Event("change", { bubbles: true }));
    }),
  );
  for (const f of fields) {
    if (!params.has(f)) continue;
    const v = parse(f, params.get(f));
    if (v !== null) {
      values[f] = clamp(f, v);
      input[f].value = show(f, values[f]);
    }
  }

  for (const f of fields) {
    size(input[f]);
    input[f].addEventListener("input", () => {
      const v = parse(f, input[f].value);
      input[f].setAttribute("aria-invalid", v === null ? "true" : "false");
      if (v !== null) values[f] = clamp(f, v);
      size(input[f]);
      render();
    });
    input[f].addEventListener("change", () => {
      input[f].value = show(f, values[f]);
      input[f].setAttribute("aria-invalid", "false");
      size(input[f]);
      remember();
    });
  }
  form.addEventListener("submit", (e) => e.preventDefault());

  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener("click", async () => {
      remember();
      const label = copy.textContent;
      try {
        await navigator.clipboard.writeText(location.href);
        copy.textContent = "Link copied";
      } catch {
        copy.textContent = "Copy the address bar instead";
      }
      setTimeout(() => (copy.textContent = label), 2400);
    });
  }

  // Small screens: the estimate sits below the form, so a bar at the bottom
  // shows it while the form is on screen and the estimate isn't.
  const peek = document.querySelector("[data-peek]");
  const panel = document.getElementById("estimate");
  if (peek && panel && "IntersectionObserver" in window) {
    const seen = { form: false, panel: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen[e.target === panel ? "panel" : "form"] = e.isIntersecting;
      peek.hidden = !(seen.form && !seen.panel);
    });
    io.observe(form);
    io.observe(panel);
  }

  render();

  function render() {
    const { members, share, posts, views, cpm } = values;
    const postsMonth = (members * share) / 100 * posts;
    const viewsMonth = postsMonth * views;
    const valueMonth = (viewsMonth / 1000) * cpm;

    out("views-m").textContent = big(viewsMonth);
    out("value-m").textContent = euro(valueMonth);
    out("peek-views").textContent = big(viewsMonth);
    out("peek-value").textContent = euro(valueMonth);
    out("views-y").textContent = big(viewsMonth * 12);
    out("value-y").textContent = euro(valueMonth * 12);
    out("math").textContent =
      `${int(members)} members × ${num(share)}% × ${num(posts)} ${posts === 1 ? "post" : "posts"} = ${about(postsMonth)} ${Math.round(postsMonth) === 1 ? "post" : "posts"} a month. ` +
      `${int(postsMonth)} × ${int(views)} views = ${int(viewsMonth)} views. ` +
      `${int(viewsMonth)} ÷ 1,000 × ${euro(cpm)} = ${euro(valueMonth)}.`;

    const lit = Math.min(100, Math.round(share));
    order.forEach((cell, i) => cells[cell].classList.toggle("is-on", i < lit));
    out("crowd").textContent = crowd(share);
  }

  // Keep the numbers in the address so a link brings them back. Defaults stay out.
  function remember() {
    const q = new URLSearchParams();
    for (const f of fields) if (values[f] !== defaults[f]) q.set(f, String(values[f]));
    const s = q.toString();
    try {
      history.replaceState(null, "", s ? `?${s}` : location.pathname);
    } catch {}
  }

  function parse(f, text) {
    let t = String(text).trim().toLowerCase().replace(/[\s€%’']/g, "");
    if (!t) return null;
    let mult = 1;
    if (intFields.has(f)) {
      const m = t.match(/^([\d.,]+)(k|m)$/);
      if (m) {
        mult = m[2] === "k" ? 1e3 : 1e6;
        t = m[1].replace(",", ".");
      } else {
        t = t.replace(/[.,]/g, "");
      }
    } else if (t.includes(",") && !t.includes(".")) {
      // "2,5" is two and a half; "1,000" is a thousand.
      t = /,\d{3}$/.test(t) ? t.replace(/,/g, "") : t.replace(",", ".");
    } else {
      t = t.replace(/,/g, "");
    }
    if (!/^\d*\.?\d+$|^\d+\.$/.test(t)) return null;
    const v = Number(t) * mult;
    return Number.isFinite(v) ? v : null;
  }

  function clamp(f, v) {
    const el = input[f];
    const r = Math.min(Number(el.dataset.max), Math.max(Number(el.dataset.min), v));
    return intFields.has(f) ? Math.round(r) : Math.round(r * 100) / 100;
  }

  function show(f, v) {
    return intFields.has(f) ? int(v) : num(v);
  }
}

function size(el) {
  el.style.inlineSize = `${Math.max(2, el.value.length) + 0.4}ch`;
}

const nf0 = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

function int(n) {
  return nf0.format(Math.round(n));
}
function num(n) {
  return nf2.format(n);
}
function about(n) {
  return Number.isInteger(Math.round(n * 100) / 100) ? int(n) : `about ${int(n)}`;
}
function big(n) {
  for (const [size, word] of [[1e9, "billion"], [1e6, "million"]]) {
    if (n >= size) {
      const x = n / size;
      return `${x >= 100 ? int(x) : nf1(x)} ${word}`;
    }
  }
  return int(n);
}
function nf1(x) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 }).format(x);
}
function euro(v) {
  if (v >= 1e6) return `€${big(v)}`;
  if (v > 0 && v < 100 && !Number.isInteger(Math.round(v * 100) / 100)) {
    return `€${v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `€${int(v)}`;
}
function crowd(share) {
  if (share <= 0) return "No member posts.";
  if (share >= 100) return "Every member posts.";
  if (share < 1) return "Fewer than 1 in every 100 members posts.";
  const n = Math.round(share);
  return `Out of every 100 members, ${Number.isInteger(share) ? "" : "about "}${n} ${n === 1 ? "posts" : "post"}.`;
}

// Same order on every visit (small seeded shuffle).
function shuffled(n, seed) {
  const a = Array.from({ length: n }, (_, i) => i);
  let s = seed >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const rcForm = document.querySelector("[data-rc]");
if (rcForm) init(rcForm);
