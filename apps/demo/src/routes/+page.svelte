<script lang="ts">
	import { Button, Badge, SectionCard, MetricCard, PageHeader, Heading, Text } from 'ukiyoe';
</script>

<svelte:head>
	<title>Ukiyoe UI - Svelte Component Library</title>
</svelte:head>

<PageHeader title="Ukiyoe UI" subtitle="Themeable Svelte 5 component library for modern web apps">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="Alpha" />
	{/snippet}
</PageHeader>

<div class="flex gap-sm mt-lg">
	<Button href="/docs/install" variant="primary" size="sm">Get Started</Button>
	<Button href="/components/button" variant="ghost" size="sm">Browse Components</Button>
</div>

<div class="grid grid-cols-3 gap-md mt-xxl">
	<MetricCard label="Themeable" value="CSS Vars" size="sm" />
	<MetricCard label="Framework" value="Tailwind v4" size="sm" />
	<MetricCard label="Built for" value="Svelte 5" size="sm" />
</div>

<Heading level={2} class="mt-xxl mb-md">Components</Heading>

<div class="grid grid-cols-2 gap-md">
	<SectionCard title="Buttons" href="/components/button">
		<Text size="xs" variant="muted">Button, ButtonGroup, ActionMenu</Text>
	</SectionCard>
	<SectionCard title="Inputs" href="/components/input">
		<Text size="xs" variant="muted">Input, Select, Textarea, FormField</Text>
	</SectionCard>
	<SectionCard title="Data Display" href="/components/badge">
		<Text size="xs" variant="muted">Badge, MetricCard, DataTable, Numeric</Text>
	</SectionCard>
	<SectionCard title="Typography" href="/components/text">
		<Text size="xs" variant="muted">Text, Heading, Link, CodeBlock</Text>
	</SectionCard>
	<SectionCard title="Layout" href="/components/page-header">
		<Text size="xs" variant="muted">PageHeader, Widget, Modal, Panel</Text>
	</SectionCard>
	<SectionCard title="Feedback" href="/components/privacy-toggle">
		<Text size="xs" variant="muted">PrivacyToggle, RefreshControl, Avatars</Text>
	</SectionCard>
	<SectionCard title="Visualization" href="/components/sparkline">
		<Text size="xs" variant="muted">Sparkline, Gauge, Charts</Text>
	</SectionCard>
	<SectionCard title="Effects" href="/components/grid-pulse-background">
		<Text size="xs" variant="muted">Animated backgrounds and overlays</Text>
	</SectionCard>
</div>
