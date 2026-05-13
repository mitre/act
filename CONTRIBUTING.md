# Contributing to MITRE ACT

Thank you for your interest in contributing to the MITRE ACT website. This document provides guidelines for contributing.

## How to Contribute

### Reporting Issues

- Use [GitHub Issues](https://github.com/mitre/act/issues) to report bugs or suggest improvements
- For security vulnerabilities, see [SECURITY.md](SECURITY.md)

### Suggesting Content Changes

- Open an issue describing the proposed change and why it's needed
- For small typo fixes, a pull request is fine without an issue

### Submitting Pull Requests

1. Fork the repository and create a feature branch from `main`
2. Make your changes following the guidelines below
3. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm build`
4. Submit a pull request with a clear description of the changes

### Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

## Content Guidelines

### Writing Style

- Write in clear, professional English
- Use active voice where possible
- Avoid jargon without explanation
- Use consistent terminology (refer to existing content for established terms)

### Markdown Conventions

- Every page needs frontmatter with `title` and `description`
- Use heading levels in order (don't skip from h2 to h4)
- One h1 per page (from the frontmatter title or first heading)
- Use VitePress containers (`::: info`, `::: tip`, `::: warning`) for callouts
- Use `(tm)` for trademark symbols in body text; use `™` in frontmatter

### File Naming

- Lowercase with hyphens: `phase-1-planning.md`
- No spaces, no uppercase
- Index files for directory pages: `index.md`

### Images

- Place in `docs/public/images/`
- Lowercase filenames with hyphens
- Always include descriptive alt text

### Download Files

- Place in `docs/public/downloads/`
- Use hyphens instead of spaces
- Link with `{target="_self"}` attribute

## Code Guidelines

- TypeScript for all `.ts` and `.vue` files
- Follow the ESLint configuration (auto-fixed on commit)
- Follow the Prettier configuration for markdown and YAML

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project. See [LICENSE.md](LICENSE.md).

## Questions

Contact the ACT team at [act@mitre.org](mailto:act@mitre.org).
