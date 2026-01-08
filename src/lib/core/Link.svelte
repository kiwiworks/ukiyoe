<script lang="ts" module>
	export type LinkVariant = 'default' | 'muted' | 'brand';

	export interface LinkProps {
		href: string;
		variant?: LinkVariant;
		external?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let {
		href,
		variant = 'default',
		external = false,
		class: className = '',
		children
	}: LinkProps = $props();

	const variantClasses: Record<LinkVariant, string> = {
		default: 'text-text-secondary hover:text-text-primary',
		muted: 'text-text-muted hover:text-text-secondary',
		brand: 'text-accent-brand hover:text-accent-brand-hover'
	};

	const computedClasses = $derived(
		`transition-colors duration-100 ${variantClasses[variant]} ${className}`.trim()
	);
</script>

<a
	{href}
	class={computedClasses}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
>
	{@render children()}
</a>
