# Update Guide: nuxt-github-pages v1.5.0

This guide will help you update the ACT website to use the latest version of nuxt-github-pages (v1.5.0) with all the new features and improvements.

## Current Version → Latest Version

You're currently using an older version. The latest v1.5.0 includes:

### Major Improvements Since Your Version

1. **SEO Fix**: Automatic canonical URL injection prevents duplicate content penalties
2. **Flexible Deployment**: New `createDuplicates` option for different hosting scenarios
3. **Better Performance**: Optimized CI/CD with proper timeouts
4. **Enhanced Security**: Dependabot integration and security scanning

## Update Steps

### 1. Update the Package

```bash
# Update to latest version
pnpm update nuxt-github-pages@latest

# Or if using npm
npm update nuxt-github-pages@latest
```

### 2. Review Configuration Options

Check your `nuxt.config.ts` file. The module now supports these options:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-github-pages'],
  
  githubPages: {
    // Core options (you probably don't need to change these)
    enabled: true,              // Enable/disable the module
    verbose: true,              // Show detailed logging
    outputDirs: ['dist', '.output/public'],  // Directories to check
    
    // SEO options (NEW - highly recommended to keep enabled)
    canonicalUrls: true,        // Prevent duplicate content issues
    trailingSlash: false,       // Use /path instead of /path/ in canonical URLs
    
    // Deployment options (NEW)
    createDuplicates: true      // Create duplicate HTML files (required for GitHub Pages)
  }
})
```

### 3. Canonical URLs (Automatic SEO Fix)

The module now automatically adds canonical URLs to prevent SEO duplicate content issues:

```html
<!-- Both /about and /about/ will have the same canonical URL -->
<link rel="canonical" href="/about">
```

This happens automatically - no action needed from you!

### 4. Test Locally

```bash
# Clean any old build artifacts
rm -rf .nuxt .output dist

# Generate the site
pnpm run generate

# Check that both files exist and have canonical URLs
ls -la .output/public/about.html
ls -la .output/public/about/index.html

# Both should contain the same canonical URL
grep "canonical" .output/public/about.html
grep "canonical" .output/public/about/index.html
```

### 5. Deploy to GitHub Pages

Your deployment process remains the same. The module handles everything during the build.

## New Features You Can Use

### 1. Canonical URL Customization

If you prefer trailing slashes in your canonical URLs:

```typescript
githubPages: {
  trailingSlash: true  // Results in href="/about/" instead of "/about"
}
```

### 2. Disable Duplicate Files (Not Recommended for GitHub Pages)

If you ever move to a different hosting platform that handles redirects properly:

```typescript
githubPages: {
  createDuplicates: false,  // Only adds canonical URLs, no duplicate files
  canonicalUrls: true       // Still prevents SEO issues
}
```

⚠️ **Warning**: Setting `createDuplicates: false` will cause 404 errors on GitHub Pages!

## Troubleshooting

### Build Issues After Update

If you encounter any build issues:

```bash
# Clean everything
rm -rf node_modules .nuxt .output dist

# Reinstall dependencies
pnpm install

# Try building again
pnpm run generate
```

### Verifying the Update

After deploying, verify:

1. **Check both URL formats work**:
   - `https://act.mitre.org/about` (no trailing slash)
   - `https://act.mitre.org/about/` (with trailing slash)

2. **Verify canonical URLs** (View Page Source):
   - Both URLs should have: `<link rel="canonical" href="/about">`

3. **Check Google Search Console**:
   - Duplicate content warnings should disappear over time
   - Both URL variants are recognized as the same page

## Rollback Plan

If you need to rollback:

```bash
# Rollback to specific version
pnpm install nuxt-github-pages@1.1.0

# Or remove canonical URLs temporarily
githubPages: {
  canonicalUrls: false  // Disables the SEO fix
}
```

## Benefits of Updating

1. **Better SEO**: No more duplicate content penalties
2. **Future-proof**: Latest version with active maintenance
3. **Security**: Includes all security patches
4. **Performance**: Optimized build process
5. **Developer Experience**: Better error messages and logging

## Questions or Issues?

- GitHub Issues: https://github.com/mitre/nuxt-github-pages/issues
- Latest Documentation: https://github.com/mitre/nuxt-github-pages#readme
- Changelog: https://github.com/mitre/nuxt-github-pages/blob/main/CHANGELOG.md

## Summary

The update is straightforward:
1. Update the package to v1.5.0
2. No configuration changes needed (it works with your existing setup)
3. You automatically get SEO fixes with canonical URLs
4. Test locally, then deploy as usual

The main benefit is the automatic SEO fix - Google will no longer see duplicate content between `/path` and `/path/` URLs!