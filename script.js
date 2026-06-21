// Show photo and hide placeholder when image loads successfully
const heroPhoto = document.getElementById('heroPhoto');
const heroPlaceholder = document.getElementById('heroPlaceholder');
if (heroPhoto?.src) {
  heroPhoto.addEventListener('load', () => { heroPlaceholder.style.display = 'none'; });
}

// Light/dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'ph ph-moon' : 'ph ph-sun';
  localStorage.setItem('theme', theme);
}

// Restore saved preference, fallback to system preference
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved ?? (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

// Mobile hamburger
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.forEach((a) => {
  a.addEventListener('click', () => navList.classList.remove('open'));
});

// Contact form — mailto fallback (no backend needed for GitHub Pages)
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = form.querySelector('#name').value;
  const email   = form.querySelector('#email').value;
  const message = form.querySelector('#message').value;
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
  window.location.href = `mailto:charanelamparithikala@gmail.com?subject=${subject}&body=${body}`;
});
