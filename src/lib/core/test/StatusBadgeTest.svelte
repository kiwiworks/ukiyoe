<script lang="ts">
	import StatusBadge from '../StatusBadge.svelte';
	import type { StatusBadgeVariant, StatusBadgeSize } from '../StatusBadge.svelte';

	let {
		label = 'Status',
		variant = 'default' as StatusBadgeVariant,
		size = 'md' as StatusBadgeSize,
		pulse = false
	}: {
		label?: string;
		variant?: StatusBadgeVariant;
		size?: StatusBadgeSize;
		pulse?: boolean;
	} = $props();
</script>

<StatusBadge {label} {variant} {size} {pulse} />
