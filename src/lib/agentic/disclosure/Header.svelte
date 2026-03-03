<script lang="ts" module>
	export interface DisclosureHeaderProps {
		/** Header title text */
		title: string;
		/** Use monospace font for title */
		mono?: boolean;
		/** Icon snippet rendered before the title */
		icon?: import('svelte').Snippet;
		/** Trailing snippet rendered after the title */
		trailing?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronRight, ChevronDown } from '@lucide/svelte';
	import { cn } from '../../utils/cn';
	import { getDisclosureContext } from './context.svelte';

	let {
		title,
		mono = false,
		icon,
		trailing,
		class: className = ''
	}: DisclosureHeaderProps = $props();

	const ctx = getDisclosureContext();
</script>

<button
	type="button"
	class={cn(
		'flex items-center gap-2 w-full px-3 py-2 text-sm bg-bg-secondary hover:bg-bg-hover transition-colors cursor-pointer touch-target',
		className
	)}
	onclick={() => ctx.toggle()}
>
	{#if ctx.expanded}
		<ChevronDown size={14} class="text-text-muted shrink-0" />
	{:else}
		<ChevronRight size={14} class="text-text-muted shrink-0" />
	{/if}
	{#if icon}
		{@render icon()}
	{/if}
	<span class={cn('text-text-primary truncate', mono && 'font-mono')}>{title}</span>
	{#if trailing}
		{@render trailing()}
	{/if}
</button>
