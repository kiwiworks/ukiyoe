<script lang="ts">
	import type { Snippet } from 'svelte';
	import { themeStore } from './stores/theme.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Apply CSS variables and theme mode to :root so they're available for portals (modals, tooltips, etc.)
	$effect(() => {
		const vars = themeStore.cssVars;
		document.documentElement.style.cssText = vars;
		document.documentElement.dataset.theme = themeStore.mode;
	});
</script>

<div class="theme-root">
	{@render children()}
</div>

<style>
	.theme-root {
		min-height: calc(100vh / var(--ui-scale, 1));
		background-color: var(--bg-primary);
		color: var(--text-primary);
		font-family: var(--font-mono);
	}
</style>
