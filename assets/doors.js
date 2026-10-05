// The three worlds of the home page (Oct 2026). The hero and "why" are the
// same for everyone; in "Where do your fans gather?" a visitor picks Sport,
// Artists and creators or Brands, a gold slash sweeps across and the page
// below (the steps, the mission card, the example numbers) speaks to that
// world. Nothing picked: the generic page stays as written.
// brands.html, sport.html and artists.html are the same page, already set to
// their world in the HTML (html[data-door]) so search engines read it too.
(function () {
  var DOORS = {
    brand: {
      name: "Brands",
      who: "brands",
      hash: "brands",
      adapt: "Examples for a brand. Your missions, words and rewards are yours to set.",
      step1: "Set a mission: an unboxing, your routine, a friend who needs it. You choose the points and the rewards.",
      vigTitle: "Post your unboxing",
      vigText: "One photo on your feed. Tag the brand.",
      vigPoints: "+50",
      reachTitle: "One unboxing post",
      members: 3000,
      world: "aube"
    },
    sport: {
      name: "Sport",
      who: "clubs, teams and esports",
      hash: "sport",
      adapt: "Examples for a club or team. Your challenges, words and rewards are yours to set, sponsors included.",
      step1: "Set a challenge: a matchday photo, a shout-out for your sponsor, a mate brought to the next home game. You choose the points and the rewards.",
      vigTitle: "Matchday photo",
      vigText: "From the stands. Tag the club and the sponsor.",
      vigPoints: "+60",
      reachTitle: "One matchday post",
      members: 8000,
      world: "az"
    },
    artist: {
      name: "Artists and creators",
      who: "artists and creators",
      hash: "artists",
      adapt: "Examples for an artist. Your missions, words and rewards are yours to set.",
      step1: "Set a mission: a setlist photo, the new single in a story, a friend brought to the show. You choose the points and the rewards.",
      vigTitle: "Post your setlist photo",
      vigText: "From the show. Tag the city and the artist.",
      vigPoints: "+50",
      reachTitle: "One setlist post",
      members: 5000,
      world: "aube"
    }
  };
  var TEXT_SLOTS = ["step1", "vigTitle", "vigText", "vigPoints", "reachTitle", "members", "views", "euros"];
  var KEY = "fanip.door";
  var nf = new Intl.NumberFormat("en-GB");
  var root = document.documentElement;
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slots = {};
  var generic = {};

  function el(name) {
    if (!(name in slots)) slots[name] = document.querySelector('[data-slot="' + name + '"]');
    return slots[name];
  }
  function setText(name, value) {
    var node = el(name);
    if (node && value != null) node.textContent = value;
  }
  function byHash(hash) {
    for (var k in DOORS) if (DOORS[k].hash === hash) return k;
    return "";
  }

  function apply(door) {
    var d = DOORS[door];
    var g = generic;
    root.setAttribute("data-door", d ? door : "");
    TEXT_SLOTS.slice(0, 5).forEach(function (n) {
      setText(n, d ? d[n] : g[n]);
    });
    if (d) {
      // 10% of members post twice a month, 400 views a post, €2 CPM (default only).
      var views = d.members * 0.1 * 2 * 400;
      setText("members", nf.format(d.members));
      setText("views", nf.format(views));
      setText("euros", "€" + nf.format((views / 1000) * 2));
    } else {
      ["members", "views", "euros"].forEach(function (n) {
        setText(n, g[n]);
      });
    }
    var adapt = el("adapt");
    if (adapt) {
      adapt.textContent = d ? d.adapt : "";
      adapt.hidden = !d;
    }
    var calc = el("calc");
    if (calc) calc.setAttribute("href", d ? "reach-calculator.html?members=" + d.members : g.calc);
    var name = document.getElementById("door-name");
    if (name && name.form) name.form.setAttribute("data-door", d ? door : "");
    document.querySelectorAll("[data-door-pick]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-door-pick") === door ? "true" : "false");
    });
    var status = document.querySelector("[data-world-status]");
    if (status) {
      status.textContent = "";
      if (d) {
        status.appendChild(document.createTextNode("The page below now speaks to " + d.who + ". "));
        var go = document.createElement("a");
        go.href = "#product";
        go.textContent = "See how it works";
        status.appendChild(go);
      }
    }
    var chipName = document.querySelector("[data-world-chip-name]");
    if (chipName) chipName.textContent = d ? d.name : "";
    showChip();
  }

  // The world's demo brand in the white-label section, only when the visitor picks.
  function pickWorld(door) {
    var d = DOORS[door];
    var radio = d && document.getElementById(d.world === "az" ? "w-az" : "w-aube");
    if (radio && !radio.checked) radio.click();
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
    var fromHash = byHash(location.hash.slice(1));
    if (fromHash) return fromHash;
    var q = new URLSearchParams(location.search).get("for");
    if (q && DOORS[q]) return q;
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && DOORS[saved]) return saved;
    } catch (e) {}
    return "";
  }

  // The gold slash crosses the screen; the world swaps in behind it.
  function sweep(then) {
    var band = document.querySelector(".world-sweep");
    if (still || !band) {
      then();
      return;
    }
    band.classList.remove("is-on");
    void band.offsetWidth;
    band.classList.add("is-on");
    setTimeout(then, 330);
    setTimeout(function () {
      band.classList.remove("is-on");
    }, 900);
  }

  // A small chip to change world, while the picker is off screen.
  var chip, worldInView = true;
  function showChip() {
    if (!chip) return;
    chip.hidden = !(root.getAttribute("data-door") && !worldInView);
  }

  function start() {
    var fixed = root.getAttribute("data-door");
    if (fixed && DOORS[fixed]) {
      // Door pages are written in their world already; generic texts come
      // from the data-generic attributes the build left on each slot.
      document.querySelectorAll("[data-slot][data-generic]").forEach(function (node) {
        generic[node.getAttribute("data-slot")] = node.getAttribute("data-generic");
      });
      var c = el("calc");
      if (c) generic.calc = c.getAttribute("data-generic-href");
    } else {
      TEXT_SLOTS.forEach(function (n) {
        if (el(n)) generic[n] = el(n).textContent;
      });
      var calc = el("calc");
      if (calc) generic.calc = calc.getAttribute("href");
    }
    chip = document.querySelector("[data-world-chip]");
    var band = document.getElementById("world");
    if (chip && band && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        worldInView = entries[0].isIntersecting;
        showChip();
      }).observe(band);
    }
    var door = initial();
    if (door) apply(door);
    document.querySelectorAll("[data-door-pick]").forEach(function (b) {
      b.addEventListener("click", function () {
        var pick = b.getAttribute("data-door-pick");
        var next = root.getAttribute("data-door") === pick ? "" : pick;
        store(next);
        try {
          history.replaceState(null, "", next ? "#" + DOORS[next].hash : location.pathname + location.search);
        } catch (e) {}
        sweep(function () {
          apply(next);
          if (next) pickWorld(next);
        });
      });
    });
    var form = document.getElementById("door-try");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = (document.getElementById("door-name").value || "").trim().slice(0, 80);
        var url = new URL("https://app.fan-ip.com/start");
        var current = root.getAttribute("data-door");
        if (current) url.searchParams.set("for", current);
        if (name) url.searchParams.set("name", name);
        location.href = url.toString();
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
