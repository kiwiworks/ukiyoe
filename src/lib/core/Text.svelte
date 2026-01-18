<script lang="ts" module>
	export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	export type TextVariant = 'primary' | 'secondary' | 'muted' | 'positive' | 'negative' | 'warning';
	export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
	export type TextElement = 'p' | 'span' | 'div' | 'label';

	export interface TextProps {
		size?: TextSize;
		variant?: TextVariant;
		weight?: TextWeight;
		as?: TextElement;
		mono?: boolean;
		truncate?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		size = 'sm',
		variant = 'secondary',
		weight = 'normal',
		as = 'p',
		mono = false,
		truncate = false,
		class: className = '',
		children
	}: TextProps = $props();

	const sizeClasses: Record<TextSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl'
	};

	const variantClasses: Record<TextVariant, string> = {
		primary: 'text-text-primary',
		secondary: 'text-text-secondary',
		muted: 'text-text-muted',
		positive: 'text-positive',
		negative: 'text-negative',
		warning: 'text-warning'
	};

	const weightClasses: Record<TextWeight, string> = {
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};

	const computedClasses = $derived(
		cn(
			sizeClasses[size],
			variantClasses[variant],
			weightClasses[weight],
			mono && 'font-mono',
			truncate && 'truncate',
			className
		)
	);
</script>

{#if as === 'p'}
	<p class={computedClasses}>{@render children()}</p>
{:else if as === 'span'}
	<span class={computedClasses}>{@render children()}</span>
{:else if as === 'div'}
	<div class={computedClasses}>{@render children()}</div>
{:else if as === 'label'}
	<label class={computedClasses}>{@render children()}</label>
{/if}
