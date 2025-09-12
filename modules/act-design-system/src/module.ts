import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { resolve } from 'path'
import { defu } from 'defu'

export interface ModuleOptions {
  /**
   * Enable the ACT Design System
   * @default true
   */
  enabled?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mitre/act-design-system',
    version: '1.0.0',
    configKey: 'actDesignSystem',
    compatibility: {
      nuxt: '^4.0.0'
    }
  },
  defaults: {
    enabled: true
  },
  setup(options, nuxt) {
    if (!options.enabled) return

    const { resolve: resolveModule } = createResolver(import.meta.url)

    // 1. Add CSS files
    nuxt.options.css.push(resolveModule('../assets/css/design-system.css'))

    // 2. Set app config defaults using defu
    nuxt.options.appConfig = defu(nuxt.options.appConfig, {
      ui: {
        colors: {
          primary: 'blue',
          neutral: 'slate'
        }
      },
      theme: {
        radius: 0.375,
        blackAsPrimary: false
      }
    })

    // 3. Dynamically copy all module content to main content directory
    nuxt.hook('ready', async () => {
      const { readdir, copyFile, mkdir, stat } = await import('fs/promises')
      const { existsSync } = await import('fs')
      const { join } = await import('path')

      const moduleContentDir = resolveModule('../content')
      const targetContentDir = resolve(nuxt.options.rootDir, 'content/1.docs')

      try {
        // Recursively copy all content from module
        async function copyDir(src: string, dest: string) {
          if (!existsSync(src)) return

          await mkdir(dest, { recursive: true })
          const entries = await readdir(src)

          for (const entry of entries) {
            const srcPath = join(src, entry)
            const destPath = join(dest, entry)
            const stats = await stat(srcPath)

            if (stats.isDirectory()) {
              await copyDir(srcPath, destPath)
            } else if (entry.endsWith('.md') || entry.endsWith('.yml')) {
              await copyFile(srcPath, destPath)
            }
          }
        }

        await copyDir(moduleContentDir, targetContentDir)
        console.log('📝 ACT Design System docs injected dynamically')
      } catch (error) {
        console.warn('⚠️ Failed to inject design system docs:', error)
      }
    })

    console.log('✅ ACT Design System module loaded')
  }
})
