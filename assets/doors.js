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
      vigGoal: "A limited-edition gift box for every member",
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
      vigGoal: "A limited supporters’ shirt for every member",
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
      vigGoal: "A signed tour poster for every member",
      world: "aube"
    }
  };
  var TEXT_SLOTS = ["step1", "vigTitle", "vigText", "vigPoints", "reachTitle", "vigGoal"];
  var KEY = "fanip.door";
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
    if (d) root.setAttribute("data-door", door);
    else root.removeAttribute("data-door");
    TEXT_SLOTS.forEach(function (n) {
      setText(n, d ? d[n] : g[n]);
    });
    var adapt = el("adapt");
    if (adapt) {
      adapt.textContent = d ? d.adapt : "";
      adapt.hidden = !d;
    }
    document.querySelectorAll("[data-start-link]").forEach(function (link) {
      link.setAttribute("href", "https://app.fan-ip.com/start" + (d ? "?for=" + door : ""));
    });
    document.querySelectorAll("[data-calc-link]").forEach(function (link) {
      link.setAttribute("href", "reach-calculator.html" + (d ? "?for=" + door : ""));
    });
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
  // Hidden over the prices, the closing call and the footer, so it never
  // covers a price or the legal links.
  var chip, worldInView = true, covering = 0;
  function showChip() {
    if (!chip) return;
    chip.hidden = !(root.getAttribute("data-door") && !worldInView && !covering && !scrollingDown);
  }
  // On the way down the chip steps aside; it comes back when the visitor
  // scrolls up, which is when they look for it.
  var scrollingDown = false, lastY = window.scrollY;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (Math.abs(y - lastY) < 8) return;
    var down = y > lastY;
    lastY = y;
    if (down !== scrollingDown) {
      scrollingDown = down;
      showChip();
    }
  }, { passive: true });

  function start() {
    var fixed = root.getAttribute("data-door");
    if (fixed && DOORS[fixed]) {
      // Door pages are written in their world already; generic texts come
      // from the data-generic attributes the build left on each slot.
      document.querySelectorAll("[data-slot][data-generic]").forEach(function (node) {
        generic[node.getAttribute("data-slot")] = node.getAttribute("data-generic");
      });
    } else {
      TEXT_SLOTS.forEach(function (n) {
        if (el(n)) generic[n] = el(n).textContent;
      });
    }
    chip = document.querySelector("[data-world-chip]");
    var band = document.getElementById("world");
    if (chip && band && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        worldInView = entries[0].isIntersecting;
        showChip();
      }).observe(band);
      var seen = new Set();
      var watch = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        });
        covering = seen.size;
        showChip();
      });
      ["#top", "#pricing", "#try", "#closing", "footer"].forEach(function (sel) {
        var node = document.querySelector(sel);
        if (node) watch.observe(node);
      });
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
          // Show the change where the eye is: the steps, now in this world.
          var to = next && document.getElementById("product");
          if (to) to.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
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
