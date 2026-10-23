/* LORBEK Luxury Cars — site interactions */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Data — current stock from lorbek.com.au
     ------------------------------------------------------------------ */
  const STOCK = "https://www.lorbek.com.au/stock/details/";
  const CARS = [
    { img: 1,  frame: [0.5, 0.5, 1], year: 2018, make: "Mercedes-AMG",  model: "G63",                      desc: "463 MY18 · Diamond White · 7-speed automatic wagon", price: 189990,  cat: "Luxury SUVs",   kms: 146099, trans: "Automatic", body: "SUV",       url: "326812-1024647/2018-mercedes-amg-g63-luxury-suvs" },
    { img: 2,  frame: [0.495, 0.51, 1.03], year: 2020, make: "Bentley",       model: "Flying Spur W12",          desc: "Moonbeam · Sedan",                                   price: 349880,  cat: "Prestige Cars", kms: 38509,  trans: "Automatic", body: "Sedan",     url: "326812-C000772/2021-bentley-flying-spur-prestige-cars" },
    { img: 3,  frame: [0.5, 0.5, 1], year: 2023, make: "Lamborghini",   model: "Huracán STO",              desc: "724 · Green · 7-speed automatic coupe",              price: 559990,  cat: "Prestige Cars", kms: 33996,  trans: "Automatic", body: "Coupe",     url: "326812-1024629/2023-lamborghini-huracan-prestige-cars" },
    { img: 4,  frame: [0.48, 0.55, 1.06], year: 2020, make: "Aston Martin",  model: "Vantage",                  desc: "MY21 · Onyx Black · 7-speed manual coupe",           price: 299990,  cat: "Prestige Cars", kms: 4910,   trans: "Manual",    body: "Coupe",     url: "326812-C000770/2021-aston-martin-vantage-prestige-cars" },
    { img: 5,  frame: [0.51, 0.44, 1.06], year: 2013, make: "Land Rover",    model: "Range Rover Autobiography", desc: "LG 5.0 V8 SC · Barolo Black · 8-speed automatic",   price: 59990,   cat: "Luxury SUVs",   kms: 167148, trans: "Automatic", body: "SUV",       url: "326812-1024646/2013-land-rover-range-rover-luxury-suvs" },
    { img: 6,  frame: [0.505, 0.44, 1.06], year: 2023, make: "Land Rover",    model: "Range Rover P530",         desc: "L460 MY23 · First Edition · 8-speed automatic",      price: 149990,  cat: "Luxury SUVs",   kms: 107215, trans: "Automatic", body: "SUV",       url: "326812-1024645/2023-land-rover-range-rover-luxury-suvs" },
    { img: 7,  frame: [0.46, 0.515, 1.08], year: 2014, make: "Audi",          model: "A7 S-Line 3.0 TFSI",       desc: "4G MY14 · Quattro S/C · White · 7-speed automatic",  price: 23990,   cat: "Prestige Cars", kms: 127202, trans: "Automatic", body: "Hatchback", url: "326812-1024643/2014-audi-a7-prestige-cars" },
    { img: 8,  frame: [0.5, 0.515, 1.03], year: 2016, make: "Jaguar",        model: "F-TYPE V6 S/C",            desc: "MY17 · White · 8-speed automatic coupe",             price: 69980,   cat: "Prestige Cars", kms: 61686,  trans: "Automatic", body: "Coupe",     url: "326812-C000769/2016-jaguar-f-type-prestige-cars" },
    { img: 9,  frame: [0.49, 0.5, 1.12], year: 1983, make: "Lancia",        model: "037 Stradale",             desc: "White · 5-speed manual coupe",                       price: 1399990, cat: "Prestige Cars", kms: 19816,  trans: "Manual",    body: "Coupe",     url: "326812-1024630/1983-lancia-037-prestige-cars" },
    { img: 10, frame: [0.47, 0.485, 1.06], year: 2019, make: "Audi",          model: "Q8 55 TFSI",               desc: "4M MY19 · Quattro MHEV · White · 8-speed automatic", price: 49990,   cat: "Luxury SUVs",   kms: 105775, trans: "Automatic", body: "SUV",       url: "326812-1024640/2019-audi-q8-luxury-suvs" },
    { img: 11, frame: [0.495, 0.485, 1.03], year: 2019, make: "Rolls-Royce",   model: "Wraith Black Badge",       desc: "665C MY20 · Diamond Black · 8-speed automatic",      price: 579990,  cat: "Prestige Cars", kms: 17332,  trans: "Automatic", body: "Coupe",     url: "326812-C000767/2019-rolls-royce-wraith-prestige-cars" },
    { img: 12, frame: [0.515, 0.44, 1.08], year: 2020, make: "Mercedes-Benz", model: "GLS 400d 4MATIC",          desc: "X167 MY20.5 · Selenite Grey · 9-speed automatic",    price: 69990,   cat: "Prestige Cars", kms: 115987, trans: "Automatic", body: "Wagon",     url: "326812-1024628/2020-mercedes-benz-gls-400d-prestige-cars" },
  ];

  // pos = focal point on wide screens, mpos = focal point on phones (keeps the car in frame)
  const SLIDES = [
    { img: "assets/img/hero/showroom-sls.jpg",   pos: "50% 62%", mpos: "60% 60%", make: "Welcome to",     model: "LORBEK Luxury Cars", cta: "View cars", href: "#arrivals" },
    { img: "assets/img/cars/car3.jpg",           pos: "50% 55%", mpos: "72% 55%", make: "Lamborghini",    model: "Huracán STO 2023",   cta: "View more", href: STOCK + CARS[2].url,  ext: true },
    { img: "assets/img/cars/car9.jpg",           pos: "50% 55%", mpos: "66% 55%", make: "Lancia",         model: "037 Stradale 1983",  cta: "View more", href: STOCK + CARS[8].url,  ext: true },
    { img: "assets/img/cars/car11.jpg",          pos: "50% 55%", mpos: "74% 55%", make: "Rolls-Royce",    model: "Wraith Black Badge", cta: "View more", href: STOCK + CARS[10].url, ext: true },
    { img: "assets/img/hero/showroom-aston.jpg", pos: "50% 60%", mpos: "28% 60%", make: "Port Melbourne", model: "The Showroom",       cta: "Visit us",  href: "#showrooms" },
  ];

  // Marque logos (Simple Icons, CC0; Jaguar, Land Rover and Lancia from Wikimedia Commons, public domain).
  // ratio = logo width / height, used to give every logo the same visual area.
  const BRANDS = [
    { name: "Ferrari",      logo: "ferrari",     ratio: 0.725 },
    { name: "Lamborghini",  logo: "lamborghini", ratio: 0.86 },
    { name: "Porsche",      logo: "porsche",     ratio: 0.784 },
    { name: "Rolls-Royce",  logo: "rollsroyce",  ratio: 0.763 },
    { name: "Bentley",      logo: "bentley",     ratio: 2.967 },
    { name: "Aston Martin", logo: "astonmartin", ratio: 4.105 },
    { name: "Mercedes-AMG", logo: "amg",         ratio: 8.583 },
    { name: "McLaren",      logo: "mclaren",     ratio: 6.044 },
    { name: "Land Rover",   logo: "landrover",   ratio: 1.874 },
    { name: "Lancia",       logo: "lancia",      ratio: 8.32 },
    { name: "Jaguar",       logo: "jaguar",      ratio: 3.97 },
    { name: "Audi",         logo: "audi",        ratio: 2.787 },
  ];

  // Centre each car in its card: shift the photo to the car's centre point, zooming just enough to have room
  const frameStyle = ([cx, cy, z] = [.5, .5, 1]) => {
    const lim = v => Math.min(Math.max(v, .5 / z), 1 - .5 / z);
    return `--cx:${lim(cx).toFixed(4)};--cy:${lim(cy).toFixed(4)};--z:${z}`;
  };
  const fmtPrice = n => "$" + n.toLocaleString("en-AU");
  const fmtKms = n => n.toLocaleString("en-AU") + " km";
  const icon = {
    road: '<svg viewBox="0 0 24 24"><path d="M4 20 8 4M20 20 16 4M12 6v2M12 11v2M12 16v2"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M12 8v8M18 8v4H6"/></svg>',
    car: '<svg viewBox="0 0 24 24"><path d="M5 16H3v-4l2-5h14l2 5v4h-2"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/><path d="M9.5 16.5h5M3 12h18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  /* ------------------------------------------------------------------
     Header: scrolled state + progress bar
     ------------------------------------------------------------------ */
  const header = $("#header");
  const progress = $("#progress");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Overlays: menu + search
     ------------------------------------------------------------------ */
  const menu = $("#menu"), menuOpen = $("#menuOpen");
  const search = $("#search"), searchInput = $("#searchInput");

  function setOverlay(el, open, trigger) {
    el.classList.toggle("is-open", open);
    el.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("is-locked", open);
    if (trigger) trigger.setAttribute("aria-expanded", String(open));
  }
  menuOpen.addEventListener("click", () => setOverlay(menu, true, menuOpen));
  $("#menuClose").addEventListener("click", () => setOverlay(menu, false, menuOpen));
  $$("[data-close]", menu).forEach(a => a.addEventListener("click", () => setOverlay(menu, false, menuOpen)));

  $("#searchOpen").addEventListener("click", () => {
    setOverlay(search, true);
    renderResults("");
    setTimeout(() => searchInput.focus(), 60);
  });
  $("#searchClose").addEventListener("click", () => setOverlay(search, false));
  search.addEventListener("click", e => { if (e.target === search) setOverlay(search, false); });
  addEventListener("keydown", e => {
    if (e.key === "Escape") { setOverlay(menu, false, menuOpen); setOverlay(search, false); }
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); $("#searchOpen").click(); }
  });

  const results = $("#searchResults");
  function renderResults(q) {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const hits = CARS.filter(c => {
      const hay = `${c.year} ${c.make} ${c.model} ${c.desc} ${c.cat} ${c.body}`.toLowerCase();
      return terms.every(t => hay.includes(t));
    });
    results.innerHTML = hits.length
      ? hits.map(c => `
        <a class="result" href="${STOCK + c.url}" target="_blank" rel="noopener">
          <img src="assets/img/cars/sm/car${c.img}.jpg" alt="" loading="lazy">
          <span><small>${c.year} · ${c.cat}</small><b>${c.make} ${c.model}</b></span>
          <span class="result__price">${fmtPrice(c.price)}</span>
        </a>`).join("")
      : `<p class="search__empty">No vehicles match “${q.replace(/</g, "&lt;")}”. Call 1800 8 LORBEK and we'll help you find it.</p>`;
  }
  searchInput.addEventListener("input", e => renderResults(e.target.value));

  /* ------------------------------------------------------------------
     Hero slider
     ------------------------------------------------------------------ */
  const hero = $(".hero");
  const slidesEl = $("#heroSlides"), barsEl = $("#heroBars");
  const DURATION = 7000;
  let current = 0, timer = null;

  slidesEl.innerHTML = SLIDES.map((s, i) => `
    <div class="slide${i === 0 ? " is-active" : ""}" aria-hidden="${i !== 0}">
      <img src="${s.img}" alt="" style="--pos:${s.pos};--mpos:${s.mpos}" decoding="async" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
    </div>`).join("");
  barsEl.innerHTML = SLIDES.map((_, i) => `<button aria-label="Go to slide ${i + 1}"><i></i></button>`).join("");
  barsEl.style.setProperty("--dur", DURATION / 1000 + "s");
  $("#heroTotal").textContent = String(SLIDES.length).padStart(2, "0");

  const slideEls = $$(".slide", slidesEl), barEls = $$("button", barsEl);

  function paintText(i) {
    const s = SLIDES[i];
    $("#heroMake").textContent = s.make;
    $("#heroModel").textContent = s.model;
    $("#heroCtaLabel").textContent = s.cta;
    const cta = $("#heroCta");
    cta.href = s.href;
    if (s.ext) { cta.target = "_blank"; cta.rel = "noopener"; } else { cta.removeAttribute("target"); cta.removeAttribute("rel"); }
    $("#heroIdx").textContent = String(i + 1).padStart(2, "0");
  }

  function go(i) {
    i = (i + SLIDES.length) % SLIDES.length;
    if (i === current && slideEls[i].classList.contains("is-active") && barEls[i].classList.contains("is-active")) return;
    slideEls.forEach((el, n) => { el.classList.toggle("is-active", n === i); el.setAttribute("aria-hidden", String(n !== i)); });
    barEls.forEach((b, n) => {
      b.classList.remove("is-active");
      b.classList.toggle("is-done", n < i);
    });
    void barsEl.offsetWidth; // restart bar animation
    barEls[i].classList.add("is-active");

    hero.classList.add("is-changing");
    setTimeout(() => { paintText(i); hero.classList.remove("is-changing"); }, reduceMotion ? 0 : 450);
    current = i;
    restart();
  }
  function restart() {
    clearTimeout(timer);
    if (!hero.classList.contains("is-paused")) timer = setTimeout(() => go(current + 1), DURATION);
  }

  paintText(0);
  barEls[0].classList.add("is-active");
  restart();

  $("#heroNext").addEventListener("click", () => go(current + 1));
  $("#heroPrev").addEventListener("click", () => go(current - 1));
  barEls.forEach((b, i) => b.addEventListener("click", () => go(i)));

  // Swipe on touch
  let touchX = null;
  hero.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // Pause when the hero is off-screen or the tab is hidden
  const pause = p => { hero.classList.toggle("is-paused", p); p ? clearTimeout(timer) : restart(); };
  new IntersectionObserver(([e]) => pause(!e.isIntersecting), { threshold: 0.25 }).observe(hero);
  document.addEventListener("visibilitychange", () => pause(document.hidden));

  /* ------------------------------------------------------------------
     Brand marquee (duplicated for a seamless loop)
     ------------------------------------------------------------------ */
  // Equal visual area for tall emblems and long wordmarks, capped so neither gets extreme
  const logoBox = ratio => {
    const AREA = 2500;
    let w = Math.min(Math.sqrt(AREA * ratio), 150), h = w / ratio;
    if (h > 58) { h = 58; w = h * ratio; }
    return `--lw:${w.toFixed(1)}px;--lh:${h.toFixed(1)}px;`;
  };
  const brandHTML = BRANDS.map(b => `
    <span class="brand">
      <i class="brand__logo" style="${logoBox(b.ratio)}-webkit-mask-image:url('assets/img/brands/${b.logo}.svg');mask-image:url('assets/img/brands/${b.logo}.svg')" role="img" aria-label="${b.name} logo"></i>
      <span class="brand__name">${b.name}</span>
    </span>`).join("");
  $("#marquee").innerHTML = brandHTML + brandHTML.replace(/class="brand"/g, 'class="brand" aria-hidden="true"');

  /* ------------------------------------------------------------------
     Latest arrivals carousel
     ------------------------------------------------------------------ */
  const track = $("#carTrack");
  // Cars still waiting on photography (placeholder image) go to the end of the row
  const PLACEHOLDER = new Set([1]);
  const ordered = [...CARS].sort((a, b) => PLACEHOLDER.has(a.img) - PLACEHOLDER.has(b.img));
  track.innerHTML = ordered.map(c => `
    <a class="card" href="${STOCK + c.url}" target="_blank" rel="noopener" data-cat="${c.cat}" draggable="false">
      <div class="card__media">
        <img src="assets/img/cars/sm/car${c.img}.jpg" alt="${c.year} ${c.make} ${c.model}" style="${frameStyle(c.frame)}" loading="lazy" decoding="async" draggable="false">
        <span class="card__badge">${c.cat}</span>
      </div>
      <div class="card__body">
        <span class="card__make">${c.year} · ${c.make}</span>
        <h3 class="card__title">${c.model}</h3>
        <p class="card__desc">${c.desc}</p>
        <ul class="specs">
          <li>${icon.road}${fmtKms(c.kms)}</li>
          <li>${icon.gear}${c.trans}</li>
          <li>${icon.car}${c.body}</li>
        </ul>
        <div class="card__foot">
          <span class="price">${fmtPrice(c.price)}<small>Excl. govt charges</small></span>
          <span class="card__go">${icon.arrow}</span>
        </div>
      </div>
    </a>`).join("");

  const cards = $$(".card", track);
  const dashes = $("#carDashes");
  const visibleCards = () => cards.filter(c => !c.hidden);
  const step = () => {
    const v = visibleCards();
    return v.length > 1 ? v[1].offsetLeft - v[0].offsetLeft : track.clientWidth;
  };
  const perView = () => Math.max(1, Math.floor(track.clientWidth / step()));
  const pages = () => Math.max(1, Math.ceil(visibleCards().length / perView()));

  function buildDashes() {
    const n = pages();
    dashes.innerHTML = Array.from({ length: n }, (_, i) => `<button aria-label="Page ${i + 1}"></button>`).join("");
    $$("button", dashes).forEach((b, i) => b.addEventListener("click", () => track.scrollTo({ left: i * perView() * step() })));
    syncDashes();
  }
  function syncDashes() {
    const n = pages();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const idx = maxScroll <= 0 ? 0 : Math.round((track.scrollLeft / maxScroll) * (n - 1));
    $$("button", dashes).forEach((b, i) => b.classList.toggle("is-active", i === idx));
    $("#carPrev").disabled = track.scrollLeft < 8;
    $("#carNext").disabled = track.scrollLeft > maxScroll - 8;
  }
  track.addEventListener("scroll", () => requestAnimationFrame(syncDashes), { passive: true });
  addEventListener("resize", buildDashes);
  $("#carNext").addEventListener("click", () => track.scrollBy({ left: step() * perView() }));
  $("#carPrev").addEventListener("click", () => track.scrollBy({ left: -step() * perView() }));
  track.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step() }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step() }); }
  });

  // Mouse drag-to-scroll (desktop)
  let drag = null;
  track.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { drag.moved = true; track.classList.add("is-dragging"); }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (moved) {
      track.classList.remove("is-dragging");
      // snap to nearest card
      const s = step();
      track.scrollTo({ left: Math.round(track.scrollLeft / s) * s });
      // swallow the click that follows a drag
      track.addEventListener("click", ev => ev.preventDefault(), { capture: true, once: true });
    }
  });

  // Category filters
  const chips = $$(".chip");
  function applyFilter(f) {
    chips.forEach(c => { const on = c.dataset.filter === f; c.classList.toggle("is-active", on); c.setAttribute("aria-selected", String(on)); });
    cards.forEach(card => { card.hidden = f !== "all" && card.dataset.cat !== f; });
    track.scrollTo({ left: 0, behavior: "auto" });
    buildDashes();
  }
  chips.forEach(c => c.addEventListener("click", () => applyFilter(c.dataset.filter)));
  $$("[data-filter-link]").forEach(a => a.addEventListener("click", () => applyFilter(a.dataset.filterLink)));
  buildDashes();

  /* ------------------------------------------------------------------
     Reveal on scroll + stat counters
     ------------------------------------------------------------------ */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  // Stagger siblings that reveal together
  $$(".reveal").forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i * 0.08, 0.5) + "s");
    io.observe(el);
  });

  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.to;
      countIO.unobserve(el);
      if (reduceMotion) { el.textContent = to; return; }
      const t0 = performance.now(), dur = 1600;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$(".count").forEach(el => countIO.observe(el));

  /* ------------------------------------------------------------------
     Newsletter (front-end only — wire to your email provider)
     ------------------------------------------------------------------ */
  const form = $("#newsForm"), email = $("#newsEmail"), msg = $("#newsMsg");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
    form.classList.toggle("is-error", !ok);
    msg.classList.toggle("is-ok", ok);
    msg.textContent = ok ? "Thank you. You're on the list." : "Please enter a valid email address.";
    if (ok) form.reset();
  });

  $("#year").textContent = new Date().getFullYear();
})();
