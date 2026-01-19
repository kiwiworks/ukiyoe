<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type SocialPlatform =
		| 'github'
		| 'twitter'
		| 'discord'
		| 'linkedin'
		| 'npm'
		| 'youtube'
		| 'mastodon'
		| 'bluesky';

	export type SocialButtonVariant = 'filled' | 'outline' | 'ghost';
	export type SocialButtonSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface SocialButtonProps {
		/** Social platform - determines icon and brand colors */
		platform: SocialPlatform;
		/** External link URL */
		href: string;
		/** Optional text label (icon-only if omitted) */
		label?: string;
		/** Size preset */
		size?: SocialButtonSize;
		/** Style variant - filled uses brand color background */
		variant?: SocialButtonVariant;
		/** Show external link indicator arrow */
		showExternalIndicator?: boolean;
		/** Additional CSS classes */
		class?: string;

		// Generic snippet
		/** Custom badge snippet (right side) */
		badge?: Snippet;

		// GitHub-specific
		/** GitHub star count or custom snippet */
		stars?: number | Snippet;
		/** GitHub fork count */
		forks?: number;

		// Discord-specific
		/** Discord online member count */
		members?: number;

		// npm-specific
		/** npm weekly downloads */
		downloads?: number | string;
		/** npm package version */
		version?: string;
	}

	/** Platform brand colors from official guidelines */
	export const platformColors: Record<SocialPlatform, { bg: string; hover: string; text: string }> =
		{
			github: { bg: '#24292f', hover: '#32383f', text: '#ffffff' },
			twitter: { bg: '#000000', hover: '#1a1a1a', text: '#ffffff' },
			discord: { bg: '#5865F2', hover: '#4752c4', text: '#ffffff' },
			linkedin: { bg: '#0A66C2', hover: '#004182', text: '#ffffff' },
			npm: { bg: '#CB3837', hover: '#a62e2e', text: '#ffffff' },
			youtube: { bg: '#FF0000', hover: '#cc0000', text: '#ffffff' },
			mastodon: { bg: '#6364FF', hover: '#5051cc', text: '#ffffff' },
			bluesky: { bg: '#0085FF', hover: '#0066cc', text: '#ffffff' }
		};
</script>

<script lang="ts">
	import { cn } from '../utils/cn';
	import { ExternalLink, Star, GitFork, Users, Download } from '@lucide/svelte';

	let {
		platform,
		href,
		label,
		size = 'md',
		variant = 'filled',
		showExternalIndicator = true,
		class: className = '',
		badge,
		stars,
		forks,
		members,
		downloads,
		version
	}: SocialButtonProps = $props();

	const colors = $derived(platformColors[platform]);

	const sizeClasses: Record<SocialButtonSize, { button: string; icon: number; text: string }> = {
		xs: { button: 'h-6 px-2 gap-1', icon: 12, text: 'text-xs' },
		sm: { button: 'h-8 px-3 gap-1.5', icon: 14, text: 'text-sm' },
		md: { button: 'h-10 px-4 gap-2', icon: 16, text: 'text-sm' },
		lg: { button: 'h-12 px-5 gap-2.5', icon: 18, text: 'text-base' }
	};

	const iconOnlySizeClasses: Record<SocialButtonSize, string> = {
		xs: 'h-6 w-6',
		sm: 'h-8 w-8',
		md: 'h-10 w-10',
		lg: 'h-12 w-12'
	};

	const sizeConfig = $derived(sizeClasses[size]);
	const isIconOnly = $derived(!label && !stars && !forks && !members && !downloads && !version && !badge);

	/** Platform display names for accessibility */
	const platformLabels: Record<SocialPlatform, string> = {
		github: 'GitHub',
		twitter: 'Twitter',
		discord: 'Discord',
		linkedin: 'LinkedIn',
		npm: 'npm',
		youtube: 'YouTube',
		mastodon: 'Mastodon',
		bluesky: 'Bluesky'
	};

	const accessibleLabel = $derived(isIconOnly ? platformLabels[platform] : undefined);

	const baseClasses =
		'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary';

	const variantStyles = $derived(() => {
		if (variant === 'filled') {
			return `focus:ring-[${colors.bg}]/50`;
		} else if (variant === 'outline') {
			return 'border-2 bg-transparent focus:ring-current';
		} else {
			return 'bg-transparent focus:ring-current';
		}
	});

	function formatNumber(num: number): string {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
		return num.toString();
	}
</script>

<!-- Official SVG icons from brand guidelines -->
{#snippet githubIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
		/>
	</svg>
{/snippet}

{#snippet twitterIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
		/>
	</svg>
{/snippet}

{#snippet discordIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
		/>
	</svg>
{/snippet}

{#snippet linkedinIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
		/>
	</svg>
{/snippet}

{#snippet npmIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
	</svg>
{/snippet}

{#snippet youtubeIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
		/>
	</svg>
{/snippet}

{#snippet mastodonIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"
		/>
	</svg>
{/snippet}

{#snippet blueskyIcon(size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path
			d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
		/>
	</svg>
{/snippet}

{#snippet platformIcon(platform: SocialPlatform, size: number)}
	{#if platform === 'github'}
		{@render githubIcon(size)}
	{:else if platform === 'twitter'}
		{@render twitterIcon(size)}
	{:else if platform === 'discord'}
		{@render discordIcon(size)}
	{:else if platform === 'linkedin'}
		{@render linkedinIcon(size)}
	{:else if platform === 'npm'}
		{@render npmIcon(size)}
	{:else if platform === 'youtube'}
		{@render youtubeIcon(size)}
	{:else if platform === 'mastodon'}
		{@render mastodonIcon(size)}
	{:else if platform === 'bluesky'}
		{@render blueskyIcon(size)}
	{/if}
{/snippet}

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	aria-label={accessibleLabel}
	class={cn(
		baseClasses,
		isIconOnly ? iconOnlySizeClasses[size] : sizeConfig.button,
		sizeConfig.text,
		className
	)}
	style={variant === 'filled'
		? `background-color: ${colors.bg}; color: ${colors.text};`
		: variant === 'outline'
			? `border-color: ${colors.bg}; color: ${colors.bg};`
			: `color: ${colors.bg};`}
	onmouseenter={(e) => {
		if (variant === 'filled') {
			e.currentTarget.style.backgroundColor = colors.hover;
		} else {
			e.currentTarget.style.opacity = '0.8';
		}
	}}
	onmouseleave={(e) => {
		if (variant === 'filled') {
			e.currentTarget.style.backgroundColor = colors.bg;
		} else {
			e.currentTarget.style.opacity = '1';
		}
	}}
>
	{@render platformIcon(platform, sizeConfig.icon)}

	{#if label}
		<span>{label}</span>
	{/if}

	{#if typeof stars === 'number'}
		<span class="flex items-center gap-1 opacity-80">
			<Star size={sizeConfig.icon - 2} />
			{formatNumber(stars)}
		</span>
	{:else if stars}
		{@render stars()}
	{/if}

	{#if forks}
		<span class="flex items-center gap-1 opacity-80">
			<GitFork size={sizeConfig.icon - 2} />
			{formatNumber(forks)}
		</span>
	{/if}

	{#if members}
		<span class="flex items-center gap-1 opacity-80">
			<Users size={sizeConfig.icon - 2} />
			{formatNumber(members)}
		</span>
	{/if}

	{#if downloads}
		<span class="flex items-center gap-1 opacity-80">
			<Download size={sizeConfig.icon - 2} />
			{typeof downloads === 'number' ? formatNumber(downloads) : downloads}
		</span>
	{/if}

	{#if version}
		<span class="opacity-80">v{version}</span>
	{/if}

	{#if badge}
		{@render badge()}
	{/if}

	{#if showExternalIndicator && !isIconOnly}
		<ExternalLink size={sizeConfig.icon - 2} class="opacity-60" />
	{/if}
</a>
