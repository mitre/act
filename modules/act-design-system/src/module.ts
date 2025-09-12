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

    // 2. Properly merge app config using defu (module defaults, user overrides)
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

    // 3. Copy module content to main content directory
    nuxt.hook('ready', async () => {
      const { copyFile, mkdir } = await import('fs/promises')
      const { existsSync } = await import('fs')

      const moduleContentDir = resolveModule('../content')
      const targetContentDir = resolve(nuxt.options.rootDir, 'content/1.docs')

      try {
        // Ensure target directory exists
        if (!existsSync(`${targetContentDir}/8.design-system`)) {
          await mkdir(`${targetContentDir}/8.design-system`, { recursive: true })
        }

        // Copy module docs to main content
        if (existsSync(`${moduleContentDir}/8.design-system/1.overview.md`)) {
          await copyFile(
            `${moduleContentDir}/8.design-system/1.overview.md`,
            `${targetContentDir}/8.design-system/1.overview.md`
          )
        }

        if (existsSync(`${moduleContentDir}/8.design-system/2.customization.md`)) {
          await copyFile(
            `${moduleContentDir}/8.design-system/2.customization.md`,
            `${targetContentDir}/8.design-system/2.customization.md`
          )
        }

        console.log('📝 ACT Design System docs injected into content')
      } catch (error) {
        console.warn('⚠️ Failed to inject design system docs:', error)
      }
    })

    console.log('✅ ACT Design System module loaded')
  }
})
