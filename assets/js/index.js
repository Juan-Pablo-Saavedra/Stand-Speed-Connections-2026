/* Buscador y filtro del índice (mejora progresiva: sin JS la lista se ve completa). */
(function () {
  "use strict";

  var filters = document.getElementById("filters");
  var list = document.getElementById("list");
  if (!filters || !list) return;

  var input = document.getElementById("q");
  var tipo = document.getElementById("tipo");
  var count = document.getElementById("count");
  var empty = document.getElementById("empty");
  var items = Array.prototype.slice.call(list.querySelectorAll("li"));

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
    var t = tipo.value;
    var shown = 0;

    items.forEach(function (li, i) {
      var ok = (!q || index[i].indexOf(q) !== -1) && (!t || li.getAttribute("data-tipo") === t);
      li.hidden = !ok;
      if (ok) shown++;
    });

    count.textContent = shown === 1 ? "1 resultado" : shown + " resultados";
    empty.hidden = shown !== 0;
  }

  input.addEventListener("input", apply);
  tipo.addEventListener("change", apply);

  filters.hidden = false;
  apply();
})();
