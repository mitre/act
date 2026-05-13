# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The MITRE Adaptive Capabilities Testing (ACT) framework website — a VitePress static site for security and risk assessment documentation with MITRE branding.

**Stack:** VitePress 2.x, Vue 3, Tailwind CSS 4, TypeScript, pnpm, Node.js 22.x

## Commands

```bash
pnpm dev                  # Dev server (http://localhost:5173)
pnpm build                # Production build (docs/.vitepress/dist/)
pnpm preview              # Preview production build
pnpm lint                 # ESLint
pnpm lint:fix             # ESLint with auto-fix
pnpm typecheck            # TypeScript checking
```

No test framework configured. Verify with `pnpm lint && pnpm typecheck && pnpm build`.

## Architecture

### Content

All content in `docs/` as Markdown. File path = URL (`docs/handbook/index.md` → `/handbook/`).

### Configuration

- `docs/.vitepress/config.ts` — nav, sidebar, plugins, head tags, search, sitemap
- `docs/.vitepress/theme/index.ts` — custom theme extending DefaultTheme
- `docs/.vitepress/theme/custom.css` — MITRE brand colors (light + dark mode), layout overrides
- `docs/.vitepress/theme/Layout.vue` — site-wide footer (privacy, terms, cookie consent)
- `docs/.vitepress/plugins/markdown-it-smartscript.ts` — (tm)→™ at build time

### Static Assets

Files in `docs/public/` served at root URL. Images in `docs/public/images/`, downloads in `docs/public/downloads/`.

### Key Patterns

- **Download links** use `{target="_self"}` VitePress attribute — without it, VitePress treats them as dead page links
- **Trademark symbols** — `(tm)` works in markdown body text only. In frontmatter YAML, use Unicode `™` directly
- **Containers** — `::: info`, `::: tip`, `::: warning` (close with `:::`)
- **Footer renders on ALL pages** via `#layout-bottom` slot, not `#doc-after` (which is doc pages only)
- **Collapsible sections** — use `<details><summary>` HTML, not Nuxt MDC `::accordion`

### This is NOT Nuxt

Do not use: `::card`, `::callout`, `::accordion`, `<NuxtImg>`, `useAsyncData`, `nuxt.config.ts`, or any Nuxt Content MDC syntax.

## Deployment

Cloudflare Pages via GitHub Actions. CI (lint + typecheck + build) triggers on push to main and PRs. Deploy chains after CI passes. PR branches get preview URLs.

**Secrets:** `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`

**Local deploy:**

```bash
source .env
pnpm build
npx wrangler pages deploy docs/.vitepress/dist --branch=$(git branch --show-current)
```

## Git Hooks

`simple-git-hooks` + `lint-staged`: ESLint on `.js/.ts/.vue`, Prettier on `.md/.yml/.json` (pre-commit). Typecheck on pre-push.

## Known Issues

- Prettier escapes `_` in `{target="_self"}` — templates.md is in `.prettierignore`
- GitHub Actions `pull_request`/`workflow_run` triggers use workflow files from the base branch, not the PR branch
- Cloudflare Pages SSL takes up to 15 minutes on new projects
