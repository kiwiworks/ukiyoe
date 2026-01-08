<script lang="ts" module>
	export interface CodeBlockProps {
		code: string;
		inline?: boolean;
		class?: string;
	}
</script>

<script lang="ts">
	let { code, inline = false, class: className = '' }: CodeBlockProps = $props();

	const baseClasses = 'font-mono text-xs text-text-primary';
	const blockClasses = 'bg-bg-tertiary p-md rounded-md overflow-x-auto';
	const inlineClasses = 'bg-bg-tertiary px-1 py-0.5 rounded-sm';

	const computedClasses = $derived(
		`${baseClasses} ${inline ? inlineClasses : blockClasses} ${className}`.trim()
	);
</script>

{#if inline}
	<code class={computedClasses}>{code}</code>
{:else}
	<pre class={computedClasses}><code>{code}</code></pre>
{/if}
