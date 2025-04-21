# ACT Handbook - Nuxt Content Structure Plan

## Content Organization

Based on the handbook's structure, I recommend organizing the content as follows:

### Directory Structure
```
content/
  1.docs/
    2.act-handbook/
      1.introduction/
        1.index.md                  # Introduction overview
        2.handbook-purpose.md       # 1.1 Handbook Purpose
        3.how-to-use.md             # 1.2 How to Use This Handbook
        4.framework-overview.md     # 1.3 Overview of ACT Framework and Methodology
      2.act-process/
        1.index.md                  # ACT Process overview
        2.phase-1-planning.md       # 2.1 Phase 1: Planning
        3.phase-2-assessment.md     # 2.2 Phase 2: Assessment
        4.phase-3-reporting.md      # 2.3 Phase 3: Reporting
        5.process-improvement.md    # 2.4 Process Improvement Follow-Up
      3.attachments/
        1.index.md                  # Attachments overview
      4.reference/
        1.index.md                  # Reference overview
        2.acronyms.md               # 4. Acronyms
        3.footnotes.md              # Footnotes
      _navigation.yml               # Navigation configuration for the handbook
```

### Navigation Structure
The `_navigation.yml` file would look something like:

```yaml
title: 'ACT Handbook'
icon: 'heroicons:book-open'
items:
  - title: 'Introduction'
    to: '/docs/act-handbook/introduction'
    children:
      - title: 'Handbook Purpose'
        to: '/docs/act-handbook/introduction/handbook-purpose'
      - title: 'How to Use This Handbook'
        to: '/docs/act-handbook/introduction/how-to-use'
      - title: 'Framework Overview'
        to: '/docs/act-handbook/introduction/framework-overview'
  - title: 'ACT Process'
    to: '/docs/act-handbook/act-process'
    children:
      - title: 'Phase 1: Planning'
        to: '/docs/act-handbook/act-process/phase-1-planning'
      - title: 'Phase 2: Assessment'
        to: '/docs/act-handbook/act-process/phase-2-assessment'
      - title: 'Phase 3: Reporting' 
        to: '/docs/act-handbook/act-process/phase-3-reporting'
      - title: 'Process Improvement'
        to: '/docs/act-handbook/act-process/process-improvement'
  - title: 'Attachments'
    to: '/docs/act-handbook/attachments'
  - title: 'Reference'
    to: '/docs/act-handbook/reference'
    children:
      - title: 'Acronyms'
        to: '/docs/act-handbook/reference/acronyms'
      - title: 'Footnotes'
        to: '/docs/act-handbook/reference/footnotes'
```

## Implementation Steps

1. Create the directory structure
2. Extract each section of the handbook into its own markdown file
3. Process images - copy them to public/images/act-handbook/
4. Update image references in the markdown files
5. Create the navigation file
6. Test in the Nuxt development server

## Special Considerations

- The handbook contains images that need to be properly referenced
- There are tables that need to be preserved in markdown format
- Footnotes need to be maintained or converted to endnotes
- Cross-references between sections need to be updated to work with the new structure