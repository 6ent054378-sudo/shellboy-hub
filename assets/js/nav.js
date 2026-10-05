(function () {
  var links = document.querySelectorAll(".navpill a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;

  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("active"); });
      var a = map[en.target.id];
      if (a) a.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
