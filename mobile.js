/* =============================================================================
   mobile.js — phone layout controller.
   Reuses the shared CV.* renderers (from main.js) for all content, and
   replaces the interactive graph with tappable keyword chips that filter
   the publications list.
   ========================================================================== */
(function () {
  "use strict";

  const decode = (() => {
    const t = document.createElement("textarea");
    return (s) => { t.innerHTML = s; return t.value; };
  })();

  /* ---------- Keyword chips (grouped by cluster, collapsible) ---------- */
  function renderChips() {
    const wrap = document.getElementById("chips");
    if (!wrap || typeof GRAPH_ALT === "undefined") return;
    const colors = GRAPH_ALT.clusters;
    const clusterLabels = {
      core: "Core Themes", powertrain: "Technologies", data: "Data & Sensing",
      tools: "Tools & Methods", policy: "Regulation",
    };

    var groups = {};
    var order = Object.keys(GRAPH_ALT.clusters);
    order.forEach(function (k) { groups[k] = []; });
    GRAPH_ALT.nodes.slice().sort(function (a, b) { return b.s - a.s; }).forEach(function (n) {
      if (groups[n.c]) groups[n.c].push(n);
    });

    order.forEach(function (key) {
      var nodes = groups[key];
      if (!nodes.length) return;
      var color = colors[key];

      var group = document.createElement("div");
      group.className = "chip-group";

      var header = document.createElement("button");
      header.type = "button";
      header.className = "chip-header";
      header.style.setProperty("--c", color);
      header.innerHTML = (clusterLabels[key] || key) + '<span class="chip-chevron">&#9662;</span>';
      header.addEventListener("click", function () {
        var wasOpen = group.classList.contains("open");
        wrap.querySelectorAll(".chip-group.open").forEach(function (g) { g.classList.remove("open"); });
        if (!wasOpen) group.classList.add("open");
      });

      var body = document.createElement("div");
      body.className = "chip-body";

      nodes.forEach(function (n) {
        var label = decode(n.id);
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip" + (n.top ? " is-top" : "");
        chip.textContent = label;
        chip.dataset.tag = label;
        chip.style.setProperty("--c", color);
        chip.style.fontSize = (0.74 + Math.min(n.s, 3) * 0.085).toFixed(3) + "rem";
        chip.addEventListener("click", function () { toggleChip(chip, label); });
        body.appendChild(chip);
      });

      group.appendChild(header);
      group.appendChild(body);
      wrap.appendChild(group);
    });
  }

  function clearChips() {
    document.querySelectorAll(".chip.active").forEach((c) => c.classList.remove("active"));
  }

  function toggleChip(chip, label) {
    const wasActive = chip.classList.contains("active");
    clearChips();
    if (wasActive) {
      CV.clearPubFilter();
    } else {
      chip.classList.add("active");
      CV.setPubFilter(label);
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.CV) return;
    CV.renderContent();
    CV.setupNav();
    renderChips();

    const pf = document.getElementById("pub-filter");
    if (pf) pf.addEventListener("click", (e) => {
      if (e.target.closest(".pf-clear")) clearChips();
    });
  });
})();
