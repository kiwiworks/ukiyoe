# Ukiyoe - Agent Instructions

Instructions for AI agents working on this codebase.

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `bun install` |
| Build library | `bun run build` |
| Type check | `bun run check` |
| Run tests | `bun run test` |
| Dev server (demo) | `cd apps/demo && bun run dev` |
| Build demo | `cd apps/demo && bun run build` |

## Adding Components

### 1. Create Component File
Location: `src/lib/{category}/{ComponentName}.svelte`

Categories:
- `core/` - General UI components
- `agentic/` - AI/chat interface components
- `viz/` - Visualization components
- `effects/` - Background effects
- `layout/` - Layout components

### 2. Follow Component Template
```svelte
<script lang="ts" module>
  export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg';

  export interface ComponentProps {
    /** JSDoc comment for prop */
    size?: ComponentSize;
    /** Additional CSS classes */
    class?: string;
    /** Content */
    children: import('svelte').Snippet;
  }
</script>

<script lang="ts">
  let {
    size = 'md',
    class: className = '',
    children
  }: ComponentProps = $props();

  // Use $derived for computed values
  const sizeClasses: Record<ComponentSize, string> = {
    xs: '...',
    sm: '...',
    md: '...',
    lg: '...'
  };
</script>

<div class="... {sizeClasses[size]} {className}">
  {@render children()}
</div>
```

### 3. Export from Index
Add to `src/lib/index.ts`:
```ts
export { default as ComponentName } from './category/ComponentName.svelte';
export type { ComponentProps } from './category/ComponentName.svelte';
```

### 4. Add Demo Page
Create `apps/demo/src/routes/components/{component-name}/+page.svx`:
```svx
<script lang="ts">
  import { ComponentName, PageHeader } from 'ukiyoe';
  import ComponentPreview from '$lib/ComponentPreview.svelte';
</script>

<PageHeader title="ComponentName" subtitle="Brief description" />

## Basic Usage

```svelte preview title="Example"
<ComponentName>Content</ComponentName>
```
```

### 5. Update Navigation
Add to `apps/demo/src/lib/Nav.svelte` in appropriate section.

## Release Process

### Pre-release Checklist
- [ ] All tests pass (`bun run test`)
- [ ] Type check passes (`bun run check`)
- [ ] Demo builds successfully (`cd apps/demo && bun run build`)
- [ ] CHANGELOG.md updated
- [ ] Demo changelog page updated

### Version Bump
1. Edit `package.json`:
   ```json
   "version": "X.Y.Z"
   ```

2. Update `CHANGELOG.md`:
   - Move items from `[Unreleased]` to new version section
   - Add release date
   - Update comparison links at bottom

3. Update `apps/demo/src/routes/changelog/+page.svelte`:
   - Add new version section
   - Update badge version

### Commit & Tag
```bash
git add -A
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
git push && git push --tags
```

## CHANGELOG Guidelines

### Format (Keep a Changelog)
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features (use for wholly new functionality)

### Changed
- Changes to existing features (enhancements)

### Deprecated
- Features to be removed in future

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security-related changes
```

### Writing Good Entries
- Start with component/area name in bold: `**SmartSelect** - added filtering`
- Use present tense: "Add" not "Added"
- Be specific: "Fix button focus ring color" not "Fix button"
- Group related changes

### Version Links
Update links at bottom of CHANGELOG.md:
```markdown
[Unreleased]: https://github.com/kiwiworks/ukiyoe/compare/vX.Y.Z...HEAD
[X.Y.Z]: https://github.com/kiwiworks/ukiyoe/compare/vX.Y.Z-1...vX.Y.Z
```

## Common Tasks

### Fix Type Errors
```bash
bun run check
```
Common issues:
- Missing `xs` in size Records (add all sizes)
- Dynamic component syntax (use `{#if}` blocks instead)
- Missing exports in index.ts

### Test Components
```bash
bun run test              # Watch mode
bun run test:run          # Single run
bun run test -- Button    # Filter by name
```

### Build & Verify
```bash
bun run build                    # Build library
cd apps/demo && bun run build    # Build demo (catches SSR issues)
```

## Architecture Notes

### Theme System
- CSS variables defined in `src/lib/theme.ts`
- Tailwind preset at `tailwind.preset.ts`
- Colors: `text-primary`, `bg-secondary`, `border-default`, etc.
- Accent colors: `accent-brand`, `positive`, `negative`, `warning`, `info`

### State Management
- Use Svelte 5 runes: `$state`, `$derived`, `$effect`
- Global state in `src/lib/stores/`
- Context for component trees (theme, privacy)

### Accessibility
- All interactive elements need ARIA attributes
- Use semantic HTML elements
- Support keyboard navigation
- Test with screen readers
