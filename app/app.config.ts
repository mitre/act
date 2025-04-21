export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    radius: 'md', // Default border radius for all UI components
    // Add theme configuration required by @nuxt/ui-pro
    theme: {
      prose: {
        // Default: empty object
        // Configures base prose styles applied with the prose component
      },
      banner: {
        // Default: empty object
        // Configures banner component styles
      },
      footer: {
        // Default: empty object
        // Configures footer components styles
      }
    }
  }
})
