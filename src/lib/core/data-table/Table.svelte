<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DataTableTableProps {
		/** Additional CSS classes */
		class?: string;
		/** Children (Header and Body) */
		children: Snippet;
	}
</script>

<script lang="ts">
	import { getDataTableContext } from './context.svelte';

	let { class: className = '', children }: DataTableTableProps = $props();

	const ctx = getDataTableContext();

	const tableClasses = $derived(
		`w-full border-collapse font-mono ${ctx.compact ? 'text-[10px]' : 'text-[11px]'}`
	);
</script>

<div class="overflow-auto flex-1 {className}">
	<table class={tableClasses}>
		{@render children()}
	</table>
</div>
