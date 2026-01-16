<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { themeStore } from '../stores/theme.svelte';

	interface Props {
		cellSize?: number;
		waveSpeed?: number;
		opacity?: number;
	}

	let {
		cellSize = 30,
		waveSpeed = 0.4,
		opacity = 0.04
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number;
	let mounted = false;

	// Isometric projection angles
	const ISO_ANGLE = Math.PI / 6; // 30 degrees
	const COS_ISO = Math.cos(ISO_ANGLE);
	const SIN_ISO = Math.sin(ISO_ANGLE);

	interface GridPoint {
		gridX: number;
		gridY: number;
		screenX: number;
		screenY: number;
		baseHeight: number;
	}

	let gridPoints: GridPoint[] = [];
	let cols = 0;
	let rows = 0;

	// Get stroke color based on theme
	const strokeColor = $derived(() => {
		const isDark = themeStore.mode === 'dark';
		return isDark ? [255, 255, 255] : [0, 0, 0];
	});

	// Convert grid coordinates to isometric screen coordinates
	function toIso(x: number, y: number, height: number = 0): { x: number; y: number } {
		const isoX = (x - y) * cellSize * COS_ISO;
		const isoY = (x + y) * cellSize * SIN_ISO - height;
		return { x: isoX, y: isoY };
	}

	function initGrid() {
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;
		const width = canvas.width / dpr;
		const height = canvas.height / dpr;

		// Calculate grid size to cover the screen
		cols = Math.ceil(width / (cellSize * COS_ISO)) + 4;
		rows = Math.ceil(height / (cellSize * SIN_ISO)) + 4;

		gridPoints = [];

		// Offset to center the grid
		const offsetX = width * 0.5;
		const offsetY = height * 0.2;

		for (let y = -2; y < rows; y++) {
			for (let x = -2; x < cols; x++) {
				const iso = toIso(x, y);
				gridPoints.push({
					gridX: x,
					gridY: y,
					screenX: iso.x + offsetX,
					screenY: iso.y + offsetY,
					baseHeight: 0
				});
			}
		}
	}

	function getHeight(x: number, y: number, time: number): number {
		// Multiple wave sources for interesting patterns
		const wave1 = Math.sin((x * 0.3 + time * waveSpeed) + y * 0.2) * 8;
		const wave2 = Math.sin((y * 0.4 - time * waveSpeed * 0.7) + x * 0.15) * 6;
		const wave3 = Math.sin((x + y) * 0.2 + time * waveSpeed * 0.5) * 4;

		return wave1 + wave2 + wave3;
	}

	function draw(time: number) {
		if (!ctx || !mounted) return;

		const dpr = window.devicePixelRatio || 1;
		const width = canvas.width / dpr;
		const height = canvas.height / dpr;

		ctx.clearRect(0, 0, width, height);

		const [r, g, b] = strokeColor();
		const t = time * 0.001;

		const offsetX = width * 0.5;
		const offsetY = height * 0.2;

		// Draw grid lines
		ctx.lineWidth = 1;

		// Draw lines along X axis (going right-down in iso)
		for (let y = -2; y < rows; y++) {
			ctx.beginPath();
			let started = false;

			for (let x = -2; x < cols; x++) {
				const h = getHeight(x, y, t);
				const iso = toIso(x, y, h);
				const screenX = iso.x + offsetX;
				const screenY = iso.y + offsetY;

				// Fade based on distance from center
				const distFromCenter = Math.sqrt(
					Math.pow((screenX - width * 0.5) / width, 2) +
					Math.pow((screenY - height * 0.5) / height, 2)
				);
				const fadeFactor = Math.max(0, 1 - distFromCenter * 1.2);

				if (screenX > -50 && screenX < width + 50 && screenY > -50 && screenY < height + 50) {
					if (!started) {
						ctx.moveTo(screenX, screenY);
						started = true;
					} else {
						ctx.lineTo(screenX, screenY);
					}
				}
			}

			const lineOpacity = opacity * 0.8;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity})`;
			ctx.stroke();
		}

		// Draw lines along Y axis (going left-down in iso)
		for (let x = -2; x < cols; x++) {
			ctx.beginPath();
			let started = false;

			for (let y = -2; y < rows; y++) {
				const h = getHeight(x, y, t);
				const iso = toIso(x, y, h);
				const screenX = iso.x + offsetX;
				const screenY = iso.y + offsetY;

				if (screenX > -50 && screenX < width + 50 && screenY > -50 && screenY < height + 50) {
					if (!started) {
						ctx.moveTo(screenX, screenY);
						started = true;
					} else {
						ctx.lineTo(screenX, screenY);
					}
				}
			}

			const lineOpacity = opacity * 0.8;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity})`;
			ctx.stroke();
		}

		// Draw intersection points with height-based brightness
		for (let y = -2; y < rows; y++) {
			for (let x = -2; x < cols; x++) {
				const h = getHeight(x, y, t);
				const iso = toIso(x, y, h);
				const screenX = iso.x + offsetX;
				const screenY = iso.y + offsetY;

				if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
					continue;
				}

				// Brighter points at wave peaks
				const heightFactor = (h + 18) / 36; // Normalize to 0-1
				const pointOpacity = opacity * (0.5 + heightFactor * 1.5);
				const pointSize = 1 + heightFactor * 1.5;

				ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pointOpacity})`;
				ctx.beginPath();
				ctx.arc(screenX, screenY, pointSize, 0, Math.PI * 2);
				ctx.fill();
			}
		}
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

		initGrid();
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
		window.removeEventListener('resize', handleResize);
	});
</script>

<canvas bind:this={canvas} class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
