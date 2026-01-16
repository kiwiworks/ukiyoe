<script lang="ts">
	import { PageHeader, Text, Badge, Heading } from 'ukiyoe';
</script>

<svelte:head>
	<title>Changelog - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Changelog" subtitle="All notable changes to this project">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="v0.1.0-beta.1" />
	{/snippet}
</PageHeader>

<div class="mt-lg space-y-xxl">
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
