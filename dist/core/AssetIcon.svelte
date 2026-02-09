<script lang="ts" module>
	/**
	 * AssetIcon - displays currency icon for crypto/fiat.
	 *
	 * Automatically looks up icons from the asset registry if no logoUri is provided.
	 * Uses CoinGecko CDN for crypto assets, unicode symbols for fiat.
	 *
	 * Fallback chain:
	 * 1. If logoUri provided: shows image
	 * 2. If symbol in registry with icon: shows CoinGecko image
	 * 3. If symbol in registry with unicode: shows unicode symbol
	 * 4. Otherwise: shows first 2 chars of symbol
	 *
	 * @example
	 * <AssetIcon symbol="BTC" />           // Auto-fetches from CoinGecko
	 * <AssetIcon symbol="USD" />           // Shows $ unicode
	 * <AssetIcon symbol="BTC" logoUri={customUrl} />  // Uses custom URL
	 */
	export type AssetIconSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface AssetIconProps {
		/** Asset symbol (e.g., "BTC", "USD"). Used for registry lookup. */
		symbol: string;
		/** Logo URI for the asset. Overrides registry lookup. */
		logoUri?: string | null;
		/** Unicode symbol (for fiat like "$", "€"). Overrides registry lookup. */
		unicode?: string | null;
		/** Size preset. */
		size?: AssetIconSize;
		/** Custom CSS class. */
		class?: string;
	}

	const SIZE_MAP: Record<AssetIconSize, number> = {
		xs: 12,
		sm: 16,
		md: 20,
		lg: 24
	};
</script>

<script lang="ts">
	import { cn } from '../utils/cn';
	import { getAssetContext } from '../stores/assets.svelte';

	let { symbol, logoUri, unicode, size = 'md', class: className = '' }: AssetIconProps = $props();

	// Get asset context for automatic icon lookup
	const assetCtx = getAssetContext();

	// Resolve icon URL: prop → registry → undefined
	const effectiveLogoUri = $derived(logoUri ?? assetCtx.getIconUrl(symbol, size === 'lg' ? 'large' : 'small'));

	// Resolve unicode: prop → registry → undefined
	const effectiveUnicode = $derived(unicode ?? assetCtx.getUnicode(symbol));

	const showImage = $derived(!!effectiveLogoUri);
	const showUnicode = $derived(!effectiveLogoUri && !!effectiveUnicode);

	const pixelSize = $derived(SIZE_MAP[size]);

	let imgError = $state(false);

	function handleError() {
		imgError = true;
	}

	// Reset error state when symbol changes
	$effect(() => {
		symbol; // Track symbol
		imgError = false;
	});

	const sizeClasses: Record<AssetIconSize, string> = {
		xs: 'w-3 h-3 text-[10px]',
		sm: 'w-4 h-4 text-xs',
		md: 'w-5 h-5 text-sm',
		lg: 'w-6 h-6 text-base'
	};
</script>

<span
	class={cn('inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden', sizeClasses[size], className)}
	title={symbol}
>
	{#if showImage && !imgError}
		<img
			src={effectiveLogoUri}
			alt={symbol}
			width={pixelSize}
			height={pixelSize}
			onerror={handleError}
			loading="lazy"
			class="w-full h-full object-cover"
		/>
	{:else if showUnicode}
		<span class="font-mono font-semibold text-text-primary">{effectiveUnicode}</span>
	{:else}
		<span class="font-mono font-medium text-text-muted bg-bg-tertiary w-full h-full flex items-center justify-center">{symbol.slice(0, 2)}</span>
	{/if}
</span>
