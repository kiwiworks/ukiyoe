<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { base, assets } from '$app/paths';
	import { Badge, BrandIcon, Header, ThemeProvider, ThemeToggle, CommandPalette, ThemeLabModal, Kbd, Toaster, Meta, type CommandItem } from 'ukiyoe';
	import { Settings } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Nav from '$lib/Nav.svelte';
	import { getCommandItems } from '$lib/routes';

	let { children }: { children: Snippet } = $props();

	const siteUrl = 'https://kiwiworks.github.io/ukiyoe';
	const ogImage = `${siteUrl}/og-image.svg`;

	let commandPaletteOpen = $state(false);
	let themeLabOpen = $state(false);

	const commandItems = getCommandItems();

	function handleCommandSelect(item: CommandItem) {
		if (item.href) {
			const fullHref = item.href === '/' ? (base || '/') : base + item.href;
			goto(fullHref);
		}
	}
</script>

<Meta
	siteName="Ukiyoe UI"
	description="Svelte 5 component library with dark-first design. 70+ accessible, customizable components for modern web applications."
	url={siteUrl}
	image={ogImage}
	imageAlt="Ukiyoe UI - Svelte 5 Component Library"
	twitterCard="summary_large_image"
	keywords={['svelte', 'svelte5', 'components', 'ui', 'design-system', 'dark-mode', 'tailwind']}
/>

<ThemeProvider>
	<div class="h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden">
		<Header title="Ukiyoe UI" subtitle="Component Library" size="lg" fixed={false} showIndicator={false}>
			{#snippet icon()}
				<BrandIcon size="md" animation="wave" animationDuration={15} color="var(--accent-brand)" />
			{/snippet}
			<button
				onclick={() => commandPaletteOpen = true}
				class="flex items-center gap-md px-lg py-sm text-sm text-text-muted bg-bg-tertiary border border-border-default rounded-md hover:bg-bg-hover hover:border-border-strong transition-colors"
			>
				<span>Search...</span>
				<Kbd keys="⌘K" size="xs" />
			</button>
			<ThemeToggle size="sm" />
			<Badge size="xs" variant="brand" text="v0.2" />
		</Header>

		<div class="flex flex-1 overflow-hidden">
			<Nav />
			<main class="flex-1 overflow-y-auto p-lg">
				{@render children()}
			</main>
		</div>
	</div>

	<CommandPalette
		bind:open={commandPaletteOpen}
		items={commandItems}
		placeholder="Search components..."
		onSelect={handleCommandSelect}
	/>

	<!-- Floating Settings Button -->
	<button
		class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-bg-elevated border border-border-default shadow-lg transition-all hover:bg-bg-hover hover:border-accent-brand hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-brand/50"
		onclick={() => themeLabOpen = true}
		aria-label="Open theme settings"
	>
		<Settings size={20} class="text-text-secondary" />
	</button>

	<ThemeLabModal bind:open={themeLabOpen} />
	<Toaster position="top-right" />
</ThemeProvider>
