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
- Build: `npm run build`
- Dev: `npm run dev`
- Generate: `npm run generate`
- Preview: `npm run preview`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

### Tech Stack
- [Nuxt 3](https://nuxt.com) - Vue-based framework
- [Nuxt UI Pro](https://ui.nuxt.com/pro) - Premium UI components
- [Nuxt Content](https://content.nuxt.com) - Content management
- TypeScript - Type safety

## Notes
- This project uses the Composition API with `<script setup lang="ts">` pattern
- The app is configured for static site generation by default