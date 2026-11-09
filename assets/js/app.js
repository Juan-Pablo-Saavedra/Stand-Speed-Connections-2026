/* Aparición escalonada al hacer scroll. Mejora progresiva: sin JS (o sin
   IntersectionObserver) todo el contenido queda visible. Los elementos que ya
   están en pantalla al cargar nunca se ocultan, así no hay parpadeo ni CLS. */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var vh = window.innerHeight || document.documentElement.clientHeight;
  var below = items.filter(function (el) {
    return el.getBoundingClientRect().top > vh * 0.92;
  });

  var io = new IntersectionObserver(
    function (entries) {
      var batch = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.setProperty("--d", Math.min(batch++, 5) * 70 + "ms");
        e.target.classList.remove("is-hidden");
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
  );

  below.forEach(function (el) {
    el.classList.add("reveal", "is-hidden");
    io.observe(el);
  });

  /* Red de seguridad: si algo no se observó, se muestra todo pasados 4 s. */
  setTimeout(function () {
    below.forEach(function (el) {
      el.classList.remove("is-hidden");
    });
  }, 4000);
})();
