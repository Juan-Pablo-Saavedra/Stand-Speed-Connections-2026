/* Buscador y filtros del índice (mejora progresiva: sin JS la lista se ve completa). */
(function () {
  "use strict";

  var filters = document.getElementById("filters");
  var list = document.getElementById("list");
  if (!filters || !list) return;

  var input = document.getElementById("q");
  var count = document.getElementById("count");
  var empty = document.getElementById("empty");
  var chips = Array.prototype.slice.call(filters.querySelectorAll(".filter"));
  var items = Array.prototype.slice.call(list.children);
  var tipo = "";

  function normalize(s) {
    return String(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  var index = items.map(function (li) {
    return normalize(li.textContent);
  });

  function apply() {
    var q = normalize(input.value.trim());
    var shown = 0;

    items.forEach(function (li, i) {
      var ok = (!q || index[i].indexOf(q) !== -1) && (!tipo || li.getAttribute("data-tipo") === tipo);
      li.hidden = !ok;
      if (ok) shown++;
    });

    count.textContent = shown === 1 ? "1 resultado" : shown + " resultados";
    empty.hidden = shown !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      tipo = chip.getAttribute("data-tipo") || "";
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      apply();
    });
  });

  input.addEventListener("input", apply);

  filters.hidden = false;
  apply();
})();
