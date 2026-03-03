<script lang="ts" module>
	export interface ReasoningTraceProps {
		/** Reasoning content text */
		content: string;
		/** Whether the trace is expanded */
		expanded?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Brain } from '@lucide/svelte';
	import { Disclosure } from './disclosure/index';

	let {
		content,
		expanded = $bindable(false),
		class: className = ''
	}: ReasoningTraceProps = $props();
</script>

<Disclosure.Root bind:expanded class="border-0 {className}">
	{#snippet children()}
		<Disclosure.Header
			title="Reasoning"
			class="bg-transparent px-0 py-0 text-xs text-text-muted hover:text-text-secondary hover:bg-transparent gap-1.5"
		>
			{#snippet icon()}
				<Brain size={12} class="shrink-0" />
			{/snippet}
		</Disclosure.Header>
		<Disclosure.Content
			class="border-t-0 p-0 mt-1"
		>
			<div
				class="font-mono text-xs text-text-muted bg-bg-tertiary rounded-md p-3 max-h-48 overflow-y-auto whitespace-pre-wrap"
			>
				{content}
			</div>
		</Disclosure.Content>
	{/snippet}
</Disclosure.Root>
