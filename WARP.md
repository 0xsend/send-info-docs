# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Next.js 15 (App Router) + React 19, MDX content, Node >= 18, npm.
- Purpose: Documentation site for the Send ecosystem.
- Live site: https://info.send.it
- Docs source of truth: docs/ (MDX files), compiled at build time into pages under /docs/... via the App Router.

Common commands
- Install dependencies (lockfile-respecting):
  - npm ci
- Start development server (localhost:3000):
  - npm run dev
- Production build:
  - npm run build
- Start production server (after build):
  - npm run start
- Linting: not configured in this repo.
- Tests: not configured in this repo (running a single test is not applicable).

High-level architecture
- App Router entry points (app/)
  - app/layout.jsx
    - Global HTML <html>/<body> wrapper, global CSS import, site metadata and favicon.
  - app/page.jsx ("home")
    - Computes the sidebar tree (buildSidebarTree) and renders DocsLayout as a hero-driven landing page.
  - app/docs/[...slug]/page.jsx (docs & section landings)
    - generateStaticParams: prebuilds routes for every MDX in docs/ and for section landing pages.
    - generateMetadata: sets section-aware Open Graph (image/title/description) when on a section root; otherwise uses the MDX page title.
    - On section root: renders a section landing (custom behavior for the Send App).
    - On page slug: loads the MDX via renderDocToComponent and renders it inside DocsLayout with a ToC.

- MDX pipeline and content model (lib/md.js)
  - Only .mdx files are recognized (SUPPORTED_EXTENSIONS = ['.mdx']).
  - readDocBySlug(slug): reads docs/{slug}.mdx with gray-matter (frontmatter).
  - extractTitle: prefers frontmatter.title; falls back to the first H1 (# ...).
  - extractHeadings: parses MDX to collect H2/H3 (##/###) for the in-page ToC.
  - convertAdmonitionsToCallouts: transforms triple-colon admonitions (:::type Optional title ... :::) into a <Callout> component.
    - Supported/normalized types: info, tip, warning, caution→warning, danger→error, note→default, important, error.
  - renderDocToComponent(slug): compiles MDX via next-mdx-remote/rsc (remark-gfm, rehype-slug, rehype-autolink-headings) and returns React content + headings.

- Navigation and ordering
  - buildSidebarTree(): walks docs/ and returns a section→[{id, title}] map.
    - Title per item is derived from frontmatter.title or the first H1.
    - Custom ordering is applied per section (e.g., welcome, send-token, send-mobile-apps, canton-wallet, finance, miscellaneous, legal).
    - The docs/features folder is intentionally surfaced under the Send App section (nested under send-mobile-apps) rather than a top-level "features" section.

- Layout, hero, and ToC
  - components/DocsLayout.jsx
    - Determines if we’re on home or section landing and shows a hero grid (navigationCards for home; section-mapped hero for landings).
    - On article routes, shows breadcrumbs, content, and a right-hand ToC from extracted H2/H3.
  - components/SidebarNav.jsx
    - Renders curated sections, handles expansion state, highlights the active route, and nests “Features” under Send App.
  - components/mdx/Callout.jsx
    - Visual component used by admonition→Callout transformation.

Authoring docs (MDX)
- Create docs at: docs/{section}/{slug}.mdx
- Title resolution: set frontmatter.title or ensure the first H1 is present.
- ToC population: only H2 (##) and H3 (###) are included in the sidebar ToC.
- Admonitions (triple-colon syntax) are supported and map to <Callout>:
  :::tip Optional title
  Your short helpful note.
  :::
- Only .mdx is recognized; .md files will be ignored by the pipeline.

Environment
- Node >= 18 required (see package.json engines).
- npm is used (package-lock.json present).

Notes
- Section-specific Open Graph images/titles/descriptions are defined in app/docs/[...slug]/page.jsx (sectionMeta). Update there if you change branding imagery.
- Static params are generated at build time for all docs; add new files under docs/ and rebuild to make them routable.
