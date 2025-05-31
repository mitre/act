# Content Staging Directory

This directory contains content that is temporarily removed from the public documentation site.

## Staged Content

### ACT Handbook (`/act-handbook/`)
- Complete ACT handbook documentation
- Includes introduction, process descriptions, attachments, and reference materials
- To restore: Move `act-handbook` folder to `/content/1.docs/2.act-handbook/`

### Development Documentation (`/development/`)
- Developer guides and technical documentation
- Includes content components, markdown guides, Nuxt configuration docs
- To restore: Move `development` folder to `/content/1.docs/3.development/`

### Example Blog Posts (`/blog/`)
- Sample blog posts from the Nuxt UI Pro template
- Includes articles about various topics (asian cuisine, pyrenees, james webb, etc.)
- To restore: Move individual `.md` files to `/content/3.blog/`

## Restoration Instructions

When ready to publish this content:
```bash
# From project root
mv content-staging/act-handbook content/1.docs/2.act-handbook
mv content-staging/development content/1.docs/3.development
mv content-staging/blog/*.md content/3.blog/
```

The numeric prefixes control the navigation order in their respective sections.