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

  /* ---------- Expertise graph (touch-enabled) ---------- */
  let mGraphApi = null;

  function initMobileGraph() {
    if (typeof GRAPH_ALT === "undefined" || typeof initGraph !== "function") return null;
    const labels = {
      core: "core themes", powertrain: "powertrains", data: "data & sensing",
      tools: "tools & methods", policy: "regulation", soft: "communication & impact",
    };
    const leg = document.getElementById("m-graph-legend");
    if (leg) {
      leg.innerHTML = Object.keys(GRAPH_ALT.clusters).map((k) => {
        const c = GRAPH_ALT.clusters[k];
        return '<span><i style="background:' + c + ";box-shadow:0 0 6px " + c + '"></i>' + (labels[k] || k) + "</span>";
      }).join("");
    }
    return initGraph("m-graph-canvas", GRAPH_ALT, {
      idleLabelMin: 0, emphasizeTop: true,
      sizeBase: 2.5, sizeScale: 1.8, sizePow: 1.7,
      touch: true,
      onSelect: function (node) {
        clearChips();
        if (node) CV.setPubFilter(node.label);
        else CV.clearPubFilter();
      },
    });
  }

  /* ---------- Keyword chips ---------- */
  function renderChips() {
    const wrap = document.getElementById("chips");
    if (!wrap || typeof GRAPH_ALT === "undefined") return;
    const colors = GRAPH_ALT.clusters;

    // largest / most-central keywords first
    const nodes = GRAPH_ALT.nodes.slice().sort((a, b) => b.s - a.s);

    nodes.forEach((n) => {
      const label = decode(n.id);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (n.top ? " is-top" : "");
      chip.textContent = label;
      chip.dataset.tag = label;
      chip.style.setProperty("--c", colors[n.c] || "#5b8def");
      // size by importance
      chip.style.fontSize = (0.74 + Math.min(n.s, 3) * 0.085).toFixed(3) + "rem";
      chip.addEventListener("click", () => toggleChip(chip, label));
      wrap.appendChild(chip);
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
      if (mGraphApi) mGraphApi.clearSelection();
    } else {
      chip.classList.add("active");
      CV.setPubFilter(label);
      if (mGraphApi) mGraphApi.clearSelection();
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.CV) return;
    CV.renderContent();
    CV.setupNav();
    renderChips();
    mGraphApi = initMobileGraph();

    const pf = document.getElementById("pub-filter");
    if (pf) pf.addEventListener("click", (e) => {
      if (e.target.closest(".pf-clear")) {
        clearChips();
        if (mGraphApi) mGraphApi.clearSelection();
      }
    });
  });
})();
