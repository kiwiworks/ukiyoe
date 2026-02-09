<script lang="ts" module>
	export type DividerVariant = 'subtle' | 'default' | 'strong';
	export type DividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';

	export interface DividerProps {
		variant?: DividerVariant;
		spacing?: DividerSpacing;
		vertical?: boolean;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		variant = 'subtle',
		spacing = 'sm',
		vertical = false,
		class: className = ''
	}: DividerProps = $props();

	const variantClasses: Record<DividerVariant, string> = {
		subtle: 'bg-border-subtle',
		default: 'bg-border-default',
		strong: 'bg-border-strong'
	};

	const horizontalSpacingClasses: Record<DividerSpacing, string> = {
		none: '',
		xs: 'my-xs',
		sm: 'my-sm',
		md: 'my-md',
		lg: 'my-lg'
	};

	const verticalSpacingClasses: Record<DividerSpacing, string> = {
		none: '',
		xs: 'mx-xs',
		sm: 'mx-sm',
		md: 'mx-md',
		lg: 'mx-lg'
	};

	const computedClasses = $derived(
		cn(
			variantClasses[variant],
			vertical ? 'w-px h-full' : 'h-px w-full',
			vertical ? verticalSpacingClasses[spacing] : horizontalSpacingClasses[spacing],
			className
		)
	);
</script>

<div class={computedClasses} role="separator" aria-orientation={vertical ? 'vertical' : 'horizontal'}></div>
