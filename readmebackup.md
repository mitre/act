# MITRE Adaptive Capabilities Testing (ACT)

The MITRE Adaptive Capabilities Testing (ACT) framework is a comprehensive approach to security and risk assessment that facilitates and encourages risk-based decision-making. This repository contains the web implementation of the ACT program, including the ACT Handbook, methodology documentation, and supporting resources.

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)
[![MITRE](https://img.shields.io/badge/MITRE-ACT%20Framework-003764)](https://www.mitre.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-blue.svg)](https://www.typescriptlang.org/)

![MITRE ACT](./public/images/act-handbook/mitre-act-logo.png)

## About ACT

The MITRE Adaptive Capabilities Testing (ACT) framework moves security assessment beyond traditional compliance-focused approaches to a capability-focused, risk-based methodology that provides actionable insights for decision-makers.

### Key Principles

- **Risk-driven** rather than compliance-driven
- **Capability-oriented** rather than control-oriented
- **Multiple risk information sources** beyond just control compliance
- **Understandable and actionable** for leadership decision-making

### ACT Program Components

This repository includes:

1. **ACT Handbook** - Comprehensive documentation of the methodology
2. **Assessment Tools** - Resources for conducting ACT assessments
3. **Implementation Guidance** - Steps for integrating ACT into existing security programs
4. **Case Studies** - Real-world examples of ACT in practice
5. **Training Materials** - Resources for learning the ACT methodology

## Quick Start

For detailed setup instructions on different platforms, see [DEVELOPMENT.md](./DEVELOPMENT.md).

```bash
# Clone the repository
git clone https://github.com/mitre/act.git
cd act

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## System Requirements

- Node.js 18.x or higher
- pnpm 10.x or higher (recommended package manager)
- macOS, Windows, or Linux

See [DEVELOPMENT.md](./DEVELOPMENT.md) for platform-specific setup instructions, including special considerations for Apple Silicon (M1/M2/M3) Macs.

## Development

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

For development with logging (useful for troubleshooting):

```bash
# Create logs directory if it doesn't exist
pnpm run logs:dir

# Run dev server with logging
pnpm run dev:log
```

### Common Commands

| Command | Description |
| ------- | ----------- |
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run generate` | Generate static site |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run typecheck` | Run TypeScript type checking |
| `pnpm run dev --clean-cache` | Clear Nuxt cache and start dev server |
| `pnpm run logs:clear` | Clear log files |

## Project Structure

```
/
├── act-info/            # ACT program resources
│   ├── act-fact-sheet-20231004.pdf
│   ├── mitre-act-overview-v3.5.pdf
│   ├── handbook/        # Original handbook materials
│   └── mitre-act-logo.svg
├── app/                 # Nuxt application code
│   ├── components/      # Vue components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Vue pages (file-based routing)
│   └── types/           # TypeScript definitions
├── content/             # Nuxt Content files
│   ├── 0.index.yml      # Homepage content
│   ├── 1.docs/          # Documentation content
│   │   ├── 1.getting-started/
│   │   ├── 2.act-handbook/      # ACT Handbook content
│   │   └── 3.development/       # Developer documentation
│   ├── 2.pricing.yml
│   └── 3.blog/          # Blog articles and case studies
├── public/              # Static files
│   └── images/          # Image files
│       └── act-handbook/  # ACT Handbook images
└── project-docs/        # Project implementation documentation
```

## Known Issues and Solutions

### Image Handling

Images with spaces in filenames don't display properly in Nuxt Content. The solution is to:

1. Use lowercase filenames
2. Replace spaces with hyphens
3. Avoid special characters
4. Use standard file extensions

### Image Processing on Apple Silicon

The Sharp library can cause compatibility issues on Apple Silicon Macs. The project uses a simplified image configuration:

```ts
// In nuxt.config.ts
image: {
  provider: 'none',
  dir: 'public'
}
```

This approach prioritizes compatibility over image optimization, resulting in more consistent behavior across platforms.

### Nuxt Content MDC Components

When using Nuxt UI components in markdown:

- Use `::callout` with `icon`, `color` and optional `to` properties
- Use `::card` and `::card-group` for content organization
- Use `::accordion` with `::accordion-item{label="..."}` (not `title`)
- Use `::steps{level="3"}` with appropriate heading levels
- Use `::div{class="..."}` for custom styling

## ACT Methodology

The ACT methodology consists of three main phases:

### Phase 1: Planning
The planning phase establishes the foundation for the assessment, including:
- Initiating the assessment
- Conducting preliminary discussions
- Reviewing system documentation
- Defining assessment boundaries
- Developing the assessment plan

### Phase 2: Assessment
The assessment phase involves two parallel tracks:

**Security Assessment Track**
- Performing security testing
- Analyzing test results
- Identifying vulnerabilities
- Generating preliminary findings

**Risk Assessment Track**
- Identifying risks
- Analyzing risk impacts
- Evaluating risk likelihood
- Determining risk levels

### Phase 3: Reporting
The reporting phase consolidates findings into actionable information:
- Preparing draft reports
- Conducting stakeholder reviews
- Finalizing reports
- Presenting findings to stakeholders

## Deployment

The ACT website can be deployed as:

1. **Static Site (recommended)**
   
   Generate a static version of the site:
   
   ```bash
   pnpm run generate
   ```
   
   The output in the `.output/public` directory can be deployed to any static hosting service.

2. **Node.js Server**
   
   Build the application:
   
   ```bash
   pnpm run build
   ```
   
   Deploy the `.output` directory to a Node.js hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Resources

- [MITRE Website](https://www.mitre.org)
- [ACT Fact Sheet](./act-info/act-fact-sheet-20231004.pdf)
- [ACT Overview](./act-info/mitre-act-overview-v3.5.pdf)
- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Nuxt Content Documentation](https://content.nuxt.com)

## License

See the [LICENSE](./LICENSE.md) file for details.

---

Developed by MITRE | Built with Nuxt UI Pro
