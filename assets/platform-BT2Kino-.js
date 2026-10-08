import "./header-AsSSiagq.js";
import "./page-CEiblalE.js";
// Words each world uses in the mission builder preview (fictional worlds, from the signature demos).
const q = {
    aldermoor: { points: "points", missions: "Missions" },
    aube: { points: "petals", missions: "Rituels" },
    ilsa: { points: "notes", missions: "Your setlist" },
  },
  X = {
    aldermoor: {
      post: ["Scarves up: show us yours", "One photo from the stands on matchday. Tag the club."],
      road: [
        "Road to the Granby derby",
        "Three steps before kick-off.",
        [
          ["Predict the derby score", 20],
          ["Share the matchday poster", 30],
          ["Check in at The Weir", 60],
        ],
        "A signed derby ball",
      ],
      poll: ["Which kit for next season?", "Home, away or third: you choose.", ["Kestrel orange", "Moor navy", "Retro 1911"]],
      quiz: ["Who scored the first goal at The Weir this season?", "One right answer, points if you know it.", ["Number 9", "Number 10", "Number 7"]],
      open: ["What would make matchday at The Weir better?", "Food, music, fan zone: tell us."],
    },
    aube: {
      post: ["Unbox your Givre coffret on camera", "Reel or TikTok, about 30 seconds. Tag Maison Aube."],
      road: [
        "Your evening routine in three steps",
        "Three rituels, one gift at the end.",
        [
          ["Take the skin quiz", 20],
          ["Post your evening routine", 40],
          ["A review in 15 seconds", 50],
        ],
        "Brume d'Iris, 30 ml travel size",
      ],
      poll: ["Which scent should Givre add next?", "Your vote decides.", ["Iris", "Cedar", "Fig"]],
      quiz: ["Which flower is in Brume d'Iris?", "One right answer, petals if you know it.", ["Iris", "Rose", "Sage"]],
      open: ["What should le Jardin grow next?", "Dream big, we read everything."],
    },
    ilsa: {
      post: ["Setlist photo from the Lyon show", "Snap it at the encore. Tag Ilsa."],
      road: [
        "Road to Lyon",
        "Three steps before show night.",
        [
          ["Pre-save the new single", 20],
          ["Share the tour poster", 30],
          ["Check in at the merch stand", 60],
        ],
        "A tour laminate in the post",
      ],
      poll: ["Which song closes the Lyon show?", "The most votes wins.", ["Marée haute", "The new single", "A fan favourite"]],
      quiz: ["Which city opened the Marée haute tour?", "One right answer, notes if you know it.", ["Brussels", "Nantes", "Lyon"]],
      open: ["Which city should the next tour add?", "Name it and tell us why."],
    },
  },
  ie = {
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
    qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18v2M18 14h2"/>',
    camera:
      '<rect x="3.5" y="7" width="17" height="12" rx="1.5"/><circle cx="12" cy="13" r="3.5"/><path d="M9 7l1.5-2.5h3L15 7"/>',
    quiz: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.4v.7M12 16.8v.2"/>',
    poll: '<path d="M5 20V11M12 20V5M19 20v-6"/>',
    friend:
      '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M17 8v6M14 11h6"/>',
    flag: '<path d="M6 21V4M6 4h11l-2 4 2 4H6"/>',
    lock: '<rect x="5" y="11" width="14" height="9.5" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  },
  j = (i) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ie[i]}</svg>`,
  k = (i) => Math.round(i).toLocaleString("en-US"),
  B = (i) => `€${k(i)}`,
  J = { 30: 1, 90: 2.6, season: 4.9 },
  K = [
    {
      key: "active",
      label: "Active members",
      base: 1284,
      delta: 12,
      shape: [48, 55, 54, 63, 61, 67, 72, 70, 79, 84, 90, 100],
    },
    {
      key: "new",
      label: "New members",
      base: 212,
      delta: 8,
      shape: [60, 52, 70, 64, 58, 75, 66, 80, 72, 88, 84, 100],
    },
    {
      key: "missions",
      label: "Missions completed",
      base: 3406,
      delta: 18,
      shape: [40, 46, 52, 50, 61, 66, 64, 72, 80, 86, 92, 100],
    },
    {
      key: "approval",
      label: "Approval rate",
      base: "91%",
      delta: 2,
      shape: [88, 90, 86, 91, 89, 92, 90, 93, 91, 94, 92, 95],
    },
    {
      key: "redeemed",
      label: "Rewards redeemed",
      base: 146,
      delta: 22,
      shape: [30, 42, 38, 50, 56, 52, 64, 70, 68, 80, 90, 100],
    },
    {
      key: "checkins",
      label: "Check-ins",
      base: 688,
      delta: 31,
      shape: [20, 80, 15, 76, 22, 90, 18, 84, 25, 95, 20, 100],
    },
    {
      key: "referrals",
      label: "Referrals",
      base: 94,
      delta: 15,
      shape: [35, 40, 48, 44, 56, 60, 58, 70, 74, 82, 88, 100],
    },
    {
      key: "points",
      label: "Points earned",
      base: 182400,
      delta: 17,
      shape: [42, 48, 50, 58, 60, 66, 70, 74, 78, 86, 92, 100],
    },
  ];
function de() {
  let f =
    (document.querySelector('input[name="play-world"]:checked') || {}).value ||
    "aldermoor";
  if (!q[f]) f = "aldermoor";
  const l = document.querySelector("[data-builder]");
  function I() {
    if (!l) return;
    const t = q[f],
      e = new FormData(l),
      a = e.get("mtype");
    l.querySelectorAll("[data-for]").forEach((w) => {
      w.hidden = !w.dataset.for.split(" ").includes(a);
    });
    const o = (e.get("title") || "").toString().trim() || X[f][a][0],
      s = Number(e.get("points")),
      h = e.get("special") === "on";
    ((l.querySelector("[data-points-out]").textContent = `${s} ${t.points}`),
      (l.querySelector("[data-points-label]").textContent =
        a === "road" ? "Final bonus" : "Reward"));
    const u = document.querySelector("[data-mission-preview]");
    (u.classList.toggle("is-special", h),
      (u.querySelector("[data-pv-list]").textContent = t.missions),
      (u.querySelector("[data-pv-special]").hidden = !h),
      (u.querySelector("[data-pv-kind]").textContent = l.querySelector(
        `[name="mtype"][value="${a}"]`,
      ).dataset.label),
      (u.querySelector("[data-pv-title]").textContent = o),
      (u.querySelector("[data-pv-desc]").textContent = (
        e.get("desc") || ""
      ).toString()),
      (u.querySelector("[data-pv-pts]").textContent =
        a === "road"
          ? `+${s} ${t.points} at the finish`
          : `+${s} ${t.points}`));
    const L = u.querySelector("[data-pv-body]");
    let x = "",
      z = "Submit my post";
    (a === "post"
      ? (x = `<p class="pv-meta">${e.get("limit")} per day${e.get("likes") === "on" ? ` · +10 ${t.points} every 100 likes` : ""}</p>`)
      : a === "road"
        ? ((x = `<ol class="pv-road">${r.steps.map((w, M) => `<li class="${M === 0 ? "is-open" : "is-locked"}"><span class="pv-road__n">${M === 0 ? 1 : j("lock")}</span><span class="pv-road__t">${N(w.title) || `Step ${M + 1}`}<small>${M === 0 ? `+${w.pts} ${t.points} · Start here` : `+${w.pts} ${t.points} · Unlocks after step ${M}`}</small></span></li>`).join("")}<li class="pv-road__end"><span class="pv-road__n">★</span><span class="pv-road__t">${N((e.get("final") || "").toString()) || "Final reward"}<small>At the finish line</small></span></li></ol>`),
          (z = "Start step 1"))
        : a === "poll" || a === "quiz"
          ? ((x = `<ul class="pv-opts">${r.answers
              .filter((w) => w.trim())
              .map((w) => `<li>${N(w)}</li>`)
              .join("")}</ul>`),
            (z = a === "quiz" ? "Answer" : "Vote"),
            a === "quiz" &&
              (x +=
                '<p class="pv-meta">The right answer shows once you reply</p>'))
          : a === "open" &&
            ((x = `<div class="pv-text">Your answer, up to ${e.get("maxlen")} characters</div>`),
            (z = "Send my answer")),
      (L.innerHTML = x),
      (u.querySelector("[data-pv-cta]").textContent = z));
  }
  const r = { answers: [], steps: [], correct: 0, type: "post" },
    N = (t) =>
      String(t).replace(
        /[&<>"]/g,
        (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e],
      );
  function D(t) {
    const e = X[f][t];
    ((l.querySelector('[name="title"]').value = e[0]),
      (l.querySelector('[name="desc"]').value = e[1]),
      (t === "poll" || t === "quiz") &&
        ((r.answers = [...e[2]]), (r.correct = 0)),
      t === "road" &&
        ((r.steps = e[2].map(([a, o]) => ({ title: a, pts: o }))),
        (l.querySelector('[name="final"]').value = e[3])),
      U());
  }
  function U() {
    if (!l) return;
    const t = l.querySelector('[name="mtype"]:checked').value === "quiz",
      e = l.querySelector("[data-answers]");
    ((e.innerHTML = r.answers
      .map(
        (o, s) =>
          `<li><span class="adm-row__n">${String.fromCharCode(65 + s)}</span><input type="text" maxlength="60" value="${N(o)}" data-answer="${s}" aria-label="Answer ${s + 1}">` +
          (t
            ? `<label class="adm-right"><input type="radio" name="correct" value="${s}" ${s === r.correct ? "checked" : ""}> Right</label>`
            : "") +
          `<button type="button" class="adm-x" data-del-answer="${s}" ${r.answers.length <= 2 ? "disabled" : ""} aria-label="Remove answer ${s + 1}">×</button></li>`,
      )
      .join("")),
      (l.querySelector("[data-add-answer]").disabled = r.answers.length >= 8));
    const a = l.querySelector("[data-steps]");
    ((a.innerHTML = r.steps
      .map(
        (o, s) =>
          `<li class="adm-step"><p class="adm-step__h"><b>Step ${s + 1}</b><button type="button" class="adm-x" data-del-step="${s}" ${r.steps.length <= 2 ? "disabled" : ""} aria-label="Remove step ${s + 1}">×</button></p><label><span>Mission</span><input type="text" maxlength="60" value="${N(o.title)}" data-step-title="${s}"></label><label class="adm-step__pts"><span>${q[f].points}</span><input type="number" min="0" max="1000" step="10" value="${o.pts}" data-step-pts="${s}"></label></li>`,
      )
      .join("")),
      (l.querySelector("[data-add-step]").disabled = r.steps.length >= 10));
  }
  l &&
    (l.addEventListener("input", (t) => {
      const e = t.target;
      (e.dataset.answer && (r.answers[e.dataset.answer] = e.value),
        e.dataset.stepTitle && (r.steps[e.dataset.stepTitle].title = e.value),
        e.dataset.stepPts &&
          (r.steps[e.dataset.stepPts].pts = Number(e.value) || 0),
        I());
    }),
    l.addEventListener("change", (t) => {
      const e = t.target;
      (e.name === "mtype" &&
        e.value !== r.type &&
        ((r.type = e.value), D(e.value)),
        e.name === "correct" && (r.correct = Number(e.value)),
        I());
    }),
    l.addEventListener("click", (t) => {
      const e = t.target.closest("button");
      if (e) {
        if (e.hasAttribute("data-add-answer") && r.answers.length < 8)
          r.answers.push("");
        else if (e.dataset.delAnswer)
          (r.answers.splice(Number(e.dataset.delAnswer), 1),
            (r.correct = Math.min(r.correct, r.answers.length - 1)));
        else if (e.hasAttribute("data-add-step") && r.steps.length < 10)
          r.steps.push({ title: "", pts: 50 });
        else if (e.dataset.delStep)
          r.steps.splice(Number(e.dataset.delStep), 1);
        else return;
        (U(),
          I(),
          e.hasAttribute("data-add-answer") &&
            l.querySelector(`[data-answer="${r.answers.length - 1}"]`)?.focus(),
          e.hasAttribute("data-add-step") &&
            l
              .querySelector(`[data-step-title="${r.steps.length - 1}"]`)
              ?.focus());
      }
    }),
    l.addEventListener("submit", (t) => t.preventDefault()));
  function G() {
    const u = document.querySelector("[data-mission-preview]");
    if (u) u.dataset.psWorld = f;
  }
  document.querySelectorAll('input[name="play-world"]').forEach((t) => {
    t.addEventListener("change", () => {
      if (!t.checked || !q[t.value]) return;
      f = t.value;
      G();
      l && (D(r.type), I());
    });
  });
  G();
  l && (D("post"), I());
}
function pe() {
  const i = document.querySelector("[data-results]");
  if (!i) return;
  let c = "30",
    g = "active";
  function _() {
    const b = J[c],
      A = i.querySelector(".dash-kpis");
    ((A.innerHTML = K.map((p) => {
      const C =
        typeof p.base == "number"
          ? k(p.base * (p.key === "active" ? Math.sqrt(b) : b))
          : p.base;
      return `<li><button type="button" class="dash-kpi" data-m="${p.key}" aria-pressed="${p.key === g}"><span class="dash-kpi__label">${p.label}</span><span class="dash-kpi__v">${C}</span><span class="dash-kpi__d">+${Math.round(p.delta * (1 + (b - 1) * 0.3))}% vs previous period</span></button></li>`;
    }).join("")),
      A.querySelectorAll(".dash-kpi").forEach((p) =>
        p.addEventListener("click", () => {
          ((g = p.dataset.m), _());
        }),
      ));
    const T = K.find((p) => p.key === g),
      $ = 100 / T.shape.length;
    ((i.querySelector(".dash-bars").innerHTML =
      T.shape
        .map((p, C) => {
          const v = (p / 100) * 88;
          return `<rect x="${(C * $ + $ * 0.18).toFixed(2)}" y="${(96 - v).toFixed(2)}" width="${($ * 0.64).toFixed(2)}" height="${v.toFixed(2)}" class="${C === T.shape.length - 1 ? "is-now" : ""}"></rect>`;
        })
        .join("") + '<line x1="0" y1="96" x2="100" y2="96"></line>'),
      (i.querySelector("[data-chart-title]").textContent =
        `${T.label}, per week`),
      (i.querySelector("[data-bars-label]").textContent =
        `${T.label} per week over the last 12 weeks, rising.`));
  }
  i.querySelectorAll('input[name="period"]').forEach((b) =>
    b.addEventListener("change", () => {
      ((c = b.value), _());
    }),
  );
  const E = i.querySelector("[data-money]"),
    y = 204e4,
    d = 94,
    m = 64;
  function S() {
    const b = J[c],
      A = new FormData(E),
      T = Math.max(Number(A.get("cpm")) || 0, 0),
      $ = Math.max(Number(A.get("order")) || 0, 0),
      p = y * b,
      C = Math.round(d * b),
      v = Math.round(m * b),
      R = (f, n) => (E.querySelector(`[data-m="${f}"]`).textContent = n);
    (R("media", B((p / 1e3) * T)),
      R("media-sub", `${k(p)} views on members' posts, at €${T} per 1,000`));
  }
  (E.addEventListener("input", S),
    E.addEventListener("submit", (b) => b.preventDefault()),
    i
      .querySelectorAll('input[name="period"]')
      .forEach((b) => b.addEventListener("change", S)),
    _(),
    S());
}
function he() {
  const i = document.querySelector("[data-fx]");
  if (!i) return;
  const c = [...i.querySelectorAll(".fx-tab")],
    g = [...i.querySelectorAll(".fx-chapter")];
  function _(y, d) {
    y.querySelectorAll(".fx-chip").forEach((S) =>
      S.setAttribute("aria-pressed", String(S === d)),
    );
    const m = y.querySelector(".fx-detail");
    ((m.querySelector(".fx-detail__name").innerHTML =
      d.firstChild.textContent +
      (d.hasAttribute("data-soon")
        ? ' <span class="tag">Rolling out</span>'
        : "")),
      (m.querySelector(".fx-detail__text").textContent =
        d.querySelector(".fx-desc").textContent));
  }
  g.forEach((y) => {
    const d = [...y.querySelectorAll(".fx-chip")];
    (d.forEach((m) => m.addEventListener("click", () => _(y, m))), _(y, d[0]));
  });
  function E(y) {
    (c.forEach((d, m) => {
      (d.setAttribute("aria-selected", String(y === m)),
        (d.tabIndex = y === m ? 0 : -1));
    }),
      g.forEach((d, m) => d.classList.toggle("is-on", y === m)));
  }
  (c.forEach((y, d) => {
    (y.addEventListener("click", () => E(d)),
      y.addEventListener("keydown", (m) => {
        if (m.key !== "ArrowRight" && m.key !== "ArrowLeft") return;
        const S = (d + (m.key === "ArrowRight" ? 1 : c.length - 1)) % c.length;
        (E(S), c[S].focus());
      }));
  }),
    E(0));
}
de();
pe();
he();
