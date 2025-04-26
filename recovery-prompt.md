# MITRE ACT Handbook Project Recovery Prompt

This document captures the core challenges and solutions discovered while developing the MITRE ACT Handbook website using Nuxt UI Pro with Nuxt Content.

## Core Issues Addressed

### Image Handling in Nuxt Content

Problem: Images with spaces in filenames weren't displaying properly in markdown content.

Solution path:
1. Tried URL encoding with `%20` for spaces
2. Tried using various image components (`<nuxt-img>`, `<NuxtPicture>`, HTML `<img>` tags)
3. Root cause: Complex interaction between Nuxt Content, image processing modules, and filepath parsing
4. Final solution: Renamed all images to follow web standards (lowercase, hyphens instead of spaces)

### Nuxt UI Pro Component Integration

Problem: Difficulty with proper syntax for advanced Nuxt UI Pro components in markdown.

Solutions:
- Use `::callout` instead of `::alert` with parameters: `icon`, `color`, `to`
- Use `::card-group` and `::card` for organized content blocks
- Use `::accordion` with `::accordion-item{label="..."}` (not `title`)
- Use `::steps{level="3"}` with corresponding heading levels
- Use `::div{class="..."}` for custom styling and containers
- Use shorthand formats like `::tip`, `::note`, `::warning` for common callout types
- Fixed component resolution errors by using built-in shorthand components

### Component Resolution Errors

Problem: Vue warnings about "Failed to resolve component: Alert" and similar errors.

Solutions:
- Replaced custom Alert components with built-in callout shorthands:
  - `::note` - For informational content (blue)
  - `::warning` - For warnings and alerts (amber) 
  - `::tip` - For success messages and tips (green)
- Used standard component syntax for card groups:
```md
::card-group
  ::card{title="Card Title" icon="i-heroicons-document-text"}
    Card content here...
  ::
::
```
- Avoided custom components that require proper registration with Nuxt Content

### IPX/Sharp Image Processing Issues

Problem: Sharp library incompatibility on Apple Silicon (M1/M2) Macs.

Solutions:
- Used the 'none' provider to avoid Sharp/IPX dependency altogether:
```typescript
image: {
  // Disable image optimization to avoid Sharp/IPX issues
  provider: 'none',
  dir: 'public',
  // Keep responsive breakpoints for consistency
  screens: {
    xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536
  }
}
```

- Added proper .npmrc configuration for native modules:
```
# Allow proper handling of native module dependencies
shamefully-hoist=true

# Specific package hoisting patterns for native modules
public-hoist-pattern[]=*sharp*
public-hoist-pattern[]=*better-sqlite3*
public-hoist-pattern[]=*parcel*
public-hoist-pattern[]=*vue*

# Ensure these built dependencies are handled correctly
only-built-dependencies=@parcel/watcher,better-sqlite3,sharp,unrs-resolver,vue-demi
```

- Created specialized npm scripts for clean cache restart:
```json
"dev:clean": "nuxt dev --clean-cache",
"dev:clean-log": "nuxt dev --clean-cache 2>&1 | tee logs/dev-clean-$(date +%Y%m%d-%H%M%S).log",
```

- Verified that standard HTML `<img>` tags work best across all platforms
- Added comprehensive image usage documentation and examples

### Template Robustness Issues

Problem: The default template wasn't handling missing sections gracefully, causing errors when sections were removed.

Solutions:
- Added conditional rendering with `v-if` checks for all sections
- Used optional chaining (`?.`) for nested properties
- Added fallbacks with the `||` operator for arrays
- Added conditional separators that only display when needed
- Documented optional sections with commented YAML examples

```vue
<!-- Example pattern -->
<UPageSection
  v-if="page.sections && page.sections.length"
  v-for="(section, index) in page.sections"
  :key="index"
  :title="section.title"
  :description="section.description"
>
  <!-- Content -->
</UPageSection>
```

## Customizations Implemented

### Homepage Customization

- Replaced template content with ACT-specific information
- Created sections for Risk-Based Decision Making and Three-Phase Approach
- Added Benefits of ACT with appropriate icons 
- Integrated ACT logo in the hero section
- Removed demo elements (color picker, promotional video)
- Added ACT-specific call-to-action

### Development Documentation

- Created detailed documentation on page structure and components
- Added reference guides for template patterns
- Documented best practices for both Vue templates and MDC syntax
- Added examples for proper component usage

## Learnings

1. File naming best practices: lowercase, hyphens, no spaces
2. Template robustness requires conditional rendering for all optional sections
3. YAML comments provide valuable documentation for other developers
4. Nuxt UI Pro components can be customized extensively but require proper syntax
5. Always consider cross-platform compatibility in configuration
6. Test component syntax in dedicated test files before widespread implementation
7. Maintain thorough documentation of patterns and best practices

## Project Structure

- Landing page: `/content/0.index.yml`
- Handbook content: `/content/1.docs/2.act-handbook/`
- Development documentation: `/content/1.docs/3.development/`
- Images: `/public/images/act-handbook/`
- Project documentation: `/project-docs/`
- Session logs: `/logs/` (git-ignored)

## Enhanced Template Robustness

We've now applied the template robustness patterns to all main template pages:

1. **Homepage**: `/app/pages/index.vue` - Added complete robustness treatment
2. **Doc Pages**: `/app/pages/docs/[...slug].vue` - Enhanced with optional chaining and fallbacks:
   ```vue
   <UPageHeader
     :title="page?.title || ''"
     :description="page?.description || ''"
   />
   
   <UContentSurround v-if="surround?.length" :surround="surround || []" />
   ```

3. **Blog List**: `/app/pages/blog/index.vue` - Added conditional rendering:
   ```vue
   <UPageHeader
     v-if="page"
     :title="page?.title || ''"
     :description="page?.description || ''"
     class="py-[50px]"
   />
   
   <UBlogPosts v-if="posts?.length">
     <!-- Blog post rendering with fallbacks -->
   </UBlogPosts>
   ```

4. **Blog Post**: `/app/pages/blog/[slug].vue` - Enhanced with detailed conditional rendering:
   ```vue
   <template #headline v-if="post?.badge || post?.date">
     <UBadge
       v-if="post?.badge"
       v-bind="post?.badge"
       variant="subtle"
     />
     <span v-if="post?.badge && post?.date" class="text-(--ui-text-muted)">&middot;</span>
     <time v-if="post?.date" class="text-(--ui-text-muted)">{{ new Date(post.date).toLocaleDateString('en') }}</time>
   </template>
   ```

This comprehensive approach ensures all templates gracefully handle missing data and provide fallbacks, resulting in a more robust application.

## Development Documentation Cleanup Status

1. **Completed Documentation Improvements**:
   - Successfully consolidated duplicate content for better organization:
     - ✅ Merged `4.icon-test.md` into `5.nuxt-ui-with-content.md` as a comprehensive UI component guide
     - ✅ Renamed `1.test-nuxt-image.md` to `1.image-usage-guide.md` to better reflect its purpose
     - ✅ Removed redundant files and updated all references
     - ✅ Created new `9.code-conventions.md` with project standards and style guide
   - ✅ Ensured consistent MDC syntax across all documentation files
   - ✅ Updated index.md references to reflect reorganized files
   - Added live examples with actual MDC syntax for each component type
   - Enhanced best practices section for image usage
   - Centralized code style and conventions documentation

## Project Organization Improvements

We've enhanced the overall project organization with the following improvements:

1. **Root Directory Cleanup**:
   - ✅ Removed redundant blog article draft that was properly formatted in the content directory
   - ✅ Moved handbook-related documentation to `project-docs/handbook-docs/`
   - ✅ Archived backup configuration files to `project-docs/backups/`
   - ✅ Added README to the project-docs directory explaining its purpose and organization

2. **Directory Structure Enhancement**:
   - Created organized subdirectories for specific documentation types
   - Established clear naming conventions for files
   - Improved separation between active code/content and development resources
   - Reduced clutter in the project root for better navigation

## Next Development Focus

2. **Standard Image Implementation**:
   - Standardize on HTML `<img>` tags in markdown content for compatibility
   - Use consistent `::div{class="flex justify-center my-6"}` wrapper for image centering
   - Add `loading="lazy"` attribute for below-the-fold images
   - Document final image best practices in a consolidated guide

3. **Component Guidelines**:
   - Create clear guidelines for using built-in shorthand components (note, tip, warning)
   - Document proper card-group formatting with consistent spacing
   - Ensure all component examples follow the established standards

4. **Documentation Enhancements**:
   - Document the IPX/Sharp compatibility resolution permanently
   - Create a troubleshooting guide for common issues
   - Add platform-specific notes for Windows, macOS (Intel), and Apple Silicon

5. **Testing and Browser Compatibility**:
   - Test image rendering across different browsers and devices
   - Verify responsive behavior of all components
   - Check for any rendering issues or layout shifts

6. **Content Enhancement**:
   - Continue enhancing handbook content with ACT-specific information
   - Implement additional page templates based on PDF content
   - Add more interactive elements to improve user experience