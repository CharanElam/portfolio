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
  window.location.href = `mailto:charan2k03@gmail.com?subject=${subject}&body=${body}`;
});
