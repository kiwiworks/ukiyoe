<script lang="ts">
	import { themeStore } from '../stores/theme.svelte';

	const enabled = $derived(themeStore.nebula);
	const isDark = $derived(themeStore.mode === 'dark');

	const blendLayerStyle = $derived(
		isDark
			? `background: radial-gradient(ellipse 120% 100% at 30% 20%, rgba(51, 102, 204, 0.08) 0%, transparent 50%), radial-gradient(ellipse 100% 80% at 80% 70%, rgba(230, 179, 77, 0.06) 0%, transparent 40%);`
			: `background: radial-gradient(ellipse 120% 100% at 30% 20%, rgba(13, 51, 153, 0.06) 0%, transparent 50%), radial-gradient(ellipse 100% 80% at 80% 70%, rgba(204, 153, 51, 0.04) 0%, transparent 40%);`
	);

	const starsStyle = $derived(
		isDark
			? `background-image: radial-gradient(1px 1px at 10% 20%, rgba(230, 200, 150, 0.9), transparent), radial-gradient(1px 1px at 30% 60%, rgba(150, 180, 255, 0.7), transparent), radial-gradient(1px 1px at 50% 10%, rgba(255, 255, 255, 0.8), transparent), radial-gradient(1px 1px at 70% 80%, rgba(200, 220, 255, 0.6), transparent), radial-gradient(1px 1px at 90% 40%, rgba(255, 230, 180, 0.7), transparent), radial-gradient(1.5px 1.5px at 15% 85%, rgba(180, 200, 255, 0.5), transparent), radial-gradient(1.5px 1.5px at 45% 35%, rgba(255, 220, 150, 0.6), transparent), radial-gradient(1.5px 1.5px at 75% 15%, rgba(150, 180, 230, 0.4), transparent), radial-gradient(1.5px 1.5px at 85% 65%, rgba(255, 240, 200, 0.5), transparent), radial-gradient(1px 1px at 25% 45%, rgba(180, 200, 255, 0.6), transparent), radial-gradient(1px 1px at 55% 75%, rgba(255, 220, 170, 0.5), transparent), radial-gradient(1px 1px at 5% 50%, rgba(200, 220, 255, 0.7), transparent), radial-gradient(1px 1px at 95% 25%, rgba(255, 235, 180, 0.6), transparent);`
			: ''
	);

	const glow1Style =
		'background: radial-gradient(circle, rgba(13, 51, 230, 0.18) 0%, rgba(0, 5, 38, 0.1) 50%, transparent 70%);';
	const glow2Style =
		'background: radial-gradient(circle, rgba(51, 128, 230, 0.15) 0%, rgba(13, 51, 153, 0.08) 50%, transparent 70%);';
	const glow3Style =
		'background: radial-gradient(circle, rgba(230, 179, 51, 0.12) 0%, rgba(204, 153, 0, 0.06) 50%, transparent 70%);';
</script>

{#if enabled}
	<div class="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
		<!-- Blend layer -->
		<div
			class="absolute inset-0 {isDark ? 'mix-blend-soft-light opacity-100' : 'mix-blend-color opacity-80'}"
			style={blendLayerStyle}
		></div>

		<!-- Glow orbs -->
		<div
			class="absolute rounded-full -top-[10%] -right-[5%] w-[600px] h-[600px] {isDark ? 'blur-[80px] opacity-100' : 'blur-[100px] opacity-35'}"
			style="{glow1Style} animation: nebula-pulse 12s ease-in-out infinite;"
		></div>
		<div
			class="absolute rounded-full bottom-[10%] -left-[5%] w-[550px] h-[550px] {isDark ? 'blur-[80px] opacity-100' : 'blur-[100px] opacity-35'}"
			style="{glow2Style} animation: nebula-pulse 12s ease-in-out infinite -4s;"
		></div>
		<div
			class="absolute rounded-full top-[40%] right-[20%] w-[400px] h-[400px] {isDark ? 'blur-[80px] opacity-100' : 'blur-[100px] opacity-35'}"
			style="{glow3Style} animation: nebula-pulse 12s ease-in-out infinite -8s;"
		></div>

		<!-- Stars -->
		<div
			class="absolute inset-0 {isDark ? 'opacity-50' : 'opacity-0'}"
			style="{starsStyle} {isDark ? 'animation: stars-twinkle 8s ease-in-out infinite;' : ''}"
		></div>
	</div>
{/if}
