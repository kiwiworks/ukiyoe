<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ChipGroupType = 'single' | 'multiple';

	export interface ChipGroupProps {
		/** Selection mode — single allows one active chip, multiple allows many */
		type?: ChipGroupType;
		/** Currently selected value(s) — string for single, string[] for multiple */
		value?: string | string[];
		/** Whether the entire group is disabled */
		disabled?: boolean;
		/** Orientation for keyboard navigation */
		orientation?: 'horizontal' | 'vertical';
		/** Whether keyboard navigation wraps around */
		loop?: boolean;
		/** Called when the selection changes */
		onValueChange?: (value: string | string[]) => void;
		/** Chip items rendered inside the group */
		children: Snippet;
		/** Additional CSS classes for the container */
		class?: string;
	}
</script>

<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		type = 'multiple',
		value = $bindable(type === 'multiple' ? [] : ''),
		disabled = false,
		orientation = 'horizontal',
		loop = true,
		onValueChange,
		children,
		class: className
	}: ChipGroupProps = $props();
</script>

{#if type === 'single'}
	<ToggleGroup.Root
		type="single"
		value={value as string}
		onValueChange={(v) => {
			value = v;
			onValueChange?.(v);
		}}
		{disabled}
		{orientation}
		{loop}
	>
		{#snippet child({ props })}
			<div
				{...props}
				class={cn(
					'flex flex-wrap gap-1.5',
					orientation === 'vertical' && 'flex-col',
					className
				)}
			>
				{@render children()}
			</div>
		{/snippet}
	</ToggleGroup.Root>
{:else}
	<ToggleGroup.Root
		type="multiple"
		value={value as string[]}
		onValueChange={(v) => {
			value = v;
			onValueChange?.(v);
		}}
		{disabled}
		{orientation}
		{loop}
	>
		{#snippet child({ props })}
			<div
				{...props}
				class={cn(
					'flex flex-wrap gap-1.5',
					orientation === 'vertical' && 'flex-col',
					className
				)}
			>
				{@render children()}
			</div>
		{/snippet}
	</ToggleGroup.Root>
{/if}
