# ACT Design System Layer

A Nuxt layer providing the official ACT™ design system with condensed spacing, MITRE branding, and responsive typography.

## Features

- 🎨 **MITRE Brand Colors** - Complete color palette for ACT applications
- 📐 **Condensed Spacing** - 50-60% reduced spacing for professional density
- 📱 **Responsive Design** - Mobile-first with optimized breakpoints
- 🌙 **Dark Mode Optimized** - Custom neutral backgrounds and contrast
- 📚 **Self-Documented** - Comprehensive docs included in the layer

## Usage

Add to your Nuxt application:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['./layers/act-design-system']
})
```

## Documentation

Complete documentation is available at `/docs/design-system/` when the layer is active:

- **Overview** - Design system architecture and purpose
- **Customization** - Theme, spacing, and component configuration
- **Components** - Custom ACT components and usage
- **Migration** - Upgrading and compatibility notes

## Development

This layer was created to meet MITRE leadership requirements for:

- More condensed, industry-standard layouts
- Consistent ACT™ branding across applications
- Professional spacing density
- Responsive, accessible design

## Structure

```
layers/act-design-system/
├── nuxt.config.ts              # Layer configuration
├── app.config.ts               # Design tokens
├── assets/css/design-system.css # Custom spacing/typography
├── components/                 # Custom components
├── content/docs/               # Documentation
└── README.md                   # This file
```

## Version

v1.0.0 - Initial release with Nuxt 4 and UI v4 support
