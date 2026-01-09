<script lang="ts">
	import StatusBadge from '../StatusBadge.svelte';
	import type { StatusBadgeVariant, StatusBadgeSize } from '../StatusBadge.svelte';

	let {
		label = 'Status',
		variant = 'default' as StatusBadgeVariant,
		size = 'md' as StatusBadgeSize,
		showDot = true
	}: {
		label?: string;
		variant?: StatusBadgeVariant;
		size?: StatusBadgeSize;
		showDot?: boolean;
	} = $props();
</script>

<StatusBadge {label} {variant} {size} {showDot} />
