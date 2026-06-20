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
    } else {
      chip.classList.add("active");
      CV.setPubFilter(label);
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.CV) return;
    CV.renderContent();   // hero, summary, experience, skills, resources, awards, education, publications, footer
    CV.setupNav();
    renderChips();

    // when the publications "clear ✕" is tapped, also drop the chip selection
    const pf = document.getElementById("pub-filter");
    if (pf) pf.addEventListener("click", (e) => {
      if (e.target.closest(".pf-clear")) clearChips();
    });
  });
})();
