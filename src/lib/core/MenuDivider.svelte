<script lang="ts" module>
	export interface MenuDividerProps {
		class?: string;
	}
</script>

<script lang="ts">
	let { class: className = '' }: MenuDividerProps = $props();
</script>

<div class="menu-divider {className}" role="separator"></div>

<style>
	.menu-divider {
		height: 1px;
		background: var(--border-subtle);
		margin: 0.25rem 0;
	}
</style>
