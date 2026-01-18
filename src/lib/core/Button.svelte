<script lang="ts" module>
	export type ButtonVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
	export type ButtonType = 'button' | 'submit' | 'reset';

	export interface ButtonProps {
		/** Visual style variant */
		variant?: ButtonVariant;
		/** Size preset */
		size?: ButtonSize;
		/** HTML button type attribute */
		type?: ButtonType;
		/** Disable interactions */
		disabled?: boolean;
		/** Visual active/pressed state */
		active?: boolean;
		/** Show loading spinner and disable interactions */
		loading?: boolean;
		/** Render as anchor element with this href */
		href?: string;
		/** Make button full-width */
		fullWidth?: boolean;
		/** Accessible label for icon-only buttons */
		'aria-label'?: string;
		/** Additional CSS classes */
		class?: string;
		/** Inline styles */
		style?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Button content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		variant = 'default',
		size = 'md',
		type = 'button',
		disabled = false,
		active = false,
		loading = false,
		href,
		fullWidth = false,
		'aria-label': ariaLabel,
		class: className = '',
		style,
		onclick,
		children
	}: ButtonProps = $props();

	const baseClasses =
		'inline-flex items-center gap-1 font-mono font-bold uppercase tracking-wide transition-all duration-100 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-accent-brand focus-visible:outline-offset-2';

	const sizeClasses: Record<ButtonSize, string> = {
		xs: 'px-2 py-1 text-xs rounded-sm',
		sm: 'px-2.5 py-1 text-sm rounded-md',
		md: 'px-3 py-1.5 text-md rounded-md',
		lg: 'px-4 py-2 text-lg rounded-lg'
	};

	const variantClasses: Record<ButtonVariant, string> = {
		default: 'bg-bg-hover text-text-secondary hover:bg-bg-active hover:text-text-primary',
		primary: 'bg-accent-brand text-text-inverse hover:bg-accent-brand-hover',
		success: 'bg-positive text-bg-primary hover:bg-positive-hover',
		danger: 'bg-negative text-text-inverse hover:bg-negative-hover',
		warning: 'bg-warning text-text-inverse hover:bg-warning-hover',
		ghost: 'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary',
		outline: 'bg-transparent border border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary'
	};

	const activeVariantClasses: Record<ButtonVariant, string> = {
		default: 'bg-border-strong text-text-primary',
		primary: 'bg-accent-brand-hover',
		success: 'bg-positive-hover',
		danger: 'bg-negative-hover',
		warning: 'bg-warning-hover',
		ghost: 'bg-bg-active text-text-primary',
		outline: 'border-accent-brand text-accent-brand bg-accent-brand/10'
	};

	const computedClasses = $derived(
		cn(
			baseClasses,
			sizeClasses[size],
			active ? activeVariantClasses[variant] : variantClasses[variant],
			fullWidth && 'w-full justify-center',
			className
		)
	);
</script>

{#if href}
	<a
		{href}
		class="{computedClasses} no-underline"
		class:pointer-events-none={disabled || loading}
		aria-label={ariaLabel}
		aria-disabled={disabled || loading}
		{style}
	>
		{#if loading}
			<span class="inline-block animate-spin mr-1">...</span>
		{/if}
		{@render children()}
	</a>
{:else}
	<button
		{type}
		class={computedClasses}
		disabled={disabled || loading}
		aria-label={ariaLabel}
		aria-busy={loading}
		aria-pressed={active}
		{onclick}
		{style}
	>
		{#if loading}
			<span class="inline-block animate-spin mr-1">...</span>
		{/if}
		{@render children()}
	</button>
{/if}
