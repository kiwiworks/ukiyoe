# Ukiyoe - Claude Instructions

Svelte 5 component library with dark-first design.

## Project Structure

```
ukiyoe/
├── src/lib/           # Component library source
│   ├── core/          # Core UI components
│   ├── agentic/       # AI/chat interface components
│   ├── viz/           # Visualization components
│   ├── effects/       # Background effects (WebGL)
│   ├── layout/        # Layout components
│   ├── stores/        # Svelte stores (theme, privacy)
│   └── index.ts       # Public exports
├── apps/demo/         # Demo/docs site (SvelteKit)
├── design/            # Design documents
├── CHANGELOG.md       # Version history
└── package.json       # Library package
```

## Tech Stack

- **Framework**: Svelte 5 with Runes (`$state`, `$derived`, `$effect`)
- **Styling**: Tailwind CSS 4.0 with CSS variables
- **UI Primitives**: bits-ui for headless components
- **Icons**: @lucide/svelte (16-18px sizes)
- **Testing**: Vitest + @testing-library/svelte
- **Package Manager**: Bun

## Component Conventions

### File Structure
```svelte
<script lang="ts" module>
  // Types and interfaces (exported)
  export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';
  export interface ComponentProps { ... }
</script>

<script lang="ts">
  // Props with $props() rune
  let { prop = 'default', children }: ComponentProps = $props();
</script>

<!-- Template -->

<style>
  /* Scoped styles if needed */
</style>
```

### Naming Conventions
- **Sizes**: `xs | sm | md | lg` (consistent across all components)
- **Variants**: `default | primary | success | danger | warning | ghost | outline`
- **Props**: camelCase, use `class` not `className`
- **Events**: `onclick`, `oninput`, `onchange` (Svelte 5 style)

### Snippets (not slots)
Use Svelte 5 snippets for composition:
```svelte
// Props
children: import('svelte').Snippet;
actions?: import('svelte').Snippet;

// Usage
{@render children()}
{#if actions}{@render actions()}{/if}
```

## Versioning & Releases

### Version Format
Follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` for stable releases
- `MAJOR.MINOR.PATCH-beta.N` for pre-releases

### Release Process

**IMPORTANT**: Never use "Unreleased" section. Version changes directly.

1. **Update version** in `package.json` (bump to next beta/patch)
2. **Update CHANGELOG.md** with versioned section:
   - Add `## [X.Y.Z] - YYYY-MM-DD` at the top
   - Update comparison links at bottom
   - Categories: Added, Changed, Deprecated, Removed, Fixed, Security
3. **Update demo changelog page** at `apps/demo/src/routes/changelog/+page.svelte`:
   - Update badge version in PageHeader
   - Add new section with version and date
4. **Commit** with message: `chore: release vX.Y.Z`
5. **Push** - deployment is automatic via GitHub Actions

### CHANGELOG Format
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Changed
- Changes to existing functionality

### Added
- New features

### Fixed
- Bug fixes

[X.Y.Z]: https://github.com/kiwiworks/ukiyoe/compare/vPREV...vX.Y.Z
```

## Demo Site

### Adding Component Demos
1. Create `apps/demo/src/routes/components/{name}/+page.svx`
2. Use MDsveX format with `preview` code blocks
3. Import `ComponentPreview` from `$lib/ComponentPreview.svelte`
4. Add to nav in `apps/demo/src/lib/Nav.svelte`

### Demo Format
```svx
<script lang="ts">
  import { Component, PageHeader } from 'ukiyoe';
  import ComponentPreview from '$lib/ComponentPreview.svelte';
</script>

<PageHeader title="Component" subtitle="Description" />

## Section

```svelte preview title="Example"
<Component prop="value">Content</Component>
```
```

## Deployment

Demo deploys to GitHub Pages via `.github/workflows/deploy-demo.yml`:
- Triggered on push to `main`
- Builds library, then demo with `BASE_PATH=/ukiyoe`
- Deploys to `kiwiworks.github.io/ukiyoe`
