(function () {
  var box = document.getElementById("videos");
  if (!box || !window.VIDEOS) return;

  window.VIDEOS.slice().reverse().forEach(function (v, i) {
    var a = document.createElement("a");
    a.className = "card vid-card";
    a.href = v.slug + "/";

    var meta = document.createElement("span");
    meta.className = "vid-meta";
    meta.textContent = "Видео " + (window.VIDEOS.length - i) + (v.tag ? " · " + v.tag : "");

    var h = document.createElement("h4");
    h.textContent = v.title;

    var p = document.createElement("p");
    p.textContent = v.desc;

    var go = document.createElement("div");
    go.className = "go";
    go.textContent = "Открыть материалы";

    a.appendChild(meta);
    a.appendChild(h);
    a.appendChild(p);
    a.appendChild(go);
    box.appendChild(a);
  });
})();
