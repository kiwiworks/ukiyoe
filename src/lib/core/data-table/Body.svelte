<script lang="ts" module>
	export interface DataTableBodyProps {
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { getDataTableContext } from './context.svelte';

	let { class: className = '' }: DataTableBodyProps = $props();

	const ctx = getDataTableContext();

	const getTdClasses = (column: typeof ctx.columns[0], isLastRow: boolean) => {
		const padding = ctx.compact ? 'px-3 py-1.5' : 'px-4 py-2.5';
		const border = isLastRow ? '' : 'border-b border-border-subtle';
		const align = column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '';
		return `${padding} ${border} text-text-primary ${align}`;
	};

	const getRowClasses = (index: number) => {
		const clickable = ctx.onRowClick ? 'cursor-pointer' : '';
		const striped = ctx.striped && index % 2 === 0 ? 'bg-bg-primary' : '';
		const hoverable = ctx.hoverable ? 'hover:bg-bg-hover' : '';
		return `${clickable} ${striped} ${hoverable}`;
	};
</script>

<tbody class={className}>
	{#if ctx.paginatedData().length === 0}
		<tr>
			<td colspan={ctx.columns.length} class="p-0">
				{#if ctx.emptySnippet}
					{@render ctx.emptySnippet()}
				{:else}
					<div class="flex items-center justify-center p-8 text-text-muted text-[11px]">
						{ctx.emptyMessage}
					</div>
				{/if}
			</td>
		</tr>
	{:else}
		{@const dataRows = ctx.paginatedData()}
		{#each dataRows as rowData, index (rowData[ctx.keyField])}
			{@const isLastRow = index === dataRows.length - 1}
			{#if ctx.rowSnippet}
				{@render ctx.rowSnippet({ row: rowData, index })}
			{:else}
				<tr
					class={getRowClasses(index)}
					onclick={() => ctx.onRowClick?.(rowData)}
				>
					{#each ctx.columns as column}
						{@const value = ctx.getNestedValue(rowData as Record<string, unknown>, column.key)}
						<td class={getTdClasses(column, isLastRow)}>
							{#if ctx.cellSnippet}
								{@render ctx.cellSnippet({ row: rowData, column, value })}
							{:else}
								{ctx.formatValue(value, rowData, column)}
							{/if}
						</td>
					{/each}
				</tr>
			{/if}
		{/each}
	{/if}
</tbody>
