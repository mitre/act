# ACT Design System Module

A comprehensive Nuxt module that provides the official ACT™ design system with condensed spacing, MITRE branding, and responsive typography.

## Overview

This module was created to meet MITRE leadership requirements for:

- **50-60% tighter spacing** compared to default Nuxt UI
- **Industry-standard layout density**
- **Consistent MITRE/ACT branding**
- **Professional, enterprise-grade visual design**

## How It Works

The module automatically:

1. **Injects CSS** - Adds `design-system.css` with custom spacing, typography, and MITRE colors
2. **Injects Documentation** - Copies module docs to `content/1.docs/8.design-system/` at runtime
3. **Provides Configuration** - Sets up app config defaults (though app can override)
4. **Self-Documents** - Includes comprehensive usage and customization guides

### Technical Implementation

```typescript
// src/module.ts
export default defineNuxtModule({
  setup(options, nuxt) {
    // 1. Inject CSS into build
    nuxt.options.css.push(resolveModule('../assets/css/design-system.css'))

    // 2. Copy module docs to main content at runtime
    nuxt.hook('ready', async () => {
      // Copies content/8.design-system/*.md to main content directory
      // This makes module docs accessible at /docs/design-system/ URLs
    })
  }
})
```

## Installation

### Local Module (Current)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['./modules/act-design-system']
})
```

### Future npm Package

```typescript
// nuxt.config.ts (when published)
export default defineNuxtConfig({
  modules: ['@mitre/act-design-system']
})
```

## Configuration

### Module Options

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['./modules/act-design-system'],

  actDesignSystem: {
    enabled: true // Enable/disable the design system
  }
})
```

### Color Configuration

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue', // ACT brand primary
      neutral: 'slate' // ACT brand neutral
    }
  }
})
```

## Features Provided

### CSS Features

- **Custom spacing utilities** - 50-60% reduced padding/margins
- **MITRE brand colors** - Complete color palette
- **Condensed typography** - Tighter font sizes and line heights
- **Responsive containers** - Optimized container widths
- **Mobile-first design** - Progressive enhancement approach

### Documentation Features

- **Self-documenting** - Module includes its own usage docs
- **Runtime injection** - Docs appear automatically at `/docs/design-system/`
- **Comprehensive guides** - Overview, customization, component overrides
- **Architecture explanations** - How the module works internally

### Integration Features

- **Zero-config** - Works immediately when added to modules
- **Override-friendly** - App can override any module defaults
- **Future-ready** - Structured for npm package extraction
- **Proper Nuxt patterns** - Uses official module system

## File Structure

```
modules/act-design-system/
├── index.ts                           # Entry point
├── src/module.ts                      # Module implementation
├── assets/css/design-system.css       # Custom spacing/typography
├── content/8.design-system/           # Module documentation
│   ├── 1.overview.md                  # Architecture and features
│   └── 2.customization.md             # Usage and configuration
└── README.md                          # This file
```

## Benefits

- ✅ **Proper Nuxt architecture** - Uses module system correctly
- ✅ **Self-contained** - Everything needed in one module
- ✅ **Programmatic integration** - No manual setup required
- ✅ **Maintainable** - Single source of truth for design system
- ✅ **Reusable** - Can be extracted to npm package for other projects
- ✅ **Configurable** - Can be enabled/disabled and customized
- ✅ **Self-documenting** - Includes comprehensive documentation

## Version

v1.0.0 - Initial release with Nuxt 4 and UI v4 support

## Future

This module is structured to become `@mitre/act-design-system` npm package for use across multiple MITRE projects.
