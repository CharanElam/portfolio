/* ============================================================
   LIGHT / DARK MODE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // Re-query each time — Phosphor icons replaces <i> elements after load
  const icon = themeToggle?.querySelector('i');
  if (icon) icon.className = theme === 'light' ? 'ph ph-moon' : 'ph ph-sun';
  localStorage.setItem('theme', theme);
}

const savedTheme  = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ?? (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

/* ============================================================
   HERO VARIANT SWITCHER
   ============================================================ */
const heroVariants = {
  polished:  document.querySelector('[data-hero="polished"]'),
  terminal:  document.querySelector('[data-hero="terminal"]'),
  editorial: document.querySelector('[data-hero="editorial"]'),
};

let currentVariant = 'polished';
let termTimers = [];

function showVariant(name) {
  Object.entries(heroVariants).forEach(([key, el]) => {
    el.hidden = key !== name;
  });

  document.querySelectorAll('.hero-switcher button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.variant === name);
  });

  currentVariant = name;
  termTimers.forEach(clearTimeout);
  termTimers = [];

  runHeroEntrance();

  if (name === 'terminal') startTerminal();
}

document.querySelectorAll('.hero-switcher button').forEach(btn => {
  btn.addEventListener('click', () => showVariant(btn.dataset.variant));
});

/* ============================================================
   HERO ENTRANCE ANIMATIONS
   ============================================================ */
function runHeroEntrance() {
  const activeHero = heroVariants[currentVariant];
  activeHero.querySelectorAll('[data-hero-animate]').forEach(el => {
    const delay = parseInt(el.dataset.heroDelay || '0', 10);
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay + 60);
  });
}

/* ============================================================
   TERMINAL TYPING (Variant B)
   ============================================================ */
const termLines = [
  { text: 'whoami',                                         isCmd: true  },
  { text: 'charan-elamparithi-kala',                        isCmd: false },
  { text: 'cat role.txt',                                   isCmd: true  },
  { text: 'BSc CIS student @ UFV · British Columbia, CA',   isCmd: false },
  { text: 'echo $STATUS',                                   isCmd: true  },
  { text: 'Open to internships & co-op opportunities ✓',    isCmd: false },
];

const termDelays = [300, 900, 1600, 2300, 3200, 3900];

function startTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  // Reset — keep only the cursor line
  body.innerHTML = `
    <p style="margin:0;display:flex;align-items:center;gap:2px">
      <span style="color:#58a6ff">$ </span>
      <span class="term-cursor"></span>
    </p>`;

  termLines.forEach((line, i) => {
    const t = setTimeout(() => {
      const cursor = body.querySelector('.term-cursor')?.closest('p');
      if (cursor) cursor.remove();

      const p = document.createElement('p');
      p.className = 'term-line';
      p.style.margin = '0';
      p.style.animation = 'termLine 0.25s ease both';

      if (line.isCmd) {
        p.innerHTML = `<span style="color:#58a6ff">$ </span><span style="color:#e6edf3">${line.text}</span>`;
      } else {
        p.innerHTML = `<span style="color:#3fb950">${line.text}</span>`;
      }
      body.appendChild(p);

      // Re-add cursor after last output line
      const cursorLine = document.createElement('p');
      cursorLine.style.cssText = 'margin:0;display:flex;align-items:center;gap:2px';
      cursorLine.innerHTML = `<span style="color:#58a6ff">$ </span><span class="term-cursor"></span>`;
      body.appendChild(cursorLine);
    }, termDelays[i]);

    termTimers.push(t);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function setupScrollReveal() {
  if (!window.IntersectionObserver) return;

  const els = document.querySelectorAll('[data-animate]');
  els.forEach(el => {
    if (el._animated) return;
    const delay = el.dataset.animateDelay || '0s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.65s ease ${delay}, transform 0.65s ease ${delay}`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target._animated) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        e.target._animated = true;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => { if (!el._animated) obs.observe(el); });
}

/* ============================================================
   NAV ACTIVE TRACKING
   ============================================================ */
function setupNavTracking() {
  if (!window.IntersectionObserver) return;

  const sections = document.querySelectorAll('section[data-section]');
  const navLinks = document.querySelectorAll('[data-nav]');

  function setActive(id) {
    navLinks.forEach(a => {
      const active = a.dataset.nav === id;
      a.classList.toggle('active', active);
    });
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.dataset.section);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('cName').value;
  const email = document.getElementById('cEmail').value;
  const msg   = document.getElementById('cMsg').value;
  const sub   = encodeURIComponent(`Portfolio contact from ${name}`);
  const body  = encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`);
  window.location.href = `mailto:charanelamparithikala@gmail.com?subject=${sub}&body=${body}`;
});

/* ============================================================
   MOBILE HAMBURGER
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   INIT
   ============================================================ */
setupScrollReveal();
setupNavTracking();
runHeroEntrance();
