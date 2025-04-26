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

  // Image processing configuration - for Apple Silicon compatibility
  image: {
    // Simplified configuration for better compatibility
    // We found that the 'none' provider works most reliably on Apple Silicon
    provider: 'none',
    dir: 'public'
    
    // Note: If IPX image processing is desired, the following configuration can be tried:
    // To enable IPX instead of 'none', comment out the lines above and uncomment the below
    // This is more likely to work on Intel Macs or after performing the Sharp setup in DEVELOPMENT.md
    /*
    provider: 'ipx',
    dir: 'public',
    formats: ['webp', 'png', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768, 
      lg: 1024,
      xl: 1280
    }
    */
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