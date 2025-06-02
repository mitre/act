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
    { key: 'theme-color', name: 'theme-color', content: color },
    // Apple Touch Icon for iOS devices
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    // Apple Touch Icons
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicons/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicons/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/apple-icon-57x57.png' }
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
  titleTemplate: '%s - MITRE ACT',
  description: 'MITRE ACT Framework - A structured approach to cybersecurity risk assessment and authorization',

  // Open Graph
  ogTitle: 'MITRE ACT - Cybersecurity Assessment Framework',
  ogDescription: 'A structured approach to cybersecurity risk assessment and authorization for federal systems',
  ogImage: 'https://act.mitre.org/images/act-social-preview.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'MITRE ACT - Assessment Collaboration Toolkit',
  ogSiteName: 'MITRE ACT',
  ogType: 'website',

  // Twitter
  twitterTitle: 'MITRE ACT - Cybersecurity Assessment Framework',
  twitterDescription: 'A structured approach to cybersecurity risk assessment and authorization',
  twitterImage: 'https://act.mitre.org/images/act-social-preview.png',
  twitterCard: 'summary_large_image',

  // iOS specific
  appleMobileWebAppTitle: 'MITRE ACT'
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
