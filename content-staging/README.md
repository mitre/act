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

## Restoration Instructions

When ready to publish this content:
```bash
# From project root
mv content-staging/act-handbook content/1.docs/2.act-handbook
mv content-staging/development content/1.docs/3.development
```

The numeric prefixes (2. and 3.) control the navigation order in the docs sidebar.