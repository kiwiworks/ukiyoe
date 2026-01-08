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
</script>

<tbody class={className}>
	{#if ctx.paginatedData().length === 0}
		<tr class="empty-row">
			<td colspan={ctx.columns.length}>
				{#if ctx.emptySnippet}
					{@render ctx.emptySnippet()}
				{:else}
					<div class="empty-state">{ctx.emptyMessage}</div>
				{/if}
			</td>
		</tr>
	{:else}
		{#each ctx.paginatedData() as rowData, index (rowData[ctx.keyField])}
			{#if ctx.rowSnippet}
				{@render ctx.rowSnippet({ row: rowData, index })}
			{:else}
				<tr
					class:clickable={!!ctx.onRowClick}
					onclick={() => ctx.onRowClick?.(rowData)}
				>
					{#each ctx.columns as column}
						{@const value = ctx.getNestedValue(rowData as Record<string, unknown>, column.key)}
						<td
							class:text-center={column.align === 'center'}
							class:text-right={column.align === 'right'}
						>
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

<style>
	td {
		padding: 0.625rem 1rem;
		border-bottom: 1px solid var(--border-subtle);
		color: var(--text-primary);
	}

	td.text-center {
		text-align: center;
	}

	td.text-right {
		text-align: right;
	}

	tr.clickable {
		cursor: pointer;
	}

	tr:last-child td {
		border-bottom: none;
	}

	.empty-row td {
		padding: 0;
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: var(--text-muted);
		font-size: 11px;
	}
</style>
