# VitePress Configuration Guide

## config.ts

Main site configuration. Key sections:

- `head[]` — favicon, OG tags, Osano cookie consent, JSON-LD structured data
- `themeConfig.nav` — top navigation bar items
- `themeConfig.sidebar` — sidebar groups keyed by URL prefix, supports `collapsed: true/false`
- `themeConfig.search` — local search with fuzzy matching and title boosting
- `themeConfig.editLink` — "Edit this page on GitHub" pattern
- `sitemap.hostname` — for sitemap.xml generation
- `markdown.config` — smartscript plugin registration

## theme/

- `index.ts` — extends DefaultTheme, registers custom Layout
- `custom.css` — MITRE brand colors (light: #005288, dark: #4da6d9), VitePress overrides, smartscript CSS
- `Layout.vue` — site-wide footer via `#layout-bottom` slot. Uses `<button>` for Manage Cookies (not `<a>`). Dynamic copyright year.

## plugins/

- `markdown-it-smartscript.ts` — build-time (tm)→™ conversion. `inCodeBlock` resets per page. Regexes at module scope.

## Key Constraints

- `#layout-bottom` for site-wide elements (not `#doc-after` which is doc pages only)
- Brand colors must have WCAG AA contrast: light text-3 opacity ≥0.74, dark ≥0.54
- Prettier mangles `{target="_self"}` — affected files go in `.prettierignore`
