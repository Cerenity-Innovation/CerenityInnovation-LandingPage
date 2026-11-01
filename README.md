# CerenityInnovation-LandingPage

Cerenity Innovation's website — served via GitHub Pages at **cerenityinnovation.com** (see `CNAME`).

## Pages
- `index.html` — home (AI Agents)
- `enterprise.html` — Enterprise
- `app.html` — Tideya, the app's public home page (the home page URL on the Google OAuth consent
  screen). Keep its Google Calendar section in step with Privacy Policy Section 13.1.
- `news.html` — News & press
- `privacy.html`, `terms.html`, `disclaimer.html` — the Cerenity app's Privacy Policy, Terms of Use
  and Disclaimer (linked from every page footer). Generated from the app repo's
  `backend/content/legal/*.md` by `backend/scripts/export_legal_site.py`; edit the text there and
  re-export, not here.

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
