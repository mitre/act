// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/fonts',
    '@nuxt/icon'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  ui: {
    global: true,
    icons: ['lucide', 'simple-icons', 'heroicons', 'vscode-icons'],
  },

  // Nuxt Studio integration
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  // Image processing configuration - using a simpler approach
  image: {
    // Disable image optimization for now to avoid Sharp/IPX issues
    // This will cause all images to be served directly from their source
    provider: 'none',
    dir: 'public'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})