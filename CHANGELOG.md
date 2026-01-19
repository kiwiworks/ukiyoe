# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2026-01-19

### Added
- **SocialButton component** for branded social/external links:
  - Official SVG icons for 8 platforms (GitHub, Twitter, Discord, LinkedIn, npm, YouTube, Mastodon, Bluesky)
  - Official brand colors from platform guidelines
  - Platform-specific props: `stars`/`forks` (GitHub), `members` (Discord), `downloads`/`version` (npm)
  - Variants: filled, outline, ghost
  - Custom badge snippet support

### Changed
- **Install page redesigned** with Ukiyoe components (MetricCard, Stepper, SectionCard)

## [0.1.3] - 2026-01-19

### Added
- **Form compound component** with three sub-components:
  - `Form.Root` - State management with Zod and custom validation support
  - `Form.Field` - Auto-wiring for labels, IDs, aria attributes, and error display
  - `Form.Auto` - Data-driven field generation from schema definitions
- **Heading anchor links**: `id` and `anchor` props for clickable section links
- **Demo site heading anchors** via rehype-slug and rehype-autolink-headings

### Changed
- Demo site now includes `Toaster` component in layout for toast notifications

### Fixed
- **Toaster width**: Fixed toast notifications collapsing to zero width

### Removed
- **FormField component**: Replaced by `Form.Field` with improved API

## [0.1.2] - 2026-01-18

### Added
- **Markdown component** for rendering markdown content in chat messages:
  - Uses `HighlightedCodeBlock` for code blocks with copy button and syntax highlighting
  - Full markdown support: headings, bold/italic, lists, links, blockquotes, tables, horizontal rules
  - Lexer-based rendering using Svelte components instead of HTML strings

## [0.1.1] - 2026-01-18

### Added
- **DataTable responsive columns**: `hideAt` prop on Column definitions to hide columns below specific breakpoints (sm/md/lg/xl/2xl)
- **MetricCard brand variant**: Gradient background styling for hero metrics

### Changed
- Improved documentation discoverability for existing features:
  - SectionCard: Added collapsible demo (feature existed but wasn't showcased)
  - Button: Dedicated loading state section with spinner examples
  - ListItem: Updated to clarify clickable card use case

## [0.1.0] - 2026-01-18

First stable release! Ukiyoe is now production-ready with 70+ components.

### Added
- **Kbd component** for displaying keyboard shortcuts and key combinations
- **HighlightedCodeBlock component** with optional Shiki syntax highlighting (tree-shakeable)
- Command palette search button with keyboard shortcut hint in header

### Changed
- Demo routing refactored to shared routes file for single source of truth
- Shiki added as optional peer dependency for syntax highlighting

### Fixed
- BacktestChart using incorrect Svelte 5 pattern (`$derived` vs `$derived.by`)
- ThemeLabModal width constraints (added min-width)
- Nav.svelte invalid props on SmartSelect and ListItem

## [0.1.0-beta.5] - 2026-01-18

### Added
- **NotFound component** for 404 pages with customizable navigation
- **ErrorPage component** with status-specific defaults for common HTTP errors (400, 401, 403, 404, 500, 502, 503, 504)
- **`cn()` utility** (clsx + tailwind-merge) for intelligent class merging with Tailwind conflict resolution

### Changed
- All components now use `cn()` utility for className merging
- Viz components (Gauge, Sparkline, ProgressRing) updated to follow codebase conventions:
  - Added module script with exported types
  - Added JSDoc comments for all props

### Fixed
- ListItem demo using incorrect API (passing Components instead of Snippets)
- Stepper demo missing icon imports and state variable
- Install page template literal parsing errors with script tags

## [0.1.0-beta.4] - 2026-01-17

### Added
- **Stepper component** for multi-step workflows:
  - States: pending, active, completed, error
  - Orientations: horizontal and vertical
  - Sizes: xs, sm, md, lg
  - Compact mode (indicators only)
  - Clickable steps with navigation callbacks
  - Icon support and optional step markers
  - Description text for vertical layouts

## [0.1.0-beta.3] - 2026-01-16

### Changed
- **Header component enhancements**:
  - Add `size` prop (sm/md/lg) for different prominence levels
  - Add `fixed` prop for positioning control (default: true)
  - Add `showIndicator` prop to toggle brand dot
  - Add `icon` snippet slot for custom logos
- **Tailwind refactoring** - Converted 18 components from `<style>` blocks to pure Tailwind:
  - Core: Breadcrumb, Ip, ListItem, RandomName, RefreshControl, SidePanel, Widget
  - Layout: Panel, Sidebar, StatusBar
  - Viz: BacktestChart, EquityChart
  - Effects: DelaunayBackground, GridPulseBackground, IsometricGridBackground, NebulaOverlay, ParticleFlowBackground, SupernovaBackground

### Added
- Export `HeaderSize` and `HeaderProps` types from Header component

## [0.1.0-beta.2] - 2025-01-16

### Fixed
- ActionMenu positioning and z-index issues by migrating to bits-ui DropdownMenu with Portal
- SmartSelect dropdown not opening on click/focus (now uses proper Combobox.Trigger)
- Missing 'xs' size in Input, Textarea, and RadioGroup iconSizes
- StatusBadge test file using non-existent `showDot` prop (replaced with `pulse`)
- DataTable Svelte 5 reactivity warnings (state initialization and context getters)

### Changed
- ActionMenu now uses bits-ui DropdownMenu for proper positioning via Portal
- MenuItem uses DropdownMenu.Item instead of custom implementation
- MenuDivider uses DropdownMenu.Separator
- Demo pages now use `addToast` instead of browser `alert()` for better UX
- Updated installation page for public repository (git dependency)

## [0.1.0-beta.1] - 2025-01-16

### Added
- **Agentic components** for conversational AI interfaces:
  - `Message` - Role-based message bubbles (user/assistant/system)
  - `StreamingText` - Animated text reveal with cursor
  - `ThinkingIndicator` - Activity status indicator (thinking/searching/executing/writing/reading)
  - `AgentInput` - Enhanced textarea with attachments and submit handling
  - `MessageList` - Auto-scrolling container with infinite scroll support
- `SmartSelect` component with filtering, highlight matching, and scroll indicators
- `DateRangePicker` component with modifier support
- Loading state support for form components (Button, Input, Textarea, Select)
- Unit tests for core components
- ARIA attributes for interactive components
- GitHub Pages demo site

### Changed
- Standardized size scale across all components (xs/sm/md/lg)
- Standardized variant naming across feedback components
- Aligned color token naming convention in theme system
- Standardized z-index system with theme variables
- Replaced hardcoded values with theme tokens throughout

### Fixed
- SmartSelect filtering reactivity (using `oninput` per bits-ui docs)
- Select scroll behavior with scroll indicators
- Layout component prop type exports

## [0.0.1] - 2025-01-04

### Added
- Initial release with core component library
- **Core components**: Button, ButtonGroup, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, FormField
- **Data display**: Badge, StatusBadge, Numeric, Ip, MetricCard, DataTable, StatsGrid
- **Typography**: Text, Heading, Link, CodeBlock, Divider
- **Layout**: PageHeader, Widget, SectionCard, Panel, Modal, SidePanel, Tabs, Accordion, EmptyState, Breadcrumb, ListItem, Header, Sidebar, StatusBar
- **Feedback**: Alert, Toast/Toaster, Tooltip, Popover, ProgressBar, Skeleton, PrivacyToggle, RefreshControl
- **Visualization**: Sparkline, Gauge, ProgressRing, EquityChart, BacktestChart
- **Effects**: GridPulseBackground, DelaunayBackground, IsometricGridBackground, ParticleFlowBackground, SupernovaBackground, NebulaOverlay
- **Utilities**: MandelbrotAvatar, AssetIcon, RandomName
- Theme system with CSS variables and Tailwind v4 preset
- Dark-first design with light mode support
- Privacy masking context

[0.1.4]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.5...v0.1.0
[0.1.0-beta.5]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.4...v0.1.0-beta.5
[0.1.0-beta.4]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.3...v0.1.0-beta.4
[0.1.0-beta.3]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.1...v0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.0.1...v0.1.0-beta.1
[0.0.1]: https://github.com/kiwiworks/ukiyoe/releases/tag/v0.0.1
