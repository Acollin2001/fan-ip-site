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
