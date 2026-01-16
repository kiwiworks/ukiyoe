<script lang="ts" module>
	export type ActionMenuSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface ActionMenuProps {
		/** Button label */
		label: string;
		/** Size preset */
		size?: ActionMenuSize;
		/** Icon snippet to display before label */
		icon?: import('svelte').Snippet;
		/** Menu items */
		children: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { ChevronDown } from '@lucide/svelte';
	import Button from './Button.svelte';

	let {
		label,
		size = 'sm',
		icon,
		children,
		class: className = ''
	}: ActionMenuProps = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild>
		{#snippet children({ props })}
			<Button {size} {...props} class={className}>
				{#if icon}{@render icon()}{/if}
				{label}
				<ChevronDown size={12} />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="z-50 min-w-[180px] overflow-hidden rounded-md border border-border-default bg-bg-elevated p-1 shadow-lg"
			sideOffset={4}
			align="end"
		>
			{@render children()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
