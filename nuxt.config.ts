// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Build optimizations
  vite: {
    build: {
      // Increase chunk size warning limit to 600KB (from default 500KB)
      chunkSizeWarningLimit: 600,
      // Disable CSS sourcemaps in production to avoid Tailwind warnings
      sourcemap: false
    }
  },

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
    },
    hooks: {
      'prerender:done': async () => {
        // Import fs dynamically
        const { promises: fs } = await import('fs')
        const { join, dirname, resolve } = await import('path')

        // The output directory is .output/public after prerendering
        const publicDir = resolve('.output/public')

        async function processDirectory(dir: string) {
          const entries = await fs.readdir(dir, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = join(dir, entry.name)

            if (entry.isDirectory()) {
              // Recursively process subdirectories
              await processDirectory(fullPath)
            } else if (entry.isFile() && entry.name === 'index.html') {
              // Found an index.html file
              const relativePath = fullPath.replace(publicDir + '/', '')
              const dirPath = dirname(relativePath)

              // Skip root index.html
              if (dirPath === '.') continue

              // Create duplicate at parent level
              const duplicatePath = join(publicDir, `${dirPath}.html`)

              try {
                await fs.copyFile(fullPath, duplicatePath)
                console.log(`✓ Created duplicate: ${dirPath}.html`)
              } catch (error) {
                console.error(`Failed to create duplicate for ${relativePath}:`, error)
              }
            }
          }
        }

        console.log('Creating duplicate HTML files for GitHub Pages...')
        await processDirectory(publicDir)
        console.log('✓ Duplicate file creation complete')
      }
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
