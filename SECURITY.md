# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the MITRE ACT website or its content, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email **[act@mitre.org](mailto:act@mitre.org)** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Any potential impact

The MITRE ACT team will acknowledge your report within 5 business days and work with you to understand and address the issue.

## Scope

This security policy applies to:

- The MITRE ACT website source code and content in this repository
- The deployed site at [act.mitre.org](https://act.mitre.org)

## Security Measures

The ACT site implements the following security practices:

- **Static site generation** — no server-side code execution
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Dependency auditing** — automated via CI
- **Immutable asset caching** — hashed filenames with long-lived cache headers
- **Cookie consent** — Osano cookie consent management for MITRE Privacy compliance
