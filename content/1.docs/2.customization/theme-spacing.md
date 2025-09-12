# Theme and Spacing Customization

This guide explains how to customize the ACT website's theme, colors, and spacing.

## Color Theme

### Primary Color

The site uses blue as the primary color, configured in `app/app.config.ts`:

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  }
})
```

### Dark Mode

Dark mode is set as default in `nuxt.config.ts`:

```typescript
colorMode: {
  preference: 'dark' // Options: 'light', 'dark', or 'system'
}
```

## Spacing Customization

### Global Spacing Overrides

Spacing is controlled via CSS overrides in `app/assets/css/main.css`:

```css
/* Global spacing scale adjustment */
@layer utilities {
  /* Hero sections */
  .py-24 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .lg\:py-40 {
    @media (min-width: 1024px) {
      padding-top: 4rem !important;
      padding-bottom: 4rem !important;
    }
  }

  /* Regular sections */
  .py-16 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .lg\:py-32 {
    @media (min-width: 1024px) {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
  }
}
```

### Container Width

Adjust container sizes in `app/assets/css/main.css`:

```css
@theme static {
  --container-7xl: 75rem; /* Max width for content */
  --container-6xl: 72rem;
  --container-5xl: 64rem;
  /* ... other sizes */
}
```

### Typography Scale

Font sizes are defined in the CSS theme:

```css
@theme static {
  --font-size-base: 0.9375rem; /* Base font size */
  --font-size-lg: 1.0625rem;
  --font-size-xl: 1.1875rem;
  --font-size-2xl: 1.4375rem;
  /* ... other sizes */
}
```

## Component-Specific Adjustments

### Logo Size

The ACT logo size is responsive and can be adjusted in `app/pages/index.vue`:

```vue
<NuxtImg
  src="/images/logos/mitre-act-arrow-logo.svg"
  alt="MITRE ACT Logo"
  class="h-24 sm:h-32 lg:h-40"  <!-- Adjust these values -->
/>
```

### Mobile Optimizations

Mobile-specific spacing is handled separately:

```css
@media (max-width: 639px) {
  .py-24 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
  .py-16 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
}
```

## How Spacing Works

The site uses Nuxt UI Pro components which have default Tailwind classes. Our approach:

1. **Preserve the design system** - We override only padding/margin values
2. **Use CSS layers** - `@layer utilities` ensures our rules apply after component rendering
3. **Responsive breakpoints** - Different spacing for mobile (default), tablet (sm:), and desktop (lg:)
4. **Important flag** - Ensures overrides take precedence without breaking component structure

## Testing Changes

After making spacing adjustments:

1. Check all breakpoints (mobile: 375px, tablet: 768px, desktop: 1920px)
2. Verify dark/light mode transitions
3. Test with actual content to ensure readability
4. Review with stakeholders for industry-standard compliance

## Resources

- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Nuxt Color Mode](https://color-mode.nuxtjs.org)
