<script lang="ts" module>
	export interface MenuDividerProps {
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { DropdownMenu } from 'bits-ui';

	let { class: className = '' }: MenuDividerProps = $props();
</script>

<DropdownMenu.Separator class="h-px bg-border-subtle my-1 {className}" />
