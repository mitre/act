# Recovery Prompt - ACT Website Project

## Project Overview
The MITRE ACT (Adaptive Capabilities Testing) website is a Nuxt 3 application with Nuxt UI Pro, deployed to GitHub Pages at https://act.mitre.org/. The site provides documentation, resources, and templates for the ACT security assessment framework.

## Current Status (May 31, 2025)
- Main site is live and functional at https://act.mitre.org/
- All initial content from PR #3 has been merged to main
- Cookie consent (Osano) is implemented and working
- Hero images and content sections are complete
- Blog has "ACT Website Goes Live" article
- Artifacts page has all templates with download functionality
- Complete template package download available

## Active Issues Being Researched

### Issue #10: 404 on Page Refresh with Trailing Slash (HIGH PRIORITY)
**Root Cause**: GitHub Pages serves static files differently than Nuxt expects
- Nuxt generates: `/docs/artifacts.html`
- Browser navigates to: `/docs/artifacts` (works)
- On refresh, GitHub Pages adds: `/docs/artifacts/`
- Looks for: `/docs/artifacts/index.html` (doesn't exist → 404)

**Researched Solutions**:
1. **Create error.vue with client-side redirect** (most pragmatic, community consensus)
   ```vue
   <!-- error.vue in project root -->
   <script setup>
   onMounted(() => {
     const path = window.location.pathname
     if (path.endsWith('/') && path !== '/') {
       const newPath = path.slice(0, -1)
       router.replace(newPath)
     }
   })
   </script>
   ```

2. Configure Nitro to generate directory-based routes
3. Post-build script to restructure output
4. Route rules for trailing slash handling

**Important Note**: This is a known Nuxt 3 issue (#15462) open since 2022 with 63+ upvotes. The error.vue approach is most reliable across all static hosts.

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
- Implement error.vue for trailing slash 404 fix
- Remove target="_blank" from download links

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

## Session Context
- Working from main branch after successful PR #3 merge
- Fixed two quick issues on main (hero button text, artifacts layout)
- Currently researching solutions for Issues #10 and #11
- Created Issue #15 for mobile navigation problem
- At 4% content limit, maintaining context via these files