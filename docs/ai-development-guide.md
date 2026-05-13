---
title: AI-Assisted Development Guide
description: How to use Claude Code, Copilot, and other AI tools to develop and maintain the MITRE ACT website.
sidebar: false
---

# AI-Assisted Development Guide

This guide helps the ACT team use AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) effectively with the ACT VitePress site. Copy the relevant context sections below into your AI tool when starting a session.

## MCP Server Setup

The project includes a `.mcp.json` that configures MCP (Model Context Protocol) servers for AI tools that support them (Claude Code, Cursor, etc.):

| Server           | Purpose                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| **Playwright**   | Visual testing — screenshot pages, verify layout, click through interactions |
| **Context7**     | Fetch current VitePress, Tailwind, and Vue documentation                     |
| **GitHub**       | PR management, issue creation, code search                                   |
| **Brave Search** | Web search for best practices and examples                                   |

These start automatically when you open the project in a supported AI tool. No setup required.

## Quick Context for Any AI Session

Paste this at the start of any AI conversation about the ACT site:

```
I'm working on the MITRE ACT website — a VitePress 2.x static site.

Stack: VitePress, Vue 3, Tailwind CSS 4, TypeScript, pnpm
Content: Markdown files in docs/ directory
Config: docs/.vitepress/config.ts
Theme: docs/.vitepress/theme/ (custom Layout.vue, custom.css, smartscript plugin)
Build: pnpm build → output in docs/.vitepress/dist/
Deploy: Cloudflare Pages via GitHub Actions

Key commands:
- pnpm dev (dev server at localhost:5173)
- pnpm build (production build)
- pnpm lint / pnpm typecheck (code quality)
```

## Common Tasks with AI Prompts

### Adding a New Page

```
Add a new page to the ACT VitePress site.

The page should be at docs/[section]/[name].md with frontmatter:
---
title: "Page Title"
description: "Brief description for SEO"
---

After creating the file, add it to the sidebar in docs/.vitepress/config.ts
under the appropriate section in the sidebar object.

File → URL mapping: docs/handbook/new-page.md → /handbook/new-page
```

### Editing Content

```
I need to edit content on the ACT VitePress site.

The file is at docs/[path].md. VitePress uses standard Markdown plus:
- ::: info / ::: tip / ::: warning containers (close with :::)
- {target="_self"} attribute on download links to static files
- (tm) → ™, (r) → ®, (c) → © via smartscript plugin (body text only)
- In frontmatter YAML, use Unicode ™ directly (smartscript doesn't process YAML)
- <details><summary> for collapsible sections
- Standard markdown tables with header rows

DO NOT use Nuxt Content MDC syntax (::card, ::callout, ::accordion, etc.)
This is VitePress, not Nuxt.
```

### Adding Download Files

```
I need to add a downloadable template file to the ACT site.

1. Place the file in docs/public/downloads/ (use hyphens, no spaces in filename)
2. Add a link in docs/templates.md using this format:

| ID | [Document Name](/downloads/filename.docx){target="_self"} | Description |

The {target="_self"} attribute tells VitePress this is a static file download,
not a page navigation link. Without it, VitePress will try to route it as a page.

DO NOT use markdown links without {target="_self"} for download files.
DO NOT put spaces in filenames.
```

### Modifying Navigation

```
I need to update the navigation on the ACT VitePress site.

Navigation is in docs/.vitepress/config.ts in the themeConfig object:

- Top nav bar: themeConfig.nav array
  { text: 'Display Text', link: '/url-path' }

- Sidebar: themeConfig.sidebar object, keyed by URL prefix
  '/section/': [{ text: 'Group', items: [{ text: 'Page', link: '/section/page' }] }]

- Collapsible sidebar groups: add collapsed: true or collapsed: false
- Sidebar only shows when the URL matches one of the sidebar keys
```

### Modifying the Theme

```
I need to modify the ACT site theme.

Theme files are in docs/.vitepress/theme/:
- index.ts — registers the custom Layout and CSS
- custom.css — MITRE brand colors (light + dark mode), VitePress overrides, smartscript CSS
- Layout.vue — custom footer with Privacy Policy, Terms of Use, Manage Cookies

Brand colors:
- Light: --vp-c-brand-1: #005288 (MITRE blue)
- Dark: --vp-c-brand-1: #4da6d9 (lighter blue for contrast)

The theme extends VitePress DefaultTheme — don't replace it, extend it.
CSS uses Tailwind CSS 4 (@import 'tailwindcss') with @custom-variant for dark mode.
```

### Writing Blog Posts

```
Add a new blog post to the ACT VitePress site.

1. Create docs/blog/[slug].md with frontmatter:
---
title: 'Post Title'
description: 'Brief summary for SEO and social sharing'
date: YYYY-MM-DD
---

2. Add a link to docs/blog/index.md:
- [Post Title](/blog/slug) - Brief description. *(Month Day, Year)*

Blog posts support all VitePress markdown features.
Use (tm) for trademark symbols in body text.
```

### Debugging Build Errors

```
The ACT VitePress build is failing. Here's the error: [paste error]

Key things to check:
- Dead links: VitePress validates all markdown [text](url) links. Use
  {target="_self"} for download links to static files in docs/public/.
- Missing end tags: Vue compiler errors usually mean unclosed HTML in markdown
  (orphan <div> or <details> without closing tags).
- Orphan ::: — a ::: on its own line closes a VitePress container. If there's
  no matching ::: info/tip/warning opener above, it renders as literal text.
- Frontmatter: Must be valid YAML between --- fences at the top of the file.

Build command: pnpm build
Output: docs/.vitepress/dist/
Config: docs/.vitepress/config.ts
```

## VitePress Features Available

Tell your AI tool about these so it uses them correctly:

| Feature       | How to Use                                                  |
| ------------- | ----------------------------------------------------------- | ------- |
| Info box      | `::: info` ... `:::`                                        |
| Tip box       | `::: tip` ... `:::`                                         |
| Warning box   | `::: warning` ... `:::`                                     |
| GitHub alerts | `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`     |
| Collapsible   | `<details><summary>Title</summary>` ... `</details>`        |
| Trademark     | `(tm)` in body text, `™` in frontmatter                     |
| Download link | `[text](/downloads/file.ext){target="_self"}`               |
| External link | Shows icon automatically via `externalLinkIcon: true`       |
| Code blocks   | Standard fenced code blocks with language tag               |
| Tables        | Standard markdown tables with `                             | ` pipes |
| Images        | `![alt](/images/path.png)` — files in `docs/public/images/` |

## What NOT to Do

Share these anti-patterns with your AI tool:

```
IMPORTANT: This is a VitePress site, NOT Nuxt. Do not use:
- ::card, ::card-group, ::callout, ::accordion (Nuxt Content MDC syntax)
- <NuxtImg>, <NuxtLink> (Nuxt components)
- useAsyncData, queryCollection (Nuxt composables)
- nuxt.config.ts (doesn't exist — config is docs/.vitepress/config.ts)
- content/ directory at root (content is in docs/)
- .navigation.yml files (sidebar is in config.ts)
- defineNuxtConfig, defineAppConfig (Nuxt functions)

Also do not:
- Add spaces to filenames in docs/public/
- Skip heading levels (h2 → h4 without h3)
- Use multiple h1 headings per page
- Use ignoreDeadLinks in config — fix the links instead
- Put (tm) in frontmatter YAML — use Unicode ™ directly
- Use <a href="javascript:void(0)"> — use <button> for actions
```

## Project Structure Reference

```
docs/                                # All site content
├── .vitepress/
│   ├── config.ts                    # Nav, sidebar, plugins, head tags, search
│   ├── theme/
│   │   ├── index.ts                 # Theme entry — extends DefaultTheme
│   │   ├── custom.css               # Brand colors, dark mode, layout overrides
│   │   └── Layout.vue               # Footer with privacy/terms/cookies
│   └── plugins/
│       └── markdown-it-smartscript.ts  # (tm)→™ at build time
├── index.md                         # Homepage (layout: home with hero + features)
├── getting-started/                 # 4 pages: intro, why, how, practice
├── handbook/                        # 14 pages: full ACT assessment handbook
├── templates.md                     # Download links to 38 template files
├── blog/                            # Blog index + posts
├── privacy-policy.md
├── terms-of-use.md
└── public/                          # Static assets (served at root URL)
    ├── images/
    ├── downloads/act-templates/     # 38 .docx/.xlsx/.pptx/.zip files
    ├── favicons/
    └── robots.txt

package.json                         # Scripts: dev, build, preview, lint, typecheck
wrangler.toml                        # Cloudflare Pages project config
.github/workflows/ci.yml             # Lint + typecheck + build
.github/workflows/deploy.yml         # Cloudflare Pages deploy after CI passes
```

## CI/CD Pipeline

```
For AI context about the deployment pipeline:

1. Push to any branch → ci.yml runs (lint + typecheck + build)
2. CI passes → deploy.yml triggers via workflow_run
3. Deploy builds and pushes to Cloudflare Pages
   - main branch → production (act-site.pages.dev)
   - PR branches → preview URL posted as PR comment
4. Required secrets: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN

Local preview deploy:
  source .env  # has CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN
  pnpm build
  npx wrangler pages deploy docs/.vitepress/dist --branch=$(git branch --show-current)
```
