<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SelectableCardProps {
		/** Whether the card is selected */
		selected?: boolean;
		/** Whether the card is disabled */
		disabled?: boolean;
		/** Show a check indicator when selected */
		showCheck?: boolean;
		/** Called when the card is pressed */
		onSelect?: (selected: boolean) => void;
		/** Card content */
		children: Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		selected = $bindable(false),
		disabled = false,
		showCheck = true,
		onSelect,
		children,
		class: className
	}: SelectableCardProps = $props();

	function handleClick() {
		if (disabled) return;
		selected = !selected;
		onSelect?.(selected);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	class={cn(
		'relative rounded-lg border bg-bg-secondary p-4 transition-all cursor-pointer',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20',
		selected
			? 'border-accent-brand ring-1 ring-accent-brand/30 bg-accent-brand/5'
			: 'border-border-default hover:border-border-default hover:bg-bg-hover',
		disabled && 'opacity-50 cursor-not-allowed',
		className
	)}
	role="option"
	aria-selected={selected}
	aria-disabled={disabled}
	tabindex={disabled ? -1 : 0}
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	{#if showCheck && selected}
		<div class="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent-brand flex items-center justify-center">
			<Check size={12} class="text-text-inverse" />
		</div>
	{/if}
	{@render children()}
</div>
