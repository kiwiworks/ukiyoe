<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type BrandIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
	export type BrandIconAnimation = 'none' | 'wave' | 'pulse' | 'breathe';

	export interface BrandIconProps {
		/** Size preset or custom pixel value */
		size?: BrandIconSize;
		/** Stroke color (monochromatic) - available as var(--ukiyoe-color) in custom SVG */
		color?: string;
		/** Background color - available as var(--ukiyoe-bg) in custom SVG */
		backgroundColor?: string;
		/** Animation style */
		animation?: BrandIconAnimation;
		/** Animation duration in seconds - available as var(--ukiyoe-duration) in custom SVG */
		animationDuration?: number;
		/** Whether animation is paused */
		paused?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Accessible label */
		ariaLabel?: string;
		/** Whether to show the background circle */
		showCircle?: boolean;
		/** Custom SVG content (replaces default design). Use var(--ukiyoe-color) for stroke/fill. */
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		size = 'md',
		color = 'currentColor',
		backgroundColor = 'transparent',
		animation = 'none',
		animationDuration = 2,
		paused = false,
		class: className = '',
		ariaLabel = 'Brand icon',
		showCircle = true,
		children
	}: BrandIconProps = $props();

	const sizeMap: Record<Exclude<BrandIconSize, number>, number> = {
		xs: 16,
		sm: 24,
		md: 32,
		lg: 48,
		xl: 64
	};

	const computedSize = $derived(typeof size === 'number' ? size : sizeMap[size]);
	const strokeWidth = $derived(Math.max(1.5, computedSize / 16));

	const animationClass = $derived({
		none: '',
		wave: 'ukiyoe-wave-animation',
		pulse: 'ukiyoe-pulse-animation',
		breathe: 'ukiyoe-breathe-animation'
	}[animation]);
</script>

<svg
	width={computedSize}
	height={computedSize}
	viewBox="0 0 48 48"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label={ariaLabel}
	class={cn('ukiyoe-brand-icon', animationClass, paused && 'ukiyoe-paused', className)}
	style="--ukiyoe-duration: {animationDuration}s; --ukiyoe-color: {color}; --ukiyoe-bg: {backgroundColor};"
>
	{#if showCircle}
		<!-- Background circle - subtle, like paper -->
		<circle
			cx="24"
			cy="24"
			r="22"
			fill="var(--ukiyoe-bg)"
			stroke="var(--ukiyoe-color)"
			stroke-width={strokeWidth * 0.75}
			stroke-opacity="0.3"
			class="ukiyoe-circle"
		/>
	{/if}

	{#if children}
		<!-- Custom SVG content -->
		<g class="ukiyoe-brush" fill="none" stroke="var(--ukiyoe-color)" stroke-linecap="round" stroke-linejoin="round">
			{@render children()}
		</g>
	{:else}
		<!--
			Calligraphy-inspired brush stroke
			Evokes 浮 (floating) through flowing movement
			Not a literal character - an abstract expression of the "floating world" concept
		-->
		<g class="ukiyoe-brush" fill="none" stroke="var(--ukiyoe-color)" stroke-linecap="round" stroke-linejoin="round">
			<!-- Primary stroke - flowing downward like 浮's water radical abstracted -->
			<path
				d="M16 12
				   C18 14, 20 18, 19 22
				   C18 26, 16 30, 18 34
				   C19 36, 22 37, 24 36"
				stroke-width={strokeWidth * 1.8}
				class="ukiyoe-stroke ukiyoe-stroke-1"
			/>
			<!-- Secondary stroke - crossing, suggesting structure -->
			<path
				d="M14 20 C20 19, 28 21, 34 18"
				stroke-width={strokeWidth * 1.2}
				class="ukiyoe-stroke ukiyoe-stroke-2"
			/>
			<!-- Accent stroke - the lift, like brush leaving paper -->
			<path
				d="M28 26 C30 24, 34 22, 36 24 C37 26, 36 30, 32 32"
				stroke-width={strokeWidth}
				class="ukiyoe-stroke ukiyoe-stroke-3"
			/>
			<!-- Dot - like the beginning pressure of a brush -->
			<circle
				cx="32"
				cy="14"
				r={strokeWidth * 0.8}
				fill="var(--ukiyoe-color)"
				class="ukiyoe-dot"
			/>
		</g>
	{/if}
</svg>

<style>
	.ukiyoe-brand-icon {
		display: inline-block;
		vertical-align: middle;
	}

	.ukiyoe-paused * {
		animation-play-state: paused !important;
	}

	/* Wave animation - brush stroke drawing effect */
	.ukiyoe-wave-animation .ukiyoe-stroke-1 {
		stroke-dasharray: 60;
		stroke-dashoffset: 60;
		animation: ukiyoe-draw-stroke var(--ukiyoe-duration) ease-out infinite;
	}

	.ukiyoe-wave-animation .ukiyoe-stroke-2 {
		stroke-dasharray: 30;
		stroke-dashoffset: 30;
		animation: ukiyoe-draw-stroke calc(var(--ukiyoe-duration) * 0.6) ease-out infinite;
		animation-delay: calc(var(--ukiyoe-duration) * 0.3);
	}

	.ukiyoe-wave-animation .ukiyoe-stroke-3 {
		stroke-dasharray: 25;
		stroke-dashoffset: 25;
		animation: ukiyoe-draw-stroke calc(var(--ukiyoe-duration) * 0.5) ease-out infinite;
		animation-delay: calc(var(--ukiyoe-duration) * 0.5);
	}

	.ukiyoe-wave-animation .ukiyoe-dot {
		animation: ukiyoe-dot-appear var(--ukiyoe-duration) ease-out infinite;
	}

	@keyframes ukiyoe-draw-stroke {
		0% {
			stroke-dashoffset: 60;
			opacity: 0.3;
		}
		50% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
		100% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
	}

	@keyframes ukiyoe-dot-appear {
		0%, 10% {
			opacity: 0;
			transform: scale(0);
		}
		20%, 100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Pulse animation - ink spreading effect */
	.ukiyoe-pulse-animation .ukiyoe-circle {
		animation: ukiyoe-circle-pulse var(--ukiyoe-duration) ease-in-out infinite;
		transform-origin: center;
	}

	.ukiyoe-pulse-animation .ukiyoe-brush {
		animation: ukiyoe-ink-pulse var(--ukiyoe-duration) ease-in-out infinite;
		transform-origin: center;
	}

	@keyframes ukiyoe-circle-pulse {
		0%, 100% {
			stroke-opacity: 0.3;
		}
		50% {
			stroke-opacity: 0.5;
		}
	}

	@keyframes ukiyoe-ink-pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.85;
			transform: scale(1.02);
		}
	}

	/* Breathe animation - meditative, subtle */
	.ukiyoe-breathe-animation {
		animation: ukiyoe-breathe var(--ukiyoe-duration) ease-in-out infinite;
	}

	.ukiyoe-breathe-animation .ukiyoe-brush {
		animation: ukiyoe-ink-breathe var(--ukiyoe-duration) ease-in-out infinite;
	}

	@keyframes ukiyoe-breathe {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	@keyframes ukiyoe-ink-breathe {
		0%, 100% {
			filter: blur(0);
		}
		50% {
			filter: blur(0.3px);
		}
	}
</style>
