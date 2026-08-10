# Development Guide

This guide covers everything you need to develop, contribute to, and maintain the MITRE ACT website. The site is built with [VitePress](https://vitepress.dev/), a static site generator powered by Vue and Vite.

## Prerequisites

- **Node.js 22.x** — check with `node --version`
- **pnpm 10.x** — install with `corepack enable && corepack prepare pnpm@latest --activate`
- **Git** — for version control

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mitre/act.git
cd act

# Install dependencies
pnpm install

# Start the dev server (hot-reload at http://localhost:5173)
pnpm dev
```

## Available Commands

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start development server with hot-reload |
| `pnpm build`     | Build for production                     |
| `pnpm preview`   | Preview production build locally         |
| `pnpm lint`      | Run ESLint                               |
| `pnpm lint:fix`  | Run ESLint with auto-fix                 |
| `pnpm typecheck` | Run TypeScript type checking             |

## Project Structure

```
docs/                               # VitePress content root
├── .vitepress/
│   ├── config.ts                   # Site configuration (nav, sidebar, plugins)
│   ├── theme/
│   │   ├── index.ts                # Custom theme entry
│   │   ├── custom.css              # MITRE brand CSS + dark mode
│   │   └── Layout.vue              # Custom layout with footer
│   └── plugins/
│       └── markdown-it-smartscript.ts  # Trademark symbol plugin
├── index.md                        # Homepage
├── getting-started/                # Getting Started section (4 pages)
├── handbook/                       # ACT Assessment Handbook
├── templates.md                    # Downloadable templates
├── blog/                           # Blog posts
├── privacy-policy.md
├── terms-of-use.md
└── public/                         # Static assets
    ├── images/
    ├── downloads/                  # ACT template files
    └── favicons/
```

## Adding and Editing Content

### Edit an existing page

1. Find the `.md` file in `docs/`
2. Edit the markdown content
3. Changes appear instantly in the browser (hot-reload)
4. Commit and push

### Add a new page

1. Create a `.md` file in the appropriate directory
2. Add frontmatter at the top:

```yaml
---
title: Your Page Title
description: Brief description for SEO
---
```

3. Write content in standard Markdown
4. Add the page to the sidebar in `docs/.vitepress/config.ts` if needed
5. Add it to the top nav if needed

### Add a new blog post

1. Create a `.md` file in `docs/blog/`
2. Add frontmatter with title, description, and date
3. Add a link to it in `docs/blog/index.md`

### Add images

1. Place files in `docs/public/images/` (lowercase, hyphens, no spaces)
2. Reference in markdown: `![Alt text](/images/your-image.png)`

### Add downloadable files

1. Place files in `docs/public/downloads/` (hyphens instead of spaces in filenames)
2. Link with: `[Download](/downloads/filename.docx){target="_self"}`

## Markdown Features

VitePress extends standard Markdown:

### Callout boxes

```markdown
::: info
Informational note.
:::

::: tip
Helpful tip.
:::

::: warning
Important warning.
:::
```

### GitHub-flavored alerts

```markdown
> [!NOTE]
> This is a note.

> [!TIP]
> This is a tip.

> [!WARNING]
> This is a warning.
```

### Trademark symbols

Automatically converted at build time in markdown body text:

- `(tm)` renders as ™
- `(r)` renders as ®
- `(c)` renders as ©

In frontmatter YAML, use the Unicode characters directly: `™`, `®`, `©`

### Collapsible sections

```html
<details>
  <summary><strong>Click to expand</strong></summary>

  Content here...
</details>
```

## Navigation Configuration

Navigation is defined in `docs/.vitepress/config.ts`:

- **Top nav**: the `nav` array — items appear in the header
- **Sidebar**: the `sidebar` object — keyed by URL prefix, supports nested groups with `collapsed` option

## Theming

- **Brand colors**: MITRE blue, defined as CSS variables in `docs/.vitepress/theme/custom.css`
- **Dark mode**: automatic toggle, separate color values in `.dark {}` block
- **Footer**: Privacy Policy, Terms of Use, Manage Cookies — in `docs/.vitepress/theme/Layout.vue`
- **Logo**: configured in `docs/.vitepress/config.ts` under `themeConfig.logo`

## Git Hooks

Pre-commit hooks run automatically via `simple-git-hooks` + `lint-staged`:

- **Pre-commit**: ESLint auto-fix on `.js/.ts/.vue` files; Prettier on `.md/.yml/.json` files
- **Pre-push**: TypeScript type checking

## Deployment

The site deploys to **Cloudflare Pages** automatically:

1. Push to any branch — CI runs (lint + typecheck + build)
2. After CI passes — Cloudflare Pages deploys
3. **main branch** — production deployment
4. **PR branches** — preview URL posted as a comment on the PR

### Required GitHub Secrets

| Secret                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier                   |
| `CLOUDFLARE_API_TOKEN`  | API token with Cloudflare Pages Edit permission |

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `pnpm lint`, `pnpm typecheck`, and `pnpm build` all pass
4. Push and open a pull request
5. A Cloudflare Pages preview deploy will be posted on the PR
6. Get review from the team before merging

## Troubleshooting

### Dev server won't start

```bash
# Clear VitePress cache
rm -rf docs/.vitepress/cache docs/.vitepress/dist
pnpm dev
```

### Type errors in IDE

```bash
# Types are generated at install time
pnpm install
```

### Lint errors on commit

```bash
# Auto-fix most issues
pnpm lint:fix
```

## Key References

- [VitePress Documentation](https://vitepress.dev/)
- [VitePress Markdown Extensions](https://vitepress.dev/guide/markdown)
- [VitePress Routing](https://vitepress.dev/guide/routing)
- [VitePress Frontmatter Config](https://vitepress.dev/reference/frontmatter-config)
- [VitePress Default Theme Config](https://vitepress.dev/reference/default-theme-config)
