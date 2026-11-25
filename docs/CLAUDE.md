# Content Directory Guide

All site content lives here as Markdown files. Each `.md` file becomes a page.

## File → URL

- `docs/index.md` → `/`
- `docs/introduction/index.md` → `/introduction/`
- `docs/introduction/how-act-works.md` → `/introduction/how-act-works`

## Frontmatter

Every page needs:

```yaml
---
title: 'Page Title'
description: 'Brief SEO description'
---
```

## Markdown Rules

- `::: info` / `::: tip` / `::: warning` for callouts (close with `:::`)
- Use Unicode `™` in Markdown and YAML frontmatter
- `{target="_self"}` on download links: `[text](/downloads/file.docx){target="_self"}`
- `<details><summary>Title</summary>` for collapsible sections
- `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` for GitHub-style alerts
- One `#` heading per page. Don't skip levels (h2 → h4).
- No spaces in filenames under `public/`

## DO NOT USE

Nuxt Content MDC syntax: `::card`, `::callout`, `::accordion`, `::card-group`, `<NuxtImg>`

## Navigation

Sidebar and nav are in `docs/.vitepress/config.ts`. Adding a file doesn't auto-add it to nav — update the config.
