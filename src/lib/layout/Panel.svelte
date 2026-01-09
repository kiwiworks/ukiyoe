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

	let {
		title,
		collapsible = false,
		defaultCollapsed = false,
		headerActions,
		children,
		class: className = ''
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

<div class="panel {className}">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="panel-header"
		class:panel-header-collapsible={collapsible}
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
		<div class="panel-header-left">
			<span class="panel-title">{title}</span>
			{#if collapsible}
				<div class="panel-collapse-icon">
					{#if collapsed}
						<ChevronDown size={12} />
					{:else}
						<ChevronUp size={12} />
					{/if}
				</div>
			{/if}
		</div>
		{#if headerActions}
			<div class="panel-actions" role="presentation" onpointerdown={(e) => e.stopPropagation()}>
				{@render headerActions()}
			</div>
		{/if}
	</div>
	{#if !collapsed}
		<div class="panel-body" id="panel-body">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.panel {
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.375rem 0.75rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.panel-header-collapsible {
		cursor: pointer;
	}

	.panel-header-collapsible:hover {
		background-color: var(--bg-tertiary);
	}

	.panel-header-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.panel-title {
		color: var(--text-secondary);
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.panel-collapse-icon {
		color: var(--text-muted);
	}

	.panel-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.panel-body {
		flex: 1;
		overflow: hidden;
		transition: all 0.2s ease;
	}
</style>
