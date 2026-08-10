# RECOVERY CONTEXT - 2026-05-13

## Current Epic/Phase

**Goal:** Migrate MITRE ACT website from Nuxt 4 + Nuxt UI Pro to VitePress 2.x
**Success Criteria:**

- VitePress site builds clean (lint, typecheck, build — zero dead links)
- All content migrated from Nuxt Content MDC to VitePress markdown
- Cloudflare Pages deployment with PR preview URLs
- 6 independent expert review agents passed all findings fixed
- Project docs (README, DEVELOPMENT, CONTRIBUTING, SECURITY) updated
  **Timeline:** Single session — migration complete, PR open
  **PR:** https://github.com/mitre/act/pull/49

## Progress Status

**Completed this session:**

- ✅ Scaffolded VitePress project (replaced Nuxt package.json, config, tsconfig, eslint)
- ✅ Custom MITRE ACT theme (brand colors light+dark, Layout.vue with footer, Osano cookie consent)
- ✅ Smartscript markdown-it plugin (copied from saf-site-vitepress, (tm)→™ at build time)
- ✅ Migrated all content: getting-started (split into 4 sub-pages), handbook (14 pages), templates (38 download files), blog, privacy policy, terms of use
- ✅ Standardized template filenames (spaces→hyphens, removed parentheses)
- ✅ Converted all MDC syntax to VitePress markdown (containers, details/summary, markdown tables)
- ✅ Fixed all dead links (download links use {target="\_self"} VitePress attribute)
- ✅ Cloudflare Pages deploy workflow with PR preview comments
- ✅ CI workflow (lint + typecheck + build, pull_request + workflow_dispatch triggers)
- ✅ Removed all old Nuxt files (app/, content/, modules/, nuxt.config.ts, etc.)
- ✅ Enabled VitePress features: lastUpdated, editLink, deep outline, externalLinkIcon, local search with fuzzy matching, sitemap, custom 404, collapsible sidebar, linked homepage feature cards
- ✅ Accessibility fixes: contrast ratios (text-3 opacity), button for Manage Cookies, aria-label on footer, descriptive alt text, "here" links fixed
- ✅ SEO fixes: OG/Twitter meta tags, JSON-LD structured data, missing descriptions, favicon declarations, manifest.json paths, robots.txt
- ✅ Hero image: swapped to arrow logo (no duplicate tagline), centered, drop shadow
- ✅ Project docs: README rewritten, DEVELOPMENT.md rewritten, CONTRIBUTING.md created, SECURITY.md created, LICENSE.md fixed
- ✅ Stale files removed: PROJECT.md, readmebackup.md, recovery-prompt.md, improvement-roadmap.md
- ✅ CI/CD audit: fetch-depth:0, concurrency groups, node-version-file, timeout-minutes, gitHubToken, renovate.json updated
- ✅ Added .mcp.json (Playwright, Context7, GitHub, Brave Search)
- ✅ Added AI-assisted development guide (docs/ai-development-guide.md)
- ✅ netlify.toml with `ignore = "exit 0"` to skip Netlify builds on this branch
- ✅ wrangler.toml + .env.example for Cloudflare Pages config
- ✅ Deployed preview: https://feat-vitepress-migration.act-site.pages.dev

**Pending/next steps:**

- ⏳ CI passed on manual dispatch but PR auto-trigger won't work until main has new ci.yml (GitHub Actions uses base branch workflow files for pull_request events)
- ⏳ Deploy workflow chaining (workflow_run) also needs main to have deploy.yml — works after merge
- ⏳ package.json + pnpm-lock.yaml modified locally from wrangler install — should NOT be committed (wrangler is a deploy tool, not a project dependency)
- ⏳ Nate needs to review the preview site and PR
- ⏳ CLAUDE.md needs rewriting for VitePress (currently still has Nuxt content but is gitignored)

## Key Decisions This Session

### Architecture

- **VitePress over Nuxt**: ACT is a content/docs site, not a web app. VitePress is purpose-built for this. Nuxt UI Pro added unnecessary complexity.
- **Simplified vs saf-site**: SAF site has database, CLI, data loaders, Histoire. ACT just needs docs + downloads. Kept it minimal.
- **docs/ directory convention**: Matches saf-site-vitepress pattern. VitePress root is `docs/`, config at `docs/.vitepress/config.ts`.

### Content Migration

- **MDC → VitePress containers**: `::card-group`/`::card` → bullet lists or markdown sections. `::tip` → `::: tip`. `::callout` → `::: info`. `::accordion` → `<details><summary>`.
- **Download links**: Use `{target="_self"}` VitePress markdown attribute — tells VitePress it's a static file, not a page link. Avoids dead link errors without ignoreDeadLinks.
- **Template filenames**: Standardized from spaces to hyphens (e.g., "C-01 - SYSTEMNAME ACT Risk Assessment Plan YYYYMMDD.docx" → "C-01-SYSTEMNAME-ACT-Risk-Assessment-Plan-YYYYMMDD.docx"). Removed parentheses from filenames (G-07, W-21).
- **Getting-started split**: Original was ~300 lines. Split into 4 focused pages: index, why-act-matters, how-act-works, act-in-practice.
- **Handbook images**: Referenced in content-staging but never existed. Commented out as `<!-- Image placeholder: ... -->`, later removed entirely.
- **Blog**: Only migrated the real post (act-website-goes-live.md). Placeholder sample posts (Asian cuisine, etc.) skipped. Unused Nuxt frontmatter fields (tags, authors, image) removed.
- **Skipped**: Pricing page, design system docs, login/signup pages — all Nuxt-specific.

### Deployment

- **Cloudflare Pages over Netlify/GitHub Pages**: Already using CF for saf-site, familiar pattern, PR preview deploys built in.
- **netlify.toml with ignore**: Kept Netlify integration alive for Nate's other branches but told it to skip this branch.
- **No wrangler.toml account_id**: CF Pages doesn't support account_id in wrangler.toml (Workers-only). Account ID goes in .env or env var.
- **Deploy branch**: Production = main, everything else = preview. Set at Cloudflare project creation.
- **workflow_run limitation**: GitHub Actions resolves workflow_run triggers from the default branch's workflow files. Until this branch merges to main, CI→deploy chaining won't auto-fire for PRs. Manual `gh workflow run` or local `npx wrangler pages deploy` needed for first PR.

### Theme/Branding

- **MITRE blue brand colors**: Light #005288, Dark #4da6d9 (lighter for contrast on dark bg).
- **Smartscript**: Copied from saf-site-vitepress. Works in markdown body text only. Frontmatter YAML needs Unicode ™ directly.
- **Hero image**: Swapped from wide banner (had duplicate tagline) to arrow logo. CSS drop-shadow with adaptive colors.
- **Footer**: Uses `#layout-bottom` slot (renders on ALL pages including home). `#doc-after` only renders on doc pages.
- **Manage Cookies**: Changed from `<a href="javascript:void(0)">` to `<button>` for accessibility.
- **Copyright year**: Dynamic via `new Date().getFullYear()` at build time.

### CI/CD

- **fetch-depth: 0**: Required for VitePress lastUpdated feature (git-based timestamps).
- **node-version-file: .nvmrc**: Single source of truth instead of hardcoded version.
- **concurrency groups**: Cancel superseded CI runs on rapid pushes.
- **workflow_dispatch on CI**: Allows manual triggering, needed for first PR before merge.

### Review Process

- **6 expert review agents** across 2 rounds:
  1. Technical build verification (lint, typecheck, build, dead links, images)
  2. Content and writing quality (formatting, headings, placeholders, consistency)
  3. Config and deployment (CI/CD, theme, Osano, eslint/tsconfig)
  4. Accessibility (contrast, semantic HTML, keyboard navigation, ARIA)
  5. SEO (meta tags, OG, sitemap, structured data, robots.txt, favicons)
  6. Visual browser testing via Playwright (10/10 tests passed)

## Research & Findings

### VitePress Features Inventory

All applicable features enabled:

- Local search (fuzzy matching, prefix search, title boost: 4/2/1)
- Dark mode with brand color overrides
- Sitemap (hostname: act.mitre.org)
- lastUpdated (git-based timestamps)
- editLink ("Edit this page on GitHub" pattern)
- outline: deep (h2-h6 in right-side TOC)
- externalLinkIcon: true
- Custom 404 page (notFound config)
- Collapsible sidebar groups (collapsed: true/false)
- Feature cards with link + linkText
- cleanUrls: true

Not applicable/deferred:

- VPTeamMembers — no team page yet
- Code groups — no code content
- Badge component — no versioned docs
- Carbon ads — not relevant
- vite-imagetools — insufficient image content to justify

### VitePress Gotchas Discovered

1. **Frontmatter is YAML, not markdown** — smartscript plugin doesn't process it. Use Unicode ™ directly.
2. **`#doc-after` slot only renders on doc pages**, not homepage. Use `#layout-bottom` for site-wide elements.
3. **Prettier escapes underscores** in VitePress `{target="_self"}` attributes → `{target="\_self"}`. Fix: add file to .prettierignore.
4. **VitePress validates markdown links as page links** — download links to static files in public/ need `{target="_self"}` to skip validation.
5. **Parentheses in filenames** break markdown link parsing even with URL encoding. Remove parens from filenames.
6. **GitHub Actions pull_request trigger** uses workflow file from the BASE branch (main), not the PR branch. New triggers don't take effect until merged.
7. **workflow_run chaining** has the same base-branch limitation.
8. **Cloudflare Pages SSL** takes up to 15 minutes to provision on brand new projects.
9. **`git push --force-with-lease`** without specifying branch pushes ALL tracked branches. Always use `git push origin <branch>`.

### Smartscript Plugin Bug Fixed

The `inCodeBlock` variable was declared outside the rule callback, causing state to leak across pages. Moved inside the callback to reset per-page.

### Contrast Ratios

- Light mode text-3: bumped from 0.56 → 0.74 opacity (~4.6:1 ratio)
- Dark mode text-3: bumped from 0.38 → 0.54 opacity (~4.6:1 ratio)
- Light brand (#005288 on #ffffff): ~8.85:1 — passes AAA
- Dark brand (#4da6d9 on #1b1b1f): ~5.73:1 — passes AA

## Scope Guard Rails

**IN SCOPE (this migration):**

- ✅ All content pages migrated
- ✅ VitePress features enabled
- ✅ Cloudflare Pages deployment
- ✅ Project docs updated
- ✅ Expert reviews completed

**OUT OF SCOPE (explicitly deferred):**

- ⛔ Handbook workflow diagram images — they never existed, need Nate to create
- ⛔ vite-imagetools — not enough image content yet
- ⛔ VPTeamMembers page — future enhancement
- ⛔ Custom blog layout with dates/authors — current simple listing is sufficient
- ⛔ Google Analytics integration — needs GA ID from MITRE
- ⛔ Custom domain (act.mitre.org) — DNS configuration in Cloudflare dashboard

## Git State

- **Branch:** feat/vitepress-migration
- **Last commit:** bcd653882 docs: add MCP config and AI-assisted development guide
- **Uncommitted:** package.json and pnpm-lock.yaml modified (wrangler install — don't commit)
- **Untracked:** test screenshots (hero-\*.png), .playwright-mcp/, .husky/, CLAUDE.md, content/ remnants, scripts/convert-mdc.py

## User Preferences / Friction Points

- Use `git mv` to preserve history when moving files
- Use python/ruby/perl for text processing, NOT sed
- Don't use `ignoreDeadLinks` — fix the actual links
- Don't use bare `git push --force-with-lease` — always specify the branch
- Don't be lazy with link fixes — fix them all properly
- Research before implementing — use Context7 and docs
- Run review agents after major work — user values thorough quality checks
- Be careful with destructive git operations — always specify exact branch
- The user wants to leverage ALL VitePress features, not just the basics
- Make things useful for Nate (the content editor) — development guides, AI guides, etc.
