<script lang="ts">
	import { base } from '$app/paths';
	import { Button, Badge, SectionCard, MetricCard, PageHeader, Heading, Text } from 'ukiyoe';
</script>

<svelte:head>
	<title>Ukiyoe UI - Svelte Component Library</title>
</svelte:head>

<PageHeader title="Ukiyoe UI" subtitle="Themeable Svelte 5 component library for modern web apps">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="v0.2" />
	{/snippet}
</PageHeader>

<div class="flex gap-sm mt-lg">
	<Button href="{base}/docs/install" variant="primary" size="sm">Get Started</Button>
	<Button href="{base}/components/button" variant="ghost" size="sm">Browse Components</Button>
</div>

<div class="grid grid-cols-3 gap-md mt-xxl">
	<MetricCard label="Themeable" value="CSS Vars" size="sm" />
	<MetricCard label="Framework" value="Tailwind v4" size="sm" />
	<MetricCard label="Built for" value="Svelte 5" size="sm" />
</div>

<Heading level={2} class="mt-xxl mb-md">Components</Heading>

<div class="grid grid-cols-2 gap-md">
	<SectionCard title="Buttons" href="{base}/components/button">
		<Text size="xs" variant="muted">Button, ButtonGroup, ActionMenu</Text>
	</SectionCard>
	<SectionCard title="Inputs" href="{base}/components/input">
		<Text size="xs" variant="muted">Input, Select, Textarea, FormField</Text>
	</SectionCard>
	<SectionCard title="Data Display" href="{base}/components/badge">
		<Text size="xs" variant="muted">Badge, MetricCard, DataTable, Numeric</Text>
	</SectionCard>
	<SectionCard title="Typography" href="{base}/components/text">
		<Text size="xs" variant="muted">Text, Heading, Link, CodeBlock</Text>
	</SectionCard>
	<SectionCard title="Layout" href="{base}/components/page-header">
		<Text size="xs" variant="muted">PageHeader, Widget, Modal, Panel</Text>
	</SectionCard>
	<SectionCard title="Feedback" href="{base}/components/alert">
		<Text size="xs" variant="muted">Alert, Toast, Tooltip, ProgressBar</Text>
	</SectionCard>
	<SectionCard title="Agentic" href="{base}/components/message">
		<Text size="xs" variant="muted">Message, StreamingText, AgentInput</Text>
	</SectionCard>
	<SectionCard title="Visualization" href="{base}/components/sparkline">
		<Text size="xs" variant="muted">Sparkline, Gauge, Charts</Text>
	</SectionCard>
	<SectionCard title="Effects" href="{base}/components/grid-pulse-background">
		<Text size="xs" variant="muted">Animated backgrounds and overlays</Text>
	</SectionCard>
</div>
