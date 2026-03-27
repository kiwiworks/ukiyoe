# Ukiyoe — Milestone Plan

## Principles
- **Dark-first** — dark mode is the default, light mode is supported but secondary
- **Standardize relentlessly** — sizes (`xs|sm|md|lg`), variants, callback naming (`onX`), prop shapes must be consistent across all components
- **Every component gets a demo** — no component ships without a demo page in `apps/demo/` with `ComponentPreview` blocks and `PropsTable`
- **Changelog is the contract** — every release gets a versioned CHANGELOG entry (no "Unreleased" sections), following Keep a Changelog format
- **Consumer-safe** — breaking changes require migration notes; all kiwiland projects depend on this library
- **Svelte 5 idioms** — runes, snippets (not slots), `$props()`, typed exports in module script

## Consumers
- All projects under `~/work/kiwiland/` (corp, agora, mesh, shard, ctrl, keel, and others)
- Consumed via git dependency — `dist/` is committed for git consumers

## Milestone Ensembles

### v0.7.0 (current)

| # | Name | Depends On | Summary |
|---|------|-----------|---------|
| 0 | [AlertDialog Hardening](./M0_ALERT_DIALOG_HARDENING.md) | — | Outside-click control, cancel semantics fix, simplified buttons |
| 1 | [Form Context & Validation](./M1_FORM_CONTEXT_VALIDATION.md) | — | Bindable context prop, schema-seeded defaults, Zod 4 compat |
| 2 | [Mandelbrot Robustness](./M2_MANDELBROT_ROBUSTNESS.md) | — | Non-hex input fallback for avatar generation |

#### Dependency Graph

```
M0    M1    M2  (all independent)
```

## Cross-Repo Dependencies

| ID | Change | Source | Target | Milestone | Status |
|----|--------|--------|--------|-----------|--------|

## Quality Gates

1. `bun run lint` — zero warnings
2. `bun run test:run` — all pass
3. `bun run build` — clean build
4. `bun run check` — svelte-check passes
5. Demo pages exist for all new/changed components
6. Consumer projects compile against new version
