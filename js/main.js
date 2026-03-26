/* ============================================================
   Aurum Sports Management — main.js
   Core engine: language, nav, cards, modal.
   Reads from PLAYERS / SETTINGS / TRANSLATIONS in data.js
   ============================================================ */

const Aurum = (() => {
  let _lang = localStorage.getItem("aurum-lang") || "en";

  // ── Language ───────────────────────────────────────────────
  const getLang = () => _lang;

  const tx = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[_lang] || obj["en"] || "";
  };

  const setLang = (lang) => {
    _lang = lang;
    localStorage.setItem("aurum-lang", lang);
    document.documentElement.lang = lang;
    document
      .querySelectorAll(".lang-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.lang === _lang));
    document.dispatchEvent(new CustomEvent("aurum:lang"));
  };

  // ── Base path ──────────────────────────────────────────────
  // pages/ is one level deep → needs ../
  // player.html and players.html are at root → no prefix
  const base = () =>
    window.location.pathname.includes("/pages/") ? "../" : "";

  // ── Visible players ───────────────────────────────────────
  // Filters out players where show === false.
  // Use this everywhere instead of PLAYERS directly.
  const visiblePlayers = () => PLAYERS.filter((p) => p.show !== false);

  // ── Player page URL ────────────────────────────────────────
  // Hash-based routing: #/player/mi-hyang-lee
  const playerURL = (p) => `${base()}index.html#/player/${p.id}`;

  // ── Nav ────────────────────────────────────────────────────
  const buildNav = (active = "") => {
    const el = document.getElementById("main-nav");
    if (!el) return;
    const b = base();
    const rebuild = () => {
      el.innerHTML = `
        <div class="nav-inner">
          <a href="${b}index.html" class="nav-logo">
            <span class="logo-gold">AURUM</span>
            <span class="logo-sub">Sports Management</span>
          </a>
          <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-controls="nav-links" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-links" id="nav-links">
            <li><a href="${b}players.html"        class="${active === "roster" ? "active" : ""}">${tx(TRANSLATIONS.nav.roster)}</a></li>
            <li><a href="${b}pages/services.html" class="${active === "services" ? "active" : ""}">${tx(TRANSLATIONS.nav.services)}</a></li>
            <li><a href="${b}pages/visa.html"     class="${active === "visa" ? "active" : ""}">${tx(TRANSLATIONS.nav.visa)}</a></li>
            <li><a href="${b}pages/sponsors.html" class="${active === "sponsors" ? "active" : ""}">${tx(TRANSLATIONS.nav.sponsors)}</a></li>
            <li><a href="${b}pages/contact.html"  class="${active === "contact" ? "active" : ""}">${tx(TRANSLATIONS.nav.contact)}</a></li>
          </ul>
          <div class="lang-toggle">
            <button class="lang-btn ${_lang === "en" ? "active" : ""}" data-lang="en">EN</button>
            <button class="lang-btn ${_lang === "ko" ? "active" : ""}" data-lang="ko">한국어</button>
          </div>
        </div>`;
      el.querySelectorAll(".lang-btn").forEach((b) =>
        b.addEventListener("click", () => setLang(b.dataset.lang)),
      );
      const ham = document.getElementById("hamburger");
      const links = document.getElementById("nav-links");
      ham.addEventListener("click", () => {
        ham.classList.toggle("open");
        links.classList.toggle("open");
        ham.setAttribute(
          "aria-expanded",
          links.classList.contains("open") ? "true" : "false",
        );
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          ham.classList.remove("open");
          links.classList.remove("open");
          ham.setAttribute("aria-expanded", "false");
        }),
      );
    };
    rebuild();
    document.addEventListener("aurum:lang", rebuild);
  };

  // ── Win Banner ─────────────────────────────────────────────
  const buildBanner = () => {
    const el = document.getElementById("win-banner");
    if (!el || !SETTINGS.recentWin?.active) return;
    const render = () => (el.textContent = tx(SETTINGS.recentWin.message));
    render();
    el.style.display = "flex";
    document.addEventListener("aurum:lang", render);
  };

  // ── Footer ─────────────────────────────────────────────────
  const buildFooter = () => {
    const el = document.getElementById("main-footer");
    if (!el) return;
    const b = base();
    const c = SETTINGS.contact;
    const render = () => {
      el.innerHTML = `
        <div class="footer-inner">
          <div class="footer-top">
            <div>
              <div class="footer-logo">
                <span class="logo-gold">AURUM</span>
                <span class="logo-sub">Sports Management</span>
              </div>
              <p class="footer-tagline">${tx(SETTINGS.site.tagline)}</p>
            </div>
            <nav class="footer-nav">
              <a href="${b}players.html"        >${tx(TRANSLATIONS.nav.roster)}</a>
              <a href="${b}pages/services.html" >${tx(TRANSLATIONS.nav.services)}</a>
              <a href="${b}pages/visa.html"     >${tx(TRANSLATIONS.nav.visa)}</a>
              <a href="${b}pages/sponsors.html" >${tx(TRANSLATIONS.nav.sponsors)}</a>
              <a href="${b}pages/contact.html"  >${tx(TRANSLATIONS.nav.contact)}</a>
            </nav>
            <div class="footer-contact">
              <a href="mailto:${c.email}">${c.email}</a>
              <a href="tel:${c.phone}">${c.phone}</a>
              <span>${tx(c.location)}</span>
            </div>
          </div>
          <div class="footer-bottom">
            © ${new Date().getFullYear()} Aurum Sports Management. All Rights Reserved.
          </div>
        </div>`;
    };
    render();
    document.addEventListener("aurum:lang", render);
  };

  // ── Deck button helper ─────────────────────────────────────
  // If player has a deck → direct PDF download
  // If no deck yet → falls back to contact form
  const deckBtn = (p, style = "") => {
    if (p.deck) {
      const label =
        _lang === "ko" ? "스폰서십 자료 다운로드" : "Download Sponsorship Deck";
      return `<a href="${base()}${p.deck}" download class="btn-primary" ${style}>⬇ PDF &nbsp;${label}</a>`;
    }
    const label =
      _lang === "ko" ? "스폰서십 자료 요청" : "Request Sponsorship Deck";
    return `<a href="${base()}pages/contact.html?player=${p.id}&type=sponsor" class="btn-primary" ${style}>${label}</a>`;
  };
  const sponsorTiersHTML = () => {
    const tiers = [
      {
        icon: "🥇",
        name: { en: "Title Sponsor", ko: "타이틀 스폰서" },
        desc: {
          en: "Premier branding with event integration and exclusive visibility across all platforms.",
          ko: "모든 플랫폼에서 프리미어 브랜딩과 이벤트 통합 및 독점적 노출.",
        },
      },
      {
        icon: "🥈",
        name: { en: "Primary Sponsor", ko: "프라이머리 스폰서" },
        desc: {
          en: "Prominent brand presence through high-impact placements across key touchpoints.",
          ko: "주요 접점에서 높은 임팩트의 배치를 통한 브랜드 존재감.",
        },
      },
      {
        icon: "🥉",
        name: { en: "Supporting Sponsor", ko: "서포팅 스폰서" },
        desc: {
          en: "Targeted logo placement and amplified digital exposure for strategic reach.",
          ko: "전략적 도달을 위한 타겟 로고 배치 및 디지털 노출 확대.",
        },
      },
    ];
    return `<div class="sponsor-tiers">${tiers
      .map(
        (t, i) => `
      <div class="tier tier-${i}">
        <span class="tier-icon">${t.icon}</span>
        <div class="tier-name">${tx(t.name)}</div>
        <div class="tier-desc">${tx(t.desc)}</div>
      </div>`,
      )
      .join("")}</div>`;
  };

  // ── Player Card ────────────────────────────────────────────
  // linkToPage = true  → clicking goes to player.html?id=
  // linkToPage = false → clicking opens modal (default)
  const playerCard = (p, linkToPage = false) => {
    const href = linkToPage ? playerURL(p) : "#";
    const onclick = linkToPage
      ? ""
      : `onclick="Aurum.openModal('${p.id}');return false;"`;

    // Tags — derived from displayStats, not hardcoded fields
    const winTag = p.recentWin
      ? `<span class="tag tag-win">🏆 ${_lang === "ko" ? "최근 우승" : "Recent Win"}</span>`
      : "";
    const statTags = p.displayStats
      .slice(0, 2)
      .map(
        (s) => `<span class="tag tag-stat">${tx(s.label)}: ${s.value}</span>`,
      )
      .join("");

    return `
    <article class="player-card">
      <a href="${href}" ${onclick} class="card-link">
        <div class="card-photo">
          <span class="card-initial">${tx(p.name).charAt(0)}</span>
          <img src="${p.photo}" alt="${tx(p.name)}" loading="lazy" onerror="this.style.opacity=0"/>
          <div class="card-overlay"></div>
          <div class="card-foot">
            <span class="tour-badge badge-lpga">${p.tour}</span>
            <div class="card-name">${tx(p.name)}</div>
            <div class="card-sub">${tx(p.nationality)} ${p.flag}</div>
          </div>
        </div>
      </a>
      <div class="card-body">
        <div class="card-tags">${winTag}${statTags}</div>
        <a href="${href}" ${onclick} class="card-cta">
          ${_lang === "ko" ? "프로필 보기" : "View Profile"}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 2l4.5 4.5L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </article>`;
  };

  // ── Modal ──────────────────────────────────────────────────
  const openModal = (id) => {
    const p = PLAYERS.find((x) => x.id === id);
    if (!p) return;
    const b = base();

    const hl = tx(p.highlights)
      .map((h) => `<li>${h}</li>`)
      .join("");
    const rows = p.results
      .slice(0, 8)
      .map((r) => {
        const win = ["Winner", "1st", "1st (Medalist)"].includes(r.result);
        return `<tr class="${win ? "win-row" : ""}">
        <td>${r.year}</td>
        <td><span class="t-pill t-${r.tour.toLowerCase()}">${r.tour}</span></td>
        <td>${r.event}</td>
        <td class="${win ? "win-cell" : ""}">${r.result}</td>
      </tr>`;
      })
      .join("");

    // Stats — purely from displayStats, no hardcoded field names
    const statBoxes = p.displayStats
      .map(
        (s) => `
      <div class="ms">
        <span class="ms-n">${s.value}</span>
        <span class="ms-l">${tx(s.label)}</span>
      </div>`,
      )
      .join("");

    document.getElementById("modal-body").innerHTML = `
      <div class="modal-hero">
        <div class="modal-photo">
          <span class="modal-initial">${tx(p.name).charAt(0)}</span>
          <img src="${p.photo}" alt="${tx(p.name)}" onerror="this.style.opacity=0"/>
        </div>
        <div class="modal-info">
          <span class="tour-badge badge-lpga">${p.tour} Tour</span>
          <h2 class="modal-name">${tx(p.name)}</h2>
          ${p.name.ko !== tx(p.name) ? `<p class="modal-name-ko">${p.name.ko}</p>` : ""}
          <p class="modal-meta">${tx(p.nationality)} ${p.flag}${p.birthplace ? " · " + tx(p.birthplace) : ""}</p>
          <p class="modal-bio">${tx(p.bio)}</p>
          <div class="modal-stats">${statBoxes}</div>
        </div>
      </div>

      <div class="modal-sect">
        <h3 class="sect-label">${_lang === "ko" ? "주요 커리어" : "Career Highlights"}</h3>
        <ul class="hl-list">${hl}</ul>
      </div>

      <div class="modal-sect">
        <h3 class="sect-label">${_lang === "ko" ? "대회 성적" : "Tournament Results"}</h3>
        <div class="tbl-wrap"><table class="res-table">
          <thead><tr>
            <th>${_lang === "ko" ? "연도" : "Year"}</th>
            <th>Tour</th>
            <th>${_lang === "ko" ? "대회" : "Event"}</th>
            <th>${_lang === "ko" ? "성적" : "Result"}</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div>

      <div class="modal-sect modal-sponsor-sect">
        <h3 class="sect-label">${_lang === "ko" ? "스폰서십 기회" : "Sponsorship Opportunity"}</h3>
        ${sponsorTiersHTML()}
        <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
          ${deckBtn(p)}
          <a href="${playerURL(p)}" class="btn-outline">
            ${_lang === "ko" ? "전체 프로필 보기 →" : "View Full Profile →"}
          </a>
        </div>
      </div>`;

    document.getElementById("player-modal").classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    document.getElementById("player-modal")?.classList.remove("active");
    document.body.style.overflow = "";
  };

  const setupModal = () => {
    const overlay = document.getElementById("player-modal");
    if (!overlay) return;
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
    document
      .getElementById("modal-close")
      ?.addEventListener("click", closeModal);
  };

  // ── Progressive reveal animations ─────────────────────────
  const enhancePage = () => {
    const targets = document.querySelectorAll(
      ".player-card,.svc-card,.tier,.elite-card,.v-step,.faq-item,.sp-callout,.sophia-grid > div",
    );
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => {
        el.classList.remove("reveal");
        el.classList.add("in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -20px 0px" },
    );

    targets.forEach((el, i) => {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
      }
      el.style.transitionDelay = `${Math.min(i * 35, 280)}ms`;
      observer.observe(el);
    });
  };

  const scheduleEnhance = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(enhancePage);
    });
  };

  // ── Init ───────────────────────────────────────────────────
  const init = (active = "") => {
    document.documentElement.lang = _lang;
    buildNav(active);
    buildBanner();
    buildFooter();
    setupModal();
    scheduleEnhance();
    document.addEventListener("aurum:lang", scheduleEnhance);
  };

  return {
    init,
    getLang,
    setLang,
    tx,
    base,
    playerURL,
    playerCard,
    deckBtn,
    openModal,
    closeModal,
    sponsorTiersHTML,
    visiblePlayers,
  };
})();
