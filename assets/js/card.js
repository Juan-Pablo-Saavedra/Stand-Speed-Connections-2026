/* Tarjeta individual: galería táctil con indicadores y lightbox accesible.
   Sin JS la galería sigue siendo un carrusel desplazable con scroll-snap. */
(function () {
  "use strict";

  var track = document.getElementById("track");
  var box = document.getElementById("lightbox");
  if (!track) return;

  var items = Array.prototype.slice.call(track.querySelectorAll(".gallery__item"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".gallery__dot"));
  var count = document.getElementById("gcount");
  var prev = document.getElementById("gprev");
  var next = document.getElementById("gnext");
  var current = 0;

  function goTo(i, smooth) {
    i = Math.max(0, Math.min(items.length - 1, i));
    track.scrollTo({ left: items[i].offsetLeft - track.offsetLeft, behavior: smooth === false ? "auto" : "smooth" });
  }

  function mark(i) {
    current = i;
    dots.forEach(function (d, k) {
      if (k === i) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
    if (count) count.textContent = i + 1 + " / " + items.length;
  }

  var ticking = false;
  track.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        mark(Math.round(track.scrollLeft / track.clientWidth));
      });
    },
    { passive: true }
  );

  dots.forEach(function (d, k) {
    d.addEventListener("click", function () {
      goTo(k);
    });
  });
  if (prev) prev.addEventListener("click", function () { goTo(current - 1); });
  if (next) next.addEventListener("click", function () { goTo(current + 1); });

  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { goTo(current + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { goTo(current - 1); e.preventDefault(); }
  });

  /* ---- Lightbox ---- */
  if (!box || typeof box.showModal !== "function") return;

  var img = box.querySelector(".lightbox__img");
  var lcount = box.querySelector(".lightbox__count");
  var lprev = box.querySelector(".lightbox__prev");
  var lnext = box.querySelector(".lightbox__next");
  var shown = 0;

  function show(i) {
    shown = (i + items.length) % items.length;
    var src = items[shown].querySelector(".gallery__img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    img.width = src.naturalWidth || src.width;
    img.height = src.naturalHeight || src.height;
    lcount.textContent = shown + 1 + " / " + items.length;
  }

  items.forEach(function (it, k) {
    it.querySelector(".gallery__open").addEventListener("click", function () {
      show(k);
      box.showModal();
    });
  });

  if (items.length < 2) {
    lprev.hidden = true;
    lnext.hidden = true;
  } else {
    lprev.addEventListener("click", function () { show(shown - 1); });
    lnext.addEventListener("click", function () { show(shown + 1); });
  }

  box.querySelector(".lightbox__close").addEventListener("click", function () { box.close(); });

  /* Cierra al tocar fuera de la imagen (fondo) */
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lightbox__stage")) box.close();
  });

  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" && items.length > 1) show(shown + 1);
    if (e.key === "ArrowLeft" && items.length > 1) show(shown - 1);
  });

  /* Gestos: deslizar hacia abajo cierra; izquierda/derecha cambia de foto */
  var sx = 0, sy = 0, tracking = false;
  var stage = box.querySelector(".lightbox__stage");
  stage.addEventListener("pointerdown", function (e) {
    tracking = true; sx = e.clientX; sy = e.clientY;
  });
  stage.addEventListener("pointermove", function (e) {
    if (!tracking) return;
    var dy = e.clientY - sy;
    if (dy > 0 && Math.abs(dy) > Math.abs(e.clientX - sx)) {
      img.style.transform = "translateY(" + dy * 0.6 + "px)";
      img.style.opacity = String(Math.max(0.4, 1 - dy / 400));
    }
  });
  function end(e) {
    if (!tracking) return;
    tracking = false;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    img.style.transform = "";
    img.style.opacity = "";
    if (dy > 90 && Math.abs(dy) > Math.abs(dx)) box.close();
    else if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && items.length > 1) show(shown + (dx < 0 ? 1 : -1));
  }
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", function () {
    tracking = false; img.style.transform = ""; img.style.opacity = "";
  });
})();
