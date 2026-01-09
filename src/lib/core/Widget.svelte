<script lang="ts" module>
	export type WidgetVariant = 'default' | 'compact' | 'borderless';

	export interface WidgetProps {
		title?: string;
		subtitle?: string;
		variant?: WidgetVariant;
		class?: string;
		headerActions?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let {
		title,
		subtitle,
		variant = 'default',
		class: className = '',
		headerActions,
		children
	}: WidgetProps = $props();
</script>

<div class="widget widget-{variant} {className}">
	{#if title}
		<div class="widget-header">
			<div class="widget-header-content">
				<span class="widget-title">{title}</span>
				{#if subtitle}
					<span class="widget-subtitle">{subtitle}</span>
				{/if}
			</div>
			{#if headerActions}
				<div class="widget-actions">
					{@render headerActions()}
				</div>
			{/if}
		</div>
	{/if}
	<div class="widget-body">
		{@render children()}
	</div>
</div>

<style>
	.widget {
		display: flex;
		flex-direction: column;
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
	}

	.widget-default {
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.widget-compact {
		background-color: var(--bg-primary);
		border: 1px solid var(--bg-elevated);
		border-radius: var(--radius-sm);
	}

	.widget-borderless {
		background-color: transparent;
	}

	.widget-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.25rem 0.5rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.widget-header-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.widget-title {
		color: var(--text-muted);
		font-size: calc(var(--font-size-xs) * 0.833);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.widget-subtitle {
		color: var(--border-strong);
		font-size: calc(var(--font-size-xs) * 0.75);
	}

	.widget-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.widget-body {
		flex: 1;
		overflow: visible;
	}
</style>
