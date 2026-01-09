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
	let {
		children,
		rightContent,
		connected = true,
		class: className = ''
	}: StatusBarProps = $props();
</script>

<footer class="status-bar fixed bottom-0 left-0 right-0 h-5 flex items-center justify-between px-3 font-mono text-[9px] z-50 {className}">
	<div class="flex items-center gap-3">
		<div class="flex items-center gap-1.5">
			<div
				class="status-indicator w-1.5 h-1.5 rounded-full"
				class:connected
				class:disconnected={!connected}
			></div>
			<span class="status-text">
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

<style>
	.status-bar {
		background-color: var(--bg-primary);
		border-top: 1px solid var(--border-subtle);
	}

	.status-indicator {
		transition: background-color 0.2s ease;
	}

	.status-indicator.connected {
		background-color: var(--color-positive);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.status-indicator.disconnected {
		background-color: var(--color-negative);
	}

	.status-text {
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}
</style>
