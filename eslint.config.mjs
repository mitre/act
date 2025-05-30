// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).prepend({
  ignores: [
    '**/act-info/**',
    '**/logs/**',
    '**/backup/**',
    '**/project-docs/backups/**',
    '**/temp/**',
    '**/tmp/**',
    '**/.eslintignore'
  ]
})
