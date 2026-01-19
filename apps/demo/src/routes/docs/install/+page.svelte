<script lang="ts">
	import { PageHeader, Alert, SocialButton, SectionCard, MetricCard, Stepper, Text, CodeBlock, Heading } from 'ukiyoe';

	const steps = [
		{ id: 'install', label: 'Install', description: 'Add package' },
		{ id: 'deps', label: 'Dependencies', description: 'Peer packages' },
		{ id: 'vite', label: 'Vite', description: 'Configure plugin' },
		{ id: 'css', label: 'CSS', description: 'Import styles' },
		{ id: 'use', label: 'Build', description: 'Use components' }
	];

	let currentStep = $state(0);
</script>

<svelte:head>
	<title>Installation - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Installation" subtitle="Get started with Ukiyoe UI in minutes" />

<div class="flex gap-3 mt-lg">
	<SocialButton
		platform="github"
		href="https://github.com/kiwiworks/ukiyoe"
		label="kiwiworks/ukiyoe"
		variant="filled"
	/>
</div>

<Alert variant="info" class="mt-lg">
	Ukiyoe is open source but not yet published to npm. Install via GitHub.
</Alert>

<div class="mt-xl flex flex-col gap-xl">
	<section>
		<Heading level={2} id="requirements" anchor>Requirements</Heading>
		<div class="grid grid-cols-3 gap-md mt-md">
			<MetricCard label="Framework" value="Svelte 5" size="sm" />
			<MetricCard label="Styling" value="Tailwind 4" size="sm" />
			<MetricCard label="Runtime" value="Node 18+" size="sm" />
		</div>
	</section>

	<section>
		<Heading level={2} id="setup-guide" anchor>Setup Guide</Heading>
		<div class="mt-md mb-lg">
			<Stepper {steps} {currentStep} orientation="horizontal" size="sm" onStepClick={(i) => currentStep = i} />
		</div>

		<div class="flex flex-col gap-md">
			<SectionCard title="1. Install Package">
				<Text variant="muted" class="mb-md">Add Ukiyoe to your project via GitHub:</Text>
				<CodeBlock code="bun add github:kiwiworks/ukiyoe" />
			</SectionCard>

			<SectionCard title="2. Peer Dependencies">
				<Text variant="muted" class="mb-md">Install required peer dependencies:</Text>
				<CodeBlock code="bun add bits-ui @lucide/svelte @internationalized/date tailwindcss @tailwindcss/vite" />
			</SectionCard>

			<SectionCard title="3. Vite Configuration">
				<Text variant="muted" class="mb-md">Add the Tailwind CSS plugin to your Vite config:</Text>
				<CodeBlock code={`// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()]
});`} />
			</SectionCard>

			<SectionCard title="4. CSS Setup">
				<Text variant="muted" class="mb-md">In your main CSS file (e.g., <code class="text-xs bg-bg-tertiary px-1.5 py-0.5 rounded">app.css</code>):</Text>
				<CodeBlock code={`@import 'tailwindcss';
@import 'ukiyoe/styles.css';

/* Scan your app and ukiyoe for Tailwind classes */
@source "../";
@source "../../node_modules/ukiyoe/dist";`} />
			</SectionCard>

			<SectionCard title="5. Start Building">
				<Text variant="muted" class="mb-md">Import and use components:</Text>
				<CodeBlock code={`<script>
  import { Button, Input, Badge } from 'ukiyoe';
</script>

<Button variant="primary">Click me</Button>
<Input placeholder="Enter text..." />
<Badge variant="success" text="Active" />`} />
			</SectionCard>
		</div>
	</section>
</div>
