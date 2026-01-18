<script lang="ts" module>
	export type KbdSize = 'xs' | 'sm' | 'md';

	export interface KbdProps {
		/** The key or key combination to display */
		keys?: string | string[];
		/** Size preset */
		size?: KbdSize;
		/** Additional CSS classes */
		class?: string;
		/** Children snippet for custom content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		keys,
		size = 'sm',
		class: className = '',
		children
	}: KbdProps = $props();

	const sizeClasses: Record<KbdSize, string> = {
		xs: 'text-[10px] px-1 py-0.5 min-w-[1.25rem] gap-0.5',
		sm: 'text-xs px-1.5 py-0.5 min-w-[1.5rem] gap-1',
		md: 'text-sm px-2 py-1 min-w-[1.75rem] gap-1'
	};

	// Parse keys - can be string like "⌘K" or array like ["⌘", "K"]
	const keyList = $derived(
		keys ? (Array.isArray(keys) ? keys : [keys]) : []
	);
</script>

{#if children}
	<kbd
		class={cn(
			'inline-flex items-center justify-center font-mono font-medium rounded border',
			'bg-bg-tertiary border-border-default text-text-secondary',
			'shadow-[0_1px_0_1px_var(--border-subtle)]',
			sizeClasses[size],
			className
		)}
	>
		{@render children()}
	</kbd>
{:else if keyList.length > 0}
	<span class="inline-flex items-center {sizeClasses[size]}">
		{#each keyList as key, i}
			{#if i > 0}
				<span class="text-text-muted">+</span>
			{/if}
			<kbd
				class={cn(
					'inline-flex items-center justify-center font-mono font-medium rounded border',
					'bg-bg-tertiary border-border-default text-text-secondary',
					'shadow-[0_1px_0_1px_var(--border-subtle)]',
					sizeClasses[size],
					className
				)}
			>
				{key}
			</kbd>
		{/each}
	</span>
{/if}
