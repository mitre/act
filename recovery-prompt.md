# Recovery Prompt - ACT Website Project

## Project Overview
The MITRE ACT (Adaptive Capabilities Testing) website is a Nuxt 3 application with Nuxt UI Pro, deployed to GitHub Pages at https://act.mitre.org/. The site provides documentation, resources, and templates for the ACT security assessment framework.

## Current Status (January 6, 2025)
- Main site is live and functional at https://act.mitre.org/
- All initial content from PR #3 has been merged to main
- Cookie consent (Osano) is implemented and working
- Hero images and content sections are complete
- Blog has "ACT Website Goes Live" article
- Artifacts page has all templates with download functionality
- Complete template package download available
- Issue #10 (404 on trailing slash) has been SOLVED with Nitro hook
- Build warnings cleaned up (chunk size, sourcemaps)

## Active Issues Being Researched

### Issue #10: 404 on Page Refresh with Trailing Slash (SOLVED ✓)
**Root Cause**: GitHub Pages serves static files differently than Nuxt expects
- Nuxt generates: `/docs/artifacts/index.html`
- GitHub Pages expects either: `/docs/artifacts.html` OR `/docs/artifacts/index.html`
- Direct URL access fails because GitHub Pages can't find `/docs/artifacts.html`

**Working Solution (January 6, 2025)**:
Implemented Nitro hook to generate duplicate HTML files during build:
```typescript
// nuxt.config.ts
nitro: {
  hooks: {
    'prerender:done': async () => {
      const { promises: fs } = await import('fs')
      const { join, dirname, resolve } = await import('path')
      const publicDir = resolve('.output/public')
      
      async function processDirectory(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = join(dir, entry.name)
          if (entry.isDirectory()) {
            await processDirectory(fullPath)
          } else if (entry.isFile() && entry.name === 'index.html') {
            const relativePath = fullPath.replace(publicDir + '/', '')
            const dirPath = dirname(relativePath)
            if (dirPath === '.') continue
            const duplicatePath = join(publicDir, `${dirPath}.html`)
            await fs.copyFile(fullPath, duplicatePath)
          }
        }
      }
      await processDirectory(publicDir)
    }
  }
}
```

**Result**: Creates both `/docs/artifacts.html` and `/docs/artifacts/index.html`, making both URL patterns work on GitHub Pages.

**Previous Attempts**:
1. Custom 404.html with JavaScript redirect - caused infinite redirect loops
2. Post-build script (fix-trailing-slash.js) - didn't solve the core issue
3. Changing footer links to client-side navigation - worked but didn't fix direct access

**Important Discovery**: 
- nuxt.com uses Vercel (not GitHub Pages), which handles routing differently
- GitHub Pages has stricter file resolution requirements
- The Nitro hook solution generates files in both formats for full compatibility

### Issue #11: Safari Download Behavior (HIGH PRIORITY)
**Root Cause**: Safari opens new tabs for downloads with `target="_blank"` that don't auto-close

**Solution**: Remove `target="_blank"` from all download links in artifacts.md
```markdown
<!-- Change from -->
::card{icon="..." :to="/downloads/file.docx" target="_blank"}
<!-- To -->
::card{icon="..." :to="/downloads/file.docx"}
```

### Issue #15: Mobile Navigation Overflow (HIGH PRIORITY)
**Problem**: 
- Mobile hamburger menu extends beyond viewport
- Theme switcher and cookie preferences buttons not integrated into mobile menu
- No separation between nav links and controls

**Solution**: Review Nuxt UI Pro landing template for proper implementation
- Move theme controls to mobile menu slots
- Add proper separator
- Ensure all content stays within viewport

## Upcoming Issues (Lower Priority)

### Issue #13: Link Preview Image (Open Graph)
- Configure proper meta tags in app.vue
- Use arrow logo or slogan image
- Recommended size: 1200x630px

### Issue #14: Google Analytics Implementation
- Add GA4 tracking script
- Coordinate with team for measurement ID
- Ensure Osano consent compliance
- Consider @nuxtjs/google-analytics module

## Technical Context & Decisions

### File Structure
```
/content/               # Nuxt Content markdown files
  0.index.yml          # Homepage content
  1.docs/              # Documentation pages
    1.getting-started/ # Introduction
    4.artifacts.md     # Downloads page
  3.blog/              # Blog articles
/content-staging/       # Hidden content not yet published
  act-handbook/        # Full ACT handbook (hidden)
  development/         # Dev documentation (hidden)
  blog/               # Example blog posts (hidden)
/public/
  downloads/           # Template downloads
    act-templates/     # Individual ACT templates
    MITRE-ACT-Template-Set-*.zip  # Complete package
  images/
    heroes/           # Section hero images
    logos/            # ACT logos
    act-handbook/     # Handbook images
/app/
  components/         # Vue components
    AppHeader.vue     # Has mobile nav issue
    AppFooter.vue     # Has cookie preferences
  app.vue            # Osano script, SEO meta
```

### Key Technical Decisions Made
1. **Image Provider**: Using `provider: 'none'` for Apple Silicon compatibility (avoids Sharp/IPX issues)
2. **Cookie Consent**: Osano script loads first in head with `tagPriority: 1`
3. **Content Staging**: Moved unready content to `/content-staging/` to hide from production
4. **File Naming**: All images use lowercase with hyphens (no spaces)
5. **Download Strategy**: Direct file downloads without `target="_blank"` for Safari compatibility

### Recent Changes
- Changed hero button from "View on GitHub" to "Get the Docs"
- Moved "Download All Templates" section to top of artifacts page
- Fixed blog post issues (preview image, author link, URL text)
- Added hero images to main page sections

## Todo List & PR Strategy

### PR 1: Fix Critical UX Issues (Issues #10 & #11) - IN PROGRESS
- ✓ Implement Nitro hook for trailing slash 404 fix (Issue #10 - SOLVED)
- Remove target="_blank" from download links (Issue #11)

### PR 2: Fix Mobile Navigation (Issue #15) - HIGH PRIORITY
- Review Nuxt UI Pro landing template
- Restructure mobile menu components
- Move theme controls to proper slots

### PR 3: Configure Link Preview (Issue #13) - MEDIUM
- Update Open Graph meta tags
- Test on social platforms

### PR 4: Implement Analytics (Issue #14) - MEDIUM
- Add GA4 tracking
- Ensure Osano compliance

## Planned Improvements

### Nuxt GitHub Pages Module
After validating the Nitro hook fix, we plan to:
1. Extract the solution into a reusable Nuxt module
2. Publish as `nuxt-github-pages` on MITRE's GitHub
3. Features will include:
   - Automatic duplicate HTML file generation
   - Configuration options (enabled, excludePaths)
   - Clear documentation for GitHub Pages deployment
   - Compatible with Nuxt 3 static generation

## Commands & Workflow
```bash
# Development
pnpm run dev           # Start dev server
pnpm run build         # Build application
pnpm run generate      # Generate static site
pnpm run preview       # Preview production build

# Code Quality
pnpm run lint          # Run ESLint
pnpm run typecheck     # Run TypeScript checks

# Git Workflow
git checkout -b feature/issue-XX
# Make changes
pnpm run lint && pnpm run typecheck
git add -A && git commit -m "message"
git push origin feature/issue-XX
# Create PR to main
```

## Deployment
- Automatic via GitHub Actions on push to main
- Deploys to GitHub Pages at https://act.mitre.org/
- Uses `pnpm run generate` for static site generation

## Important URLs
- Production: https://act.mitre.org/
- GitHub Repo: https://github.com/mitre/act
- Artifacts Page: /docs/artifacts
- Introduction: /docs/getting-started
- Blog: /blog

## Known Issues & Workarounds
1. **Trailing Slash 404**: Known Nuxt 3 issue, implementing error.vue workaround
2. **Safari Downloads**: Remove target="_blank" from download links
3. **Mobile Navigation**: Needs restructuring per Nuxt UI Pro patterns
4. **IPX/Sharp on Apple Silicon**: Using provider: 'none' to avoid issues

## Session Context (June 1, 2025)
- Issue #10 SOLVED with Nitro hook solution
- Solution made compatible with both GitHub Pages and Netlify
- Created nuxt-github-pages module with:
  - Official Nuxt module template structure
  - TypeScript support and configuration options
  - Comprehensive README documentation
  - Apache-2.0 license, NOTICE.md, CODE_OF_CONDUCT.md (MITRE standards)
- Updated deployment solutions gist with new Nitro hook approach
- Next steps: Create MITRE GitHub repo, test module, integrate into ACT project
- At 2% context limit, ready for next session

## Session Context (June 2, 2025) 
- Continued work on nuxt-github-pages module
- Module structure complete with:
  - Full documentation in README.md
  - Package.json with Apache-2.0 license and MITRE repository
  - NOTICE.md with MITRE copyright and government use rights
  - LICENSE.md with Apache-2.0 terms
  - CODE_OF_CONDUCT.md (Contributor Covenant)
- Ready to create MITRE GitHub repository
- Next: Push module to MITRE repo, test integration, update ACT project