import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import { markdownItSmartScript } from './plugins/markdown-it-smartscript'

export default defineConfig({
  title: 'MITRE ACT',
  description: 'Adaptive Capabilities Testing - Risk-Based Security Assessment Framework',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://act.mitre.org',
  },

  markdown: {
    config: (md) => {
      md.use(markdownItSmartScript, {
        trademark: true,
        registered: true,
        copyright: true,
      })
    },
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./theme', import.meta.url)),
      },
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png' }],
    ['link', { rel: 'manifest', href: '/favicons/manifest.json' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'MITRE ACT' }],
    ['meta', { property: 'og:image', content: 'https://act.mitre.org/images/act-social-preview.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://act.mitre.org/images/act-social-preview.png' }],
    ['script', { src: 'https://cmp.osano.com/AzyhULTdPkqmy4aDN/61e442cb-3c14-4a28-b9ca-5c364a87187f/osano.js' }],
    ['style', {}, '.osano-cm-widget{display: none;}'],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'MITRE ACT',
      'url': 'https://act.mitre.org',
      'description': 'Adaptive Capabilities Testing - Risk-Based Security Assessment Framework',
      'publisher': {
        '@type': 'Organization',
        'name': 'The MITRE Corporation',
        'url': 'https://www.mitre.org',
      },
    })],
  ],

  themeConfig: {
    logo: '/images/logos/mitre-act-arrow-logo.svg',
    externalLinkIcon: true,
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
          },
        },
      },
    },

    notFound: {
      title: 'Page Not Found',
      quote: 'The page you\'re looking for doesn\'t exist or may have moved.',
      linkLabel: 'Return to the ACT homepage',
      linkText: 'Go Home',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Templates', link: '/templates' },
      { text: 'Blog', link: '/blog/' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
            { text: 'Why ACT Matters', link: '/getting-started/why-act-matters' },
            { text: 'How ACT Works', link: '/getting-started/how-act-works' },
            { text: 'ACT in Practice', link: '/getting-started/act-in-practice' },
          ],
        },
      ],
      '/handbook/': [
        {
          text: 'ACT Handbook',
          link: '/handbook/',
          items: [
            {
              text: 'Introduction',
              link: '/handbook/introduction/',
              collapsed: false,
              items: [
                { text: 'Handbook Purpose', link: '/handbook/introduction/handbook-purpose' },
                { text: 'How to Use', link: '/handbook/introduction/how-to-use' },
                { text: 'Framework Overview', link: '/handbook/introduction/framework-overview' },
              ],
            },
            {
              text: 'ACT Process',
              link: '/handbook/act-process/',
              collapsed: false,
              items: [
                { text: 'Phase 1: Planning', link: '/handbook/act-process/phase-1-planning' },
                { text: 'Phase 2: Assessment', link: '/handbook/act-process/phase-2-assessment' },
                { text: 'Phase 3: Reporting', link: '/handbook/act-process/phase-3-reporting' },
                { text: 'Process Improvement', link: '/handbook/act-process/process-improvement' },
              ],
            },
            { text: 'Attachments', link: '/handbook/attachments/' },
            {
              text: 'Reference',
              link: '/handbook/reference/',
              collapsed: true,
              items: [
                { text: 'Acronyms', link: '/handbook/reference/acronyms' },
                { text: 'Footnotes', link: '/handbook/reference/footnotes' },
              ],
            },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/mitre/act/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
    },

    outline: {
      level: 'deep',
      label: 'On this page',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mitre/act' },
    ],
  },
})
