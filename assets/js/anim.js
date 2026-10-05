(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Split the hero title into animated words (the gradient part stays one unit). */
  function splitTitle() {
    var h1 = document.querySelector(".hero h1");
    if (!h1 || reduce) return;
    var i = 0;
    var nodes = Array.prototype.slice.call(h1.childNodes);
    h1.textContent = "";
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/\s+/).filter(Boolean).forEach(function (word) {
          var s = document.createElement("span");
          s.className = "w";
          s.style.setProperty("--i", i++);
          s.textContent = word;
          h1.appendChild(s);
          h1.appendChild(document.createTextNode(" "));
        });
      } else {
        var wrap = document.createElement("span");
        wrap.className = "w";
        wrap.style.setProperty("--i", i++);
        wrap.appendChild(node);
        h1.appendChild(wrap);
        h1.appendChild(document.createTextNode(" "));
      }
    });
  }

  /* Cursor spotlight on cards. */
  function spotlight() {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }

  /* Soft 3D tilt of the product window. */
  function tilt() {
    var stage = document.querySelector(".stage");
    var el = document.querySelector(".stage-tilt");
    if (!stage || !el || reduce || !window.matchMedia("(hover: hover)").matches) return;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = "rotateY(" + x * 7 + "deg) rotateX(" + -y * 6 + "deg)";
    });
    stage.addEventListener("pointerleave", function () { el.style.transform = ""; });
  }

  /* Parallax for the background orbs. */
  function parallax() {
    var orbs = document.querySelectorAll(".orb");
    if (!orbs.length || reduce) return;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      orbs.forEach(function (o, i) { o.style.marginTop = y * (i ? -0.12 : 0.18) + "px"; });
    }, { passive: true });
  }

  splitTitle();
  spotlight();
  tilt();
  parallax();
})();
