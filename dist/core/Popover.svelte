<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';

	export interface PopoverProps {
		open?: boolean;
		side?: PopoverSide;
		sideOffset?: number;
		align?: 'start' | 'center' | 'end';
		class?: string;
		trigger: Snippet;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { Popover } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		open = $bindable(false),
		side = 'bottom',
		sideOffset = 4,
		align = 'center',
		class: className = '',
		trigger,
		children
	}: PopoverProps = $props();
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<span {...props}>
				{@render trigger()}
			</span>
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			{side}
			{sideOffset}
			{align}
			class={cn('z-popover w-72 rounded-lg bg-bg-elevated p-4 shadow-lg border border-border-default animate-in fade-in-0 zoom-in-95', className)}
		>
			{@render children()}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
