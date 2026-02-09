<script lang="ts" module>
	export interface ContextMenuDividerProps {
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import { cn } from '../../utils/cn';

	let { class: className = '' }: ContextMenuDividerProps = $props();
</script>

<ContextMenu.Separator class={cn('h-px bg-border-subtle my-1', className)} />
