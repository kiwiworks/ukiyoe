<script lang="ts" module>
	export interface DataTableHeaderProps {
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ArrowUpDown, ArrowUp, ArrowDown } from '@lucide/svelte';
	import { getDataTableContext } from './context.svelte';

	let { class: className = '' }: DataTableHeaderProps = $props();

	const ctx = getDataTableContext();
</script>

<thead class={className}>
	<tr>
		{#each ctx.columns as column}
			{@const isSorted = ctx.sortKey === column.key}
			{@const isSortable = ctx.sortable && column.sortable !== false}
			<th
				class:sortable={isSortable}
				class:sorted={isSorted}
				class:text-center={column.align === 'center'}
				class:text-right={column.align === 'right'}
				style:width={column.width}
				onclick={() => isSortable && ctx.toggleSort(column.key)}
			>
				{#if ctx.headerSnippet}
					{@render ctx.headerSnippet({ column })}
				{:else}
					<span class="th-content">
						<span>{column.header}</span>
						{#if isSortable}
							<span class="sort-icon">
								{#if isSorted}
									{#if ctx.sortDir === 'asc'}
										<ArrowUp size={10} />
									{:else}
										<ArrowDown size={10} />
									{/if}
								{:else}
									<ArrowUpDown size={10} />
								{/if}
							</span>
						{/if}
					</span>
				{/if}
			</th>
		{/each}
	</tr>
</thead>

<style>
	thead {
		background: var(--bg-primary);
	}

	th {
		text-align: left;
		padding: 0.625rem 1rem;
		color: var(--text-muted);
		font-weight: 500;
		text-transform: uppercase;
		font-size: 9px;
		letter-spacing: 0.04em;
		border-bottom: 1px solid var(--border-subtle);
		white-space: nowrap;
	}

	th.sortable {
		cursor: pointer;
		user-select: none;
		transition: color 0.15s ease;
	}

	th.sortable:hover {
		color: var(--text-primary);
	}

	th.sorted {
		color: var(--accent-brand);
	}

	th.text-center {
		text-align: center;
	}

	th.text-right {
		text-align: right;
	}

	.th-content {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.sort-icon {
		display: inline-flex;
		align-items: center;
		opacity: 0.5;
	}

	th.sorted .sort-icon {
		opacity: 1;
	}
</style>
