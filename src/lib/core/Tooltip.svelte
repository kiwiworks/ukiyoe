<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

	export interface TooltipProps {
		content: string;
		side?: TooltipSide;
		sideOffset?: number;
		delayDuration?: number;
		class?: string;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		content,
		side = 'top',
		sideOffset = 4,
		delayDuration = 200,
		class: className = '',
		children
	}: TooltipProps = $props();
</script>

<Tooltip.Provider {delayDuration}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<span {...props}>
					{@render children()}
				</span>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Portal>
			<Tooltip.Content
				{side}
				{sideOffset}
				class={cn('z-tooltip rounded-md bg-bg-elevated px-3 py-1.5 text-sm text-text-primary shadow-lg border border-border-subtle animate-in fade-in-0 zoom-in-95', className)}
			>
				{content}
				<Tooltip.Arrow class="fill-bg-elevated" />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
