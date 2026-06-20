/* =============================================================================
   graph-engine.js — reusable animated keyword-graph engine.
   Used by the comparison page (compare.html). The live site still uses the
   original self-contained graph.js; this file does not touch it.

   window.initGraph(canvasId, graphData, opts)
     graphData = { clusters:{key:color}, nodes:[{id,c,s,top?}], edges:[[a,b]] }
     opts = {
       idleLabelMin : hide labels of nodes with s < this until hovered (def 0)
       emphasizeTop : draw a halo ring around nodes flagged `top:true`
       sizeBase, sizeScale, sizePow : radius = sizeBase + s^sizePow * sizeScale
     }
   ========================================================================== */
(function () {
  "use strict";

  const decode = (() => {
    const t = document.createElement("textarea");
    return (s) => { t.innerHTML = s; return t.value; };
  })();

  function hex(c, a) {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  window.initGraph = function (canvasId, G, opts) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !G) return null;
    const ctx = canvas.getContext("2d");
    opts = opts || {};
    const idleLabelMin = opts.idleLabelMin || 0;
    const emphasizeTop = !!opts.emphasizeTop;
    const onSelect = typeof opts.onSelect === "function" ? opts.onSelect : null;
    const sizeBase  = opts.sizeBase  != null ? opts.sizeBase  : 3.4;
    const sizeScale = opts.sizeScale != null ? opts.sizeScale : 2.6;
    const sizePow   = opts.sizePow   != null ? opts.sizePow   : 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CLUSTERS = G.clusters;

    /* ---- build ---- */
    const nodeMap = new Map();
    const nodes = G.nodes.map((n, i) => {
      const o = {
        id: n.id, label: decode(n.id), cluster: n.c,
        color: CLUSTERS[n.c] || "#7dd3fc",
        s: n.s, top: !!n.top,
        r: sizeBase + Math.pow(n.s, sizePow) * sizeScale,
        x: 0, y: 0, vx: 0, vy: 0, idx: i,
      };
      nodeMap.set(n.id, o);
      return o;
    });
    const edges = G.edges
      .map(([a, b]) => ({ a: nodeMap.get(a), b: nodeMap.get(b) }))
      .filter((e) => e.a && e.b);
    const adj = new Map(nodes.map((n) => [n, new Set()]));
    edges.forEach((e) => { adj.get(e.a).add(e.b); adj.get(e.b).add(e.a); });

    /* ---- sizing ---- */
    let W = 0, H = 0, dpr = 1, seeded = false;

    // ideal node spacing (and derived forces) — recomputed on resize so the
    // graph fills whatever frame it is given, regardless of node count.
    let K = 120, REPULSION = 9000, SPRING_LEN = 120;
    function computeForces() {
      K = Math.sqrt((W * H) / Math.max(nodes.length, 1));
      SPRING_LEN = K * 0.9;
      REPULSION = K * K * 0.42;
    }

    function seedPositions() {
      const keys = Object.keys(CLUSTERS);
      const centers = {};
      keys.forEach((k, i) => {
        const ang = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
        // spread cluster centres across the full frame (ellipse matches aspect)
        centers[k] = {
          x: W / 2 + Math.cos(ang) * W * 0.36,
          y: H / 2 + Math.sin(ang) * H * 0.36,
        };
      });
      nodes.forEach((n) => {
        const c = centers[n.cluster] || { x: W / 2, y: H / 2 };
        n.x = c.x + (Math.random() - 0.5) * K;
        n.y = c.y + (Math.random() - 0.5) * K;
      });
    }
    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      computeForces();
      if (!seeded) { seedPositions(); seeded = true; }
    }

    /* ---- physics ----
       The simulation runs in its own coordinate space (repulsion + edge
       springs + gentle gravity toward the centroid). A smoothed transform
       (see updateTransform) then scales the whole layout to fill the frame,
       so the graph always uses the available space — never a tight clump. */
    const SPRING = 0.02, GRAVITY = 0.02, DAMP = 0.9, MAX_V = 3.4;
    let mouse = { x: -9999, y: -9999, active: false };
    let hovered = null;
    let selectedNode = null;
    // transform: screen = physics * scale + offset
    let tSX = null, tSY = null, tOX = 0, tOY = 0;

    function step() {
      // centroid for gravity
      let cx = 0, cy = 0;
      for (const n of nodes) { cx += n.x; cy += n.y; }
      cx /= nodes.length; cy /= nodes.length;

      // While the pointer is over the graph, calm the motion so bubbles are
      // easy to click (they resume drifting once the pointer leaves).
      const damp = mouse.active ? 0.55 : DAMP;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) d2 = 1;
          const d = Math.sqrt(d2);
          const f = (REPULSION + (a.r + b.r) * 30) / d2;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
        }
      }
      edges.forEach((e) => {
        const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - SPRING_LEN) * SPRING;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        e.a.vx += fx; e.a.vy += fy; e.b.vx -= fx; e.b.vy -= fy;
      });
      nodes.forEach((n) => {
        n.vx += (cx - n.x) * GRAVITY;
        n.vy += (cy - n.y) * GRAVITY;
        n.vx *= damp; n.vy *= damp;
        n.vx = Math.max(-MAX_V, Math.min(MAX_V, n.vx));
        n.vy = Math.max(-MAX_V, Math.min(MAX_V, n.vy));
        n.x += n.vx; n.y += n.vy;
      });
    }

    // map the physics layout onto the frame (aspect-aware, smoothed)
    function updateTransform(instant) {
      let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
      for (const n of nodes) {
        if (n.x < minx) minx = n.x; if (n.x > maxx) maxx = n.x;
        if (n.y < miny) miny = n.y; if (n.y > maxy) maxy = n.y;
      }
      const bw = Math.max(maxx - minx, 1), bh = Math.max(maxy - miny, 1);
      const padX = 70, padY = 46;
      const targetSX = (W - 2 * padX) / bw;
      const targetSY = (H - 2 * padY) / bh;
      if (tSX === null || instant) { tSX = targetSX; tSY = targetSY; }
      else { tSX += (targetSX - tSX) * 0.07; tSY += (targetSY - tSY) * 0.07; }
      tOX = padX - minx * tSX;
      tOY = padY - miny * tSY;

      // screen coords + hover detection (in screen space)
      hovered = null;
      let best = 44 * 44;
      for (const n of nodes) {
        n.sx = n.x * tSX + tOX;
        n.sy = n.y * tSY + tOY;
        if (mouse.active) {
          const dx = n.sx - mouse.x, dy = n.sy - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < best) { best = d2; hovered = n; }
        }
      }
      if (onSelect) canvas.style.cursor = hovered ? "pointer" : "crosshair";
    }

    /* ---- draw ---- */
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      const focus = hovered || selectedNode;
      const neighbours = focus ? adj.get(focus) : null;

      edges.forEach((e) => {
        const active = focus && (e.a === focus || e.b === focus);
        const dim = focus && !active;
        const grad = ctx.createLinearGradient(e.a.sx, e.a.sy, e.b.sx, e.b.sy);
        grad.addColorStop(0, e.a.color);
        grad.addColorStop(1, e.b.color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = active ? 0.85 : dim ? 0.05 : 0.15;
        ctx.lineWidth = active ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(e.a.sx, e.a.sy);
        ctx.lineTo(e.b.sx, e.b.sy);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      nodes.forEach((n) => {
        const isNb = neighbours && neighbours.has(n);
        const active = !focus || n === focus || isNb;
        const pulse = reduceMotion ? 1 : 1 + Math.sin(t / 900 + n.idx) * 0.1;
        const r = n.r * pulse;
        const x = n.sx, y = n.sy;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4.5);
        glow.addColorStop(0, hex(n.color, active ? 0.55 : 0.12));
        glow.addColorStop(1, hex(n.color, 0));
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, r * 4.5, 0, Math.PI * 2); ctx.fill();

        if (emphasizeTop && n.top) {
          const ringR = r + 6 + (reduceMotion ? 0 : Math.sin(t / 700 + n.idx) * 1.6);
          ctx.strokeStyle = hex(n.color, active ? 0.7 : 0.3);
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(x, y, ringR, 0, Math.PI * 2); ctx.stroke();
        }

        ctx.globalAlpha = active ? 1 : 0.4;
        ctx.fillStyle = n.color;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath(); ctx.arc(x - r * 0.25, y - r * 0.25, r * 0.32, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;

        let showLabel;
        if (focus) showLabel = n === focus || isNb || n.s >= idleLabelMin;
        else showLabel = n.s >= idleLabelMin;
        if (showLabel) {
          const fs = n.s >= 2.4 ? 14 : n.s >= 1.7 ? 13 : n.s >= 1.3 ? 12 : 11;
          const bold = n.top || n === focus ? 700 : n.s >= 1.7 ? 600 : 500;
          ctx.font = `${bold} ${fs}px Inter, sans-serif`;
          ctx.textAlign = "center"; ctx.textBaseline = "top";
          const ly = y + r + 5;
          const tw = ctx.measureText(n.label).width;
          const lx = Math.max(tw / 2 + 5, Math.min(W - tw / 2 - 5, x));
          ctx.fillStyle = "rgba(7,11,18,0.85)";
          ctx.fillRect(lx - tw / 2 - 3, ly - 1, tw + 6, fs + 4);
          ctx.fillStyle = active ? "#eaf2ff" : "rgba(157,176,204,0.45)";
          ctx.fillText(n.label, lx, ly);
        }
      });
    }

    /* ---- loop ---- */
    let running = true;
    let settle = reduceMotion ? 220 : Infinity;
    function loop(t) {
      if (!running) return;
      step(); updateTransform(); draw(t);
      if (reduceMotion && --settle <= 0) { running = false; return; }
      requestAnimationFrame(loop);
    }

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; mouse.active = true;
    });
    canvas.addEventListener("pointerleave", () => { mouse.active = false; mouse.x = mouse.y = -9999; });

    // click a bubble to select it (and notify the page via onSelect)
    if (onSelect) {
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left, my = e.clientY - rect.top;
        let hit = null, best = Infinity;
        for (const n of nodes) {
          const dx = n.sx - mx, dy = n.sy - my;
          const d2 = dx * dx + dy * dy;
          const reach = n.r * 1.9 + 10;          // generous, since bubbles drift
          if (d2 < reach * reach && d2 < best) { best = d2; hit = n; }
        }
        selectedNode = (hit && hit === selectedNode) ? null : hit;  // click again to deselect
        onSelect(selectedNode);
      });
    }

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting && !running && !reduceMotion) { running = true; requestAnimationFrame(loop); }
        else if (!en.isIntersecting && !reduceMotion) { running = false; }
      }), { threshold: 0.02 });
      io.observe(canvas);
    }

    resize();
    for (let i = 0; i < 240; i++) step();
    updateTransform(true);   // fit instantly so the first paint already fills the frame
    requestAnimationFrame(loop);
    return {
      resize: resize,
      clearSelection: function () { selectedNode = null; },
      select: function (id) { selectedNode = nodeMap.get(id) || null; },
    };
  };
})();
