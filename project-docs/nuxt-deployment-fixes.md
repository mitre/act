# Nuxt 3 Static Site Deployment Fixes

> **Last Updated**: January 2025  
> **Tested With**: Nuxt 3.17.4, Node 20.x  
> **Primary Use Case**: GitHub Pages & Netlify static deployments

This document captures reusable solutions for common Nuxt 3 static site deployment issues, particularly for GitHub Pages and Netlify deployments. These solutions have been battle-tested on production sites.

## Issue #1: Trailing Slash 404 Errors on Static Hosts

### Problem
When deploying Nuxt 3 static sites to GitHub Pages or similar hosts:
- Visiting `/docs/page` works fine
- Refreshing or visiting `/docs/page/` returns 404
- This is because Nuxt generates `/docs/page.html` but hosts look for `/docs/page/index.html`

Related Nuxt issues:
- [#15462](https://github.com/nuxt/nuxt/issues/15462) - Main trailing slash issue (63+ upvotes since 2022)
- [#31521](https://github.com/nuxt/nuxt/issues/31521) - Trailing slash inconsistency in SSG (closed, fixed in PR #31902)

### Solution: Post-Build Script

Create a post-build script at `scripts/fix-trailing-slash.js`:

```javascript
#!/usr/bin/env node

/**
 * Post-build script to restructure generated files for GitHub Pages
 * Converts /path.html to /path/index.html to handle trailing slashes
 */

import { promises as fs } from 'fs';
import path from 'path';

const outputDir = '.output/public';

async function restructureFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip special directories
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
        continue;
      }
      // Recursively process subdirectories
      await restructureFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      // Convert file.html to file/index.html
      const baseName = entry.name.slice(0, -5); // Remove .html
      const newDir = path.join(dir, baseName);
      const newPath = path.join(newDir, 'index.html');
      
      // Skip if directory already exists (e.g., already processed)
      try {
        await fs.access(newDir);
        console.log(`Skipping ${fullPath} - directory already exists`);
        continue;
      } catch {
        // Directory doesn't exist, proceed
      }
      
      console.log(`Converting ${fullPath} -> ${newPath}`);
      
      // Create directory and move file
      await fs.mkdir(newDir, { recursive: true });
      await fs.rename(fullPath, newPath);
    }
  }
}

async function main() {
  console.log('Restructuring files for GitHub Pages...');
  
  try {
    await restructureFiles(outputDir);
    console.log('✓ File restructuring complete');
  } catch (error) {
    console.error('Error restructuring files:', error);
    process.exit(1);
  }
}

main();
```

Update `package.json`:
```json
{
  "scripts": {
    "generate": "nuxt generate && node scripts/fix-trailing-slash.js"
  }
}
```

This generates files as:
- `/docs/page/index.html` instead of `/docs/page.html`
- Both `/docs/page` and `/docs/page/` will work correctly

**Note**: The Nitro plugin approach doesn't work because the `prerender:generate` hook doesn't have the right context to modify file paths during generation.

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

1. **Trailing Slashes**: 
   - [#15462](https://github.com/nuxt/nuxt/issues/15462) - Main issue (open since 2022, 63+ upvotes)
   - [#31521](https://github.com/nuxt/nuxt/issues/31521) - SSG inconsistency (closed, fixed in PR #31902)
   - Solution: Use post-build script to restructure files
2. **Apple Silicon Sharp**: Use `provider: 'none'` in image config
3. **Tailwind Sourcemap Warning**: Known issue, can be ignored

## Related GitHub Issues & Discussions

### Trailing Slash Issues
- [nuxt/nuxt#15462](https://github.com/nuxt/nuxt/issues/15462) - Trailing slash behavior with Nuxt 3 SSG (63+ upvotes)
- [nuxt/nuxt#31521](https://github.com/nuxt/nuxt/issues/31521) - Trailing slash inconsistency in SSG
- [nuxt/nuxt#13953](https://github.com/nuxt/nuxt/issues/13953) - Related trailing slash discussion
- [nuxt/nuxt#23317](https://github.com/nuxt/nuxt/issues/23317) - GitHub Pages specific trailing slash issue

### Other Deployment Issues
- [nuxt/image#1818](https://github.com/nuxt/image/issues/1818) - Sharp module issues on Apple Silicon
- [nuxt/nuxt#14967](https://github.com/nuxt/nuxt/issues/14967) - Static generation memory issues

## Community Solutions & Workarounds

1. **Post-build scripts** (what we use) - Most reliable for GitHub Pages
2. **Netlify redirects** - Works but only for Netlify
3. **Cloudflare Pages** - Has better trailing slash handling out of the box
4. **Custom server middleware** - Not applicable for static sites

## Resources

- Nuxt 3 Docs: https://nuxt.com
- Nuxt Content: https://content.nuxt.com
- Nuxt UI Pro: https://ui.nuxt.com/pro
- GitHub Pages deployment: https://nuxt.com/deploy/github-pages
- Netlify deployment: https://nuxt.com/deploy/netlify

## Contributing

If you've found other solutions or issues, please feel free to comment on the gist or reach out. This is a living document meant to help the Nuxt community navigate static deployment challenges.