// Nitro plugin to generate static files as directories with index.html
// This fixes the trailing slash issue for GitHub Pages
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('prerender:generate', async (route) => {
    // Skip if it's already index.html or the root
    if (route.fileName?.endsWith('index.html') || route.route === '/') {
      return
    }

    // Convert /path.html to /path/index.html
    if (route.fileName?.endsWith('.html')) {
      const baseName = route.fileName.slice(0, -5) // Remove .html
      route.fileName = `${baseName}/index.html`
    }
  })
})