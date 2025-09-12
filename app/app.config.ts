export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    // Configure container spacing
    container: {
      base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-5 lg:px-6'
    },
    // Configure page components for much tighter spacing
    page: {
      wrapper: 'min-h-screen flex flex-col'
    },
    pageBody: {
      wrapper: 'flex-1 flex flex-col',
      base: 'flex-1 py-4 px-4 sm:px-6 lg:px-8'
    },
    pageSection: {
      wrapper: 'py-6 sm:py-8 lg:py-10'
    },
    pageHero: {
      wrapper: 'relative py-8 sm:py-10 lg:py-12'
    },
    pageGrid: {
      wrapper: 'grid gap-4 sm:gap-6'
    },
    pageCard: {
      base: 'p-4 sm:p-5'
    },
    // Tighter prose typography
    prose: {
      base: 'prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h3:text-xl prose-h3:font-semibold prose-h4:text-lg prose-h4:font-semibold prose-p:leading-relaxed prose-li:leading-relaxed'
    }
  },
  theme: {
    radius: 0.375, // Default border radius (0.375rem = 6px)
    blackAsPrimary: false
  }
})
