// ACT Design System Layer Configuration
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // Layer metadata

  // Components auto-import
  $meta: {
    description: 'ACT™ Design System - Custom spacing, typography, and components for MITRE ACT applications',
    name: 'act-design-system',
    version: '1.0.0'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // CSS files for the design system
  css: [
    join(currentDir, './assets/css/design-system.css')
  ]
})
