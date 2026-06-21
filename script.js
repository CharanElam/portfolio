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
   HERO ENTRANCE ANIMATIONS
   ============================================================ */
function runHeroEntrance() {
  document.querySelectorAll('[data-hero-animate]').forEach(el => {
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
