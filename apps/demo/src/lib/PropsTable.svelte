<script lang="ts" module>
	export interface PropDef {
		name: string;
		type: string;
		default?: string;
		description: string;
	}

	export interface PropsTableProps {
		props: PropDef[];
		title?: string;
	}
</script>

<script lang="ts">
	import { Heading } from 'ukiyoe';

	let { props, title = 'Props' }: PropsTableProps = $props();
</script>

<div class="mt-lg">
	<Heading level={2} size="sm" class="mb-md">{title}</Heading>
	<div class="overflow-x-auto rounded-lg border border-border-subtle">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-border-subtle bg-bg-secondary">
					<th class="px-md py-sm text-left font-medium text-text-muted">Prop</th>
					<th class="px-md py-sm text-left font-medium text-text-muted">Type</th>
					<th class="px-md py-sm text-left font-medium text-text-muted">Default</th>
					<th class="px-md py-sm text-left font-medium text-text-muted">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border-subtle">
				{#each props as prop}
					<tr class="bg-bg-primary hover:bg-bg-hover transition-colors">
						<td class="px-md py-sm font-mono text-accent-brand whitespace-nowrap">{prop.name}</td>
						<td class="px-md py-sm font-mono text-text-secondary whitespace-nowrap">{prop.type}</td>
						<td class="px-md py-sm font-mono text-text-muted whitespace-nowrap">{prop.default ?? '-'}</td>
						<td class="px-md py-sm text-text-primary">{prop.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
