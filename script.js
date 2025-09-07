/***************
 * Données (modifie ici)
 ***************/
const data = {
  experiences: [
    {
      role: "Voyage linguistique — Anglais (immersion)",
      company: "Californie, USA",
      start: "07/2025", end: "Aujourd’hui",
      summary: "Amélioration de la compréhension orale et du speaking en contexte quotidien et professionnel.",
      tags: ["Anglais", "Immersion", "Communication"]
    },
    {
      role: "Chef de rang polyvalent",
      company: "La Réserve — Berck",
      start: "01/2023", end: "12/2024",
      summary: "Prise de commande, service, suivi des tables, dressage des desserts, encaissements, conseil clients (plats & vins).",
      tags: ["Service", "Encaissement", "Conseil"]
    },
    {
      role: "Chef de rang",
      company: "Casino Vikings — Fort-Mahon",
      start: "01/2021", end: "01/2023",
      summary: "Mise en place de la salle, accueil client, service, suivi des tables, préparation des boissons.",
      tags: ["Accueil", "Service", "Mise en place"]
    },
    {
      role: "Assistant communication",
      company: "CCAS — Abbeville",
      start: "01/2020", end: "01/2021",
      summary: "Création de supports, animation réseaux sociaux et communauté, organisation d’événements.",
      tags: ["Communication", "Réseaux sociaux", "Événementiel"]
    }
  ],
  skills: [
    { name: "Service en salle", level: 90, icon: "🥂" },
    { name: "Prise de commande", level: 85, icon: "📝" },
    { name: "Encaissements", level: 80, icon: "💳" },
    { name: "Relation client", level: 95, icon: "💬" },
    { name: "Conseil vins & plats", level: 70, icon: "🍷" },
    { name: "Travail en équipe", level: 88, icon: "🤝" },
  ],
  education: [
    { title: "BGE — Construire & conduire un projet entrepreneurial", period: "2019–2020" },
    { title: "Bac+2 Développeur Web & Mobile", period: "2017–2019" },
    { title: "Bac Systèmes Électroniques & Numériques", period: "2013–2016" },
  ],
  languages: [
    { name: "Français", percent: 100 },
    { name: "Anglais (immersion)", percent: 70 },
  ]
};

/***************
 * Helpers UI
 ***************/
const $ = (q, el=document)=>el.querySelector(q);
const $$ = (q, el=document)=>Array.from(el.querySelectorAll(q));

/****************************************************
 * Particules canvas (discret, visibles, DPI-safe)
 ****************************************************/
(function particles(){
  // — Réglages rapides —
  const COUNT   = 80;        // nombre de particules
  const SPEED   = 0.35;      // vitesse +/- (0.2–0.6)
  const MIN_R   = 1.0;       // rayon mini
  const MAX_R   = 3.2;       // rayon maxi
  const COLOR_1 = [168, 85, 247]; // violet
  const COLOR_2 = [ 34,211, 238]; // cyan
  const OPACITY = 0.18;      // opacité (0.08–0.25)
  const CAP_DPR = 2;         // plafond devicePixelRatio (perf)

  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const c = document.getElementById("bg");
  const ctx = c.getContext("2d");
  let cssW=0, cssH=0, dpr=1, dots=[];

  const rand = (a,b)=>Math.random()*(b-a)+a;
  const pickColor = () => {
    const [r,g,b] = Math.random()<0.45 ? COLOR_2 : COLOR_1;
    return `rgba(${r},${g},${b},${OPACITY})`;
  };

  function resize(){
    cssW = innerWidth;
    cssH = innerHeight;
    dpr = Math.max(1, Math.min(CAP_DPR, devicePixelRatio || 1));

    // Taille CSS vs pixel réel (pour éviter le flou / coutures)
    c.style.width  = cssW + "px";
    c.style.height = cssH + "px";
    c.width  = Math.floor(cssW * dpr);
    c.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // (Re)génère les particules
    dots = Array.from({length: COUNT}, () => ({
      x:  rand(0, cssW),
      y:  rand(0, cssH),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
      r:  rand(MIN_R, MAX_R),
      c:  pickColor(),
    }));
  }

  function drawFrame(){
    ctx.clearRect(0,0,cssW,cssH);
    for(const d of dots){
      d.x += d.vx; d.y += d.vy;
      if(d.x<0 || d.x>cssW) d.vx *= -1;
      if(d.y<0 || d.y>cssH) d.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = d.c;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(drawFrame);
  }

  addEventListener("resize", resize, {passive:true});
  resize();

  if (prefersReduced) {
    // Version statique si l’utilisateur préfère moins d’animations
    for(const d of dots){
      ctx.beginPath();
      ctx.fillStyle = d.c;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    }
    return;
  }

  drawFrame();

  // (Optionnel) Helpers console :
  // window.__particles = {
  //   intensity(n){ dots.length = Math.max(0, Math.min(300, n|0)); while(dots.length<n) dots.push({x:rand(0,cssW),y:rand(0,cssH),vx:rand(-SPEED,SPEED),vy:rand(-SPEED,SPEED),r:rand(MIN_R,MAX_R),c:pickColor()}); },
  //   recolor(){ dots.forEach(d=>d.c=pickColor()); }
  // };
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
        <p>${e.summary}</p>
        <div class="t-tags">
          ${e.tags.map(t=>`<span class="tag">${t}</span>`).join("")}
        </div>
      </div></div>
    </article>
  `).join("");

  container.addEventListener("click", (ev)=>{
    const head = ev.target.closest(".t-head");
    if(!head) return;
    const idx = +head.dataset.idx;
    const item = head.parentElement;
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
      if (entry.isIntersecting) {
        const el = entry.target;
        // anime du 0% (dashoffset=CIRC) vers la valeur cible
        el.style.strokeDashoffset = el.getAttribute("data-target");
        io.unobserve(el); // ne rejoue pas automatiquement
      }
    }
  }, { threshold: 0.4 }); // ~40% visible

  rings.forEach(el => io.observe(el));

  // --- Rejouer l’anim au survol (optionnel)
  root.addEventListener("mouseenter", (e) => {
    const prog = e.target.closest(".radial")?.querySelector(".progress");
    if (!prog) return;
    const target = prog.getAttribute("data-target");
    const full = prog.getAttribute("stroke-dasharray"); // CIRC
    // reset à 0%…
    prog.style.strokeDashoffset = full;
    // …force reflow pour relancer la transition
    // eslint-disable-next-line no-unused-expressions
    prog.getBoundingClientRect();
    // puis anime vers la cible
    prog.style.strokeDashoffset = target;
  }, true);
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
