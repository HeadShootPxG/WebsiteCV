/***************
 * Données (modifie ici)
 ***************/
const data = {
  experiences: [
    {
      role: "Voyage linguistique — Anglais",
      company: "San Diego, USA",
      start: "04/2025", end: "12/2025",
      summary: `
        <ul>
          <li>Immersion quotidienne en anglais (speaking, compréhension, expressions du quotidien).</li>
          <li>Mises en situation professionnelles (service, échanges clients, prise de commande).</li>
          <li>Gain de fluidité à l’oral et confiance en contexte international.</li>
        </ul>
      `,
      tags: ["Anglais", "Immersion", "Communication"]
    },
    {
      role: "Chef de rang polyvalent",
      company: "La Réserve — Berck",
      start: "01/2023", end: "01/2025",
      summary: `
        <ul>
          <li>Service en salle jusqu’à ~200 couverts par service, coordination avec la cuisine.</li>
          <li>Prise de commande, conseil sur les plats et accords mets/vins, suivi des tables.</li>
          <li>Encaissements, rigueur de caisse, gestion des priorités en période de rush.</li>
          <li>Fidélisation d’une clientèle locale grâce à un accueil attentif et personnalisé.</li>
        </ul>
      `,
      tags: ["Service", "Encaissement", "Conseil"]
    },
    {
      role: "Chef de rang",
      company: "Casino Vikings — Fort-Mahon",
      start: "01/2021", end: "01/2023",
      summary: `
        <ul>
          <li>Mise en place complète de la salle et préparation des boissons.</li>
          <li>Accueil client, suivi des commandes, gestion du tempo de service.</li>
          <li>Participation à la formation de nouveaux collaborateurs.</li>
        </ul>
      `,
      tags: ["Accueil", "Service", "Mise en place"]
    },
    {
      role: "Assistant communication",
      company: "CCAS — Abbeville",
      start: "01/2020", end: "01/2021",
      summary: `
        <ul>
          <li>Création de supports (affiches, flyers) et animation des réseaux sociaux.</li>
          <li>Organisation d’événements locaux (50 à 300 participants).</li>
          <li>Amélioration de la visibilité en ligne.</li>
        </ul>
      `,
      tags: ["Communication", "Réseaux sociaux", "Événementiel"]
    }
  ],
  skills: [
    { name: "Service en salle", level: 100, icon: "🥂" },
    { name: "Prise de commande", level: 95, icon: "📝" },
    { name: "Encaissements", level: 95, icon: "💳" },
    { name: "Relation client", level: 95, icon: "💬" },
    { name: "Conseil vins & plats", level: 80, icon: "🍷" },
    { name: "Travail en équipe", level: 100, icon: "🤝" },
  ],
  education: [
    { title: "BGE — Construire & conduire un projet entrepreneurial", period: "2019–2020" },
    { title: "Bac+2 Développeur Web & Mobile", period: "2017–2019" },
    { title: "Bac Systèmes Électroniques & Numériques", period: "2013–2016" },
  ],
  languages: [
    { name: "Français", percent: 100 },
    { name: "Anglais", percent: 70 },
  ]
};


/***************
 * Helpers UI
 ***************/
const $ = (q, el=document)=>el.querySelector(q);
const $$ = (q, el=document)=>Array.from(el.querySelectorAll(q));

/***************
 * Particules canvas (s’adaptent au thème clair/sombre + palette CSS)
 ***************/
(function particles(){
  const c = document.getElementById("bg");
  if (!c) return;
  const ctx = c.getContext("2d");
  let cssW, cssH, dpr, dots;

  // Récupère les couleurs depuis CSS (variables --accentX)
  function getAccentColors() {
    const styles = getComputedStyle(document.documentElement);
    return [
      styles.getPropertyValue("--accent1").trim(),
      styles.getPropertyValue("--accent2").trim(),
      styles.getPropertyValue("--accent3").trim()
    ];
  }

  function resize(){
    cssW = innerWidth;
    cssH = innerHeight;
    dpr = Math.max(1, Math.min(2, devicePixelRatio || 1));
    c.style.width = cssW + "px";
    c.style.height = cssH + "px";
    c.width = Math.floor(cssW * dpr);
    c.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const palette = getAccentColors();
    dots = Array.from({length: 70}, () => ({
      x: Math.random()*cssW,
      y: Math.random()*cssH,
      vx: (Math.random()-.5)*0.35,
      vy: (Math.random()-.5)*0.35,
      r : Math.random()*2.5+1,
      color: palette[Math.floor(Math.random()*palette.length)]
    }));
  }

function step() {
  ctx.clearRect(0, 0, cssW, cssH);

  // Détection du thème
  const isLight = document.body.classList.contains("light");

  // Alpha plus élevé en clair
  const alpha = isLight ? "55" : "33"; // hex alpha

  for (const d of dots) {
    // Déplacement
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > cssW) d.vx *= -1;
    if (d.y < 0 || d.y > cssH) d.vy *= -1;

    // En clair → on augmente un peu la taille pour mieux voir
    const radius = isLight ? d.r * 1.2 : d.r;

    // Dessin
    ctx.beginPath();
    ctx.fillStyle = d.color + alpha;
    ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}


  addEventListener("resize", resize, {passive:true});

  // Recalcule quand le thème change
  document.addEventListener("themechange", resize);

  resize(); step();
})();


/***************
 * Timeline accordéon
 ***************/
(function mountTimeline(){
  const container = $("#timeline");
  container.innerHTML = data.experiences.map((e,i)=>`
    <article class="t-item ${i===0?'open':''}">
      <div class="t-head" data-idx="${i}">
        <div>
          <div class="t-role">${e.role}</div>
          <div class="t-company">${e.company}</div>
        </div>
        <div class="t-date">${e.start} → ${e.end}</div>
      </div>
      <div class="t-details"><div>
        <div class="t-summary">
          ${e.summary}
        </div>
        <div class="t-tags">
          ${e.tags.map(t=>`<span class="tag">${t}</span>`).join("")}
        </div>
      </div></div>
    </article>
  `).join("");

container.addEventListener("click", (ev) => {
  // 1) si clic dans la tête -> toggle
  const head = ev.target.closest(".t-head");
  if (head) {
    head.parentElement.classList.toggle("open");
    return;
  }

  // 2) sinon, si clic quelque part dans l’item (zone vide/padding), on toggle aussi
  const item = ev.target.closest(".t-item");
  if (!item) return;

  // 3) mais on ignore les clics sur des éléments interactifs à l’intérieur
  if (ev.target.closest(".t-tags, a, button")) return;

  item.classList.toggle("open");
});

})();


/***************
 * Compétences (barres animées)
 ***************/
(function mountSkills(){
  const root = $("#skillsList");
  root.innerHTML = data.skills.map(s=>`
    <div class="skill">
      <div aria-hidden="true" style="text-align:center">${s.icon||"•"}</div>
      <div>
        <div class="name">${s.name}</div>
        <div class="bar"><div class="fill" style="width:${s.level}%"></div></div>
      </div>
    </div>
  `).join("");

  // Animation progressive
  requestAnimationFrame(()=>{
    $$(".fill", root).forEach(el=>{
      const target = el.style.width;
      el.style.width = "0%";
      setTimeout(()=>{ el.style.width = target; }, 60);
    });
  });
})();

/***************
 * Formation
 ***************/
(function mountEdu(){
  const ul = $("#eduList");
  ul.innerHTML = data.education.map(e=>
    `<li><strong>${e.title}</strong> <span class="date">${e.period}</span></li>`
  ).join("");
})();

/***************
 * Langues (SVG animé : une fois à l’apparition + rejouable au survol)
 ***************/
(function mountLang() {
  const root = document.getElementById("langRadials");
  const R = 45;                              // rayon du cercle
  const CIRC = 2 * Math.PI * R;              // périmètre
  root.innerHTML = data.languages.map(l => {
    const pct = Math.max(0, Math.min(100, Number(l.percent) || 0));
    const dasharray = CIRC.toFixed(2);
    const target = (CIRC * (1 - pct / 100)).toFixed(2); // offset final
    const gid = "g" + l.name.replace(/\W/g, "");
    const id = "prog_" + gid;

    return `
      <div class="radial" title="${l.name} — ${pct}%">
        <svg viewBox="0 0 120 120" role="img" aria-label="${l.name}">
          <defs>
            <linearGradient id="${gid}" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stop-color="#22d3ee"/>
              <stop offset="50%" stop-color="#a855f7"/>
              <stop offset="100%" stop-color="#f472b6"/>
            </linearGradient>
          </defs>

          <!-- Piste -->
          <circle cx="60" cy="60" r="${R}"
                  stroke="rgba(255,255,255,.12)" stroke-width="10" fill="none" />

          <!-- Progression (part de 0% rempli => dashoffset = CIRC) -->
          <circle id="${id}" class="progress" cx="60" cy="60" r="${R}"
                  stroke="url(#${gid})" stroke-width="10" stroke-linecap="round" fill="none"
                  transform="rotate(-90 60 60)"
                  stroke-dasharray="${dasharray}" stroke-dashoffset="${dasharray}"
                  data-target="${target}" />

          <text x="60" y="65" text-anchor="middle" font-size="22" fill="currentColor">${pct}%</text>
        </svg>
        <div class="label">${l.name}</div>
      </div>
    `;
  }).join("");

  // --- Animation une fois à l’apparition (IntersectionObserver)
const rings = root.querySelectorAll(".progress");
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const el = entry.target;
    const target = el.getAttribute("data-target");
    const full   = el.getAttribute("stroke-dasharray"); // CIRC

    // RESET à 0% (plein cercle vide) pour être sûr que la transition parte bien
    el.style.strokeDashoffset = full;

    // ⚡ force un reflow pour “valider” l’état initial
    void el.getBoundingClientRect();

    // ⏭️ déclenche au frame suivant (fiable sur Chrome/Firefox/Safari)
    requestAnimationFrame(() => {
      el.style.strokeDashoffset = target;
    });

    io.unobserve(el); // on ne rejoue pas automatiquement
  }
}, { threshold: 0.4 });

rings.forEach(el => io.observe(el));


// --- Rejouer l’anim (survol, focus, touch) par élément
function replay(rad){
  const prog = rad.querySelector(".progress");
  if (!prog) return;
  const target = prog.getAttribute("data-target");
  const full   = prog.getAttribute("stroke-dasharray"); // CIRC

  // safety: s'il n'y a pas déjà une transition en CSS
  prog.style.transition = "stroke-dashoffset 900ms ease-out";

  // reset → reflow → animate
  prog.style.strokeDashoffset = full;
  void prog.getBoundingClientRect();
  requestAnimationFrame(() => {
    prog.style.strokeDashoffset = target;
  });
}

root.querySelectorAll(".radial").forEach((rad) => {
  // survol (entree dans le conteneur)
  rad.addEventListener("pointerenter", () => replay(rad));
  rad.addEventListener("mouseenter",   () => replay(rad)); // fallback

  // accessibilité clavier
  rad.setAttribute("tabindex", "0");
  rad.addEventListener("focusin", () => replay(rad));

  // mobile
  rad.addEventListener("touchstart", () => replay(rad), {passive:true});
});



})();


/***************
 * Thème clair/sombre + auto
 ***************/
(function theme(){
  const btn = $("#themeToggle");
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const hour = new Date().getHours();
  const night = hour >= 19 || hour < 7;

  const saved = localStorage.getItem("theme"); // "light" | "dark" | null
  if(saved){
    document.body.classList.toggle("light", saved === "light");
  } else {
    // si l'utilisateur préfère sombre OU s'il fait nuit => sombre
    document.body.classList.toggle("light", !(prefersDark || night));
  }

  btn.addEventListener("click", ()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  
    document.dispatchEvent(new Event("themechange"));
  });
})();

/***************
 * PDF & back-to-top
 ***************/
$("#printBtn").addEventListener("click", (e)=>{ e.preventDefault(); window.print(); });
const btt = $("#backToTop");
addEventListener("scroll", ()=>{
  btt.style.display = scrollY > 400 ? "grid" : "none";
});
btt.addEventListener("click", ()=>{ scrollTo({top:0, behavior:"smooth"}); });

/***************
 * Footer année
 ***************/
$("#year").textContent = new Date().getFullYear();


// Ouvrir tous les accordéons avant impression, puis restaurer l'état après
(function enablePrintOpenClose(){
  const OPEN_CLASS = "open";
  const PRINT_MARK = "print-open";

  function openAll() {
    document.querySelectorAll(".t-item").forEach(el => {
      if (!el.classList.contains(OPEN_CLASS)) {
        el.classList.add(OPEN_CLASS, PRINT_MARK);
      }
    });
  }

  function restore() {
    document.querySelectorAll(`.t-item.${PRINT_MARK}`).forEach(el => {
      el.classList.remove(OPEN_CLASS, PRINT_MARK);
    });
  }

  // Navigateurs modernes
  window.addEventListener("beforeprint", openAll);
  window.addEventListener("afterprint", restore);

  // Fallback (certains browsers invoquent matchMedia au lieu de before/afterprint)
  const mql = window.matchMedia("print");
  if (mql && typeof mql.addEventListener === "function") {
    mql.addEventListener("change", e => {
      if (e.matches) openAll(); else restore();
    });
  }
})();

document.querySelectorAll(
  ".card, .t-item, .skills .skill, .edu li"
).forEach(el => el.classList.add("lift"));

/***************
 * Scrollspy (met en surbrillance le lien de la section visible)
 ***************/
(function scrollSpy(){
  const nav = document.querySelector('.nav');
  const links = Array.from(document.querySelectorAll('.nav .links a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // 1) Activer/désactiver l’ombre de la nav quand on scrolle
  function onScrollShadow(){
    if (window.scrollY > 10) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  }
  onScrollShadow();
  window.addEventListener('scroll', onScrollShadow, {passive:true});

  // 2) Observer les sections au centre du viewport
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = '#' + e.target.id;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
    }
  }, {
    // on considère la section active quand ~40% du bloc est visible,
    // et on déclenche plutôt au centre du viewport:
    root: null,
    threshold: 0.4,
    rootMargin: '-20% 0px -40% 0px'
  });

  sections.forEach(sec => io.observe(sec));

  // 3) Smooth scroll + correction d’ancrage (compatible modes)
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  links.forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 80; // 80 ~ hauteur nav
      window.scrollTo({
        top,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
      // met à jour l’état actif immédiatement (feedback)
      links.forEach(l => l.classList.toggle('is-active', l === a));
    });
  });
})();
