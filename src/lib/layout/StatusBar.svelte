<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface StatusBarProps {
		children?: Snippet;
		rightContent?: Snippet;
		connected?: boolean;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		children,
		rightContent,
		connected = true,
		class: className
	}: StatusBarProps = $props();
</script>

<footer
	class={cn('fixed bottom-0 left-0 right-0 h-xl flex items-center justify-between px-lg font-mono text-xs z-50 bg-bg-primary border-t border-border-subtle', className)}
>
	<div class="flex items-center gap-3">
		<div class="flex items-center gap-1.5">
			<div
				class="w-1.5 h-1.5 rounded-full transition-colors duration-200 {connected
					? 'bg-positive animate-pulse'
					: 'bg-negative'}"
			></div>
			<span class="text-text-muted uppercase tracking-wide">
				{connected ? 'Connected' : 'Disconnected'}
			</span>
		</div>
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if rightContent}
		<div class="flex items-center gap-2">
			{@render rightContent()}
		</div>
	{/if}
</footer>
