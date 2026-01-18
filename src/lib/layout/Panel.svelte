<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface PanelProps {
		title: string;
		collapsible?: boolean;
		defaultCollapsed?: boolean;
		headerActions?: Snippet;
		children: Snippet;
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronUp, ChevronDown } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		title,
		collapsible = false,
		defaultCollapsed = false,
		headerActions,
		children,
		class: className
	}: PanelProps = $props();

	let collapsed = $state(false);

	// Sync with prop changes
	$effect(() => {
		collapsed = defaultCollapsed;
	});

	function toggleCollapse() {
		if (collapsible) {
			collapsed = !collapsed;
		}
	}
</script>

<div class={cn('flex flex-col bg-bg-secondary border border-border-subtle rounded-md font-mono text-xs', className)}>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class={cn(
			'flex items-center justify-between px-sm py-xs border-b border-border-subtle',
			collapsible && 'cursor-pointer hover:bg-bg-tertiary'
		)}
		onclick={toggleCollapse}
		role={collapsible ? 'button' : undefined}
		tabindex={collapsible ? 0 : -1}
		aria-expanded={collapsible ? !collapsed : undefined}
		aria-controls={collapsible ? 'panel-body' : undefined}
		onkeydown={(e) => {
			if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				toggleCollapse();
			}
		}}
	>
		<div class="flex items-center gap-sm">
			<span class="text-text-muted text-[10px] font-semibold uppercase tracking-wide">{title}</span>
			{#if collapsible}
				<div class="text-text-muted">
					{#if collapsed}
						<ChevronDown size={12} />
					{:else}
						<ChevronUp size={12} />
					{/if}
				</div>
			{/if}
		</div>
		{#if headerActions}
			<div class="flex items-center gap-xs" role="presentation" onpointerdown={(e) => e.stopPropagation()}>
				{@render headerActions()}
			</div>
		{/if}
	</div>
	{#if !collapsed}
		<div class="flex-1 p-sm" id="panel-body">
			{@render children()}
		</div>
	{/if}
</div>
