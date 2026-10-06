// Runs an exported demo brand page (export-demo.mjs) without the app: moves
// between the screens kept in <template data-screen>, and replays what the
// app does in the browser: the motion layer (src/components/motion-layer.tsx),
// figures counting up, the Album card, Reel's fitted headlines and Direct's
// messages arriving, and Board, Route, Dial, Print, Calendar, Riso and Metro
// through the app's own
// kinetics (kinetics.js, bundled from scenes/kinetics.ts). Members who ask for less motion get the screens at rest.
(() => {
  "use strict";
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const direction = root.dataset.direction || "editorial";
  // The screens were taken 390 px wide; a desktop scrollbar inside the phone
  // frame would narrow them and re-wrap text that Metro placed by measure.
  const noBar = document.createElement("style");
  noBar.textContent = "html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";
  document.head.append(noBar);
  const screens = {};
  document.querySelectorAll("template[data-screen]").forEach((t) => {
    screens[t.dataset.screen] = t;
  });

  // ---------------------------------------------------------------- motion
  // Same table as src/lib/motion/vocabulary.ts.
  const OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
  const OUT_QUART = "cubic-bezier(0.25, 1, 0.5, 1)";
  const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const SNAP = "cubic-bezier(0.2, 0, 0, 1)";
  const MOTION = {
    arena: { from: { opacity: 0, transform: "translateX(-24px)" }, media: { clipPath: "inset(0 100% 0 0)" }, duration: 380, stagger: 50, easing: SNAP, max: 8 },
    editorial: { from: { opacity: 0, transform: "translateY(20px)" }, media: { clipPath: "inset(100% 0 0 0)" }, duration: 900, stagger: 90, easing: OUT_EXPO, max: 6 },
    stage: { from: { opacity: 0, transform: "scale(0.97)", filter: "brightness(0.4)" }, duration: 700, stagger: 70, easing: OUT_EXPO, max: 6 },
    bold: { from: { opacity: 0, transform: "translateY(16px) rotate(-1.5deg) scale(0.96)" }, duration: 520, stagger: 60, easing: SPRING, max: 8 },
    album: { from: { opacity: 0, transform: "translateY(48px) rotate(-6deg) scale(0.9)" }, duration: 640, stagger: 80, easing: SPRING, max: 8 },
    reel: { from: { opacity: 0, transform: "translateY(32px)" }, media: { transform: "scale(1.12)", opacity: 0 }, duration: 560, stagger: 60, easing: OUT_EXPO, max: 6 },
    direct: { from: { opacity: 0, transform: "translateY(10px) scale(0.92)" }, duration: 380, stagger: 110, easing: SPRING, max: 10 },
    board: { from: { opacity: 0, transform: "perspective(700px) rotateX(-75deg)" }, duration: 460, stagger: 55, easing: "cubic-bezier(0.3, 1.4, 0.55, 1)", max: 8 },
    dial: { from: { opacity: 0, transform: "rotate(-3deg) translateY(10px)" }, duration: 520, stagger: 60, easing: SPRING, max: 8 },
    print: { from: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, media: { clipPath: "inset(0 100% 0 0)" }, duration: 620, stagger: 80, easing: OUT_QUART, max: 6 },
    calendar: { from: { opacity: 0, transform: "translateY(-14px) rotate(-1deg)" }, duration: 480, stagger: 60, easing: OUT_EXPO, max: 8 },
    riso: { from: { opacity: 0, transform: "translate(5px, 3px)", filter: "blur(1.5px)" }, duration: 560, stagger: 70, easing: OUT_QUART, max: 6 },
    metro: { from: { opacity: 0, transform: "translateY(18px)" }, duration: 520, stagger: 90, easing: SNAP, max: 8 },
  }; // prettier-ignore
  const v = MOTION[direction] || MOTION.editorial;
  const keyframes = (media) => {
    const from = (media && v.media) || v.from;
    const to = {};
    if (from.opacity !== undefined) to.opacity = 1;
    if (from.transform !== undefined) to.transform = "none";
    if (from.clipPath !== undefined) to.clipPath = "inset(0 0 0 0)";
    if (from.filter !== undefined) to.filter = "none";
    return [{ ...from }, to];
  };
  const BLOCKS = [
    "[data-reveal]",
    ".ds-hero",
    ".ds-section-head",
    ".ds-list > *",
    ".ds-card",
    ".ds-page > header",
    ".ds-page article",
    ".ds-empty",
    ".ds-disclosure",
  ].join(",");
  const MEDIA = ".ds-media, [data-reveal='media']";
  let observer = null;

  function play(elements) {
    elements.forEach((el, index) => {
      el.removeAttribute("data-reveal-pending");
      const media = el.matches(MEDIA);
      el.animate(keyframes(media), {
        duration: media ? v.duration * 1.4 : v.duration,
        delay: Math.min(index, v.max) * v.stagger,
        easing: v.easing,
        fill: "backwards",
      });
    });
  }

  function reveal(main) {
    if (reduce || !main) return;
    root.dataset.motion = "on";
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        arriving.forEach((el) => observer.unobserve(el));
        if (arriving.length) play(arriving);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const now = [];
    for (const el of main.querySelectorAll(`${BLOCKS}, ${MEDIA}`)) {
      if (el.closest("[data-reveal='off']")) continue;
      const outer = el.parentElement && el.parentElement.closest(BLOCKS);
      if (outer && main.contains(outer) && !el.matches(MEDIA)) continue;
      const box = el.getBoundingClientRect();
      if (box.top < innerHeight && box.bottom > 0) now.push(el);
      else {
        el.setAttribute("data-reveal-pending", "");
        observer.observe(el);
      }
    }
    play(now);
  }

  // ------------------------------------------------------------ count up
  function countUps(scope) {
    if (reduce) return;
    scope.querySelectorAll("[data-count-up]").forEach((el) => {
      const shown = el.querySelector("[aria-hidden]");
      const finalText = el.querySelector(".sr-only")?.textContent ?? "";
      const value = Number(finalText.replace(/[^\d-]/g, ""));
      if (!shown || !Number.isFinite(value) || value === 0) return;
      const format = new Intl.NumberFormat(root.lang || "fr");
      shown.textContent = format.format(0);
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / 1000);
            shown.textContent = format.format(Math.round(value * (1 - (1 - p) ** 4)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      io.observe(el);
    });
  }

  // ------------------------------------------------------------ Album card
  function albumCards(scope) {
    scope.querySelectorAll(".sc-album-card3d").forEach((card) => {
      card.addEventListener("click", () => {
        const flipped = card.hasAttribute("data-flipped");
        card.toggleAttribute("data-flipped", !flipped);
        card.setAttribute("aria-pressed", String(!flipped));
        card.querySelector(".sc-album-back")?.setAttribute("aria-hidden", String(flipped));
      });
      const set = (x, y) => {
        card.style.setProperty("--tilt-x", `${(-(y - 0.5) * 18).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${((x - 0.5) * 18).toFixed(2)}deg`);
        card.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
      };
      card.addEventListener("pointermove", (e) => {
        const box = card.getBoundingClientRect();
        set((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height);
        card.dataset.tilting = "";
      });
      card.addEventListener("pointerleave", () => {
        delete card.dataset.tilting;
        set(0.5, 0.5);
      });
    });
  }

  // ------------------------------------------------------- Reel headlines
  // Same measure as FitHeadlines in src/components/member/scenes/reel.tsx.
  function fitReel(scope) {
    const els = scope.querySelectorAll(".sc-reel-giant, .sc-reel-title");
    if (!els.length) return;
    const run = () => {
      els.forEach((el) => {
        const width = el.clientWidth;
        const base = Number(getComputedStyle(el).getPropertyValue("--fs")) || 20;
        if (!width) return;
        let size = (base / 100) * width;
        el.style.fontSize = `${size}px`;
        const final = el.dataset.fitText;
        if (final) {
          const probe = document.createElement("span");
          probe.textContent = final;
          probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
          el.append(probe);
          const drawn = probe.getBoundingClientRect().width;
          probe.remove();
          if (drawn > width) el.style.fontSize = `${size * (width / drawn) * 0.97}px`;
          return;
        }
        const range = document.createRange();
        range.selectNodeContents(el);
        const box = el.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
          const drawn = range.getBoundingClientRect();
          const inner = Math.max(drawn.width, drawn.right - box.left);
          if (inner <= width + 1) break;
          size *= (width / inner) * 0.97;
          el.style.fontSize = `${size}px`;
        }
      });
    };
    run();
    document.fonts?.ready.then(run);
    fitReel.current = run;
  }
  // Poster's and Stage's giant figures: shrink them until the final figure
  // (not the one counting up) fits its line.
  function fitXs(scope) {
    const els = scope.querySelectorAll("[data-xs-fit]");
    if (!els.length) return;
    const run = () =>
      els.forEach((el) => {
        el.style.fontSize = "";
        const width = el.clientWidth;
        if (!width) return;
        const probe = document.createElement("span");
        probe.textContent = (el.querySelector(".sr-only") || el).textContent;
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;left:0;top:0";
        el.append(probe);
        const drawn = probe.getBoundingClientRect().width;
        probe.remove();
        if (drawn > width) {
          const size = parseFloat(getComputedStyle(el).fontSize);
          el.style.fontSize = `${size * (width / drawn) * 0.97}px`;
        }
      });
    run();
    document.fonts?.ready.then(run);
    fitXs.current = run;
  }
  let lastWidth = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === lastWidth) return;
    lastWidth = innerWidth;
    fitReel.current?.();
    fitXs.current?.();
  });

  // -------------------------------------------------- Direct, arrivals
  const greeted = new Set();
  function directArrivals(scope, key) {
    if (reduce || key !== "home" || greeted.has(key)) return;
    const thread = scope.querySelector(".sc-direct-thread");
    if (!thread) return;
    greeted.add(key);
    const days = thread.querySelectorAll(".sc-direct-day");
    const today = days[days.length - 1];
    if (!today) return;
    const rows = [];
    let replies = null;
    for (let el = today.nextElementSibling; el; el = el.nextElementSibling) {
      if (el.classList.contains("sc-direct-replies")) replies = el;
      else if (el.classList.contains("sc-direct-row")) rows.push(el);
    }
    if (rows.length < 2) return;
    const later = rows.slice(1);
    later.forEach((r) => (r.hidden = true));
    if (replies) replies.hidden = true;
    const typing = document.createElement("div");
    typing.className = "sc-direct-row";
    typing.dataset.from = "brand";
    const avatar = rows[0].querySelector(".sc-direct-avatar");
    typing.append(avatar ? avatar.cloneNode(true) : document.createElement("span"));
    const bubble = document.createElement("div");
    bubble.className = "sc-direct-bubble sc-direct-typing";
    bubble.setAttribute("role", "status");
    bubble.innerHTML =
      "<span aria-hidden></span><span aria-hidden></span><span aria-hidden></span>";
    typing.append(bubble);
    rows[rows.length - 1].after(typing);
    let i = 0;
    const timer = setInterval(() => {
      const row = later[i++];
      if (row) {
        row.hidden = false;
        row.after(typing);
        play([row.querySelector("[data-reveal]") || row]);
      }
      if (i >= later.length) {
        clearInterval(timer);
        typing.remove();
        if (replies) {
          replies.hidden = false;
          play([replies]);
        }
      }
    }, 650);
  }

  // -------------------------------------------------------- Stage light
  if (direction === "stage" && !reduce) {
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const hero = e.target.closest && e.target.closest(".ds-hero, .xs-st-hero");
      if (!hero) return;
      const box = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--mo-spot-x",
        `${(((e.clientX - box.left) / box.width) * 100).toFixed(1)}%`,
      );
      hero.style.setProperty(
        "--mo-spot-y",
        `${(((e.clientY - box.top) / box.height) * 100).toFixed(1)}%`,
      );
    });
  }

  // ------------------------------------------------------------- screens
  function keyFor(href) {
    let url;
    try {
      url = new URL(href, location.origin);
    } catch {
      return null;
    }
    if (url.origin !== location.origin || !url.pathname.startsWith("/app")) {
      // Paths inside the exported page (b/<slug>.html#shop) arrive as hashes.
      return null;
    }
    const p = url.pathname.replace(/\/$/, "");
    if (p === "/app" || p === "/app/home") return "home";
    const mission = p.match(/^\/app\/missions\/([0-9a-f-]{36})$/);
    if (mission) return screens[`m-${mission[1]}`] ? `m-${mission[1]}` : "missions";
    if (p === "/app/missions") return "missions";
    if (p === "/app/shop") return "shop";
    if (p === "/app/profile") return "profile";
    return null;
  }

  function show(key, push) {
    const template = screens[key] || screens.home;
    if (!template) return;
    const clones = template.content.cloneNode(true);
    const runtime = document.currentScript || document.querySelector('script[src$="runtime.js"]');
    document.body.replaceChildren(clones);
    if (runtime) document.body.append(runtime);
    if (push) history.pushState(null, "", `#${key}`);
    window.scrollTo(0, 0);
    start(key);
    parent?.postMessage?.({ fanipDemo: true, screen: key }, "*");
  }

  function start(key) {
    const main = document.querySelector("main") || document.body;
    fitReel(document.body);
    fitXs(document.body);
    albumCards(document.body);
    countUps(document.body);
    directArrivals(document.body, key);
    if (window.FanipKinetics) window.FanipKinetics.enhance(document.body, { reduce });
    reveal(main);
  }

  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) {
        // Buttons that would send something stay still in the demo.
        const button = e.target.closest && e.target.closest("button[type='submit'], form button");
        if (button) e.preventDefault();
        return;
      }
      const href = a.getAttribute("href");
      if (href.startsWith("#")) return;
      e.preventDefault();
      const key = keyFor(href);
      if (key) show(key, true);
    },
    true,
  );
  document.addEventListener("submit", (e) => e.preventDefault(), true);
  addEventListener("popstate", () => show(location.hash.slice(1) || "home", false));

  const first = location.hash.slice(1);
  if (first && first !== "home" && screens[first]) show(first, false);
  else start("home");
})();
