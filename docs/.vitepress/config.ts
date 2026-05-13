import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import { markdownItSmartScript } from './plugins/markdown-it-smartscript'

export default defineConfig({
  title: 'MITRE ACT',
  description: 'Adaptive Capabilities Testing - Risk-Based Security Assessment Framework',
  cleanUrls: true,

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
    // Osano cookie consent (required by MITRE Privacy - must be first script)
    ['script', { src: 'https://cmp.osano.com/AzyhULTdPkqmy4aDN/61e442cb-3c14-4a28-b9ca-5c364a87187f/osano.js' }],
    // Hide Osano's default widget (we trigger via footer link instead)
    ['style', {}, '.osano-cm-widget{display: none;}'],
  ],

  themeConfig: {
    logo: '/images/logos/mitre-act-arrow-logo.svg',

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Templates', link: '/templates' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
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
              items: [
                { text: 'Handbook Purpose', link: '/handbook/introduction/handbook-purpose' },
                { text: 'How to Use', link: '/handbook/introduction/how-to-use' },
                { text: 'Framework Overview', link: '/handbook/introduction/framework-overview' },
              ],
            },
            {
              text: 'ACT Process',
              link: '/handbook/act-process/',
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
              items: [
                { text: 'Acronyms', link: '/handbook/reference/acronyms' },
                { text: 'Footnotes', link: '/handbook/reference/footnotes' },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mitre/act' },
    ],
  },
})
