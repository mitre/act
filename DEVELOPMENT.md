# ACT Website Development Guide

This guide provides comprehensive instructions for setting up your development environment and contributing to the MITRE ACT website project. It covers platform-specific requirements, common issues, and best practices for development.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
  - [Windows Setup](#windows-setup)
  - [macOS Setup (Intel)](#macos-setup-intel)
  - [macOS Setup (Apple Silicon)](#macos-setup-apple-silicon)
  - [Linux Setup](#linux-setup)
- [Project Setup](#project-setup)
- [Development Workflow](#development-workflow)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Code Style and Guidelines](#code-style-and-guidelines)
- [Content Management](#content-management)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing Guidelines](#contributing-guidelines)

## Prerequisites

Before you begin, ensure you have:

- **Git**: For version control
- **Node.js**: Version 18.x or higher
- **pnpm**: Version 10.x or higher
- **Text Editor/IDE**: Visual Studio Code is recommended with the following extensions:
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## Environment Setup

### Windows Setup

1. **Install Node.js**:

   - Download and install from [nodejs.org](https://nodejs.org/)
   - Select the LTS version (18.x or newer)
   - Ensure Node.js is added to your PATH

2. **Install Git**:

   - Download and install from [git-scm.com](https://git-scm.com/download/win)
   - Use default settings during installation

3. **Install pnpm**:

   - Open PowerShell as Administrator and run:
     ```powershell
     iwr https://get.pnpm.io/install.ps1 -useb | iex
     ```
   - Close and reopen PowerShell
   - Verify installation: `pnpm --version`

4. **Configure Git**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### macOS Setup (Intel)

1. **Install Homebrew**:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js and Git**:

   ```bash
   brew install node@18 git
   ```

3. **Install pnpm**:
   ```bash
   brew install pnpm
   ```
4. **Configure Git**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### macOS Setup (Apple Silicon)

Apple Silicon Macs (M1/M2/M3) have specific considerations, particularly for native modules like Sharp.

1. **Install Homebrew**:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   - Follow the instructions to add Homebrew to your PATH

2. **Install Node.js**:

   ```bash
   brew install node@18
   ```

3. **Install pnpm**:

   ```bash
   brew install pnpm
   ```

4. **Configure Git**:

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

5. **Apple Silicon Specific Note**:
   - The project uses the `none` provider for images to avoid Sharp/IPX compatibility issues on Apple Silicon
   - If you encounter any issues with native modules, ensure Rosetta 2 is installed:
     ```bash
     softwareupdate --install-rosetta
     ```

### Linux Setup

1. **Install Node.js** (example for Ubuntu/Debian):

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

   For other distributions, see [nodejs.org](https://nodejs.org/en/download/package-manager/)

2. **Install Git**:

   ```bash
   sudo apt-get install git
   ```

3. **Install pnpm**:
   ```bash
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```
   - Close and reopen your terminal
   - Verify installation: `pnpm --version`
4. **Configure Git**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Project Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mitre/act.git
   cd act
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

   Note: The project includes a pre-configured `.npmrc` file with proper settings for native modules like `sharp`, `better-sqlite3`, and `@parcel/watcher`. This ensures compatibility across different platforms. If you encounter dependency errors, see the [Common Issues](#common-issues-and-solutions) section.

3. **Create logs directory** (for development logging):

   ```bash
   pnpm run logs:dir
   ```

4. **Start the development server**:

   ```bash
   pnpm run dev
   ```

   - Access the site at: http://localhost:3000

   If you encounter errors related to missing modules or incompatible native modules, try:

   ```bash
   # Clear cache and restart
   pnpm run dev:clean

   # Or with logging for troubleshooting
   pnpm run dev:clean-log
   ```

## Development Workflow

### Key Commands

| Command                  | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `pnpm run dev`           | Start development server                         |
| `pnpm run dev:log`       | Start with logging enabled                       |
| `pnpm run dev:clean`     | Start with clean cache (clears Nuxt cache first) |
| `pnpm run dev:clean-log` | Start with clean cache and logging enabled       |
| `pnpm run build`         | Build for production                             |
| `pnpm run generate`      | Generate static site                             |
| `pnpm run preview`       | Preview production build                         |
| `pnpm run lint`          | Run ESLint                                       |
| `pnpm run typecheck`     | Run TypeScript type checking                     |

### Branch Management

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a pull request** through GitHub interface

### Recommended Development Process

1. **Update dependencies**:

   ```bash
   git pull origin main
   pnpm install
   ```

2. **Check existing issues** or create a new one describing the feature/fix

3. **Create a feature branch** from main

4. **Implement your changes**:

   - Follow code style guidelines
   - Add necessary tests
   - Update documentation as needed

5. **Test your changes**:

   ```bash
   pnpm run lint
   pnpm run typecheck
   pnpm run build
   ```

6. **Create pull request** with a clear description of your changes

## Common Issues and Solutions

### Sourcemap Warning During Build

You may see this warning during build:

```
[warn] [plugin @tailwindcss/vite:generate:build] Sourcemap is likely to be incorrect: a plugin (@tailwindcss/vite:generate:build) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help
```

**What's happening**: TailwindCSS v4.0.17 with Vite doesn't generate proper sourcemaps for CSS transformations. This is a known issue with Tailwind CSS v4 when used with Vite and Nuxt.

**Impact**: This is just a warning and doesn't affect the functionality of your application. The main impact is that developer tools may not show accurate line numbers for CSS in development.

**Status**: This issue is being tracked by the Tailwind CSS team and will be resolved in future updates.

**Workaround**: This warning can be safely ignored as it doesn't impact functionality.

### Image Handling

Images with spaces in filenames don't display properly in Nuxt Content. Always:

1. Use lowercase filenames
2. Replace spaces with hyphens
3. Avoid special characters
4. Use standard file extensions

Example:

```
❌ Bad: My Image File.JPG
✅ Good: my-image-file.jpg
```

### Apple Silicon Issues

The Sharp image processing library can cause issues on Apple Silicon Macs. This project uses:

```js
// In nuxt.config.ts
image: {
  provider: 'none',
  dir: 'public'
}
```

#### Detailed Sharp/IPX Configuration for Apple Silicon

If you need to use Sharp or IPX for specific image processing tasks:

1. **Install Rosetta 2** (required for some native modules):

   ```bash
   softwareupdate --install-rosetta
   ```

2. **Install vips** (required for Sharp):

   ```bash
   brew install vips
   ```

3. **Configure pnpm for native modules**:
   Add the following to your `.npmrc` file in the project root or globally:

   ```
   # Allow binary builds for specific packages
   public-hoist-pattern[]=*sharp*
   shamefully-hoist=true
   ```

4. **Reinstall Sharp with specific flags**:

   ```bash
   SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm add -D sharp
   ```

5. **Alternative IPX Configuration**:
   If you need IPX with image optimization, modify `nuxt.config.ts`:
   ```js
   image: {
     provider: 'ipx',
     ipx: {
       // Use node-canvas fallback instead of Sharp
       sharp: false
     }
   }
   ```

Common error messages on Apple Silicon and their solutions:

```
Error: Cannot find module '../build/Release/sharp-darwin-arm64v8.node'
```

- Solution: Follow the steps above to properly install Sharp with vips support

```
No match found for location with path "/_ipx/_/images/..."
```

- Solution: Use the 'none' provider or configure ipx without Sharp as shown above

### Node.js Version Conflicts

If you work on multiple Node.js projects, consider using NVM (Node Version Manager):

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Install and use Node.js 22
nvm install 22
nvm use 22
```

### Dependency Issues

#### Native Modules in pnpm

This project uses several packages with native dependencies that require special handling in pnpm:

- `sharp` - Image processing
- `better-sqlite3` - SQLite database
- `@parcel/watcher` - File system watching

The required configuration is already included in the provided `.npmrc` file in the repository:

```
# Allow proper handling of native module dependencies
shamefully-hoist=true

# Specific package hoisting patterns for native modules
public-hoist-pattern[]=*sharp*
public-hoist-pattern[]=*better-sqlite3*
public-hoist-pattern[]=*parcel*
public-hoist-pattern[]=*vue*

# Ensure these built dependencies are handled correctly
only-built-dependencies=@parcel/watcher,better-sqlite3,sharp,unrs-resolver,vue-demi
```

This configuration helps ensure compatibility across different platforms, including Apple Silicon Macs.

If you encounter dependency errors or "Cannot find module" errors:

```bash
# Clean caches
pnpm store prune

# Remove node_modules
rm -rf node_modules

# Verify .npmrc exists and has correct contents
cat .npmrc

# Reinstall dependencies
pnpm install

# Start with clean cache
pnpm run dev --clean-cache
```

#### Specific Errors and Solutions

1. **Missing dependencies errors**:

   ```
   Cannot find module '@parcel/watcher'
   ```

   - Solution: Ensure `.npmrc` has the correct hoisting patterns

2. **Binary incompatibility errors**:

   ```
   Error: The module was compiled against a different Node.js version
   ```

   - Solution: Rebuild the binary modules:
     ```bash
     pnpm rebuild
     ```

3. **Nuxt cache issues**:
   ```
   [nuxt] [request error] [unhandled] [500] Cannot find module '...'
   ```
   - Solution: Clear the Nuxt cache:
     ```bash
     pnpm run dev --clean-cache
     ```

## Code Style and Guidelines

### Vue Components

- Use Composition API with `<script setup lang="ts">` blocks
- Keep components focused on a single responsibility
- Use TypeScript for all component props and return values
- Format component structure consistently:

  ```vue
  <script setup lang="ts">
  // Imports
  // Props/emits
  // Composables (ref, computed, etc.)
  // Function declarations
  // Lifecycle hooks
  // Watchers
  </script>

  <template>
    <!-- Template content -->
  </template>
  ```

### TypeScript

- Define types for all props, emits, and function parameters
- Use interface for object types
- Use type for union types
- Avoid `any` - use `unknown` if type is indeterminate

### CSS/Styling

- Use Tailwind CSS classes for styling
- Place custom CSS in `app/assets/css/main.css`
- For complex components, consider scoped styles

## Content Management

The ACT website uses Nuxt Content for content management. Content files are located in the `content/` directory.

### Image Usage in Content

The project uses the `'none'` provider for the most reliable image handling across platforms. Use these approaches for images:

#### Best Practices for Images

1. **In Vue Components:**

   ```vue
   <!-- Basic usage with NuxtImg -->
   <NuxtImg
     src="/images/act-handbook/example.png"
     alt="Descriptive Text"
     class="max-w-full"
   />

   <!-- Responsive images with NuxtPicture -->
   <NuxtPicture
     src="/images/act-handbook/example.png"
     alt="Descriptive Text"
     class="max-w-full"
   />
   ```

2. **In Markdown Content:**

   ```md
   <!-- Standard markdown syntax -->

   ![Descriptive Text](/images/act-handbook/example.png)

   <!-- With MDC for more control -->

   ::div{class="flex justify-center my-6"}
   <NuxtImg 
       src="/images/act-handbook/example.png" 
       alt="Descriptive Text" 
       class="max-w-full"
     />
   ::
   ```

3. **Performance Optimizations:**
   - Use `loading="lazy"` for images below the fold
   - Set appropriate `width` and `height` attributes to avoid layout shifts
   - Use the `sizes` attribute for responsive images

See [Nuxt Image Testing](/docs/development/test-nuxt-image) for comprehensive examples and tests.

### Content Structure

- `content/0.index.yml` - Homepage content
- `content/1.docs/` - Documentation
  - `1.getting-started/` - Getting started guides
  - `2.act-handbook/` - ACT Handbook content
  - `3.development/` - Developer documentation
- `content/3.blog/` - Blog posts and case studies

### Creating New Content

1. **Create a new markdown file** in the appropriate directory
2. **Add frontmatter** for metadata:
   ```yaml
   ---
   title: Your Title
   description: Brief description
   image:
     src: /images/your-image.jpg
   ---
   ```
3. **Add content** using Markdown with MDC components

### Nuxt Content MDC Components

Use these MDC components in your markdown:

- `::callout` with `icon`, `color` and optional `to` properties
- `::card` and `::card-group` for content organization
- `::accordion` with `::accordion-item{label="..."}` for collapsible content
- `::steps{level="3"}` with appropriate heading levels for step guides
- `::div{class="..."}` for custom styling and layout
- Shorthand formats: `::tip`, `::note`, `::warning`

Example:

```md
::callout{icon="i-heroicons-information-circle" color="blue"}
This is important information.
::

::card-group
::card{title="Card Title" icon="i-heroicons-document-text"}
Card content goes here.
::
::
```

## Testing

### Manual Testing

Before submitting a pull request:

1. Test across multiple browsers (Chrome, Firefox, Safari)
2. Test responsive layout (mobile, tablet, desktop)
3. Verify all links and navigation work correctly
4. Check that images load properly
5. Ensure accessibility features work as expected

### Type Checking

Run TypeScript type checking:

```bash
pnpm run typecheck
```

### Linting

Run ESLint to check code quality:

```bash
pnpm run lint
```

## Deployment

### Static Site Generation (Recommended)

1. **Generate the static site**:

   ```bash
   pnpm run generate
   ```

2. **Preview the generated site**:

   ```bash
   pnpm run preview
   ```

3. **Deploy the generated content** from `.output/public/` to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

### Node.js Server Deployment

1. **Build the application**:

   ```bash
   pnpm run build
   ```

2. **Deploy the `.output` directory** to a Node.js hosting service

## Contributing Guidelines

1. **Follow the code style** and guidelines outlined in this document
2. **Comment your code** when complexity demands it
3. **Write meaningful commit messages** explaining why a change was made
4. **Update documentation** when adding or changing features
5. **Address code review feedback** promptly
6. **Be respectful** of other contributors

### Pull Request Process

1. Ensure your code passes all linting and type checks
2. Link your PR to relevant issues
3. Request review from appropriate team members
4. Address all code review comments
5. Wait for approval before merging

Thank you for contributing to the MITRE ACT project!
