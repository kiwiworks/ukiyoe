<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { themeStore } from '../stores/theme.svelte';

	interface Props {
		gridSize?: number;
		pulseSpeed?: number;
		opacity?: number;
	}

	let {
		gridSize = 40,
		pulseSpeed = 0.8,
		opacity = 0.035
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number;
	let mounted = false;

	interface PulseSource {
		x: number;
		y: number;
		startTime: number;
		maxRadius: number;
		speed: number;
	}

	let pulseSources: PulseSource[] = [];
	let lastPulseTime = 0;
	const pulseInterval = 3000; // New pulse every 3 seconds

	// Get stroke color based on theme
	const strokeColor = $derived(() => {
		const isDark = themeStore.mode === 'dark';
		return isDark ? [255, 255, 255] : [0, 0, 0];
	});

	function addPulse(time: number) {
		if (!canvas) return;

		const width = canvas.width / (window.devicePixelRatio || 1);
		const height = canvas.height / (window.devicePixelRatio || 1);

		// Pulse from corners and edges
		const sources = [
			{ x: 0, y: 0 },
			{ x: width, y: 0 },
			{ x: width, y: height },
			{ x: 0, y: height },
			{ x: width / 2, y: 0 },
			{ x: width / 2, y: height },
			{ x: 0, y: height / 2 },
			{ x: width, y: height / 2 }
		];

		const source = sources[Math.floor(Math.random() * sources.length)];
		const maxRadius = Math.sqrt(width * width + height * height);

		pulseSources.push({
			x: source.x,
			y: source.y,
			startTime: time,
			maxRadius,
			speed: pulseSpeed * (0.8 + Math.random() * 0.4) // Slight variation
		});

		// Keep only active pulses (limit memory)
		if (pulseSources.length > 5) {
			pulseSources = pulseSources.slice(-5);
		}
	}

	function draw(time: number) {
		if (!ctx || !mounted) return;

		const dpr = window.devicePixelRatio || 1;
		const width = canvas.width / dpr;
		const height = canvas.height / dpr;

		ctx.clearRect(0, 0, width, height);

		// Add new pulse periodically
		if (time - lastPulseTime > pulseInterval) {
			addPulse(time);
			lastPulseTime = time;
		}

		const [r, g, b] = strokeColor();

		// Draw grid
		ctx.lineWidth = 1;

		// Calculate grid offset for centering
		const cols = Math.ceil(width / gridSize) + 1;
		const rows = Math.ceil(height / gridSize) + 1;
		const offsetX = (width % gridSize) / 2;
		const offsetY = (height % gridSize) / 2;

		// Draw vertical lines
		for (let i = 0; i <= cols; i++) {
			const x = offsetX + i * gridSize;

			// Calculate max intensity from all pulse sources for this line
			let maxIntensity = 0;
			for (const pulse of pulseSources) {
				const elapsed = (time - pulse.startTime) / 1000;
				const radius = elapsed * pulse.speed * 150;

				// Distance from pulse center to this vertical line
				const dist = Math.abs(x - pulse.x);

				if (dist < radius) {
					// Intensity based on how recently the pulse passed
					const pulseWidth = 80;
					const distFromEdge = radius - dist;
					const intensity = Math.max(0, 1 - distFromEdge / pulseWidth) * Math.exp(-elapsed * 0.3);
					maxIntensity = Math.max(maxIntensity, intensity);
				}
			}

			const baseOpacity = opacity * 0.5;
			const pulseOpacity = opacity * 2 * maxIntensity;
			const finalOpacity = baseOpacity + pulseOpacity;

			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}

		// Draw horizontal lines
		for (let j = 0; j <= rows; j++) {
			const y = offsetY + j * gridSize;

			let maxIntensity = 0;
			for (const pulse of pulseSources) {
				const elapsed = (time - pulse.startTime) / 1000;
				const radius = elapsed * pulse.speed * 150;

				const dist = Math.abs(y - pulse.y);

				if (dist < radius) {
					const pulseWidth = 80;
					const distFromEdge = radius - dist;
					const intensity = Math.max(0, 1 - distFromEdge / pulseWidth) * Math.exp(-elapsed * 0.3);
					maxIntensity = Math.max(maxIntensity, intensity);
				}
			}

			const baseOpacity = opacity * 0.5;
			const pulseOpacity = opacity * 2 * maxIntensity;
			const finalOpacity = baseOpacity + pulseOpacity;

			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		// Draw intersection points with pulse effect
		for (let i = 0; i <= cols; i++) {
			for (let j = 0; j <= rows; j++) {
				const x = offsetX + i * gridSize;
				const y = offsetY + j * gridSize;

				let maxIntensity = 0;
				for (const pulse of pulseSources) {
					const elapsed = (time - pulse.startTime) / 1000;
					const radius = elapsed * pulse.speed * 150;

					const dx = x - pulse.x;
					const dy = y - pulse.y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < radius) {
						const pulseWidth = 60;
						const distFromEdge = radius - dist;
						const intensity = Math.max(0, 1 - distFromEdge / pulseWidth) * Math.exp(-elapsed * 0.3);
						maxIntensity = Math.max(maxIntensity, intensity);
					}
				}

				if (maxIntensity > 0.1) {
					const pointOpacity = opacity * 3 * maxIntensity;
					const pointSize = 1.5 + maxIntensity * 2;

					ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pointOpacity})`;
					ctx.beginPath();
					ctx.arc(x, y, pointSize, 0, Math.PI * 2);
					ctx.fill();
				}
			}
		}

		// Clean up old pulses
		pulseSources = pulseSources.filter(pulse => {
			const elapsed = (time - pulse.startTime) / 1000;
			return elapsed < 8; // Remove after 8 seconds
		});
	}

	function animate(time: number) {
		if (!mounted) return;
		draw(time);
		animationId = requestAnimationFrame(animate);
	}

	function handleResize() {
		if (!canvas) return;
		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		if (ctx) {
			ctx.scale(dpr, dpr);
		}
	}

	onMount(() => {
		mounted = true;
		ctx = canvas.getContext('2d');
		handleResize();

		window.addEventListener('resize', handleResize);
		animationId = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		mounted = false;
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<canvas bind:this={canvas} class="grid-pulse-canvas"></canvas>

<style>
	.grid-pulse-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
