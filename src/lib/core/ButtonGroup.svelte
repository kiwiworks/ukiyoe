<script lang="ts" module>
	export interface ButtonGroupProps {
		class?: string;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let { class: className = '', children }: ButtonGroupProps = $props();
</script>

<div class="inline-flex {className}">
	<div class="flex [&>*:first-child]:rounded-l [&>*:last-child]:rounded-r [&>*]:rounded-none [&>*]:border-r-0 [&>*:last-child]:border-r">
		{@render children()}
	</div>
</div>
