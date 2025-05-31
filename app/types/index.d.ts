import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & Link)[]
}

export interface PageSection {
  title: string
  description: string
  id?: string
  orientation?: 'vertical' | 'horizontal'
  reverse?: boolean
  features?: ({
    name: string
    description: string
    icon: string
  } | {
    title: string
    description: string
    icon: string
  })[]
  image?: {
    src: string
    alt: string
  }
  links?: Link[]
}

// Osano consent manager types
interface OsanoConsentManager {
  showDrawer: (type: string) => void
}

interface Osano {
  cm: OsanoConsentManager
}

declare global {
  interface Window {
    Osano?: Osano
  }
}
