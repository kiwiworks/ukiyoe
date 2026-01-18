<script lang="ts" module>
	/**
	 * Privacy Toggle Button
	 *
	 * A button with an eye icon that toggles privacy mode on/off.
	 * When privacy mode is enabled, all sensitive data (balances, IPs, etc.)
	 * will be masked across the application.
	 *
	 * @example
	 * <PrivacyToggle />
	 * <PrivacyToggle size="sm" />
	 */

	export type PrivacyToggleSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface PrivacyToggleProps {
		/** Size preset (default: 'md') */
		size?: PrivacyToggleSize;

		/** Custom CSS class */
		class?: string;

		/** Show label text (default: false) */
		showLabel?: boolean;
	}
</script>

<script lang="ts">
	import { Eye, EyeOff } from '@lucide/svelte';
	import { getPrivacyContext } from '../stores/privacy.svelte';
	import { cn } from '../utils/cn';

	let { size = 'md', class: className = '', showLabel = false }: PrivacyToggleProps = $props();

	const privacy = getPrivacyContext();

	// Icon size based on button size
	const iconSize = $derived(size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 20 : 16);

	function handleClick() {
		privacy.toggle();
	}

	const sizeClasses: Record<PrivacyToggleSize, string> = {
		xs: 'py-0.5 px-1 text-[9px]',
		sm: 'py-1 px-1.5 text-[10px]',
		md: 'py-1.5 px-2 text-[11px]',
		lg: 'py-2 px-2.5 text-xs'
	};
</script>

<button
	type="button"
	class={cn(
		'inline-flex items-center justify-center gap-1.5 border rounded-sm bg-transparent cursor-pointer transition-all font-mono focus-visible:outline-2 focus-visible:outline-accent-brand focus-visible:outline-offset-2',
		sizeClasses[size],
		privacy.enabled
			? 'text-accent-brand border-accent-brand bg-accent-brand/10 hover:bg-accent-brand/15'
			: 'text-text-muted border-border-subtle hover:text-text-primary hover:border-border-default hover:bg-bg-hover',
		className
	)}
	onclick={handleClick}
	title={privacy.enabled ? 'Show sensitive data' : 'Hide sensitive data'}
	aria-label={privacy.enabled ? 'Show sensitive data' : 'Hide sensitive data'}
	aria-pressed={privacy.enabled}
>
	{#if privacy.enabled}
		<EyeOff size={iconSize} />
	{:else}
		<Eye size={iconSize} />
	{/if}
	{#if showLabel}
		<span class="uppercase tracking-wide font-medium">
			{privacy.enabled ? 'Show' : 'Hide'}
		</span>
	{/if}
</button>
