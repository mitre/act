# Color Theme Research for MITRE ACT Website

## Overview
This document captures research and implementation decisions for improving the color scheme of the MITRE ACT website, with a focus on creating softer, more readable colors in both light and dark modes.

## Research Findings

### Best Practices for Light Mode Colors (2024)
1. **Avoid pure black on white**: Pure black (#000) on white (#FFF) creates harsh contrast that can cause eye strain
2. **Use softer grays**: Colors like #1a1a1a, #2d3748, or #374151 are better alternatives for text
3. **Maintain WCAG compliance**: Ensure at least 4.5:1 contrast ratio for normal text
4. **Modern trends**: 2024 design trends favor softer, muted colors with balanced contrast

### Color Values Implemented

#### Light Mode
```css
:root {
  /* Softer text colors in light mode */
  --ui-text: rgb(55, 65, 81);        /* gray-700 - main text */
  --ui-text-muted: rgb(107, 114, 128); /* gray-500 - secondary text */
  --ui-text-dimmed: rgb(156, 163, 175); /* gray-400 - dimmed text */
}
```

#### Dark Mode
```css
.dark {
  /* Slightly softer dark background */
  --ui-bg: rgb(10, 10, 10);           /* Between neutral-950 and pure black */
  /* Optimized dark mode text colors */
  --ui-text: rgb(240, 240, 240);      /* Slightly softer than pure white */
  --ui-text-muted: var(--ui-color-neutral-400);
  --ui-text-dimmed: var(--ui-color-neutral-500);
}
```

### Background Effects
- Light mode: `bg-blue-500/5` - Very subtle blue glow
- Dark mode: `bg-blue-500/20` - More prominent blue glow

## Implementation in Nuxt UI

### Theme Configuration
Nuxt UI uses a semantic color system with CSS variables that can be customized:
- Text colors: `--ui-text`, `--ui-text-muted`, `--ui-text-dimmed`
- Background colors: `--ui-bg`, `--ui-bg-muted`, `--ui-bg-elevated`
- Border colors: `--ui-border`, `--ui-border-muted`

### Usage in Components
Instead of hardcoded Tailwind classes:
```vue
<!-- Don't do this -->
<h1 class="text-gray-900 dark:text-white">Title</h1>

<!-- Do this -->
<h1 class="text-(--ui-text)">Title</h1>
```

## Future Nuxt MITRE Theme Module

When developing the `nuxt-mitre-theme` module, consider:

1. **Preset color schemes**: 
   - Standard MITRE colors
   - High contrast mode for accessibility
   - Softer "comfort" mode based on this research

2. **Configuration options**:
   ```typescript
   export default defineNuxtConfig({
     mitre: {
       theme: {
         colors: {
           mode: 'comfort', // 'standard' | 'comfort' | 'high-contrast'
           customText: {
             light: 'rgb(55, 65, 81)',
             dark: 'rgb(240, 240, 240)'
           }
         }
       }
     }
   })
   ```

3. **Accessibility features**:
   - Automatic WCAG contrast checking
   - Color blindness simulation tools
   - Theme switcher with persistence

## References
- WebAIM Contrast Guidelines: https://webaim.org/articles/contrast/
- Material Design Color System: https://m2.material.io/design/color/the-color-system.html
- Nuxt UI Theme Documentation: https://ui.nuxt.com/getting-started/theme