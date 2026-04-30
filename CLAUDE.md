# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter with auto-fix
pnpm format       # Run Biome formatter
```

Package manager: **pnpm** (v10.4.1 specified in package.json)

## Architecture Overview

This is a **Next.js 15** marketing website for Keizer with React 19, using the App Router.

### Path Alias
- `~/*` maps to `./src/*` (e.g., `import { cn } from "~/lib/utils"`)

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components (UI components, page sections)
- `src/lib/` - Utilities
- `src/config/` - Font configuration

### Styling
- **Tailwind CSS** with custom config in `tailwind.config.ts`
- Custom color scheme using CSS variables (`--background`, `--foreground`, etc.)
- Fonts: Space Grotesk (primary), DM Mono (monospace), Gotham Bold (local)
- Use `cn()` utility from `~/lib/utils` for conditional class merging

### Code Style (Biome)
- 2-space indentation
- Double quotes for JS/JSX
- Trailing commas
- Semicolons required
- Strict linting rules (no unused imports/vars, no explicit any)

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.
