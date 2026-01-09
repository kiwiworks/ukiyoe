<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface HeaderProps {
		title: string;
		subtitle?: string;
		children?: Snippet;
		class?: string;
	}
</script>

<script lang="ts">
	let {
		title,
		subtitle,
		children,
		class: className = ''
	}: HeaderProps = $props();
</script>

<header class="header {className}">
	<div class="header-left">
		<div class="header-brand">
			<div class="header-indicator"></div>
			<span class="header-title">{title}</span>
		</div>
		{#if subtitle}
			<span class="header-subtitle">{subtitle}</span>
		{/if}
	</div>
	{#if children}
		<div class="header-actions">
			{@render children()}
		</div>
	{/if}
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 1.75rem;
		background-color: var(--bg-primary);
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.75rem;
		font-family: var(--font-mono);
		z-index: 50;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.header-brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header-indicator {
		width: 0.375rem;
		height: 0.375rem;
		background-color: var(--accent-brand);
		border-radius: 9999px;
	}

	.header-title {
		font-size: 11px;
		font-weight: 700;
		color: var(--text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.header-subtitle {
		font-size: 9px;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
