<script lang="ts" module>
	export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'brand';
	export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface BadgeProps {
		variant?: BadgeVariant;
		size?: BadgeSize;
		pulse?: boolean;
		showDot?: boolean;
		text?: string;
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let {
		variant = 'default',
		size = 'sm',
		pulse = false,
		showDot = false,
		text,
		children
	}: BadgeProps = $props();

	const sizeClasses: Record<BadgeSize, string> = {
		xs: 'px-1 py-0.5 text-xs',
		sm: 'px-1.5 py-0.5 text-sm',
		md: 'px-2 py-1 text-md',
		lg: 'px-3 py-1.5 text-base'
	};

	const dotVariantClasses = {
		default: 'bg-text-muted',
		primary: 'bg-accent-brand',
		success: 'bg-positive',
		danger: 'bg-negative',
		warning: 'bg-warning',
		info: 'bg-info',
		muted: 'bg-text-muted',
		brand: 'bg-accent-brand'
	};

	const badgeVariantClasses = {
		default: 'bg-bg-active text-text-secondary',
		primary: 'bg-accent-brand text-text-inverse',
		success: 'bg-positive text-text-inverse',
		danger: 'bg-negative text-text-primary',
		warning: 'bg-warning text-text-inverse',
		info: 'bg-info text-text-inverse',
		muted: 'bg-bg-hover text-text-muted',
		brand: 'bg-accent-brand text-text-inverse'
	};
</script>

{#if showDot}
	<span class="inline-flex items-center gap-1 text-xs text-text-secondary">
		<span
			class="h-1.5 w-1.5 rounded-md {dotVariantClasses[variant]}"
			class:animate-pulse={pulse}
		></span>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</span>
{:else}
	<span
		class="inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wider rounded-sm {badgeVariantClasses[
			variant
		]} {sizeClasses[size]}"
		class:animate-pulse={pulse}
	>
		{#if children}
			{@render children()}
		{:else if text}
			{text}
		{/if}
	</span>
{/if}
