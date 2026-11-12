// Contact form: sends the message as JSON to the app (app.fan-ip.com), which
// emails it to contact@fan-ip.com. Nothing is stored in the browser and nothing
// is counted in the visit statistics. If sending fails, the page says so and
// gives the email address instead.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".ct-status");
  var button = form.querySelector("button[type=submit]");
  var label = button.textContent;
  var shownAt = Date.now();
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function say(kind, html) {
    status.className = "ct-status" + (kind ? " is-" + kind : "");
    status.innerHTML = html;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var bad = [];
    [["name", f.name.value.trim().length > 0], ["email", EMAIL.test(f.email.value.trim())], ["message", f.message.value.trim().length > 0]].forEach(function (c) {
      f[c[0]].setAttribute("aria-invalid", c[1] ? "false" : "true");
      if (!c[1]) bad.push(f[c[0]]);
    });
    if (bad.length) { say("err", status.dataset.miss); bad[0].focus(); return; }

    var body = {
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      organisation: f.organisation.value.trim(),
      topic: f.topic.value,
      message: f.message.value.trim(),
      lang: f.lang.value,
      website: f.website.value,
      elapsed: Date.now() - shownAt
    };
    button.disabled = true;
    button.textContent = form.dataset.sending;
    say("", "");
    fetch(form.dataset.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      credentials: "omit"
    }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (el) { el.removeAttribute("aria-invalid"); });
      say("ok", status.dataset.ok);
      status.setAttribute("tabindex", "-1");
      status.focus();
    }).catch(function () {
      say("err", status.dataset.err);
    }).then(function () {
      button.disabled = false;
      button.textContent = label;
    });
  });
})();
