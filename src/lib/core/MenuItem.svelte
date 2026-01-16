<script lang="ts" module>
	export type MenuItemVariant = 'default' | 'danger' | 'admin';

	export interface MenuItemProps {
		/** Visual variant */
		variant?: MenuItemVariant;
		/** Disable interactions */
		disabled?: boolean;
		/** Click handler */
		onclick?: () => void;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Item content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	let {
		variant = 'default',
		disabled = false,
		onclick,
		icon,
		children
	}: MenuItemProps = $props();

	const variantClasses: Record<MenuItemVariant, string> = {
		default: 'text-text-secondary data-[highlighted]:text-text-primary',
		danger: 'text-negative data-[highlighted]:bg-negative/15',
		admin: 'text-warning data-[highlighted]:bg-warning/15'
	};
</script>

<DropdownMenu.Item
	{disabled}
	onSelect={onclick}
	class="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-sm cursor-pointer select-none outline-none transition-colors data-[highlighted]:bg-bg-hover data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed {variantClasses[variant]}"
>
	{#if icon}
		<span class="flex items-center justify-center">{@render icon()}</span>
	{/if}
	{@render children()}
</DropdownMenu.Item>
