<script lang="ts" module>
	/**
	 * MandelbrotAvatar - Deterministic fractal visualization from UUID.
	 *
	 * Renders a small Mandelbrot region derived from the UUID as a background,
	 * with an optional icon overlay. Use for portfolios, accounts, or any entity with an ID.
	 */
	export type MandelbrotAvatarRounded = 'none' | 'sm' | 'md' | 'full';

	export interface MandelbrotAvatarProps {
		uuid: string;
		size?: number;
		rounded?: MandelbrotAvatarRounded;
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { renderMandelbrot } from '../utils/mandelbrot';

	let { uuid, size = 48, rounded = 'md', children }: MandelbrotAvatarProps = $props();

	let backgroundUrl = $state<string | null>(null);

	const renderSize = $derived(Math.min(size, 64));

	onMount(() => {
		backgroundUrl = renderMandelbrot(uuid, renderSize, 40);
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			backgroundUrl = renderMandelbrot(uuid, renderSize, 40);
		}
	});

	const radiusClasses: Record<MandelbrotAvatarRounded, string> = {
		none: '',
		sm: 'rounded-sm',
		md: 'rounded-md',
		full: 'rounded-full'
	};
</script>

<div
	class="relative flex items-center justify-center bg-bg-tertiary overflow-hidden shrink-0 {radiusClasses[rounded]}"
	style:width="{size}px"
	style:height="{size}px"
	style:background-image={backgroundUrl ? `url(${backgroundUrl})` : 'none'}
	style:background-size="cover"
>
	{#if children}
		<div class="relative z-[1] flex items-center justify-center text-text-primary drop-shadow-md">
			{@render children()}
		</div>
	{/if}
</div>
