// Visit measurement for fan-ip.com, with PostHog Cloud EU (servers in Frankfurt).
// Opt-in only: a small card asks first, and PostHog is not even downloaded until
// the visitor says yes (§ 25 TDDDG). After a yes it records pages, clicks and a
// replay of the visit, with typed text hidden. It sets no cookie: PostHog keeps
// its id in the browser's storage, and a no or a change of mind clears it.
// Until KEY is filled in, this file does nothing on fan-ip.com. In a local preview
// the card shows so it can be checked, but PostHog never loads.
(function () {
  var KEY = ""; // PostHog project token: public by design, starts with "phc_"
  var HOST = "https://eu.i.posthog.com";

  var LIVE = /(^|\.)fan-ip\.com$/.test(location.hostname);
  var PREVIEW = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (!PREVIEW && !(LIVE && KEY)) return;

  // A browser that already says no to tracking is not asked.
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;

  // Same record as the consent code in the header bundle.
  var STORE = "fanip-consent";
  var VERSION = 1;
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182;

  function choice() {
    try {
      var c = JSON.parse(localStorage.getItem(STORE) || "null");
      return !c || c.v !== VERSION || Date.now() - c.at > MAX_AGE ? null : c;
    } catch (e) { return null; }
  }

  function remember(yes) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ v: VERSION, at: Date.now(), analytics: yes, ads: false }));
    } catch (e) {}
  }

  function forget() {
    [window.localStorage, window.sessionStorage].forEach(function (store) {
      try {
        Object.keys(store).forEach(function (k) {
          if (/^(__)?ph_/.test(k)) store.removeItem(k);
        });
      } catch (e) {}
    });
  }

  var FR = /^fr/i.test(document.documentElement.lang);
  var WORDS = FR ? {
    title: "On peut voir comment vous utilisez cette page ?",
    text: "Avec votre accord, PostHog (serveurs dans l’UE) enregistre les pages vues, vos clics, votre pays et un replay de votre visite, sans ce que vous tapez. Cela nous aide à améliorer FAN/IP. Rien n’est envoyé si vous ne dites pas oui.",
    details: "Détails",
    no: "Non",
    yes: "Oui",
    later: "Mesure de visite"
  } : {
    title: "May we see how you use this site?",
    text: "With your OK, PostHog (servers in the EU) records the pages you view, your clicks, your country and a replay of your visit, without what you type. It helps us improve FAN/IP. Nothing is sent unless you say yes.",
    details: "Details",
    no: "No",
    yes: "Yes",
    later: "Visit measurement"
  };

  var CSS = ".fp-ask{position:fixed;z-index:2147483000;right:16px;top:16px;box-sizing:border-box;inline-size:min(360px,calc(100vw - 32px));max-block-size:calc(100vh - 32px);overflow:auto;padding:16px;border:1px solid #3a4150;border-radius:12px;background:#12161d;color:#f4f6f9;font:14px/1.45 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.35)}" +
    ".fp-ask h2{margin:0 0 6px;font:600 15px/1.3 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:inherit;letter-spacing:0;text-transform:none}" +
    ".fp-ask p{margin:0;color:#d5dae2}" +
    ".fp-ask a{color:#fff;text-decoration:underline}" +
    ".fp-ask__row{display:flex;gap:8px;margin-block-start:12px}" +
    ".fp-ask button{flex:1;min-block-size:44px;border:1px solid #f4f6f9;border-radius:8px;background:transparent;color:#f4f6f9;font:600 14px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;cursor:pointer}" +
    ".fp-ask button:hover{background:#f4f6f9;color:#12161d}" +
    ".fp-ask button:focus-visible,.fp-ask a:focus-visible,.fp-later:focus-visible{outline:2px solid #fff;outline-offset:2px}" +
    ".fp-later{position:fixed;z-index:2147483000;right:8px;bottom:72px;padding:4px 8px;border:0;border-radius:6px;background:rgba(18,22,29,.72);color:#f4f6f9;font:12px/1.2 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;cursor:pointer}" +
    "@media (min-width:768px){.fp-later{bottom:6px}}";

  function addStyle() {
    if (document.getElementById("fp-ask-css")) return;
    var st = document.createElement("style");
    st.id = "fp-ask-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function ask() {
    if (document.querySelector(".fp-ask")) return;
    addStyle();
    var card = document.createElement("section");
    card.className = "fp-ask";
    card.setAttribute("aria-labelledby", "fp-ask-title");
    card.innerHTML =
      '<h2 id="fp-ask-title"></h2><p><span></span> <a href="/privacy.html#measurement"></a></p>' +
      '<div class="fp-ask__row"><button type="button" data-a="no"></button><button type="button" data-a="yes"></button></div>';
    card.querySelector("h2").textContent = WORDS.title;
    card.querySelector("span").textContent = WORDS.text;
    card.querySelector("a").textContent = WORDS.details;
    card.querySelector('[data-a="no"]').textContent = WORDS.no;
    card.querySelector('[data-a="yes"]').textContent = WORDS.yes;
    card.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (!b) return;
      var yes = b.getAttribute("data-a") === "yes";
      remember(yes);
      card.remove();
      settings();
      if (yes) start();
      else if (started) { try { window.posthog.stopSessionRecording(); window.posthog.opt_out_capturing(); } catch (err) {} forget(); location.reload(); }
      else forget();
    });
    document.body.appendChild(card);
  }

  // The way back: the footer's "Cookie settings" button, or on a page with no
  // footer (the personal demos) a small link in the corner once a choice exists.
  function settings() {
    var buttons = document.querySelectorAll("[data-cookie-settings]");
    if (buttons.length) {
      buttons.forEach(function (b) {
        b.hidden = false;
        if (b.getAttribute("data-fp")) return;
        b.setAttribute("data-fp", "1");
        b.addEventListener("click", ask);
      });
      return;
    }
    if (!choice() || document.querySelector(".fp-later")) return;
    addStyle();
    var later = document.createElement("button");
    later.type = "button";
    later.className = "fp-later";
    later.textContent = WORDS.later;
    later.addEventListener("click", ask);
    document.body.appendChild(later);
  }

  // Ad click IDs that Google, Meta, TikTok and others add to links (fbclid on
  // every link out of Instagram): identifiers, so never sent. Campaign labels
  // (utm_source and the like) are kept; the privacy policy names them.
  var CLICK_ID = /(^|_)(gclid|gclsrc|gad_source|gad_campaignid|dclid|gbraid|wbraid|fbclid|msclkid|twclid|li_fat_id|igshid|ttclid|rdt_cid|irclid|epik|qclid|sccid|mc_cid|mc_eid|_kx)$/;

  // Every event leaves without click IDs, and with addresses cut at "?" and "#":
  // the reach calculator can put the numbers typed into its address.
  function clean(ev) {
    if (!ev) return ev;
    [ev.properties, ev.$set, ev.$set_once].forEach(function (p) {
      if (!p) return;
      Object.keys(p).forEach(function (k) {
        if (CLICK_ID.test(k)) delete p[k];
        else if (typeof p[k] === "string" && /^https?:\/\//.test(p[k])) p[k] = p[k].split(/[?#]/)[0];
      });
    });
    return ev;
  }

  var started = false;

  function start() {
    if (started || !KEY || !LIVE) return;
    started = true;

    var stub = [];
    stub._i = [[KEY, {
      api_host: HOST,
      ui_host: "https://eu.posthog.com",
      persistence: "localStorage",
      person_profiles: "always",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      enable_heatmaps: true,
      session_recording: { maskAllInputs: true },
      disable_surveys: true,
      disable_web_experiments: true,
      capture_exceptions: false,
      respect_dnt: true,
      mask_personal_data_properties: true,
      before_send: clean
    }]];
    stub.capture = function () { stub.push(["capture"].concat([].slice.call(arguments))); };
    window.posthog = stub;

    var s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = "https://eu-assets.i.posthog.com/static/array.js";
    document.head.appendChild(s);

    listen();
  }

  // window.posthog is replaced by the real library once it has loaded. Clicks
  // usually open another page, so each event leaves at once, as a beacon that
  // survives the page change.
  function send(name, props) {
    props = props || {};
    props.page = location.pathname;
    var world = document.documentElement.getAttribute("data-door");
    if (world) props.world = world;
    try { window.posthog.capture(name, props, { send_instantly: true, transport: "sendBeacon" }); } catch (e) {}
  }

  function text(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
  }

  function planOf(el) {
    var card = el.closest(".plan, .starter");
    var name = card && card.querySelector(".plan-name");
    return name ? text(name.firstChild || name) : undefined;
  }

  function listen() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("a, button");
      if (!el) return;

      if (el.hasAttribute("data-door-pick")) {
        send("World chosen", { chosen: el.getAttribute("data-door-pick") });
        return;
      }
      if (el.hasAttribute("data-book-load")) {
        send("Booking calendar shown");
        return;
      }

      var href = el.getAttribute("href") || "";
      if (/(^|\/)book-a-demo\.html/.test(href)) {
        send("Book a demo clicked", { button: text(el), plan: planOf(el) });
      } else if (/calendly\.com/.test(href)) {
        send("Booking opened on Calendly");
      } else if (/^mailto:/.test(href)) {
        send("Email link clicked", { address: href.slice(7) });
      } else if (/app\.fan-ip\.com\/start/.test(href)) {
        send("Free trial clicked", { button: text(el), plan: planOf(el) || "Starter" });
      } else if (/(^|\/)demo\/[a-z-]+\/?$/.test(href)) {
        send("Demo opened", { demo: href.replace(/^.*demo\/([a-z-]+)\/?$/, "$1") });
      }
    });

    // The "see it with your name" box opens the trial in the app: a form, not a link.
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (!form || !/app\.fan-ip\.com\/start/.test(form.getAttribute("action") || "")) return;
      var btn = form.querySelector("[type=submit]");
      send("Free trial clicked", { button: btn ? text(btn) : "Start my free trial", plan: "Starter", from: "name box" });
    }, true);

    // Steps inside the Calendly calendar on the Book a demo page. Calendly tells
    // the page which step was reached; nothing typed in its form is sent.
    var STEPS = {
      "calendly.event_type_viewed": "Booking times viewed",
      "calendly.date_and_time_selected": "Booking time picked",
      "calendly.event_scheduled": "Booking confirmed"
    };
    window.addEventListener("message", function (e) {
      if (e.origin !== "https://calendly.com" || !e.data || !STEPS[e.data.event]) return;
      send(STEPS[e.data.event]);
    });

    // First time a visitor changes a number in the reach calculator or the
    // platform page's estimate, once per page.
    var used = false;
    document.addEventListener("change", function (e) {
      if (used || !e.target.closest("main input[inputmode]")) return;
      used = true;
      send("Calculator used");
    });
  }

  function boot() {
    var c = choice();
    settings();
    if (!c) ask();
    else if (c.analytics) start();
    else forget();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
