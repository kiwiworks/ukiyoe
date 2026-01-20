<script lang="ts" module>
	export type ContextMenuItemVariant = 'default' | 'danger';

	export interface ContextMenuItemProps {
		/** Visual variant */
		variant?: ContextMenuItemVariant;
		/** Disable interactions */
		disabled?: boolean;
		/** Click handler */
		onclick?: () => void;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Item content */
		children: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import { cn } from '../../utils/cn';

	let {
		variant = 'default',
		disabled = false,
		onclick,
		icon,
		children,
		class: className = ''
	}: ContextMenuItemProps = $props();

	const variantClasses: Record<ContextMenuItemVariant, string> = {
		default: 'text-text-secondary data-[highlighted]:text-text-primary',
		danger: 'text-negative data-[highlighted]:bg-negative/15'
	};
</script>

<ContextMenu.Item
	{disabled}
	onSelect={onclick}
	class={cn(
		'flex items-center gap-2 w-full px-3 py-2 text-xs rounded-sm cursor-pointer select-none outline-none transition-colors data-[highlighted]:bg-bg-hover data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
		variantClasses[variant],
		className
	)}
>
	{#if icon}
		<span class="flex items-center justify-center">{@render icon()}</span>
	{/if}
	{@render children()}
</ContextMenu.Item>
