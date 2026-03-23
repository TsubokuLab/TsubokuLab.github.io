# CLAUDE.md — TsubokuLab.github.io

This file provides context for AI assistants working on this codebase.

## Project Overview

A static GitHub Pages portfolio site for TsubokuLab (Teruaki Tsubokura) that displays a list of published projects. The site is entirely static — no backend, no build compilation step, no frameworks. Content is driven by `repositories.json`.

Live site: https://tsubokulab.github.io/

---

## Repository Structure

```
TsubokuLab.github.io/
├── index.html          # Main portfolio page (public-facing)
├── admin.html          # Admin UI for managing repositories.json
├── repositories.json   # Project data (the "database")
├── css/
│   └── style.css       # All styles (~420 lines, CSS custom properties)
├── js/
│   └── script.js       # Frontend logic (~141 lines, vanilla JS)
├── images/
│   └── placeholder.svg # Fallback thumbnail
├── package.json        # npm scripts only (no build pipeline)
├── package-lock.json
├── ads.txt             # Google AdSense config
├── README.md           # Japanese documentation
├── deployToGithub.bat  # Windows: runs `npm run deploy`
├── setup-server.bat    # Windows: installs http-server
└── start-server.bat    # Windows: runs `npm start`
```

---

## Technology Stack

- **HTML5 / CSS3 / Vanilla JavaScript (ES6+)** — no framework
- **Google Fonts**: Noto Sans JP (Japanese text), Poppins (English text)
- **Font Awesome 6.5.1** — icons, loaded from CDN
- **Google Analytics**: gtag.js (ID: `G-TFTH0DVE14`)
- **Google AdSense**: `pub-6570897144346563`
- **gh-pages** (`npm run deploy`) — only npm dependency, for deployment

---

## Development Workflow

### Local Development

```bash
npm install          # installs gh-pages + http-server devDep
npm start            # starts http-server on http://localhost:8080
```

Or use the Windows batch scripts:
- `setup-server.bat` — install dependencies
- `start-server.bat` — start local server

Access the admin interface at `http://localhost:8080/admin.html`.

### Managing Projects

Projects are stored in `repositories.json`. The recommended workflow:

1. Open `http://localhost:8080/admin.html`
2. Add/edit/reorder projects using the GUI
3. Click "ダウンロード" (Download) to export the updated `repositories.json`
4. Replace the file in the project root

Alternatively, edit `repositories.json` directly. Each entry follows this schema:

```json
{
  "name": "Project Display Name",
  "repo": "repository-name",
  "description": "Short description of the project",
  "url": "https://example.github.io/project/",
  "thumbnail": "images/thumbnail.png",
  "tags": ["Web"],
  "date": "YYYY-MM-DD"
}
```

Valid tag values: `"Web"`, `"Tool"`, `"Unity"`

### Deployment

```bash
npm run deploy       # pushes project root to gh-pages branch via gh-pages package
```

Or run `deployToGithub.bat` on Windows. The site goes live at https://tsubokulab.github.io/ within minutes.

> **Note:** There is no CI/CD pipeline. Deployment is always manual.

---

## Key Code Conventions

### HTML

- Language: Japanese (`lang="ja"`)
- Project cards are generated from a `<template id="project-card-template">` in `index.html` — do not hardcode cards
- All external assets (fonts, icons) load from CDN; no local copies

### CSS (`css/style.css`)

CSS custom properties define the design system — always use variables, not hardcoded values:

```css
--primary-color: #3498db
--secondary-color: #2980b9
--accent-color: #e74c3c
--text-color: #333
--light-text: #777
--bg-color: #f9f9f9
--animation-speed: 0.3s
--border-radius: 8px
--shadow: 0 4px 15px rgba(0, 0, 0, 0.1)
```

- Responsive breakpoints: `768px` and `480px`
- BEM-style class naming: `project-card`, `project-info`, `project-title`
- Animations defined: `fadeInUp`, `rotate`, `dash`

### JavaScript (`js/script.js`)

- Vanilla JS only — no jQuery, no frameworks
- Entry point: `fetchRepositories()` fetches `repositories.json` on page load
- `renderProjects(data)` uses the `<template>` element to clone and populate cards
- `filterProjects(filter)` filters visible cards by tag
- `formatDate(dateString)` converts `YYYY-MM-DD` → Japanese format (`YYYY年MM月DD日`)
- No module system — all code is in a single script file

### Data (`repositories.json`)

- Plain JSON array, loaded client-side via `fetch()`
- Date format: `YYYY-MM-DD`
- Tags are case-sensitive strings; valid values are `Web`, `Tool`, `Unity`
- `thumbnail` path is relative to the site root

---

## What Not to Do

- **Do not introduce a JavaScript framework or build step** — the site intentionally has no compilation
- **Do not minify files** — source files are served directly
- **Do not add a backend** — this is a static GitHub Pages site
- **Do not modify `node_modules/`** — only `gh-pages` is a dependency and it's only used for deployment
- **Do not hardcode project cards in HTML** — use `repositories.json` and the template system
- **Do not push directly to `master` or `gh-pages`** — use `npm run deploy` for the gh-pages branch; feature work goes through the standard git workflow on feature branches

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `master` | Main source branch |
| `gh-pages` | Auto-generated by `npm run deploy`; do not edit manually |
| `claude/*` | AI-assistant feature branches |

---

## Internationalization Notes

- The site is primarily Japanese
- User-facing text (descriptions, headings) is in Japanese
- Code comments may be in Japanese or English
- Date formatting uses Japanese convention: `YYYY年MM月DD日`

---

## No Test Suite

There are no automated tests. The `npm test` script is a placeholder that exits with an error. Manual testing is done via the local http-server.
