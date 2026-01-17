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

	const theadClasses = $derived(
		`bg-bg-primary ${ctx.stickyHeader ? 'sticky top-0 z-[1]' : ''}`
	);

	const getThClasses = (column: typeof ctx.columns[0], isSortable: boolean, isSorted: boolean) => {
		const base = 'text-left text-text-muted font-medium uppercase text-[9px] tracking-wide border-b border-border-subtle whitespace-nowrap';
		const padding = ctx.compact ? 'px-3 py-1.5' : 'px-4 py-2.5';
		const sortable = isSortable ? 'cursor-pointer select-none transition-colors duration-150 hover:text-text-primary' : '';
		const sorted = isSorted ? 'text-accent-brand' : '';
		const align = column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '';
		return `${base} ${padding} ${sortable} ${sorted} ${align}`;
	};
</script>

<thead class="{theadClasses} {className}">
	<tr>
		{#each ctx.columns as column}
			{@const isSorted = ctx.sortKey === column.key}
			{@const isSortable = ctx.sortable && column.sortable !== false}
			<th
				class={getThClasses(column, isSortable, isSorted)}
				style:width={column.width}
				onclick={() => isSortable && ctx.toggleSort(column.key)}
			>
				{#if ctx.headerSnippet}
					{@render ctx.headerSnippet({ column })}
				{:else}
					<span class="inline-flex items-center gap-1">
						<span>{column.header}</span>
						{#if isSortable}
							<span class="inline-flex items-center {isSorted ? 'opacity-100' : 'opacity-50'}">
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
