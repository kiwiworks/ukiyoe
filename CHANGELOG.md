# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.1.0-beta.4]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.3...v0.1.0-beta.4
[0.1.0-beta.3]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.2...v0.1.0-beta.3
[0.1.0-beta.2]: https://github.com/kiwiworks/ukiyoe/compare/v0.1.0-beta.1...v0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/kiwiworks/ukiyoe/compare/v0.0.1...v0.1.0-beta.1
[0.0.1]: https://github.com/kiwiworks/ukiyoe/releases/tag/v0.0.1
