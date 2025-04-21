# ACT Project

## Overview
ACT is a Nuxt-based project built on Nuxt UI Pro's SaaS template. It provides a modern web application framework with an emphasis on UI components, content management, and responsive design.

## Project Structure
The project follows standard Nuxt conventions:
- `app/` - Core application code
  - `components/` - Vue components
  - `pages/` - File-based routing 
  - `layouts/` - Page layouts
  - `assets/` - Static assets like CSS
  - `types/` - TypeScript definitions
- `content/` - Content files (Markdown, YAML, etc.)
- `public/` - Public assets served at root level
- `server/` - Server-side logic
  
## Development
### Commands
- Build: `pnpm run build`
- Dev: `pnpm run dev`
- Generate: `pnpm run generate`
- Preview: `pnpm run preview`
- Lint: `pnpm run lint`
- Typecheck: `pnpm run typecheck`

### Tech Stack
- [Nuxt 3](https://nuxt.com) - Vue-based framework
- [Nuxt UI Pro](https://ui.nuxt.com/pro) - Premium UI components
- [Nuxt Content](https://content.nuxt.com) - Content management
- TypeScript - Type safety

## Dependencies
### Critical Pinned Versions
The following packages are pinned to specific versions for compatibility with Nuxt UI Pro SaaS template:
- `@nuxt/fonts`: 0.11.1
- `@nuxt/icon`: 1.12.0
- `@nuxt/ui`: 3.0.2
- `@nuxt/content`: (pinned to specific commit via URL)
- Resolutions:
  - `unimport`: 4.1.1
  - `vue-tsc`: 2.2.0

### Known Vulnerabilities
- **Resolved**: High severity vulnerability in image-size (fixed in nuxt-og-image 5.1.2)
- **Pending**: Moderate vulnerabilities in Vite (nested dependency through @nuxt/eslint)
  - These affect only development tools, not production builds
  - Plan to address in a future update after thorough testing

## Notes
- This project uses the Composition API with `<script setup lang="ts">` pattern
- The app is configured for static site generation by default
- Package manager: pnpm (10.7.0)