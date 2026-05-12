import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    'docs/.vitepress/dist/**',
    'docs/.vitepress/cache/**',
    'act-info/**',
    'project-docs/**',
    'logs/**',
    'temp/**',
    'tmp/**'
  ]
})
