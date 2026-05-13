/**
 * markdown-it SmartScript Plugin
 * Build-time typography transformations for VitePress
 *
 * Transforms patterns at build time (zero client-side cost):
 * - (tm) or (TM) → <span class="ss-tm">™</span>
 * - (r) or (R) → <span class="ss-reg">®</span>
 * - (c) or (C) → ©
 */

import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'

export interface SmartScriptOptions {
  trademark?: boolean
  registered?: boolean
  copyright?: boolean
}

const TM_RE = /\(tm\)/gi
const REG_RE = /\(r\)/gi
const COPYRIGHT_RE = /\(c\)/gi

function transformText(text: string, options: SmartScriptOptions): string {
  let result = text

  if (options.trademark !== false) {
    result = result.replace(TM_RE, '<span class="ss-tm">™</span>')
  }

  if (options.registered !== false) {
    result = result.replace(REG_RE, '<span class="ss-reg">®</span>')
  }

  if (options.copyright !== false) {
    result = result.replace(COPYRIGHT_RE, '©')
  }

  return result
}

/**
 * Process inline tokens recursively
 */
function processInlineTokens(tokens: any[], options: SmartScriptOptions): void {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    // Process nested children
    if (token.children && token.children.length > 0) {
      processInlineTokens(token.children, options)
    }

    // Transform text tokens (but skip code_inline)
    if (token.type === 'text') {
      const transformed = transformText(token.content, options)

      if (transformed !== token.content) {
        // Replace text token with html_inline token to preserve transformations
        token.type = 'html_inline'
        token.content = transformed
      }
    }
  }
}

/**
 * markdown-it plugin
 */
export function markdownItSmartScript(md: MarkdownIt, options: SmartScriptOptions = {}): void {
  md.core.ruler.after('inline', 'smartscript', (state: StateCore) => {
    let inCodeBlock = false
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'fence' || token.type === 'code_block') {
        continue
      }

      if (token.type === 'inline' && token.children && !inCodeBlock) {
        processInlineTokens(token.children, options)
      }

      if (token.nesting === 1 && (token.tag === 'code' || token.tag === 'pre')) {
        inCodeBlock = true
      }
      else if (token.nesting === -1 && (token.tag === 'code' || token.tag === 'pre')) {
        inCodeBlock = false
      }
    }

    return true
  })
}
