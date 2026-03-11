# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.2] - 2026-03-11

### Added
- **Input** — built-in password visibility toggle with Eye/EyeOff icons; opt out with `showPasswordToggle={false}`
- **Input** — `autocomplete` prop (typed as `HTMLInputElement['autocomplete']`) and `inputmode` prop for virtual keyboard hints
- **Textarea** — `autocomplete` prop (typed as `HTMLTextAreaElement['autocomplete']`)
- **Switch** — `loading` prop with spinner and disabled state, `aria-invalid` and `aria-busy` attributes
- **Slider** — `aria-invalid` prop forwarded to underlying range input
- **SmartSelect** — `xs` size variant, `aria-invalid` and `aria-describedby` props
- **DateRangePicker** — `aria-invalid` and `aria-describedby` props forwarded to trigger
- **Form.Auto** — `autocomplete` field schema prop wired to Input and Textarea renderers
- **InputMode** type export from `ukiyoe/core`

### Fixed
- **Form.Root** — `validateOnBlur`, `validateOnChange`, and `showErrorsOnTouched` config props were captured once at mount via `untrack()` and never updated; replaced with reactive getters on the form context object

## [0.6.1] - 2026-03-11

### Fixed
- **BottomSheet** — `style:padding-bottom` directive on `Dialog.Content` component caused `component_invalid_directive` in Svelte 5; merged into inline `style` string
- **BottomSheet** — `snapPoints` prop captured once at init instead of reactively; replaced `$state` initializer with `$effect` sync
- **Chip** — nested `<button>` inside `<button>` caused `node_invalid_placement_ssr` warning; dismiss element changed to `<span role="button">` with keyboard support
- **ChipGroupItem** — same nested `<button>` SSR warning; same fix as Chip

### Added
- **Demo pages** — Chip, ChipGroup, and BottomSheet now have dedicated component demo pages with interactive examples and props tables

## [0.6.0] - 2026-03-05

### Added
- **Chip component** — Interactive toggle chip built on bits-ui `Toggle` with `active` (bindable), `variant`, `icon`, `onToggle`/`onDismiss` hooks, and `children` snippet override
- **ChipGroup component** — Container built on bits-ui `ToggleGroup` with `type="single"|"multiple"`, `value` (bindable), `onValueChange`, keyboard navigation with `orientation`/`loop`
- **ChipGroupItem component** — Group-aware chip item using bits-ui `ToggleGroup.Item` with pressed state from parent group
- **BottomSheet component** — Mobile action sheet built on bits-ui `Dialog` with drag-to-dismiss, configurable snap points, `onClose`/`onSnap` hooks, `header`/`actions` snippets, safe area padding
- **SelectableCard component** — Pressable card with `selected` (bindable), check indicator, `onSelect` hook, `showCheck` toggle, proper ARIA `role="option"`

### Changed
- **Input `prefix`/`suffix`** — now accept `string | Snippet` (was `string` only), enabling icon adornments; padding is now size-aware instead of hardcoded `pl-12`/`pr-12`

## [0.5.0] - 2026-03-04

### Added
- **Example pages** — four full-page application examples (API Explorer, Chat Interface, Dashboard, Settings) with source code viewer toggle
- **ExampleViewer component** — collapsible source code panel with syntax highlighting for example pages
- **Viewport store** — reactive `viewportStore` with `width`, `height`, `isMobile` for responsive logic in components
- **Scroll lock utility** — body scroll prevention for mobile drawers and modals
- **Sparkline `responsive` prop** — when `true`, SVG stretches to fill container width (`width="100%"` + `preserveAspectRatio="none"`) while keeping viewBox coordinate space unchanged
- **Checkbox `children` snippet** — renders a label beside the checkbox with proper `<label>` wrapping and cursor/opacity states
- **Switch `children` snippet** — renders a label beside the switch with proper `<label>` wrapping and cursor/opacity states

### Changed
- **Demo nav rewrite** — replaced heavy ListItem-based navigation with compact tree nav: collapsible section headers with chevron, plain text links, collapsed icon rail mode, auto-collapse at <1280px viewport width
- **Demo nav sections sorted** — all component items within each section now sorted alphabetically
- **Dashboard example** — 3-tier responsive breakpoints (mobile 2-col, tablet 3-col, desktop 4-col) with responsive sparkline widgets
- **Zod peer dependency** — upgraded from `^3.0.0` to `^4.0.0` (Zod 4 ships a v3 compat layer; `safeParse`, `schema.shape`, `ZodObject`, `ZodRawShape` all work unchanged)
- **Core callback API** — normalized callback prop casing across core components:
  - `Modal`: `onclose` -> `onClose`
  - `SidePanel`: `onclose` -> `onClose`
  - `ThemeLabModal`: `onclose` -> `onClose`
  - `Toast`: `onclose` -> `onClose`
  - `AlertDialog`: `onconfirm`/`oncancel` -> `onConfirm`/`onCancel`
  - `RefreshControl`: `onrefresh`/`onintervalchange` -> `onRefresh`/`onIntervalChange`
- **Form.Auto** — number fields now emit `null` when cleared (empty string) instead of coercing to `0`
- **DataTable.Root** — context setup now preserves the row generic type without casting to `Record<string, unknown>`
- **ThemeProvider** — CSS variable application now uses stable diffing without clearing all vars on each reactive pass

### Removed
- **Legacy lowercase callback props** — removed `onclose`, `onconfirm`, `oncancel`, `onrefresh`, `onintervalchange`

### Fixed
- **ThemeProvider SSR crash** — fixed server-side rendering error when `document` is unavailable
- **Chat example scroll** — fixed auto-scroll behavior in message list
- **Demo component docs** — updated callback props to match the breaking callback API (`onValueChange`, `onBlur`, `onClose`, `onCancel`, `onConfirm`, `onRefresh`, `onIntervalChange`)

## [0.4.1] - 2026-03-03

### Fixed
- **Demo pages** — ToolCallDisplay, ToolCallGroup, and AgentTask demos now consistently use `ComponentPreview` blocks with Show Code toggles instead of raw div wrappers

## [0.4.0] - 2026-03-03

### Added
- **ToolCallDisplay v2** — compact one-liner collapsed state with status icon, tool name, summary text, and right-aligned duration; expandable detail for arguments/result/id
- **ToolCallGroup component** — groups multiple tool calls with chevron toggle, status indicator, count/progress hint, aggregate duration, and bordered children container
- **AgentTask component** — sub-agent/delegated task display with Bot icon, recursive nesting, status-colored borders, progress tracking, elapsed time, and trailing snippet slot
- **`formatElapsed` utility** — formats milliseconds as human-readable elapsed time (500ms, 1.2s, 1m 3s)

### Changed
- **ToolCallDisplay** — dropped Disclosure dependency, now self-contained expand/collapse with new `status`, `summary`, and `duration` props
- **Demo version badge** — layout and home page now read library version from `package.json` at build time instead of hardcoded magic numbers

## [0.3.0] - 2026-02-18

### Added
- **Subpath exports** for granular imports — consumers can now import from `ukiyoe/core`, `ukiyoe/layout`, `ukiyoe/viz`, `ukiyoe/effects`, `ukiyoe/agentic`, `ukiyoe/openapi` instead of the full barrel
  - New barrel files for each module (`core/index.ts`, `layout/index.ts`, `viz/index.ts`, `effects/index.ts`)
  - Main `ukiyoe` entry point re-exports everything for backwards compatibility
- **Input** `date` and `datetime-local` type support

### Changed
- **HighlightedCodeBlock shiki optimization** — replaced `codeToHtml` shorthand with a cached `createHighlighter` instance that lazily loads only requested languages and themes
- **OpenApiViewer** — responsive sidebar with hamburger toggle on mobile, backdrop overlay
- **EndpointList** — search/filter input and collapsible accordion groups replacing flat list
- **EndpointTester** — authentication support (Bearer, Basic, API Key), path parameters promoted to inline fields above tabs, query params tab only shown when relevant, auto-reset form state on endpoint switch, strips empty optional fields from JSON body
- **SchemaForm** — filters out `readOnly` properties, uses native `date`/`datetime-local` inputs
- **SchemaView** — Lucide chevron icons replace Unicode triangles, enum values rendered as Badges

### Fixed
- Demo production build chunk fragmentation — added manual chunk grouping for heavy dependencies (codemirror, shiki, bits-ui, openapi, marked), reducing chunk count from 407 to ~80
- **ParametersTable** — removed unused `SchemaView` import
- **EndpointTester** — trailing slash normalization on server URLs prevents double-slash in paths

## [0.2.3] - 2026-02-09

### Added
- **DescriptionList compound component** - Semantic `<dl>/<dt>/<dd>` for label-value pairs:
  - `DescriptionList.Root` - CSS grid layout with 1/2/3 column support and gap variants (sm/md/lg)
  - `DescriptionList.Item` - Label + value pair with optional monospace font
  - Accepts rich content as children (Badge, StatusBadge, Link, etc.)
- **AlertDialog component** - Confirmation and action dialogs built on bits-ui AlertDialog:
  - Variants: default, info, warning, danger with matching icons and button colors
  - Simple mode with title/description/onconfirm props
  - Custom `content` snippet to override description with rich content
  - Custom `actions` snippet for non-standard button layouts (receives close function)
  - Async confirm support with `loading` prop and spinner

### Changed
- **Tabs extended** with backward-compatible additions:
  - `variant` prop: `'pill'` (default, existing behavior) or `'underline'` (new)
  - `icon` and `count` on TabItem for icons before labels and count badges
  - `trigger` snippet for full custom tab rendering control

## [0.2.2] - 2026-01-20

### Added
- **ContextMenu component** - Right-click contextual menu using bits-ui:
  - `ContextMenu.Root` - Wrapper with trigger area and menu content
  - `ContextMenu.Item` - Menu item with variants (default/danger) and icon support
  - `ContextMenu.Divider` - Separator between item groups
  - Keyboard navigation, click-outside dismissal, portal rendering

### Changed
- **Default accent color** changed from Orange to Cyan (`#06b6d4`)

### Removed
- Dead `theme.ts` file (exported but never used)
- "Rahapuu Orange" from accent color palette

### Fixed
- Invalid CSS variables across components:
  - `bg-bg-danger`, `border-border-danger` → `bg-negative`, `border-negative`
  - `text-text-brand` → `text-accent-brand`
  - `text-text-danger` → `text-negative`
- Semantic CSS variable misuse:
  - `text-border-strong` → `text-text-muted` (Widget)
  - `bg-text-muted` → `bg-neutral` or `bg-border-strong` (Badge, StatusBadge, Switch, ThinkingIndicator)

## [0.2.1] - 2026-01-20

### Added
- **OpenAPI module** with comprehensive API documentation components:
  - `OpenApiViewer` - Full-featured OpenAPI spec viewer with endpoint navigation
  - `EndpointList` - Grouped endpoint navigation sidebar
  - `EndpointDetail` - Detailed endpoint documentation view
  - `EndpointTester` - Interactive API request testing with parameter forms
  - `ParametersTable` - Parameter documentation table
  - `SchemaView` - Expandable JSON schema visualization
  - `SchemaForm` - Dynamic form generation from JSON schemas
  - `ResponseViewer` - API response display with syntax highlighting
- **CodeEditor component** - Monaco-style code editor with syntax highlighting
- **NebulaOverlay `enabled` prop** - Manual control to override theme store setting

### Fixed
- SchemaView reactivity warning with `depth` prop capture
- DateRangePicker unused `today` import
- Demo a11y warnings in breadcrumb, tooltip, button, error-page, not-found, and backtest-chart pages

## [0.2.0] - 2026-01-19

### Added
- **BrandIcon component** for animated brand identity icons:
  - Calligraphy-inspired default design evoking 浮世絵 (ukiyo-e) aesthetics
  - Size presets (xs/sm/md/lg/xl) and custom pixel values
  - Three animation styles: `wave` (stroke drawing), `pulse` (ink spreading), `breathe` (subtle opacity)
  - Customizable colors via `color` and `backgroundColor` props
  - CSS variables exposed for custom SVG content (`--ukiyoe-color`, `--ukiyoe-bg`, `--ukiyoe-duration`)
  - `children` snippet for fully custom SVG designs
  - `showCircle` prop to toggle background circle
  - `paused` prop for programmatic animation control
- **Theme-adaptive favicon** with `prefers-color-scheme` media query support

### Changed
- Demo header now uses BrandIcon instead of simple indicator dot
- Demo BrandIcon page includes interactive speed slider and custom SVG examples

### Fixed
- Form component type errors with partial initial values
- Added `zod` as optional peer dependency for Form validation types

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

[Unreleased]: https://github.com/kiwiworks/ukiyoe/compare/v0.6.2...HEAD
[0.6.2]: https://github.com/kiwiworks/ukiyoe/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/kiwiworks/ukiyoe/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/kiwiworks/ukiyoe/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.4...v0.2.0
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
