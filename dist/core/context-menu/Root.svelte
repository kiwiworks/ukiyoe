<script lang="ts" module>
	export interface ContextMenuRootProps {
		/** Trigger area content */
		children: import('svelte').Snippet;
		/** Menu items */
		items: import('svelte').Snippet;
		/** Disable context menu */
		disabled?: boolean;
		/** Additional CSS classes for the menu content */
		class?: string;
	}
</script>

<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import { cn } from '../../utils/cn';

	let {
		children,
		items,
		disabled = false,
		class: className = ''
	}: ContextMenuRootProps = $props();
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger {disabled} class="contents">
		{@render children()}
	</ContextMenu.Trigger>

	<ContextMenu.Portal>
		<ContextMenu.Content
			class={cn(
				'z-50 min-w-[180px] overflow-hidden rounded-md border border-border-default bg-bg-elevated p-1 shadow-lg',
				className
			)}
		>
			{@render items()}
		</ContextMenu.Content>
	</ContextMenu.Portal>
</ContextMenu.Root>
