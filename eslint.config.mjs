import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  ignores: [
    'docs/.vitepress/dist/**',
    'docs/.vitepress/cache/**',
    'docs/public/**',
    'public/**',
    'act-info/**',
    'project-docs/**',
    'logs/**',
    'temp/**',
    'tmp/**',
    'tempwebsite/**',
    'scripts/**',
    '.devcontainer/**',
    '.github/**',
    '**/*.md',
    'pnpm-workspace.yaml',
    '.playwright-mcp/**',
  ],
})
