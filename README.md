# MITRE Adaptive Capabilities Testing (ACT)

The MITRE Adaptive Capabilities Testing (ACT) framework is a comprehensive approach to security and risk assessment that facilitates and encourages risk-based decision-making.

![MITRE ACT](./docs/public/images/mitre-act-arrow-square-600.png)

## About ACT

ACT moves security assessment beyond traditional compliance-focused approaches to a capability-focused, risk-based methodology that provides actionable insights for decision-makers.

- **Risk-driven** rather than compliance-driven
- **Capability-oriented** rather than control-oriented
- **Multiple risk information sources** beyond just control compliance
- **Understandable and actionable** for leadership decision-making

## Site Technology

This site is built with [VitePress](https://vitepress.dev/) — a static site generator powered by Vue and Vite. Content is written in Markdown, and pages are automatically generated from the file structure.

**Key references:**

- [VitePress Documentation](https://vitepress.dev/guide/what-is-vitepress)
- [Markdown Extensions](https://vitepress.dev/guide/markdown) — VitePress-specific markdown features (containers, code blocks, frontmatter)
- [Asset Handling](https://vitepress.dev/guide/asset-handling) — how images and static files work
- [Routing](https://vitepress.dev/guide/routing) — how file paths map to URLs

## Development Setup

### Requirements

- Node.js 22.x
- pnpm 10.x (`corepack enable && corepack prepare pnpm@latest --activate`)

### Quick Start

```bash
# Install dependencies
pnpm install

# Start development server (hot-reload at http://localhost:5173)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

### Code Quality

```bash
# Lint (ESLint)
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# TypeScript type checking
pnpm typecheck
```

Pre-commit hooks automatically run ESLint and Prettier on staged files.

### GitHub Codespaces

1. Click the green **Code** button on the repo
2. Select **Create codespace on main**
3. Run `pnpm install && pnpm dev` in the terminal

## Content Guide

All site content lives in the `docs/` directory. Every `.md` file becomes a page on the site.

### File → URL Mapping

| File Path                                       | URL                                      |
| ----------------------------------------------- | ---------------------------------------- |
| `docs/index.md`                                 | `/`                                      |
| `docs/getting-started/index.md`                 | `/getting-started/`                      |
| `docs/templates.md`                             | `/templates`                             |
| `docs/handbook/index.md`                        | `/handbook/`                             |
| `docs/handbook/act-process/phase-1-planning.md` | `/handbook/act-process/phase-1-planning` |
| `docs/blog/act-website-goes-live.md`            | `/blog/act-website-goes-live`            |

**Rules:**

- `index.md` in a directory → the directory URL (with trailing slash)
- Any other `.md` file → URL matches the filename (without `.md`)
- Directories create URL segments

### Content Structure

```
docs/
├── index.md                          # Homepage (uses layout: home)
├── getting-started/
│   └── index.md                      # Introduction to ACT
├── templates.md                      # Downloadable ACT templates
├── handbook/                         # ACT Assessment Handbook
│   ├── index.md                      # Handbook overview
│   ├── introduction/
│   │   ├── index.md                  # Introduction section
│   │   ├── handbook-purpose.md
│   │   ├── how-to-use.md
│   │   └── framework-overview.md
│   ├── act-process/
│   │   ├── index.md                  # Process overview
│   │   ├── phase-1-planning.md
│   │   ├── phase-2-assessment.md
│   │   ├── phase-3-reporting.md
│   │   └── process-improvement.md
│   ├── attachments/
│   │   └── index.md
│   └── reference/
│       ├── index.md
│       ├── acronyms.md
│       └── footnotes.md
├── blog/
│   ├── index.md                      # Blog listing
│   └── act-website-goes-live.md      # Blog post
├── privacy-policy.md
├── terms-of-use.md
└── public/                           # Static files (images, downloads)
    ├── images/
    ├── downloads/
    └── favicons/
```

### Editing an Existing Page

1. Find the `.md` file in `docs/` (see structure above)
2. Edit the markdown content
3. The dev server hot-reloads — changes appear instantly in the browser
4. Commit and push

### Adding a New Page

1. Create a new `.md` file in the appropriate directory under `docs/`
2. Add frontmatter at the top:

```yaml
---
title: Your Page Title
description: A brief description for SEO
---
```

3. Write your content in standard Markdown
4. If you want the page in the sidebar navigation, add it to `docs/.vitepress/config.ts` in the `sidebar` section (see [Navigation](#navigation) below)
5. If you want it in the top nav bar, add it to the `nav` array in the same config file

### Adding a New Blog Post

1. Create a new `.md` file in `docs/blog/`:

```yaml
---
title: 'Your Post Title'
description: 'Brief summary'
date: 2025-06-15
---
# Your Post Title

Post content here...
```

2. Add a link to it in `docs/blog/index.md`

### Adding Images

1. Place image files in `docs/public/images/` (use lowercase filenames with hyphens, no spaces)
2. Reference in markdown:

```markdown
![Alt text](/images/your-image.png)
```

3. Image files in `docs/public/` are served from the root URL, so `/images/foo.png` maps to `docs/public/images/foo.png`

### Adding Download Files

1. Place files in `docs/public/downloads/` (use hyphens instead of spaces in filenames)
2. Link with the `{target="_self"}` attribute so VitePress serves it as a file download:

```markdown
[Download Template](/downloads/my-template.docx){target="\_self"}
```

### Markdown Features

VitePress extends standard Markdown with useful features:

**Info/Tip/Warning boxes:**

```markdown
::: info
This is an informational callout.
:::

::: tip
Helpful tip here.
:::

::: warning
Important warning.
:::
```

**Trademark symbols** — automatically converted at build time:

```markdown
MITRE ACT(tm) → MITRE ACT™
Product(r) → Product®
Copyright(c) → Copyright©
```

**Collapsible sections:**

```html
<details>
  <summary><strong>Click to expand</strong></summary>

  Hidden content here...
</details>
```

**Tables:**

```markdown
| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

For the full list, see the [VitePress Markdown Extensions guide](https://vitepress.dev/guide/markdown).

### Navigation

Navigation is configured in `docs/.vitepress/config.ts`:

**Top nav bar** — the `nav` array:

```ts
nav: [
  { text: 'Home', link: '/' },
  { text: 'Getting Started', link: '/getting-started/' },
  { text: 'Handbook', link: '/handbook/' },
  { text: 'Templates', link: '/templates' },
],
```

**Sidebar** — the `sidebar` object, keyed by URL prefix:

```ts
sidebar: {
  '/handbook/': [
    {
      text: 'ACT Handbook',
      link: '/handbook/',
      items: [
        { text: 'Introduction', link: '/handbook/introduction/' },
        // ... more items
      ],
    },
  ],
},
```

To add a new page to the sidebar, add an entry with `text` (display name) and `link` (URL path). Nested `items` create collapsible sub-sections.

### Theming and Branding

- **Brand colors** — MITRE blue, defined in `docs/.vitepress/theme/custom.css`
- **Footer** — Privacy Policy, Terms of Use, Manage Cookies links in `docs/.vitepress/theme/Layout.vue`
- **Logo** — set in `docs/.vitepress/config.ts` under `themeConfig.logo`
- **Dark mode** — built-in toggle, CSS variables for both modes in `custom.css`

## Deployment

The site deploys to **Cloudflare Pages** automatically:

1. Push to any branch → CI runs (lint + typecheck + build)
2. After CI passes → Cloudflare Pages deploys
3. **Main branch** → production site
4. **PR branches** → preview URL posted as a comment on the PR

### Required GitHub Secrets

| Secret                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier                   |
| `CLOUDFLARE_API_TOKEN`  | API token with Cloudflare Pages Edit permission |

## Project Configuration

| File                                                 | Purpose                                               |
| ---------------------------------------------------- | ----------------------------------------------------- |
| `docs/.vitepress/config.ts`                          | VitePress config — nav, sidebar, plugins, head tags   |
| `docs/.vitepress/theme/index.ts`                     | Custom theme registration                             |
| `docs/.vitepress/theme/custom.css`                   | MITRE brand colors, layout overrides, smartscript CSS |
| `docs/.vitepress/theme/Layout.vue`                   | Custom layout with site-wide footer                   |
| `docs/.vitepress/plugins/markdown-it-smartscript.ts` | Trademark symbol processing                           |
| `package.json`                                       | Dependencies, scripts, git hooks config               |
| `eslint.config.mjs`                                  | Linting rules                                         |
| `tsconfig.json`                                      | TypeScript configuration                              |

## License

See [LICENSE.md](LICENSE.md) and [Terms of Use](docs/terms-of-use.md).

Copyright © 2026 The MITRE Corporation. All rights reserved.
