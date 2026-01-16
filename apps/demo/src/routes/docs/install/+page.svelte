<script lang="ts">
	import { PageHeader, Alert, Text, CodeBlock, Heading, Badge } from 'ukiyoe';
</script>

<svelte:head>
	<title>Installation - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Installation" subtitle="Get started with Ukiyoe UI">
	{#snippet badges()}
		<Badge size="sm" variant="info" text="Public Beta" />
	{/snippet}
</PageHeader>

<Alert variant="info" class="mt-lg">
	<strong>Public Beta</strong> — Ukiyoe is open source but not yet published to npm.
	Clone the repository or use a git dependency for now.
</Alert>

<div class="mt-xl space-y-xl">
	<section>
		<Heading level={2} size="lg" class="mb-md">Requirements</Heading>
		<ul class="list-disc list-inside text-sm text-text-secondary space-y-xs">
			<li>Svelte 5.0+</li>
			<li>Tailwind CSS 4.0+</li>
			<li>Node.js 18+ or Bun</li>
		</ul>
	</section>

	<section>
		<Heading level={2} size="lg" class="mb-md">Installation</Heading>
		<Text variant="muted" class="mb-md">Install via git dependency:</Text>
		<CodeBlock code="bun add github:kiwiworks/ukiyoe" />
		<Text variant="muted" size="xs" class="mt-sm">Once published to npm, you'll be able to use: <code class="text-text-primary">bun add ukiyoe</code></Text>
	</section>

	<section>
		<Heading level={2} size="lg" class="mb-md">Peer Dependencies</Heading>
		<Text variant="muted" class="mb-md">Ukiyoe requires these peer dependencies:</Text>
		<CodeBlock code={`bun add bits-ui @lucide/svelte @internationalized/date tailwindcss`} />
	</section>

	<section>
		<Heading level={2} size="lg" class="mb-md">Tailwind Configuration</Heading>
		<Text variant="muted" class="mb-md">Import the Ukiyoe preset in your Tailwind config:</Text>
		<CodeBlock
			code={`// tailwind.config.ts
import ukiyoePreset from 'ukiyoe/tailwind.preset';

export default {
  presets: [ukiyoePreset],
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/ukiyoe/dist/**/*.{html,js,svelte,ts}'
  ]
};`}
		/>
	</section>

	<section>
		<Heading level={2} size="lg" class="mb-md">Import Styles</Heading>
		<Text variant="muted" class="mb-md">Import the base styles in your app entry:</Text>
		<CodeBlock code={`import 'ukiyoe/styles.css';`} />
	</section>

	<section>
		<Heading level={2} size="lg" class="mb-md">Usage</Heading>
		<Text variant="muted" class="mb-md">Import and use components:</Text>
		<CodeBlock
			code={`<script>
  import { Button, Input, Badge } from 'ukiyoe';
</script>

<Button variant="primary">Click me</Button>
<Input placeholder="Enter text..." />
<Badge variant="success" text="Active" />`}
		/>
	</section>
</div>

<style>
	.space-y-xl > :not(:first-child) {
		margin-top: var(--spacing-xl);
	}
	.space-y-xs > :not(:first-child) {
		margin-top: var(--spacing-xs);
	}
</style>
