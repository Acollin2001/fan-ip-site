// Visit statistics for fan-ip.com, with PostHog Cloud EU (servers in Frankfurt).
// Cookieless: nothing is stored on the visitor's device, so no cookie banner is
// needed (§ 25 TDDDG). Visits are counted with a daily anonymous hash computed by
// PostHog's servers; no session recordings, no heatmaps, no personal profiles.
// Until KEY is filled in, this file does nothing. It only runs on fan-ip.com, so
// local previews never count as visits.
(function () {
  var KEY = ""; // PostHog project API key: public by design, starts with "phc_"
  var HOST = "https://eu.i.posthog.com";

  if (!KEY || !/(^|\.)fan-ip\.com$/.test(location.hostname)) return;

  // What the library would read from the device beyond what every request
  // already carries: screen and window size, time zone, language. Not sent.
  var DEVICE = /^\$(initial_)?(screen_|viewport_|timezone|browser_language)/;

  // Every event leaves without device details, and with addresses cut at "?"
  // and "#": the reach calculator can put the numbers typed into its address.
  function clean(ev) {
    if (!ev) return ev;
    [ev.properties, ev.$set, ev.$set_once].forEach(function (p) {
      if (!p) return;
      Object.keys(p).forEach(function (k) {
        if (DEVICE.test(k)) delete p[k];
        else if (typeof p[k] === "string" && /^https?:\/\//.test(p[k])) p[k] = p[k].split(/[?#]/)[0];
      });
    });
    return ev;
  }

  var stub = [];
  stub._i = [[KEY, {
    api_host: HOST,
    ui_host: "https://eu.posthog.com",
    cookieless_mode: "always",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,
    rageclick: false,
    capture_dead_clicks: false,
    enable_heatmaps: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_web_experiments: true,
    advanced_disable_flags: true,
    capture_exceptions: false,
    respect_dnt: true,
    before_send: clean
  }]];
  stub.capture = function () { stub.push(["capture"].concat([].slice.call(arguments))); };
  window.posthog = stub;

  var s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://eu-assets.i.posthog.com/static/array.js";
  document.head.appendChild(s);

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
})();
