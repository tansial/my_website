/* =============================================================================
   main.js — renders all content sections from DATA (see data.js)
   ========================================================================== */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- Hero ---------- */
  function renderHero() {
    const p = DATA.profile;
    const links = p.links.map(
      (l) => `<a class="chip-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
    ).join("");

    $("hero").innerHTML = `
      <img class="hero-photo" src="${p.photo}" alt="Portrait of ${p.name}" />
      <div class="hero-body">
        <h1 class="hero-name">${p.name}</h1>
        <p class="hero-title">${p.title}</p>
        <p class="hero-sub">// ${p.subtitle}</p>
        <div class="hero-meta">
          <span><span class="ic">@</span><a href="mailto:${p.email}">${p.email}</a></span>
          <span><span class="ic">&#9678;</span>${p.location}</span>
        </div>
        <div class="hero-links">${links}</div>
      </div>`;
  }

  /* ---------- Summary ---------- */
  function renderSummary() {
    $("summary").innerHTML = DATA.summary;
  }

  /* ---------- Experience / Education timelines ---------- */
  function renderTimeline(targetId, items, withPoints) {
    const wrap = $(targetId);
    items.forEach((it) => {
      const item = el("div", "tl-item");
      let pts = "";
      if (withPoints && it.points) {
        pts = `<ul class="tl-points">${it.points.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      }
      const note = it.note ? `<p class="tl-note">${it.note}</p>` : "";
      item.innerHTML = `
        <div class="tl-period">${it.period}</div>
        <div class="tl-content">
          <p class="tl-role">${it.role || it.degree}</p>
          <p class="tl-org">${it.org}</p>
          ${note}
          ${pts}
        </div>`;
      wrap.appendChild(item);
    });
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const wrap = $("skills");
    DATA.skills.forEach((g) => {
      const group = el("div", "skill-group");
      const tags = g.items.map((i) => `<span class="tag">${i}</span>`).join("");
      group.innerHTML = `<h3>${g.group}</h3><div class="tags">${tags}</div>`;
      wrap.appendChild(group);
    });
  }

  /* ---------- Resources ---------- */
  function renderResources() {
    const wrap = $("resources");
    DATA.resources.forEach((r) => {
      const item = el("div", "res-item");
      item.innerHTML = `
        <p class="res-name"><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></p>
        <p class="res-role">${r.role}</p>
        <p class="res-desc">${r.desc}</p>
        <a class="res-link" href="${r.url}" target="_blank" rel="noopener">${shortUrl(r.url)} &#8599;</a>`;
      wrap.appendChild(item);
    });
  }

  /* ---------- Awards ---------- */
  function renderAwards() {
    const wrap = $("awards");
    DATA.awards.forEach((a) => {
      const item = el("div", "award-item");
      item.innerHTML = `
        <span class="award-year">${a.year}</span>
        <p class="award-name">${a.name}</p>
        <p class="award-desc">${a.desc}</p>`;
      wrap.appendChild(item);
    });
  }

  /* ---------- Publications (grouped by year, filterable) ---------- */
  let graphApi = null;

  function buildPub(pub) {
    const item = el("div", "pub");
    const authors = highlightAuthor(pub.authors);
    const ref = pub.doi
      ? `<a class="pub-doi" href="${pub.doi}" target="_blank" rel="noopener">DOI &#8599;</a>`
      : `<span class="pub-noref">in&nbsp;press</span>`;
    item.innerHTML = `
      <div class="pub-main">
        <p class="pub-title">${pub.title}</p>
        <p class="pub-authors">${authors}</p>
        <p class="pub-venue">${pub.venue}</p>
      </div>
      ${ref}`;
    return item;
  }

  function renderPubList(list) {
    const wrap = $("publications");
    wrap.innerHTML = "";
    let currentYear = null;
    list.forEach((pub) => {
      if (pub.year !== currentYear) {
        currentYear = pub.year;
        wrap.appendChild(el("div", "pub-year", String(currentYear)));
      }
      wrap.appendChild(buildPub(pub));
    });
    const total = DATA.publications.length;
    $("pub-count").textContent =
      list.length === total ? `${total} entries` : `${list.length} of ${total}`;
  }

  function setPubFilter(tag) {
    const all = DATA.publications;
    const matches = all.filter((p) => (p.tags || []).indexOf(tag) !== -1);
    const banner = $("pub-filter");
    const clearBtn = ` <button type="button" class="pf-clear">clear ✕</button>`;
    if (matches.length) {
      renderPubList(matches);
      banner.innerHTML = `Showing <b>${matches.length}</b> publication${matches.length > 1 ? "s" : ""}` +
        ` linked to <span class="pf-tag">${tag}</span>` + clearBtn;
    } else {
      renderPubList(all);
      banner.innerHTML = `No publications linked to <span class="pf-tag">${tag}</span>` +
        ` — showing all` + clearBtn;
    }
    banner.hidden = false;
    $("publications-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearPubFilter() {
    $("pub-filter").hidden = true;
    renderPubList(DATA.publications);
    if (graphApi) graphApi.clearSelection();
  }

  /* ---------- Expertise graph (Option B) + click-to-filter ---------- */
  function initExpertiseGraph() {
    if (typeof GRAPH_ALT === "undefined" || typeof initGraph !== "function") return;
    const labels = {
      core: "core themes", powertrain: "powertrains", data: "data & sensing",
      tools: "tools & methods", policy: "regulation", soft: "communication & impact",
    };
    const leg = $("graph-legend");
    if (leg) {
      leg.innerHTML = Object.keys(GRAPH_ALT.clusters).map((k) => {
        const c = GRAPH_ALT.clusters[k];
        return `<span><i style="background:${c};box-shadow:0 0 6px ${c}"></i>${labels[k] || k}</span>`;
      }).join("");
    }
    graphApi = initGraph("graph-canvas", GRAPH_ALT, {
      idleLabelMin: 0, emphasizeTop: true,
      sizeBase: 3, sizeScale: 2.2, sizePow: 1.7,
      onSelect: function (node) { if (node) setPubFilter(node.label); else clearPubFilter(); },
    });
  }

  function highlightAuthor(s) {
    // Bold "Tansini A." wherever it appears
    return s.replace(/Tansini\s*A\.?/g, '<span class="me">Tansini&nbsp;A.</span>');
  }

  function shortUrl(u) {
    return u.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    $("footer-name").textContent = DATA.profile.name;
    $("footer-year").textContent = "© " + new Date().getFullYear();
  }

  /* ---------- Nav: highlight the section in view ---------- */
  function setupNav() {
    const links = Array.prototype.slice.call(document.querySelectorAll(".topnav-links a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = {};
    links.forEach((a) => {
      const el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) { map[el.id] = a; }
    });
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        // highlight the topmost section currently in the active band
        let best = null, bestTop = Infinity;
        visible.forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < bestTop) { bestTop = top; best = el; }
        });
        links.forEach((l) => l.classList.remove("active"));
        if (best && map[best.id]) map[best.id].classList.add("active");
      },
      { rootMargin: "-70px 0px -55% 0px", threshold: 0 }
    );
    Object.keys(map).forEach((id) => io.observe(document.getElementById(id)));
  }

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    const targets = document.querySelectorAll(".card, .graph-section");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Shared API (used by index.html and mobile.html) ---------- */
  window.CV = {
    renderHero, renderSummary, renderTimeline, renderSkills, renderResources,
    renderAwards, renderPubList, setPubFilter, clearPubFilter, renderFooter,
    setupNav, setupReveal,
  };

  /* Render every content section common to both layouts. */
  function renderContent() {
    renderHero();
    renderSummary();
    renderTimeline("experience", DATA.experience, true);
    renderTimeline("education", DATA.education, false);
    renderSkills();
    renderResources();
    renderAwards();
    renderPubList(DATA.publications);
    renderFooter();
    setupReveal();
    const pf = $("pub-filter");
    if (pf) pf.addEventListener("click", (e) => {
      if (e.target.closest(".pf-clear")) clearPubFilter();
    });
  }
  window.CV.renderContent = renderContent;

  /* ---------- Desktop init (only on the page that has the graph) ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("graph-canvas")) return; // e.g. mobile.html
    renderContent();
    setupNav();
    initExpertiseGraph();
  });
})();
