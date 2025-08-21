// Enhanced Superscript Plugin for Nuxt 3 - TypeScript Version
// Handles superscript/subscript for trademarks, ordinals, chemical formulas, etc.
//
// Configuration Interface:
// The plugin provides runtime configuration through the $superscript interface:
//
// Usage in components:
//   const { $superscript } = useNuxtApp()
//
//   // Update positioning for different fonts
//   $superscript.updatePositioning({
//     trademark: { body: '-0.4em', headers: '-0.6em' },
//     registered: { body: '-0.2em', headers: '-0.4em' }
//   })
//
//   // Get current positioning values
//   const positioning = $superscript.getPositioning()
//
// The positioning values can be adjusted based on:
// - Font family changes
// - Font size changes
// - Line height changes
// - User preferences

interface SuperscriptConfig {
  symbols: {
    trademark: string[]
    registered: string[]
    copyright: string[]
    ordinals: boolean
  }
  selectors: {
    include: string[]
    exclude: string[]
  }
  performance: {
    debounce: number
    batchSize: number
    delay: number
  }
  positioning?: {
    trademark?: {
      body?: string // e.g., '-0.5em'
      headers?: string // e.g., '-0.7em'
      fontSize?: string // e.g., '0.8em'
    }
    registered?: {
      body?: string // e.g., '-0.25em'
      headers?: string // e.g., '-0.45em'
      fontSize?: string // e.g., '0.8em'
    }
    ordinals?: {
      fontSize?: string // e.g., '0.75em'
    }
    chemicals?: {
      fontSize?: string // e.g., '0.75em'
    }
  }
}

interface TextPart {
  type: 'text' | 'super' | 'sub'
  content: string
}

interface PatternSet {
  trademark: RegExp
  registered: RegExp
  copyright: RegExp
  ordinals: RegExp
  chemicals: RegExp
  mathSuper: RegExp
  mathSub: RegExp
}

export default defineNuxtPlugin((nuxtApp) => {
  // Configuration with adjustable positioning
  const config: SuperscriptConfig = {
    symbols: {
      trademark: ['™', '(TM)', 'TM'],
      registered: ['®', '(R)'],
      copyright: ['©', '(C)'],
      ordinals: true
    },
    selectors: {
      include: [
        'main',
        'article',
        '.content',
        '[role="main"]',
        '.prose',
        '.blog-post',
        '.blog-content',
        'section',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'header'
      ],
      exclude: [
        'pre',
        'code',
        'script',
        'style',
        '.no-superscript',
        '[data-no-superscript]'
      ]
    },
    performance: {
      debounce: 100,
      batchSize: 50,
      delay: 1500 // Increased delay to ensure hydration completes
    },
    positioning: {
      trademark: {
        body: '-0.5em',
        headers: '-0.7em',
        fontSize: '0.8em'
      },
      registered: {
        body: '-0.25em', // Adjusted for circle alignment
        headers: '-0.45em',
        fontSize: '0.8em'
      },
      ordinals: {
        fontSize: '0.75em'
      },
      chemicals: {
        fontSize: '0.75em'
      }
    }
  }

  // Regex patterns for matching
  const patterns: PatternSet = {
    trademark: /™|\(TM\)|(?<!\w)TM(?!\w)/g,
    registered: /®|\(R\)(?!\))/g,
    copyright: /©|\(C\)(?!\))/g,
    ordinals: /\b(\d+)(st|nd|rd|th)\b/g,
    chemicals: /([A-Z][a-z]?)(\d+)|\)(\d+)/g, // Matches H2, SO4, Ca3, and also )3, )2 for formulas with parentheses
    mathSuper: /\^(\d+|\{[^}]+\})/g,
    mathSub: /_(\d+|\{[^}]+\})/g
  }

  // Combined pattern for efficiency
  const combinedPattern = new RegExp(
    [
      patterns.trademark.source,
      patterns.registered.source,
      patterns.copyright.source,
      config.symbols.ordinals ? patterns.ordinals.source : null,
      patterns.chemicals.source,
      patterns.mathSuper.source,
      patterns.mathSub.source
    ].filter(Boolean).join('|'),
    'g'
  )

  /**
   * Process a text node and replace patterns with appropriate HTML elements
   */
  const processTextNode = (textNode: Text): boolean => {
    const text = textNode.textContent || ''

    // Quick check if processing is needed
    if (!combinedPattern.test(text)) return false

    // Reset regex state
    combinedPattern.lastIndex = 0

    // Build parts array
    const parts: TextPart[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = combinedPattern.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        })
      }

      // Process the matched text
      const matched = match[0]
      let processedContent = matched
      let scriptType: 'text' | 'super' | 'sub' = 'super'
      let skipFinalPush = false

      // Determine match type and handle accordingly
      if (/^(™|\(TM\)|TM)$/.test(matched)) {
        // Trademark - use Unicode character with sup wrapper for proper alignment
        processedContent = '™'
        scriptType = 'super' // Wrap in sup for consistent positioning
      } else if (/^(®|\(R\))$/.test(matched)) {
        // Registered - use Unicode character with sup wrapper for proper alignment
        processedContent = '®'
        scriptType = 'super' // Wrap in sup for consistent positioning
      } else if (/^(©|\(C\))$/.test(matched)) {
        // Copyright - NOT superscripted
        processedContent = '©'
        scriptType = 'text'
      } else if (/^\d+(st|nd|rd|th)$/.test(matched)) {
        // Ordinals (1st, 2nd, etc.)
        const ordinalMatch = matched.match(/^(\d+)(st|nd|rd|th)$/)
        if (ordinalMatch && ordinalMatch[1] && ordinalMatch[2]) {
          parts.push({
            type: 'text',
            content: ordinalMatch[1]
          })
          parts.push({
            type: 'super',
            content: ordinalMatch[2]
          })
          skipFinalPush = true
        }
      } else if (/^[A-Z][a-z]?\d+$/.test(matched) || /^\)\d+$/.test(matched)) {
        // Chemical formulas (H2, O4, Ca3, etc.) or parentheses with numbers )3, )2
        if (matched.startsWith(')')) {
          // Handle )3, )2 pattern for formulas with parentheses
          const parenMatch = matched.match(/^\)(\d+)$/)
          if (parenMatch && parenMatch[1]) {
            parts.push({
              type: 'text',
              content: ')'
            })
            parts.push({
              type: 'sub',
              content: parenMatch[1]
            })
            skipFinalPush = true
          }
        } else {
          // Handle regular element-number pattern
          const chemMatch = matched.match(/^([A-Z][a-z]?)(\d+)$/)
          if (chemMatch && chemMatch[1] && chemMatch[2]) {
            parts.push({
              type: 'text',
              content: chemMatch[1]
            })
            parts.push({
              type: 'sub',
              content: chemMatch[2]
            })
            skipFinalPush = true
          }
        }
      } else if (matched.startsWith('^')) {
        // Math superscript
        processedContent = matched.substring(1).replace(/[{}]/g, '')
        scriptType = 'super'
      } else if (matched.startsWith('_')) {
        // Math subscript
        processedContent = matched.substring(1).replace(/[{}]/g, '')
        scriptType = 'sub'
      }

      // Add processed part if not already handled
      if (!skipFinalPush) {
        parts.push({
          type: scriptType,
          content: processedContent
        })
      }

      lastIndex = match.index + matched.length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      })
    }

    // Only modify DOM if we found something to process
    if (parts.some(p => p.type === 'super' || p.type === 'sub')) {
      const fragment = document.createDocumentFragment()

      parts.forEach((part) => {
        if (part.type === 'super') {
          const sup = document.createElement('sup')
          sup.textContent = part.content

          // Add specific classes for different types
          // The CSS classes handle the positioning - no inline styles needed
          if (part.content === '™') {
            sup.className = 'auto-super trademark-symbol'
            sup.setAttribute('aria-label', 'trademark')
          } else if (part.content === '®') {
            sup.className = 'auto-super registered-symbol'
            sup.setAttribute('aria-label', 'registered')
          } else if (/^(st|nd|rd|th)$/.test(part.content)) {
            sup.className = 'auto-super ordinal-suffix'
            // Ordinal suffixes don't need "superscript" prefix
            sup.setAttribute('aria-label', part.content)
          } else {
            sup.className = 'auto-super'
            sup.setAttribute('aria-label', `superscript ${part.content}`)
          }
          fragment.appendChild(sup)
        } else if (part.type === 'sub') {
          const sub = document.createElement('sub')
          sub.textContent = part.content
          sub.className = 'auto-sub'
          // For chemical formulas, just the number is clearer
          if (/^\d+$/.test(part.content)) {
            sub.setAttribute('aria-label', part.content)
          } else {
            sub.setAttribute('aria-label', `subscript ${part.content}`)
          }
          fragment.appendChild(sub)
        } else {
          fragment.appendChild(document.createTextNode(part.content))
        }
      })

      textNode.parentNode?.replaceChild(fragment, textNode)
      return true
    }

    return false
  }

  /**
   * Process an HTML element and its text node children
   */
  const processElement = (element: Element): void => {
    // Skip if excluded
    if (config.selectors.exclude.some((selector) => {
      try {
        return element.matches(selector)
      } catch {
        return false
      }
    })) {
      return
    }

    // Skip if already processed
    if ((element as HTMLElement).dataset?.superscriptProcessed === 'true') return

    // Check for user overrides
    if ((element as HTMLElement).dataset?.noSuperscript !== undefined) return

    // Use TreeWalker for efficient traversal
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Node): number => {
          const parent = node.parentElement

          // Skip if parent is excluded
          if (parent) {
            const tagName = parent.tagName
            if (tagName === 'SUP'
              || tagName === 'SUB'
              || tagName === 'SCRIPT'
              || tagName === 'STYLE'
              || tagName === 'CODE'
              || tagName === 'PRE') {
              return NodeFilter.FILTER_REJECT
            }

            // Check for no-superscript data attribute
            if (parent.dataset?.noSuperscript !== undefined) {
              return NodeFilter.FILTER_REJECT
            }
          }

          // Check if contains any patterns
          const textContent = node.textContent || ''
          // Reset lastIndex before testing to avoid regex state issues
          combinedPattern.lastIndex = 0
          const hasMatch = combinedPattern.test(textContent)
          combinedPattern.lastIndex = 0 // Reset again for later use
          return hasMatch
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT
        }
      }
    )

    const nodesToProcess: Text[] = []
    let node = walker.nextNode()
    while (node) {
      nodesToProcess.push(node as Text)
      node = walker.nextNode()
    }

    // Process in batches for performance
    const batchSize = config.performance.batchSize
    for (let i = 0; i < nodesToProcess.length; i += batchSize) {
      const batch = nodesToProcess.slice(i, i + batchSize)
      batch.forEach(processTextNode)
    }

    // Mark as processed
    if (element instanceof HTMLElement) {
      element.dataset.superscriptProcessed = 'true'
    }
  }

  /**
   * Process all content areas on the page
   */
  const processContent = (): void => {
    if (!document.body) return

    // Build selector string
    const includeSelectors = config.selectors.include.join(', ')
    const elements = document.querySelectorAll(includeSelectors)

    elements.forEach(processElement)
  }

  // Debounced version for performance
  let debounceTimer: ReturnType<typeof setTimeout> | undefined
  const debouncedProcess = (): void => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(processContent, config.performance.debounce)
  }

  // Set up MutationObserver for dynamic content
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    const hasNewContent = mutations.some(mutation =>
      mutation.type === 'childList' && mutation.addedNodes.length > 0
    )

    if (hasNewContent) {
      debouncedProcess()
    }
  })

  // Initialize
  nuxtApp.hook('app:mounted', () => {
    // Use requestIdleCallback for better timing if available
    const startProcessing = () => {
      processContent()

      // Only start observing after initial processing
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    // Wait for browser to be idle after hydration
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setTimeout(startProcessing, 100) // Small additional delay
      }, { timeout: config.performance.delay })
    } else {
      // Fallback to setTimeout
      setTimeout(startProcessing, config.performance.delay)
    }
  })

  // Process on page changes - use multiple hooks to catch navigation
  nuxtApp.hook('page:finish', () => {
    // Reset all processing flags when navigating
    document.querySelectorAll('[data-superscript-processed]').forEach((el) => {
      if (el instanceof HTMLElement) {
        delete el.dataset.superscriptProcessed
      }
    })
    setTimeout(processContent, 100)
  })

  // Also hook into route changes as backup
  if (nuxtApp.$router && typeof nuxtApp.$router === 'object' && nuxtApp.$router !== null && 'afterEach' in nuxtApp.$router) {
    const router = nuxtApp.$router as { afterEach: (callback: () => void) => void }
    router.afterEach(() => {
      setTimeout(processContent, 150)
    })
  }

  // Cleanup on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      observer.disconnect()
      if (debounceTimer) clearTimeout(debounceTimer)
    })
  }

  // Provide utility functions for programmatic use
  nuxtApp.provide('superscript', {
    process: processContent,
    processElement,
    config,
    // Method to update positioning at runtime
    updatePositioning: (newPositioning: SuperscriptConfig['positioning']) => {
      if (newPositioning) {
        config.positioning = { ...config.positioning, ...newPositioning }
        // Reprocess all content with new settings
        document.querySelectorAll('[data-superscript-processed]').forEach((el) => {
          if (el instanceof HTMLElement) {
            delete el.dataset.superscriptProcessed
          }
        })
        processContent()
      }
    },
    // Method to get current positioning values
    getPositioning: () => config.positioning
  })
})
