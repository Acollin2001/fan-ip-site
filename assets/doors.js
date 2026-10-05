// The three doors of the home page (Oct 2026): a visitor says what they are
// (a brand, a club or team, an artist or creator) and five blocks of the page
// speak to them. Nothing picked: the generic page stays as written.
// brands.html, sport.html and artists.html are the same page, already set to
// their door in the HTML (html[data-door]) so search engines read it too.
(function () {
  var DOORS = {
    brand: {
      lead: "Your customers already talk about you. Give them a reason to post, reward them for it and see how many people they reached.",
      cta: ["Start my free trial", "https://app.fan-ip.com/start?for=brand"],
      step1: "Set a mission: an unboxing, your routine, a friend who needs it. You choose the points and the rewards.",
      vigTitle: "Post your unboxing",
      vigText: "One photo on your feed. Tag the brand.",
      vigPoints: "+50",
      reachTitle: "One unboxing post",
      members: 3000,
      world: "aube"
    },
    sport: {
      lead: "Your supporters already talk about the club. Give them a reason to post, reward them for it and show your sponsors how many people they reached.",
      cta: ["Start my free trial", "https://app.fan-ip.com/start?for=sport"],
      step1: "Set a challenge: a matchday photo, a shout-out for your sponsor, a mate brought to the next home game. You choose the points and the rewards.",
      vigTitle: "Matchday photo",
      vigText: "From the stands. Tag the club and the sponsor.",
      vigPoints: "+60",
      reachTitle: "One matchday post",
      members: 8000,
      world: "az"
    },
    artist: {
      lead: "Your fans already talk about you after every show. Give them a reason to post, reward them for it and see how many people they reached.",
      cta: ["Start my free trial", "https://app.fan-ip.com/start?for=artist"],
      step1: "Set a mission: a setlist photo, the new single in a story, a friend brought to the show. You choose the points and the rewards.",
      vigTitle: "Post your setlist photo",
      vigText: "From the show. Tag the city and the artist.",
      vigPoints: "+50",
      reachTitle: "One setlist post",
      members: 5000,
      world: "aube"
    }
  };
  var KEY = "fanip.door";
  var nf = new Intl.NumberFormat("en-GB");
  var root = document.documentElement;
  var slots = {};
  var generic = {};

  function el(name) {
    if (!(name in slots)) slots[name] = document.querySelector('[data-slot="' + name + '"]');
    return slots[name];
  }
  function remember() {
    ["lead", "step1", "vigTitle", "vigText", "vigPoints", "reachTitle", "members", "views", "euros"].forEach(function (n) {
      if (el(n)) generic[n] = el(n).textContent;
    });
    var cta = el("cta");
    if (cta) generic.cta = [cta.textContent, cta.getAttribute("href")];
    var calc = el("calc");
    if (calc) generic.calc = calc.getAttribute("href");
  }
  function setText(name, value) {
    var node = el(name);
    if (node && value != null) node.textContent = value;
  }
  function apply(door, opts) {
    var d = DOORS[door];
    var g = generic;
    root.setAttribute("data-door", d ? door : "");
    setText("lead", d ? d.lead : g.lead);
    setText("step1", d ? d.step1 : g.step1);
    setText("vigTitle", d ? d.vigTitle : g.vigTitle);
    setText("vigText", d ? d.vigText : g.vigText);
    setText("vigPoints", d ? d.vigPoints : g.vigPoints);
    setText("reachTitle", d ? d.reachTitle : g.reachTitle);
    var cta = el("cta");
    if (cta) {
      var c = d ? d.cta : g.cta;
      cta.textContent = c[0];
      cta.setAttribute("href", c[1]);
    }
    if (d) {
      // 10% of members post twice a month, 400 views a post, €2 CPM (default only).
      var views = d.members * 0.1 * 2 * 400;
      setText("members", nf.format(d.members));
      setText("views", nf.format(views));
      setText("euros", "€" + nf.format(views / 1000 * 2));
    } else {
      setText("members", g.members);
      setText("views", g.views);
      setText("euros", g.euros);
    }
    var calc = el("calc");
    if (calc) calc.setAttribute("href", d ? "reach-calculator.html?members=" + d.members : g.calc);
    var world = document.getElementById(d && d.world === "az" ? "w-az" : "w-aube");
    if (d && world && !world.checked && opts && opts.user) world.click();
    var name = document.getElementById("door-name");
    if (name && name.form) name.form.setAttribute("data-door", d ? door : "");
    document.querySelectorAll("[data-door-pick]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-door-pick") === door ? "true" : "false");
    });
    var live = document.querySelector("[data-door-live]");
    if (live && opts && opts.user) live.textContent = d ? "The page now speaks to " + b2label(door) + "." : "Showing the page for everyone.";
  }
  function b2label(door) {
    return { brand: "brands", sport: "clubs and teams", artist: "artists and creators" }[door];
  }
  function store(door) {
    try {
      if (door) localStorage.setItem(KEY, door);
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }
  function initial() {
    var fixed = root.getAttribute("data-door");
    if (fixed && DOORS[fixed]) return fixed;
    var q = new URLSearchParams(location.search).get("for");
    if (q && DOORS[q]) return q;
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && DOORS[saved]) return saved;
    } catch (e) {}
    return "";
  }

  function start() {
    var fixed = root.getAttribute("data-door");
    if (fixed && DOORS[fixed]) {
      // Door pages are written in their door already; generic texts come from
      // the data-generic attributes the build left on each slot.
      document.querySelectorAll("[data-slot][data-generic]").forEach(function (node) {
        generic[node.getAttribute("data-slot")] = node.getAttribute("data-generic");
      });
      var cta = el("cta");
      if (cta) generic.cta = [cta.getAttribute("data-generic"), cta.getAttribute("data-generic-href")];
      var calc = el("calc");
      if (calc) generic.calc = calc.getAttribute("data-generic-href");
    } else {
      remember();
    }
    var door = initial();
    if (door) apply(door);
    document.querySelectorAll("[data-door-pick]").forEach(function (b) {
      b.addEventListener("click", function () {
        var pick = b.getAttribute("data-door-pick");
        var next = root.getAttribute("data-door") === pick ? "" : pick;
        store(next);
        apply(next, { user: true });
      });
    });
    var form = document.getElementById("door-try");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = (document.getElementById("door-name").value || "").trim().slice(0, 80);
        var url = new URL("https://app.fan-ip.com/start");
        var door = root.getAttribute("data-door");
        if (door) url.searchParams.set("for", door);
        if (name) url.searchParams.set("name", name);
        location.href = url.toString();
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
