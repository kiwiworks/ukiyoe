<script lang="ts" module>
	export type ThemeToggleSize = 'sm' | 'md' | 'lg';

	export interface ThemeToggleProps {
		size?: ThemeToggleSize;
		class?: string;
		showLabel?: boolean;
	}
</script>

<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { themeStore } from '../stores/theme.svelte';

	let { size = 'md', class: className = '', showLabel = false }: ThemeToggleProps = $props();

	const iconSize = $derived(size === 'sm' ? 14 : size === 'lg' ? 20 : 16);

	const sizeClasses: Record<ThemeToggleSize, string> = {
		sm: 'py-1 px-1.5 text-[10px]',
		md: 'py-1.5 px-2 text-[11px]',
		lg: 'py-2 px-2.5 text-xs'
	};
</script>

<button
	type="button"
	class="inline-flex items-center justify-center gap-1.5 border rounded-sm bg-transparent cursor-pointer transition-all font-mono
		{sizeClasses[size]}
		text-text-muted border-border-subtle hover:text-text-primary hover:border-border-default hover:bg-bg-hover
		focus-visible:outline-2 focus-visible:outline-accent-brand focus-visible:outline-offset-2
		{className}"
	onclick={() => themeStore.toggleMode()}
	title={themeStore.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-label={themeStore.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if themeStore.mode === 'dark'}
		<Sun size={iconSize} />
	{:else}
		<Moon size={iconSize} />
	{/if}
	{#if showLabel}
		<span class="uppercase tracking-wide font-medium">
			{themeStore.mode === 'dark' ? 'Light' : 'Dark'}
		</span>
	{/if}
</button>
