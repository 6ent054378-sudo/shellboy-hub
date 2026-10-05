(function () {
  var bar = document.querySelector(".progress");
  var nav = document.querySelector(".nav-shell");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll(".reveal");
  items.forEach(function (el) {
    if (el.matches(".grid, .fit, .facts, .steps")) {
      el.classList.add("stagger");
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    }
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  items.forEach(function (el) { io.observe(el); });
})();
