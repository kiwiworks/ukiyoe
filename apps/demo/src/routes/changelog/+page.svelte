<script lang="ts">
	import { PageHeader, Text, Badge, Heading } from 'ukiyoe';
</script>

<svelte:head>
	<title>Changelog - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Changelog" subtitle="All notable changes to this project">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="v0.1.0" />
	{/snippet}
</PageHeader>

<div class="mt-lg space-y-xxl">
	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0</Heading>
			<Badge size="xs" variant="success" text="Stable" />
			<Text size="sm" variant="muted">2026-01-18</Text>
		</div>

		<Text variant="secondary" class="mb-md">First stable release! Ukiyoe is now production-ready with 70+ components.</Text>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li><strong>Kbd component</strong> for displaying keyboard shortcuts and key combinations</li>
					<li><strong>HighlightedCodeBlock component</strong> with optional Shiki syntax highlighting (tree-shakeable)</li>
					<li>Command palette search button with keyboard shortcut hint in header</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-warning mb-sm">Changed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>Demo routing refactored to shared routes file for single source of truth</li>
					<li>Shiki added as optional peer dependency for syntax highlighting</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-info mb-sm">Fixed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>BacktestChart using incorrect Svelte 5 pattern (<code>$derived</code> vs <code>$derived.by</code>)</li>
					<li>ThemeLabModal width constraints</li>
					<li>Nav.svelte invalid props on SmartSelect and ListItem</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0-beta.5</Heading>
			<Text size="sm" variant="muted">2026-01-18</Text>
		</div>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li><strong>NotFound component</strong> for 404 pages with customizable navigation</li>
					<li><strong>ErrorPage component</strong> with status-specific defaults for common HTTP errors</li>
					<li><strong><code>cn()</code> utility</strong> (clsx + tailwind-merge) for intelligent class merging</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-warning mb-sm">Changed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>All components now use <code>cn()</code> utility for className merging</li>
					<li>Viz components (Gauge, Sparkline, ProgressRing) updated to follow codebase conventions</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-info mb-sm">Fixed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>ListItem demo using incorrect API (Components instead of Snippets)</li>
					<li>Stepper demo missing icon imports and state variable</li>
					<li>Install page template literal parsing errors</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0-beta.4</Heading>
			<Text size="sm" variant="muted">2026-01-17</Text>
		</div>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li><strong>Stepper component</strong> for multi-step workflows:
						<ul class="list-disc list-inside ml-lg mt-xs">
							<li>States: pending, active, completed, error</li>
							<li>Orientations: horizontal and vertical</li>
							<li>Sizes: xs, sm, md, lg</li>
							<li>Compact mode (indicators only)</li>
							<li>Clickable steps with navigation callbacks</li>
							<li>Icon support and optional step markers</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0-beta.3</Heading>
			<Text size="sm" variant="muted">2026-01-16</Text>
		</div>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-warning mb-sm">Changed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li><strong>Header enhancements</strong>: size prop (sm/md/lg), fixed prop, showIndicator prop, icon snippet</li>
					<li><strong>Tailwind refactoring</strong> - 18 components converted from style blocks to pure Tailwind:
						<ul class="list-disc list-inside ml-lg mt-xs">
							<li>Core: Breadcrumb, Ip, ListItem, RandomName, RefreshControl, SidePanel, Widget</li>
							<li>Layout: Panel, Sidebar, StatusBar</li>
							<li>Viz: BacktestChart, EquityChart</li>
							<li>Effects: DelaunayBackground, GridPulseBackground, IsometricGridBackground, NebulaOverlay, ParticleFlowBackground, SupernovaBackground</li>
						</ul>
					</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>Export <code>HeaderSize</code> and <code>HeaderProps</code> types</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0-beta.2</Heading>
			<Text size="sm" variant="muted">2025-01-16</Text>
		</div>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-info mb-sm">Fixed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>ActionMenu positioning and z-index issues (migrated to bits-ui DropdownMenu with Portal)</li>
					<li>SmartSelect dropdown not opening on click/focus</li>
					<li>Missing 'xs' size in Input, Textarea, and RadioGroup iconSizes</li>
					<li>DataTable Svelte 5 reactivity warnings</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-warning mb-sm">Changed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>ActionMenu now uses bits-ui DropdownMenu for proper positioning</li>
					<li>MenuItem uses DropdownMenu.Item, MenuDivider uses DropdownMenu.Separator</li>
					<li>Demo pages use toast notifications instead of browser alerts</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.1.0-beta.1</Heading>
			<Text size="sm" variant="muted">2025-01-16</Text>
		</div>

		<div class="space-y-lg">
			<div>
				<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li><strong>Agentic components</strong> for conversational AI interfaces:
						<ul class="list-disc list-inside ml-lg mt-xs">
							<li><code>Message</code> - Role-based message bubbles (user/assistant/system)</li>
							<li><code>StreamingText</code> - Animated text reveal with cursor</li>
							<li><code>ThinkingIndicator</code> - Activity status indicator</li>
							<li><code>AgentInput</code> - Enhanced textarea with attachments</li>
							<li><code>MessageList</code> - Auto-scrolling container</li>
						</ul>
					</li>
					<li><code>SmartSelect</code> component with filtering, highlight matching, and scroll indicators</li>
					<li><code>DateRangePicker</code> component with modifier support</li>
					<li>Loading state support for form components</li>
					<li>Unit tests for core components</li>
					<li>ARIA attributes for interactive components</li>
					<li>GitHub Pages demo site</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-warning mb-sm">Changed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>Standardized size scale across all components (xs/sm/md/lg)</li>
					<li>Standardized variant naming across feedback components</li>
					<li>Aligned color token naming convention in theme system</li>
					<li>Standardized z-index system with theme variables</li>
				</ul>
			</div>

			<div>
				<Heading level={3} size="md" class="text-info mb-sm">Fixed</Heading>
				<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
					<li>SmartSelect filtering reactivity</li>
					<li>Select scroll behavior with scroll indicators</li>
					<li>Layout component prop type exports</li>
				</ul>
			</div>
		</div>
	</section>

	<section>
		<div class="flex items-center gap-md mb-md">
			<Heading level={2} size="lg">0.0.1</Heading>
			<Text size="sm" variant="muted">2025-01-04</Text>
		</div>

		<div>
			<Heading level={3} size="md" class="text-positive mb-sm">Added</Heading>
			<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
				<li>Initial release with core component library</li>
				<li><strong>Core</strong>: Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider</li>
				<li><strong>Data Display</strong>: Badge, StatusBadge, Numeric, MetricCard, DataTable</li>
				<li><strong>Typography</strong>: Text, Heading, Link, CodeBlock, Divider</li>
				<li><strong>Layout</strong>: PageHeader, Widget, Modal, SidePanel, Tabs, Accordion</li>
				<li><strong>Feedback</strong>: Alert, Toast, Tooltip, Popover, ProgressBar, Skeleton</li>
				<li><strong>Visualization</strong>: Sparkline, Gauge, ProgressRing, EquityChart</li>
				<li><strong>Effects</strong>: GridPulse, Delaunay, Isometric, ParticleFlow, Supernova backgrounds</li>
				<li>Theme system with CSS variables and Tailwind v4 preset</li>
				<li>Dark-first design with light mode support</li>
			</ul>
		</div>
	</section>
</div>

<style>
	.space-y-xxl > :not(:first-child) {
		margin-top: var(--spacing-xxl);
	}
	.space-y-lg > :not(:first-child) {
		margin-top: var(--spacing-lg);
	}
	.space-y-xs > :not(:first-child) {
		margin-top: var(--spacing-xs);
	}
</style>
