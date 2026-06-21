# Charan Elamparithi Kala — Portfolio

Personal portfolio website built with plain HTML, CSS, and JavaScript. Hosted on GitHub Pages.

## Features

- Light / dark mode toggle (persists across sessions via localStorage, respects system preference on first visit)
- Fully responsive — mobile hamburger menu included
- Smooth scroll with active nav link highlighting
- Contact form with mailto fallback (no backend required)
- Resume download

## Sections

- **Hero** — name, title, social links
- **About** — bio, quick-facts card, resume download
- **Skills** — categorised skill tags
- **Projects** — project cards with GitHub / demo links
- **Contact** — contact info + message form

## Customising

All colours and fonts are defined as CSS variables at the top of `style.css` — edit those to retheme the entire site instantly.

To add a project, copy one of the `.project-card` blocks in `index.html` and fill in the name, description, tags, and links.

## Deployment

Push to the `main` branch. In the repo **Settings → Pages**, set the source to `main` / `root`. The site will be live at `https://<username>.github.io/<repo-name>/`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page content and structure |
| `style.css` | Styles and theme tokens |
| `script.js` | Theme toggle, nav highlighting, mobile menu, contact form |
| `Charan_Elamparithi_Kala_Resume_General_IT.pdf` | Resume (linked from About section) |
