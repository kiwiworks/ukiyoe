<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Badge, Header, ThemeProvider, ThemeToggle, CommandPalette, ThemeLabModal, Kbd, Toaster, type CommandItem } from 'ukiyoe';
	import { Settings } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Nav from '$lib/Nav.svelte';
	import { getCommandItems } from '$lib/routes';

	let { children }: { children: Snippet } = $props();

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

<ThemeProvider>
	<div class="h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden">
		<Header title="Ukiyoe UI" subtitle="Component Library" size="lg" fixed={false}>
			<button
				onclick={() => commandPaletteOpen = true}
				class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted bg-bg-tertiary border border-border-default rounded-md hover:bg-bg-hover hover:border-border-strong transition-colors"
			>
				<span>Search...</span>
				<Kbd keys="⌘K" size="xs" />
			</button>
			<ThemeToggle size="sm" />
			<Badge size="xs" variant="brand" text="v0.1" />
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
