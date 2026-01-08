<script lang="ts">
	import { themeStore } from '../stores/theme.svelte';

	const enabled = $derived(themeStore.nebula);
	const isDark = $derived(themeStore.mode === 'dark');
</script>

{#if enabled}
	<div class="nebula-overlay" class:dark={isDark}>
		<div class="nebula-blend-layer"></div>
		<div class="nebula-glow glow-1"></div>
		<div class="nebula-glow glow-2"></div>
		<div class="nebula-glow glow-3"></div>
		<div class="nebula-stars"></div>
	</div>
{/if}

<style>
	.nebula-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	/* Subtle color overlay that affects background effects via blend modes */
	.nebula-blend-layer {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 120% 100% at 30% 20%,
			rgba(13, 51, 153, 0.06) 0%,
			transparent 50%
		),
		radial-gradient(
			ellipse 100% 80% at 80% 70%,
			rgba(204, 153, 51, 0.04) 0%,
			transparent 40%
		);
		mix-blend-mode: color;
		opacity: 0.8;
	}

	.dark .nebula-blend-layer {
		background: radial-gradient(
			ellipse 120% 100% at 30% 20%,
			rgba(51, 102, 204, 0.08) 0%,
			transparent 50%
		),
		radial-gradient(
			ellipse 100% 80% at 80% 70%,
			rgba(230, 179, 77, 0.06) 0%,
			transparent 40%
		);
		mix-blend-mode: soft-light;
		opacity: 1;
	}

	.nebula-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0;
		animation: nebula-pulse 12s ease-in-out infinite;
	}

	.dark .nebula-glow {
		opacity: 1;
	}

	.nebula-overlay:not(.dark) .nebula-glow {
		opacity: 0.6;
		filter: blur(100px);
	}

	.glow-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(13, 51, 230, 0.18) 0%, rgba(0, 5, 38, 0.1) 50%, transparent 70%);
		top: -10%;
		right: -5%;
		animation-delay: 0s;
	}

	.glow-2 {
		width: 550px;
		height: 550px;
		background: radial-gradient(circle, rgba(51, 128, 230, 0.15) 0%, rgba(13, 51, 153, 0.08) 50%, transparent 70%);
		bottom: 10%;
		left: -5%;
		animation-delay: -4s;
	}

	.glow-3 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(230, 179, 51, 0.12) 0%, rgba(204, 153, 0, 0.06) 50%, transparent 70%);
		top: 40%;
		right: 20%;
		animation-delay: -8s;
	}

	@keyframes nebula-pulse {
		0%, 100% {
			transform: scale(1) translate(0, 0);
			opacity: 0.8;
		}
		25% {
			transform: scale(1.1) translate(20px, -10px);
			opacity: 1;
		}
		50% {
			transform: scale(0.95) translate(-10px, 15px);
			opacity: 0.7;
		}
		75% {
			transform: scale(1.05) translate(-15px, -5px);
			opacity: 0.9;
		}
	}

	.nebula-overlay:not(.dark) .glow-1,
	.nebula-overlay:not(.dark) .glow-2,
	.nebula-overlay:not(.dark) .glow-3 {
		opacity: 0.35;
	}

	/* Subtle star field for dark mode - with golden and blue tints */
	.nebula-stars {
		position: absolute;
		inset: 0;
		opacity: 0;
	}

	.dark .nebula-stars {
		opacity: 0.5;
		background-image:
			radial-gradient(1px 1px at 10% 20%, rgba(230, 200, 150, 0.9), transparent),
			radial-gradient(1px 1px at 30% 60%, rgba(150, 180, 255, 0.7), transparent),
			radial-gradient(1px 1px at 50% 10%, rgba(255, 255, 255, 0.8), transparent),
			radial-gradient(1px 1px at 70% 80%, rgba(200, 220, 255, 0.6), transparent),
			radial-gradient(1px 1px at 90% 40%, rgba(255, 230, 180, 0.7), transparent),
			radial-gradient(1.5px 1.5px at 15% 85%, rgba(180, 200, 255, 0.5), transparent),
			radial-gradient(1.5px 1.5px at 45% 35%, rgba(255, 220, 150, 0.6), transparent),
			radial-gradient(1.5px 1.5px at 75% 15%, rgba(150, 180, 230, 0.4), transparent),
			radial-gradient(1.5px 1.5px at 85% 65%, rgba(255, 240, 200, 0.5), transparent),
			radial-gradient(1px 1px at 25% 45%, rgba(180, 200, 255, 0.6), transparent),
			radial-gradient(1px 1px at 55% 75%, rgba(255, 220, 170, 0.5), transparent),
			radial-gradient(1px 1px at 5% 50%, rgba(200, 220, 255, 0.7), transparent),
			radial-gradient(1px 1px at 95% 25%, rgba(255, 235, 180, 0.6), transparent);
		animation: stars-twinkle 8s ease-in-out infinite;
	}

	@keyframes stars-twinkle {
		0%, 100% { opacity: 0.35; }
		50% { opacity: 0.55; }
	}
</style>
