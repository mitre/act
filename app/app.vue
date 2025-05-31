<script setup lang="ts">
import colors from 'tailwindcss/colors'

const appConfig = useAppConfig()
const colorMode = useColorMode()

// Type assertion for Tailwind colors - the object has mixed types (strings and color scales)
type TailwindColors = Record<string, string | Record<string, string>>
const color = computed(() => {
  if (colorMode.value === 'dark' && appConfig.ui?.colors?.neutral) {
    const neutralColor = (colors as TailwindColors)[appConfig.ui.colors.neutral]
    return typeof neutralColor === 'object' && '900' in neutralColor ? neutralColor['900'] : '#020617'
  }
  return 'white'
})
const radius = computed(() => `:root { --ui-radius: ${appConfig.theme?.radius ?? 0.375}rem; }`)
const blackAsPrimary = computed(() => appConfig.theme?.blackAsPrimary ? `:root { --ui-primary: black; } .dark { --ui-primary: white; }` : ':root {}')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  script: [
    {
      src: 'https://cmp.osano.com/AzyhULTdPkqmy4aDN/61e442cb-3c14-4a28-b9ca-5c364a87187f/osano.js',
      tagPriority: 1, // Ensure this loads first
      tagPosition: 'head'
    }
  ],
  style: [
    { innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimary, id: 'nuxt-ui-black-as-primary', tagPriority: -2 },
    { innerHTML: '.osano-cm-widget{display: none;}', tagPriority: 0 }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Nuxt UI Pro - SaaS template',
  ogImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterImage: 'https://saas-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

const links = [{
  label: 'Docs',
  icon: 'i-lucide-book',
  to: '/docs/getting-started'
}, {
  label: 'Pricing',
  icon: 'i-lucide-credit-card',
  to: '/pricing'
}, {
  label: 'Blog',
  icon: 'i-lucide-pencil',
  to: '/blog'
}]

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
