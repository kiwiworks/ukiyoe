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
	import { cn } from '../utils/cn';

	let {
		title,
		subtitle,
		variant = 'default',
		class: className = '',
		headerActions,
		children
	}: WidgetProps = $props();

	const variantClasses: Record<WidgetVariant, string> = {
		default: 'bg-bg-secondary border border-border-subtle rounded-md',
		compact: 'bg-bg-primary border border-bg-elevated rounded-sm',
		borderless: 'bg-transparent'
	};
</script>

<div class={cn('flex flex-col font-mono text-xs', variantClasses[variant], className)}>
	{#if title}
		<div class="flex items-center justify-between px-sm py-xs border-b border-border-subtle">
			<div class="flex items-center gap-sm">
				<span class="text-text-muted text-[10px] uppercase tracking-wide">{title}</span>
				{#if subtitle}
					<span class="text-text-muted text-[9px]">{subtitle}</span>
				{/if}
			</div>
			{#if headerActions}
				<div class="flex items-center gap-xs">
					{@render headerActions()}
				</div>
			{/if}
		</div>
	{/if}
	<div class="flex-1 p-sm">
		{@render children()}
	</div>
</div>
