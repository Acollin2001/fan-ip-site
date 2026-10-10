// Book a demo page: the Calendly calendar reports its height as it changes
// (calendar, then form, then confirmation); size the frame to match.
(function () {
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://calendly.com" || !e.data || e.data.event !== "calendly.page_height") return;
    var h = parseInt(e.data.payload && e.data.payload.height, 10);
    var frame = document.querySelector('.book-iframe[src*="calendly.com"]');
    if (frame && h > 300) frame.style.blockSize = h + "px";
  });
})();

// Coming from the reach calculator ("Book a demo with these numbers"): show the
// estimate and put it in the booking form's first question (Calendly "a1"), so
// the demo starts from it. Only plain numbers are read from the address.
(function () {
  var q = new URLSearchParams(location.search);
  var keys = ["members", "share", "posts", "views", "cpm", "value"];
  var n = {};
  for (var i = 0; i < keys.length; i++) {
    var v = q.get(keys[i]);
    if (v === null || !/^\d+(\.\d+)?$/.test(v)) return;
    n[keys[i]] = Number(v);
  }
  var frame = document.querySelector("[data-book]");
  if (!frame) return;
  var f = function (x) { return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(x); };
  var note = "Reach calculator estimate: " + f(n.members) + (n.members === 1 ? " member, " : " members, ") + f(n.share) + "% of them posting, " + f(n.posts) +
    (n.posts === 1 ? " post" : " posts") + " each a month, " + f(n.views) + " views a post, €" + f(n.cpm) + " CPM: €" + f(n.value) + " of media value a month.";
  var add = function (url) {
    var u = new URL(url, location.href);
    u.searchParams.set("a1", note);
    return u.toString();
  };
  frame.dataset.src = add(frame.dataset.src);
  var alt = frame.querySelector(".book-consent__alt");
  if (alt) alt.href = add(alt.href);
  var p = document.createElement("p");
  p.className = "book-estimate t-body";
  p.textContent = note.replace("Reach calculator estimate: ", "Your estimate from the reach calculator: ") + " It is added to the booking form, so the demo starts from your numbers. You can change it there.";
  frame.parentNode.insertBefore(p, frame);
})();
