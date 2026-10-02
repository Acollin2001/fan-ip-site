(() => {
const exports = {};
"use strict";
// The moving parts of Board, Dial, Print, Calendar, Riso and Metro, written
// against the markup the scenes render at rest (board.tsx, dial.tsx,
// print.tsx, calendar.tsx, riso.tsx, metro.tsx), so the same code
// runs in the app (useKinetics) and in the static demo export
// (scripts/design-proposals/export-demo.mjs bundles this file). Plain DOM, no
// imports. Members who ask their device for less motion get the screens at
// rest; what they can operate (the dial) still works,
// without the animation.
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhance = enhance;
/** Starts every kinetic piece under `root` ([data-kinetic]); returns a cleanup. */
function enhance(root, options = {}) {
    const reduce = options.reduce ??
        (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
    const cleanups = [];
    const pieces = [
        ...(root instanceof Element && root.matches("[data-kinetic]") ? [root] : []),
        ...root.querySelectorAll("[data-kinetic]"),
    ];
    for (const el of pieces) {
        if (el.dataset.kineticOn)
            continue;
        el.dataset.kineticOn = "";
        const kind = el.dataset.kinetic;
        const stop = kind === "flaps"
            ? flaps(el, reduce)
            : kind === "dial"
                ? dial(el, reduce)
                : kind === "ring"
                    ? ring(el, reduce)
                    : kind === "print"
                        ? printKinetic(el, reduce)
                        : kind === "calendar"
                            ? calendarKinetic(el, reduce)
                            : kind === "riso"
                                ? risoKinetic(el, reduce)
                                : kind === "metro"
                                    ? metroKinetic(el, reduce)
                                    : null;
        cleanups.push(() => {
            stop?.();
            delete el.dataset.kineticOn;
        });
    }
    return () => cleanups.forEach((stop) => stop());
}
/** Runs `fn` once, the first time `el` comes into view. */
function onceInView(el, fn, margin = "0px 0px -6% 0px") {
    if (typeof IntersectionObserver !== "function") {
        fn();
        return () => { };
    }
    const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            fn();
        }
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// ----------------------------------------------------------------- Board
// A group of flaps ([data-kinetic="flaps"], .sc-flap tiles) turns into place
// when it first comes into view: every tile runs through a few characters of
// its kind before it stops, left to right, and then stays put. The tile React rendered (.sc-flap-char) stays in place;
// the moving halves live in a container of their own (.sc-flap-k).
const DIGITS = "0123456789";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function half(kind, leaf = false) {
    const el = document.createElement("span");
    el.className = "sc-flap-half";
    el.dataset.half = kind;
    if (leaf)
        el.dataset.leaf = "";
    el.append(document.createElement("span"));
    return el;
}
function setChar(el, ch) {
    el.firstChild.textContent = ch;
}
function tileOf(el) {
    const char = el.querySelector(".sc-flap-char");
    if (!char)
        return null;
    const box = document.createElement("span");
    box.className = "sc-flap-k";
    box.setAttribute("aria-hidden", "true");
    const top = half("top");
    const bottom = half("bottom");
    const leafTop = half("top", true);
    const leafBottom = half("bottom", true);
    box.append(top, bottom, leafTop, leafBottom);
    el.append(box);
    el.dataset.k = "";
    const final = char.textContent ?? "";
    return { el, final, shown: final, top, bottom, leafTop, leafBottom, box };
}
function show(tile, ch) {
    tile.shown = ch;
    for (const part of [tile.top, tile.bottom, tile.leafTop, tile.leafBottom])
        setChar(part, ch);
    tile.leafTop.style.visibility = "hidden";
    tile.leafBottom.style.visibility = "hidden";
}
async function flip(tile, to, duration) {
    const from = tile.shown;
    setChar(tile.top, to);
    setChar(tile.bottom, from);
    setChar(tile.leafTop, from);
    setChar(tile.leafBottom, to);
    tile.leafTop.style.visibility = "visible";
    tile.leafBottom.style.visibility = "hidden";
    await tile.leafTop
        .animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }], {
        duration: duration * 0.5,
        easing: "cubic-bezier(0.55, 0, 1, 0.45)",
        fill: "forwards",
    })
        .finished.catch(() => { });
    tile.leafTop.style.visibility = "hidden";
    tile.leafBottom.style.visibility = "visible";
    await tile.leafBottom
        .animate([{ transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }], {
        duration: duration * 0.5,
        // The flap lands and settles: a short overshoot.
        easing: "cubic-bezier(0.3, 1.5, 0.55, 1)",
        fill: "forwards",
    })
        .finished.catch(() => { });
    setChar(tile.bottom, to);
    tile.shown = to;
    tile.leafBottom.style.visibility = "hidden";
}
function poolFor(ch) {
    if (DIGITS.includes(ch))
        return DIGITS;
    const up = ch.toLocaleUpperCase();
    if (LETTERS.includes(up))
        return ch === up ? LETTERS : LETTERS.toLowerCase();
    return null;
}
/** The characters a tile runs through before it stops, in the board's order. */
function run(final, steps) {
    const pool = poolFor(final);
    if (!pool)
        return [final];
    const at = pool.indexOf(final);
    const out = [];
    for (let n = steps; n > 0; n--)
        out.push(pool[(at - n + pool.length * 4) % pool.length]);
    out.push(final);
    return out;
}
function flaps(group, reduce) {
    if (reduce || typeof Element.prototype.animate !== "function")
        return null;
    const tiles = [...group.querySelectorAll(".sc-flap")]
        .map(tileOf)
        .filter((t) => t !== null);
    if (!tiles.length)
        return null;
    let alive = true;
    const speed = Number(group.dataset.speed || 1);
    // Blank until the group comes into view.
    tiles.forEach((t) => show(t, ""));
    const play = () => Promise.all(tiles.map(async (tile, i) => {
        const steps = Math.min(2 + i, 6);
        await wait(i * 40 * speed);
        for (const ch of run(tile.final, steps)) {
            if (!alive)
                return;
            await flip(tile, ch, 120 * speed);
        }
    }));
    const stopView = onceInView(group, () => void play());
    return () => {
        alive = false;
        stopView();
        tiles.forEach((t) => {
            t.box.remove();
            delete t.el.dataset.k;
        });
    };
}
// ------------------------------------------------------------------ Dial
// A ring of missions the member turns: dragging the face turns it under the
// finger, letting go settles on the nearest mission; a tap on a figure, the
// arrow keys, the two buttons or the mouse wheel do the same. The mission at
// the top is the one shown under the dial. Ticks light up to the balance when
// the dial first comes into view.
function dial(root, reduce) {
    const face = root.querySelector(".sc-dial-face");
    const rotor = root.querySelector(".sc-dial-rotor");
    const notches = [...root.querySelectorAll("[data-notch]")];
    const panels = [...root.querySelectorAll("[data-panel]")];
    const status = root.querySelector("[data-dial-status]");
    const cleanups = [];
    // The ring of ticks.
    const ticks = root.querySelector("[data-ticks]");
    if (ticks && !reduce) {
        ticks.dataset.dark = "";
        cleanups.push(onceInView(ticks, () => {
            requestAnimationFrame(() => delete ticks.dataset.dark);
        }));
    }
    const n = notches.length;
    if (!face || !rotor || n < 2)
        return () => cleanups.forEach((c) => c());
    const step = 360 / n;
    let index = Math.max(0, notches.findIndex((el) => el.getAttribute("aria-checked") === "true"));
    let angle = -index * step;
    const paint = (animate) => {
        rotor.toggleAttribute("data-settling", animate && !reduce);
        rotor.style.setProperty("--turn", `${angle}deg`);
    };
    const select = (next, animate = true, focus = false) => {
        const wrapped = ((next % n) + n) % n;
        // The shortest way round from where the dial stands.
        let delta = -wrapped * step - angle;
        delta = ((((delta + 180) % 360) + 360) % 360) - 180;
        angle += delta;
        paint(animate);
        if (wrapped === index && !focus)
            return;
        const forward = delta < 0;
        index = wrapped;
        notches.forEach((el, i) => {
            el.setAttribute("aria-checked", String(i === index));
            el.tabIndex = i === index ? 0 : -1;
        });
        if (focus)
            notches[index].focus({ preventScroll: true });
        panels.forEach((panel) => {
            const on = Number(panel.dataset.panel) === index;
            panel.hidden = !on;
            if (on && animate && !reduce && typeof panel.animate === "function") {
                panel.animate([
                    { opacity: 0, transform: `translateX(${forward ? 18 : -18}px)` },
                    { opacity: 1, transform: "none" },
                ], { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
            }
        });
        if (status)
            status.textContent = notches[index].dataset.say ?? "";
    };
    paint(false);
    // Taps and keys.
    const onClick = (e) => {
        const notch = e.target.closest("[data-notch]");
        if (notch && root.contains(notch))
            select(Number(notch.dataset.notch));
        const move = e.target.closest("[data-dial-move]");
        if (move && root.contains(move))
            select(index + Number(move.dataset.dialMove));
    };
    const onKey = (e) => {
        if (!e.target.closest("[data-notch]"))
            return;
        const keys = {
            ArrowRight: 1,
            ArrowDown: 1,
            ArrowLeft: -1,
            ArrowUp: -1,
        };
        if (e.key in keys)
            select(index + keys[e.key], true, true);
        else if (e.key === "Home")
            select(0, true, true);
        else if (e.key === "End")
            select(n - 1, true, true);
        else
            return;
        e.preventDefault();
    };
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKey);
    cleanups.push(() => {
        root.removeEventListener("click", onClick);
        root.removeEventListener("keydown", onKey);
    });
    // Turning by hand: the angle of the finger around the centre.
    let drag = null;
    const angleAt = (e) => {
        const box = face.getBoundingClientRect();
        return ((Math.atan2(e.clientY - (box.top + box.height / 2), e.clientX - (box.left + box.width / 2)) *
            180) /
            Math.PI);
    };
    const onDown = (e) => {
        if (e.button !== 0)
            return;
        drag = { id: e.pointerId, start: angleAt(e), from: angle, moved: 0, last: index };
    };
    const onMove = (e) => {
        if (!drag || e.pointerId !== drag.id)
            return;
        let d = angleAt(e) - drag.start;
        d = ((((d + 180) % 360) + 360) % 360) - 180;
        drag.moved = Math.max(drag.moved, Math.abs(d));
        if (drag.moved < 4)
            return;
        if (!face.hasPointerCapture(e.pointerId))
            face.setPointerCapture(e.pointerId);
        root.dataset.turning = "";
        angle = drag.from + d;
        paint(false);
        // A small tick under the finger each time a mission passes the top.
        const near = Math.round(-angle / step);
        if (near !== drag.last) {
            drag.last = near;
            navigator.vibrate?.(4);
        }
        e.preventDefault();
    };
    const onUp = (e) => {
        if (!drag || e.pointerId !== drag.id)
            return;
        const turned = drag.moved >= 4;
        drag = null;
        delete root.dataset.turning;
        if (!turned)
            return;
        // A turn is not a tap: the figure under the finger does not open.
        const swallow = (c) => c.stopPropagation();
        root.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => root.removeEventListener("click", swallow, { capture: true }), 50);
        select(Math.round(-angle / step));
    };
    face.addEventListener("pointerdown", onDown);
    face.addEventListener("pointermove", onMove);
    face.addEventListener("pointerup", onUp);
    face.addEventListener("pointercancel", onUp);
    cleanups.push(() => {
        face.removeEventListener("pointerdown", onDown);
        face.removeEventListener("pointermove", onMove);
        face.removeEventListener("pointerup", onUp);
        face.removeEventListener("pointercancel", onUp);
    });
    // The wheel turns the dial once the member is on it (a mission has the
    // focus), with shift held, or sideways; otherwise the page scrolls as usual.
    let wheelAt = 0;
    const onWheel = (e) => {
        const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        const on = root.contains(document.activeElement) || e.shiftKey || sideways;
        const amount = sideways ? e.deltaX : e.deltaY;
        if (!on || Math.abs(amount) < 4)
            return;
        e.preventDefault();
        const now = Date.now();
        if (now - wheelAt < 180)
            return;
        wheelAt = now;
        select(index + (amount > 0 ? 1 : -1));
    };
    face.addEventListener("wheel", onWheel, { passive: false });
    cleanups.push(() => face.removeEventListener("wheel", onWheel));
    return () => cleanups.forEach((c) => c());
}
/** A ring gauge (Dial's rewards, mission header, profile) fills when seen. */
function ring(el, reduce) {
    if (reduce)
        return null;
    el.dataset.empty = "";
    return onceInView(el, () => requestAnimationFrame(() => delete el.dataset.empty));
}
// ------------------------------------------------------------- Print
// One squeegee pass: the blade ([data-squeegee], at rest at the top of the
// screen on the home, made for the pass elsewhere) is pulled down across the
// ink ([data-pull]), which appears behind it over a faint stencil of the same
// words, then lifts back to rest. Once per sheet and per visit
// (sessionStorage, data-pull-key). With less motion, or when the sheet was
// already pulled: printed, nothing moves (and nothing is written to the page).
const PULL_MS = 950;
const PULL_BACK_MS = 420;
const PULL_EASE = "cubic-bezier(.45,.05,.4,1)";
function pulledKey(el) {
    return `sc-print-pulled:${el.dataset.pullKey ?? ""}`;
}
function alreadyPulled(el) {
    if (el.hasAttribute("data-pulled"))
        return true;
    try {
        return sessionStorage.getItem(pulledKey(el)) === "1";
    }
    catch {
        return false;
    }
}
function printKinetic(el, reduce) {
    const ink = el.querySelector("[data-pull]");
    if (!ink || reduce || typeof ink.animate !== "function")
        return null;
    if (alreadyPulled(el))
        return null;
    try {
        sessionStorage.setItem(pulledKey(el), "1");
    }
    catch {
        // Private mode: the pass may run again next time, which is harmless.
    }
    // The stencil is cloned from the printed ink, then the ink leaves the paper.
    const stencil = ink.cloneNode(true);
    stencil.removeAttribute("data-pull");
    stencil.style.clipPath = "";
    stencil.classList.add("sc-print-stencil");
    stencil.setAttribute("aria-hidden", "true");
    (ink.parentElement ?? el).insertBefore(stencil, ink);
    ink.style.clipPath = "inset(0 0 100% 0)";
    const parked = el.querySelector("[data-squeegee]");
    const blade = parked ?? document.createElement("span");
    if (!parked) {
        blade.className = "sc-print-squeegee";
        blade.dataset.squeegee = "pass";
        blade.setAttribute("aria-hidden", "true");
        el.appendChild(blade);
    }
    const animations = [];
    let timer = 0;
    let done = false;
    const finish = () => {
        if (done)
            return;
        done = true;
        window.clearTimeout(timer);
        animations.forEach((a) => a.cancel());
        ink.style.clipPath = "";
        stencil.remove();
        if (!parked)
            blade.remove();
        el.setAttribute("data-pulled", "");
    };
    const pull = () => {
        const rest = blade.getBoundingClientRect();
        const box = ink.getBoundingClientRect();
        const h = rest.height || 16;
        // A parked blade starts where it rests; a made one just above the ink.
        const start = parked ? 0 : box.top - rest.top - h - 6;
        const end = parked ? box.bottom - rest.top - h + 8 : box.bottom - rest.top + 6;
        const span = Math.max(1, end - start);
        // The ink shows down to the blade's edge (its bottom) as it passes.
        const clamp = (v) => Math.min(1, Math.max(0, v));
        const from = clamp((box.top - rest.top - h - start) / span);
        const to = clamp((box.bottom - rest.top - h - start) / span);
        const timing = {
            duration: PULL_MS,
            easing: PULL_EASE,
            fill: "forwards",
        };
        animations.push(blade.animate(parked
            ? [{ transform: "translateY(0)" }, { transform: `translateY(${end}px)` }]
            : [
                { transform: `translateY(${start}px)`, opacity: 0, offset: 0 },
                { transform: `translateY(${start + span * 0.06}px)`, opacity: 1, offset: 0.06 },
                { transform: `translateY(${start + span * 0.94}px)`, opacity: 1, offset: 0.94 },
                { transform: `translateY(${end}px)`, opacity: 0, offset: 1 },
            ], timing));
        const wipe = ink.animate([
            { clipPath: "inset(0 0 100% 0)", offset: 0 },
            { clipPath: "inset(0 0 100% 0)", offset: from },
            { clipPath: "inset(0 0 0% 0)", offset: Math.max(from, to) },
            { clipPath: "inset(0 0 0% 0)", offset: 1 },
        ], timing);
        animations.push(wipe);
        const lift = () => {
            if (done)
                return;
            ink.style.clipPath = "";
            stencil.remove();
            if (!parked)
                return finish();
            // The blade lifts and goes back to rest at the top of the screen.
            const back = blade.animate([{ transform: `translateY(${end}px)` }, { transform: "translateY(0)" }], { duration: PULL_BACK_MS, easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" });
            animations.push(back);
            back.finished.then(finish, () => { });
        };
        wipe.finished.then(lift, () => { });
    };
    // Let the screen settle (the page's own arrival) before the pass.
    timer = window.setTimeout(pull, 280);
    // A re-render (new data) keeps the sheet: the pass runs to its end. Only a
    // sheet taken off the page stops at once.
    return () => {
        if (!el.isConnected)
            finish();
    };
}
// ---------------------------------------------------------- Calendar
// The pad holds one page per day ([data-leaf]); only the first is shown at
// rest, the others wait under it ([data-off], inert). "Tear off the page"
// pulls the top page down and away to show the next day; "Previous page" lays
// the page back. Browsing only: nothing is saved. With less motion the pages
// swap at once. The sheet shown is announced and marked in the list of next
// pages.
function calendarKinetic(el, reduce) {
    const leaves = Array.from(el.querySelectorAll("[data-leaf]"));
    const back = el.querySelector('[data-cal-move="-1"]');
    const tear = el.querySelector('[data-cal-move="1"]');
    const status = el.querySelector("[data-cal-status]");
    const days = Array.from(el.querySelectorAll("[data-cal-day]"));
    const n = leaves.length;
    if (n < 2 || !back || !tear)
        return null;
    const canAnimate = !reduce && typeof leaves[0].animate === "function";
    let index = Math.max(0, leaves.findIndex((leaf) => !leaf.hasAttribute("data-off")));
    let running = null;
    const show = (leaf, on) => {
        leaf.toggleAttribute("data-off", !on);
        leaf.inert = !on;
    };
    const sync = () => {
        const focused = document.activeElement;
        back.hidden = index === 0;
        tear.disabled = index === n - 1;
        days.forEach((day) => day.toggleAttribute("data-on", index > 0 && Number(day.dataset.calDay) === index));
        // Keep the focus on a control that still works.
        if (focused === tear && tear.disabled)
            back.focus();
        else if (focused === back && back.hidden)
            tear.focus();
    };
    const go = (step) => {
        const next = index + step;
        if (next < 0 || next >= n)
            return;
        // A second tap finishes the page in flight at once.
        running?.finish();
        const from = leaves[index];
        const to = leaves[next];
        index = next;
        sync();
        if (status)
            status.textContent = to.dataset.say ?? "";
        if (!canAnimate) {
            show(from, false);
            show(to, true);
            return;
        }
        if (step > 0) {
            // Torn off: the old page stays on top, pulled at its corner, then falls away.
            show(to, true);
            from.inert = true;
            from.setAttribute("data-tearing", "");
            running = from.animate([
                { transform: "none", opacity: 1 },
                { transform: "translate(-1%, 1.5%) rotate(-3deg)", opacity: 1, offset: 0.22 },
                { transform: "translate(-10%, 62%) rotate(-15deg)", opacity: 0 },
            ], { duration: 680, easing: "cubic-bezier(0.5, 0, 0.6, 1)" });
        }
        else {
            // Laid back: the page comes down onto the pad from above.
            show(to, true);
            to.setAttribute("data-tearing", "");
            running = to.animate([
                { transform: "translateY(-30%) rotate(-5deg)", opacity: 0 },
                { transform: "none", opacity: 1 },
            ], { duration: 420, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
        }
        const anim = running;
        const done = () => {
            if (running === anim)
                running = null;
            if (step > 0) {
                from.removeAttribute("data-tearing");
                show(from, from === leaves[index]);
            }
            else {
                to.removeAttribute("data-tearing");
                show(from, from === leaves[index]);
            }
        };
        anim.finished.then(done, done);
    };
    const onClick = (e) => {
        const button = e.target.closest("[data-cal-move]");
        if (button && el.contains(button))
            go(Number(button.dataset.calMove));
    };
    el.addEventListener("click", onClick);
    sync();
    // Back to rest, as React wrote it: the first sheet on top, the others under
    // it, no day marked (new sheets or a re-render start again from today).
    return () => {
        el.removeEventListener("click", onClick);
        running?.cancel();
        running = null;
        leaves.forEach((leaf, i) => {
            leaf.removeAttribute("data-tearing");
            show(leaf, i === 0);
        });
        back.hidden = true;
        tear.disabled = false;
        days.forEach((day) => day.removeAttribute("data-on"));
        if (status)
            status.textContent = "";
    };
}
// -------------------------------------------------------------- Riso
// One idea: a big two-ink figure (riso.tsx, RisoFigure) is printed when it
// comes into view. Its figure counts up once from zero while the second ink,
// pulled off register, slides back into place. The markup at rest is the
// final state (figure written, ink in register), so less motion, no script
// or a saved page show the figure as it is. Screen readers read the figure
// from its own text, never the counting layers (aria-hidden).
function risoKinetic(el, reduce) {
    if (reduce || typeof requestAnimationFrame !== "function")
        return null;
    const inks = Array.from(el.querySelectorAll("[data-ink]"));
    const target = Number(el.dataset.value);
    if (!inks.length || !Number.isFinite(target))
        return null;
    const prefix = el.dataset.prefix ?? "";
    let format = (n) => prefix + String(n);
    try {
        const nf = new Intl.NumberFormat(el.dataset.locale || undefined);
        format = (n) => prefix + nf.format(n).replace(/\u202f/g, "\u00a0");
    }
    catch {
        // An unknown locale: plain digits while counting.
    }
    const final = el.dataset.text ?? format(target);
    const write = (text) => {
        for (const ink of inks)
            ink.textContent = text;
    };
    let frame = 0;
    let observer = null;
    // Off register and at zero until the figure is seen.
    el.dataset.risoOff = "";
    if (target !== 0)
        write(format(0));
    const play = () => {
        frame = requestAnimationFrame(() => {
            delete el.dataset.risoOff;
            if (target === 0)
                return;
            const start = performance.now();
            // Longer figures take a little longer, never more than 1.2 s.
            const duration = Math.min(1200, 600 + String(Math.abs(Math.round(target))).length * 80);
            const step = (now) => {
                const k = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - k, 3);
                write(k < 1 ? format(Math.round(target * eased)) : final);
                if (k < 1)
                    frame = requestAnimationFrame(step);
            };
            frame = requestAnimationFrame(step);
        });
    };
    if (typeof IntersectionObserver !== "function") {
        play();
    }
    else {
        observer = new IntersectionObserver((entries) => {
            if (!entries.some((e) => e.isIntersecting))
                return;
            observer?.disconnect();
            play();
        }, { rootMargin: "0px 0px -8% 0px" });
        observer.observe(el);
    }
    return () => {
        observer?.disconnect();
        cancelAnimationFrame(frame);
        write(final);
        delete el.dataset.risoOff;
    };
}
// ------------------------------------------------------------- Metro
// The line draws itself once, from the member's station on, when the map
// comes into view: the stretch ahead (paths with pathLength 1) runs out like
// a train leaving, each station ahead appears as the line reaches it
// ([data-at], its share of the way), and each reward's line
// ([data-metro-cross]) draws across as the train reaches its interchange.
// At rest the markup is fully drawn; with less motion nothing changes.
function metroKinetic(el, reduce) {
    if (reduce || typeof el.animate !== "function")
        return null;
    const paths = [...el.querySelectorAll("[data-metro-ahead]")];
    if (!paths.length)
        return null;
    const crosses = [...el.querySelectorAll("[data-metro-cross]")];
    const marks = [...el.querySelectorAll("[data-at]")].filter((m) => !m.hasAttribute("data-metro-cross"));
    const at = (m) => Math.max(0, Math.min(1, Number(m.getAttribute("data-at")) || 0));
    const lines = [...paths, ...crosses];
    // Hide what is ahead until the map is seen.
    const hide = () => {
        lines.forEach((p) => {
            p.style.strokeDasharray = "1 1";
            p.style.strokeDashoffset = "1";
        });
        marks.forEach((m) => (m.style.opacity = "0"));
    };
    const reset = () => {
        lines.forEach((p) => {
            p.style.strokeDasharray = "";
            p.style.strokeDashoffset = "";
        });
        marks.forEach((m) => (m.style.opacity = ""));
    };
    hide();
    const anims = [];
    let done = 0;
    const total = 1 + marks.length + crosses.length;
    const settle = () => {
        done += 1;
        if (done < total)
            return;
        reset();
        anims.forEach((a) => a.cancel());
        anims.length = 0;
    };
    const run = () => {
        // A steady train: about a second, a little longer for a long line.
        const length = Number(el.dataset.length) || 600;
        const duration = Math.max(600, Math.min(1300, length * 1.4));
        const draw = { duration, easing: "linear", fill: "forwards" };
        paths.forEach((p, i) => {
            const a = p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], draw);
            anims.push(a);
            if (i === 0)
                a.finished.then(settle, () => { });
        });
        crosses.forEach((p) => {
            const a = p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
                duration: 560,
                delay: at(p) * duration,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "forwards",
            });
            anims.push(a);
            a.finished.then(settle, () => { });
        });
        marks.forEach((m) => {
            const a = m.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 260,
                delay: at(m) * duration,
                easing: "ease-out",
                fill: "forwards",
            });
            anims.push(a);
            a.finished.then(settle, () => { });
        });
    };
    let io = null;
    if (typeof IntersectionObserver === "function") {
        io = new IntersectionObserver((entries) => {
            if (!entries.some((e) => e.isIntersecting))
                return;
            io?.disconnect();
            io = null;
            run();
        }, { rootMargin: "0px 0px -10% 0px" });
        io.observe(el);
    }
    else {
        run();
    }
    return () => {
        io?.disconnect();
        anims.forEach((a) => a.cancel());
        reset();
    };
}

window.FanipKinetics = exports;
})();
