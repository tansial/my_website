/* =============================================================================
   graph.js — animated, decorative "expertise map"
   A gently drifting, self-organising network of keyword nodes drawn on canvas.
   Not clickable: it reacts softly to the cursor and highlights connections,
   but exists purely as a living illustration of how the topics relate.
   ========================================================================== */
(function () {
  "use strict";

  const canvas = document.getElementById("graph-canvas");
  if (!canvas || typeof DATA === "undefined") return;
  const ctx = canvas.getContext("2d");

  const G = DATA.graph;
  const CLUSTERS = G.clusters;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  const decode = (() => {
    const t = document.createElement("textarea");
    return (s) => { t.innerHTML = s; return t.value; };
  })();

  /* ---------- build nodes & edges ---------- */
  const nodeMap = new Map();
  const nodes = G.nodes.map((n, i) => {
    const obj = {
      id: n.id,
      label: decode(n.id),
      cluster: n.c,
      color: CLUSTERS[n.c] || "#7dd3fc",
      r: 3.4 + n.s * 2.6,
      s: n.s,
      x: 0, y: 0, vx: 0, vy: 0,
      idx: i,
    };
    nodeMap.set(n.id, obj);
    return obj;
  });

  const edges = G.edges
    .map(([a, b]) => ({ a: nodeMap.get(a), b: nodeMap.get(b) }))
    .filter((e) => e.a && e.b);

  // adjacency for hover highlighting
  const adj = new Map(nodes.map((n) => [n, new Set()]));
  edges.forEach((e) => { adj.get(e.a).add(e.b); adj.get(e.b).add(e.a); });

  /* ---------- layout / sizing ---------- */
  let W = 0, H = 0, dpr = 1;

  function seedPositions() {
    // place each cluster around a ring, nodes jittered near their centre
    const clusterKeys = Object.keys(CLUSTERS);
    const centers = {};
    clusterKeys.forEach((k, i) => {
      const ang = (i / clusterKeys.length) * Math.PI * 2 - Math.PI / 2;
      const rad = Math.min(W, H) * 0.27;
      centers[k] = { x: W / 2 + Math.cos(ang) * rad, y: H / 2 + Math.sin(ang) * rad };
    });
    nodes.forEach((n) => {
      const c = centers[n.cluster] || { x: W / 2, y: H / 2 };
      n.x = c.x + (Math.random() - 0.5) * 90;
      n.y = c.y + (Math.random() - 0.5) * 90;
      n.vx = 0; n.vy = 0;
    });
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!seeded) { seedPositions(); seeded = true; }
  }

  /* ---------- physics ---------- */
  const REPULSION = 1500;
  const SPRING = 0.0016;
  const SPRING_LEN = 96;
  const CENTER = 0.0016;
  const DAMP = 0.86;
  const MAX_V = 2.2;

  let mouse = { x: -9999, y: -9999, active: false };
  let hovered = null;

  function step() {
    // repulsion (all pairs)
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) d2 = 1;
        const d = Math.sqrt(d2);
        const f = REPULSION / d2;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }
    }
    // springs along edges
    edges.forEach((e) => {
      const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - SPRING_LEN) * SPRING;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      e.a.vx += fx; e.a.vy += fy;
      e.b.vx -= fx; e.b.vy -= fy;
    });
    // centering + cursor repulsion + integrate
    hovered = null;
    let bestDist = 38 * 38;
    nodes.forEach((n) => {
      n.vx += (W / 2 - n.x) * CENTER;
      n.vy += (H / 2 - n.y) * CENTER;

      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          const d = Math.sqrt(d2) || 1;
          const f = (26000 - d2) / 26000 * 0.9;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        if (d2 < bestDist) { bestDist = d2; hovered = n; }
      }

      n.vx *= DAMP; n.vy *= DAMP;
      n.vx = Math.max(-MAX_V, Math.min(MAX_V, n.vx));
      n.vy = Math.max(-MAX_V, Math.min(MAX_V, n.vy));
      n.x += n.vx; n.y += n.vy;

      const pad = n.r + 14;
      if (n.x < pad) { n.x = pad; n.vx *= -0.5; }
      if (n.x > W - pad) { n.x = W - pad; n.vx *= -0.5; }
      if (n.y < pad) { n.y = pad; n.vy *= -0.5; }
      if (n.y > H - pad) { n.y = H - pad; n.vy *= -0.5; }
    });
  }

  /* ---------- drawing ---------- */
  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    const neighbours = hovered ? adj.get(hovered) : null;

    // edges
    edges.forEach((e) => {
      const active = hovered && (e.a === hovered || e.b === hovered);
      const dim = hovered && !active;
      const grad = ctx.createLinearGradient(e.a.x, e.a.y, e.b.x, e.b.y);
      grad.addColorStop(0, e.a.color);
      grad.addColorStop(1, e.b.color);
      ctx.strokeStyle = grad;
      ctx.globalAlpha = active ? 0.85 : dim ? 0.05 : 0.16;
      ctx.lineWidth = active ? 1.8 : 1;
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // nodes
    nodes.forEach((n) => {
      const active = !hovered || n === hovered || (neighbours && neighbours.has(n));
      const pulse = reduceMotion ? 1 : 1 + Math.sin(t / 900 + n.idx) * 0.12;
      const r = n.r * pulse;

      // glow
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4.5);
      glow.addColorStop(0, hex(n.color, active ? 0.5 : 0.12));
      glow.addColorStop(1, hex(n.color, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // core
      ctx.globalAlpha = active ? 1 : 0.4;
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(n.x - r * 0.25, n.y - r * 0.25, r * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // label
      const showLabel = n.s >= 1.3 || n === hovered || (neighbours && neighbours.has(n)) || !hovered;
      if (showLabel) {
        const fs = n.s >= 1.8 ? 13 : n.s >= 1.3 ? 12 : 11;
        ctx.font = `${n === hovered ? 600 : 500} ${fs}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const ly = n.y + r + 5;
        const tw = ctx.measureText(n.label).width;
        // keep label fully inside the canvas even if its node drifts to the edge
        const lx = Math.max(tw / 2 + 5, Math.min(W - tw / 2 - 5, n.x));
        ctx.fillStyle = "rgba(7,11,18,0.85)";
        ctx.fillRect(lx - tw / 2 - 3, ly - 1, tw + 6, fs + 4);
        ctx.fillStyle = active ? "#dce6f5" : "rgba(157,176,204,0.45)";
        ctx.fillText(n.label, lx, ly);
      }
    });
  }

  function hex(c, a) {
    // accepts #rrggbb -> rgba
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ---------- legend ---------- */
  function renderLegend() {
    const labels = {
      core: "core themes", powertrain: "powertrains", data: "data & sensing",
      tools: "tools & methods", policy: "regulation", topic: "research topics",
    };
    const leg = document.getElementById("graph-legend");
    leg.innerHTML = Object.keys(CLUSTERS).map(
      (k) => `<span><i style="background:${CLUSTERS[k]};box-shadow:0 0 6px ${CLUSTERS[k]}"></i>${labels[k] || k}</span>`
    ).join("");
  }

  /* ---------- loop ---------- */
  let seeded = false;
  let running = true;
  let settleFrames = reduceMotion ? 220 : Infinity; // reduced-motion: settle then stop

  function loop(t) {
    if (!running) return;
    // run physics a few extra times early on so it organises quickly
    step();
    draw(t);
    if (reduceMotion) {
      settleFrames--;
      if (settleFrames <= 0) { running = false; return; }
    }
    requestAnimationFrame(loop);
  }

  /* ---------- events ---------- */
  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  canvas.addEventListener("pointerleave", () => { mouse.active = false; mouse.x = mouse.y = -9999; });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  // pause when off-screen to save battery
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !running && !reduceMotion) { running = true; requestAnimationFrame(loop); }
        else if (!en.isIntersecting && !reduceMotion) { running = false; }
      });
    }, { threshold: 0.02 });
    io.observe(canvas);
  }

  /* ---------- start ---------- */
  function start() {
    resize();
    renderLegend();
    // pre-settle a bit so first paint isn't a clump
    for (let i = 0; i < 90; i++) step();
    requestAnimationFrame(loop);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(start, 0);
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }
})();
