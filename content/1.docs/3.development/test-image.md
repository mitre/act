---
title: "Image Loading in Nuxt Content"
description: "Best practices for including images in Nuxt Content markdown files"
---

# Image Loading in Nuxt Content

This guide demonstrates the correct way to include images in Nuxt Content markdown files, especially when dealing with complex filenames.

## Best Practice: Use Clean Filenames

The most reliable approach is to use properly named image files without spaces:

<img src="/images/act-handbook/mitre-logo.png" alt="MITRE Logo" />

## Why This Works

1. Filenames without spaces don't require URL encoding
2. Clean filenames work consistently across all rendering methods
3. This follows web development best practices
4. Less prone to issues with different modules and platforms

## Examples

### Approach 1: Best Practice (Recommended)

```md
![MITRE Logo](/images/act-handbook/mitre-logo.png)
```

### Approach 2: Alternative with HTML

```html
<img src="/images/act-handbook/mitre-logo.png" alt="MITRE Logo" />
```

## Additional Styling

You can add CSS classes to control image display:

<div class="flex justify-center my-6">
  <img src="/images/act-handbook/mitre-act-logo.svg" alt="MITRE ACT Logo" class="h-32" />
</div>

## SVG Images

SVG images work particularly well with this approach:

<img src="/images/act-handbook/mitre-act-logo.svg" alt="MITRE ACT Logo" class="w-64" />

## File Naming Best Practices

1. Use lowercase letters for all filenames
2. Replace spaces with hyphens (`-`)
3. Keep filenames descriptive but concise
4. Use standard file extensions (`.png`, `.jpg`, `.svg`)
5. Avoid special characters and underscores

By following these practices, images will display correctly in your Nuxt Content pages.