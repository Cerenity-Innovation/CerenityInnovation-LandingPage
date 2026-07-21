# CerenityInnovation-LandingPage

Cerenity Innovation's website — served via GitHub Pages at **cerenityinnovation.com** (see `CNAME`).

## Pages
- `index.html` — home (AI Agents)
- `enterprise.html` — Enterprise
- `app.html` — App
- `news.html` — News & press

## How it's built
- Plain, self-contained static HTML — no framework, no build step, no runtime CDN
  dependency. Just open the files or serve the folder.
- `styles.css` — shared base styles, navigation, and the responsive (mobile) rules.
- `site.js` — small vanilla-JS enhancements: mobile menu, sticky-nav state, and
  reveal-on-scroll animations. If it fails to load, all content still shows.
- `assets/` — logos, accelerator marks, and favicons.

## Local preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Notes
- Fonts (Montserrat, Newsreader) load from Google Fonts.
- The App page phone mockups currently show styled placeholder screens — drop in real
  app screenshots when ready.
