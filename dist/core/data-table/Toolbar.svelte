<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DataTableToolbarProps {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children: Snippet;
	}
</script>

<script lang="ts">
	let { class: className = '', children }: DataTableToolbarProps = $props();
</script>

<div class="flex items-center justify-between gap-4 px-4 py-3 border-b border-border-subtle bg-bg-primary {className}">
	{@render children()}
</div>
