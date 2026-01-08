<script lang="ts" module>
	/**
	 * AssetIcon - displays currency icon for crypto/fiat.
	 *
	 * - If logoUri provided: shows image
	 * - If unicode provided: shows unicode symbol
	 * - Otherwise: shows first 2 chars of symbol
	 */
	export type AssetIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	export interface AssetIconProps {
		/** Asset symbol (e.g., "BTC", "USD"). */
		symbol: string;
		/** Logo URI for the asset. */
		logoUri?: string | null;
		/** Unicode symbol (for fiat like "$", "€"). */
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
		lg: 24,
		xl: 32
	};
</script>

<script lang="ts">
	let { symbol, logoUri, unicode, size = 'md', class: className = '' }: AssetIconProps = $props();

	const showImage = $derived(!!logoUri);
	const showUnicode = $derived(!logoUri && !!unicode);

	const pixelSize = $derived(SIZE_MAP[size]);

	let imgError = $state(false);

	function handleError() {
		imgError = true;
	}

	const sizeClasses: Record<AssetIconSize, string> = {
		xs: 'w-3 h-3 text-[10px]',
		sm: 'w-4 h-4 text-xs',
		md: 'w-5 h-5 text-sm',
		lg: 'w-6 h-6 text-base',
		xl: 'w-8 h-8 text-xl'
	};
</script>

<span
	class="inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden {sizeClasses[size]} {className}"
	title={symbol}
>
	{#if showImage && !imgError}
		<img
			src={logoUri}
			alt={symbol}
			width={pixelSize}
			height={pixelSize}
			onerror={handleError}
			loading="lazy"
			class="w-full h-full object-cover"
		/>
	{:else if showUnicode}
		<span class="font-mono font-semibold text-text-primary">{unicode}</span>
	{:else}
		<span class="font-mono font-medium text-text-muted bg-bg-tertiary w-full h-full flex items-center justify-center">{symbol.slice(0, 2)}</span>
	{/if}
</span>
