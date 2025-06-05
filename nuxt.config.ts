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
    '@nuxt/icon',
    'nuxt-github-pages'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // Nuxt Studio integration
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  ui: {},

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

  // Build optimizations
  vite: {
    build: {
      // Increase chunk size warning limit to 600KB (from default 500KB)
      chunkSizeWarningLimit: 600,
      // Disable CSS sourcemaps in production to avoid Tailwind warnings
      sourcemap: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    collections: ['lucide', 'simple-icons', 'heroicons', 'vscode-icons']
  },

  // Image configuration - maximum compatibility for Apple Silicon (M1/M2/M3)
  image: {
    // 'none' provider for maximum compatibility on Apple Silicon
    // This disables image optimization but ensures reliable operation
    provider: 'none',
    dir: 'public',

    // Even without optimization, we still define responsive breakpoints
    // for consistent image size references in NuxtImg/NuxtPicture components
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },

    // Force component registration with proper capitalization
    components: {
      nuxtImg: true,
      nuxtPicture: true
    }

    /*
    If you want to re-enable IPX in the future, replace with:

    provider: 'ipx',
    dir: 'public',
    sharp: {
      useSharper: false
    },
    formats: ['webp', 'png', 'jpeg', 'jpg'],
    quality: 80,
    cacheDir: '.nuxt/image-cache'
    */
  }
})
