# Nuxt 3 Static Site Deployment Fixes

This document captures reusable solutions for common Nuxt 3 static site deployment issues, particularly for GitHub Pages and Netlify deployments.

## Issue #1: Trailing Slash 404 Errors on Static Hosts

### Problem
When deploying Nuxt 3 static sites to GitHub Pages or similar hosts:
- Visiting `/docs/page` works fine
- Refreshing or visiting `/docs/page/` returns 404
- This is because Nuxt generates `/docs/page.html` but hosts look for `/docs/page/index.html`

### Solution: Generate Directory Structure

Create a Nitro plugin at `server/plugins/nitro-static-paths.ts`:

```typescript
// Nitro plugin to generate static files as directories with index.html
// This fixes the trailing slash issue for GitHub Pages
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('prerender:generate', async (route) => {
    // Skip if it's already index.html or the root
    if (route.fileName?.endsWith('index.html') || route.route === '/') {
      return
    }

    // Convert /path.html to /path/index.html
    if (route.fileName?.endsWith('.html')) {
      const baseName = route.fileName.slice(0, -5) // Remove .html
      route.fileName = `${baseName}/index.html`
    }
  })
})
```

This generates files as:
- `/docs/page/index.html` instead of `/docs/page.html`
- Both `/docs/page` and `/docs/page/` will work correctly

## Issue #2: Safari Opening New Tabs for Downloads

### Problem
When using `target="_blank"` on download links, Safari opens new tabs that don't automatically close after download starts.

### Solution: Use target="_top"
Change all download links from:
```markdown
::card{icon="i-heroicons-document" :to="/downloads/file.pdf" target="_blank"}
```

To:
```markdown
::card{icon="i-heroicons-document" :to="/downloads/file.pdf" target="_top"}
```

Or for markdown links:
```markdown
[Download File](/downloads/file.pdf){target="_top" download="filename.pdf"}
```

## Issue #3: Nuxt Image on Apple Silicon

### Problem
Sharp module installation issues on Apple Silicon Macs (M1/M2/M3).

### Solution: Disable Image Optimization
In `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  image: {
    // Disable image optimization for Apple Silicon compatibility
    provider: 'none',
    dir: 'public'
  }
})
```

## Issue #4: Netlify Build Memory Issues

### Problem
JavaScript heap out of memory errors during build.

### Solution: Increase Memory Allocation
Create `netlify.toml`:

```toml
[build]
  command = "pnpm run build"
  publish = "dist"
  environment = { NODE_OPTIONS = "--max-old-space-size=8192" }
```

## Issue #5: Cookie Consent Integration

### Solution: Osano Integration
In `app.vue`:

```vue
<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://cmp.osano.com/YOUR-CONFIG-ID/osano.js',
      tagPriority: 1,
      tagPosition: 'head'
    }
  ]
})
</script>
```

Add TypeScript types in `app/types/index.d.ts`:

```typescript
interface Osano {
  cm: {
    mode: string
    showDrawer: (dialogClass: string) => void
    addEventListener: (event: string, callback: () => void) => void
  }
}

declare global {
  interface Window {
    Osano?: Osano
  }
}
```

## Project Structure Best Practices

### 1. Git Ignore Claude Files
Add to `.gitignore`:
```
# Claude documentation and context files
CLAUDE.md
session.md
recovery-prompt.md
session-*.md
pr-summary.md
.vimrc
.claude/
```

### 2. Content Organization
```
/content/               # Published content
/content-staging/       # Hidden/draft content
/public/downloads/      # Downloadable files
```

### 3. Required Files for Each Project

#### CLAUDE.md (Project-specific AI instructions)
```markdown
# CLAUDE.md

## Commands
- Build: `pnpm run build`
- Dev: `pnpm run dev`
- Generate: `pnpm run generate`
- Preview: `pnpm run preview`
- Lint: `pnpm run lint`
- Typecheck: `pnpm run typecheck`

## Code Style
- Vue components use Composition API with `<script setup lang="ts">`
- TypeScript for all files
- etc...
```

#### recovery-prompt.md (For context recovery)
```markdown
# Recovery Prompt - [Project Name]

## Project Overview
[Brief description]

## Current Status
- Main site URL: 
- Deployment: GitHub Pages / Netlify

## Active Issues
[List current issues and their status]

## Technical Context
[Key technical decisions and configurations]
```

## Deployment Checklist

### For New Projects:
1. [ ] Add Nitro plugin for trailing slash fix
2. [ ] Configure download links with `target="_top"`
3. [ ] Set up Netlify memory allocation
4. [ ] Add .gitignore entries for Claude files
5. [ ] Create CLAUDE.md with project-specific instructions
6. [ ] Test on both Chrome and Safari
7. [ ] Test trailing slash behavior after deployment

### Common Commands:
```bash
# Development
pnpm run dev

# Build and test locally
pnpm run generate
npx serve .output/public

# Linting and type checking
pnpm run lint
pnpm run typecheck

# Git workflow
git checkout -b feature/issue-name
git add -A
git commit -m "Fix: Description"
git push -u origin feature/issue-name
gh pr create
```

## Known Nuxt 3 Issues

1. **Trailing Slashes**: GitHub issue #15462 (open since 2022)
2. **Apple Silicon Sharp**: Use `provider: 'none'` in image config
3. **Tailwind Sourcemap Warning**: Known issue, can be ignored

## Resources

- Nuxt 3 Docs: https://nuxt.com
- Nuxt Content: https://content.nuxt.com
- Nuxt UI Pro: https://ui.nuxt.com/pro
- GitHub Pages deployment: https://nuxt.com/deploy/github-pages
- Netlify deployment: https://nuxt.com/deploy/netlify