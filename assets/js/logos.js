(function () {
  function toLetter(img) {
    var box = img.parentNode;
    if (!box || box.classList.contains("fb")) return;
    box.classList.add("fb");
    box.textContent = box.getAttribute("data-letter") || "";
  }

  document.querySelectorAll(".logo-img img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) toLetter(img);
    img.addEventListener("error", function () { toLetter(img); });
  });
})();
