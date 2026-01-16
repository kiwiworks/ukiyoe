<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { themeStore } from '../stores/theme.svelte';

	interface Props {
		particleCount?: number;
		speed?: number;
		opacity?: number;
	}

	let {
		particleCount = 60,
		speed = 0.3,
		opacity = 0.04
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number;
	let mounted = false;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		alpha: number;
		life: number;
		maxLife: number;
	}

	let particles: Particle[] = [];

	// Get stroke color based on theme
	const strokeColor = $derived(() => {
		const isDark = themeStore.mode === 'dark';
		return isDark ? [255, 255, 255] : [0, 0, 0];
	});

	function createParticle(width: number, height: number): Particle {
		// Start from bottom or sides
		const side = Math.random();
		let x: number, y: number;

		if (side < 0.7) {
			// Bottom
			x = Math.random() * width;
			y = height + 10;
		} else if (side < 0.85) {
			// Left
			x = -10;
			y = height * 0.5 + Math.random() * height * 0.5;
		} else {
			// Right
			x = width + 10;
			y = height * 0.5 + Math.random() * height * 0.5;
		}

		const maxLife = 8000 + Math.random() * 4000;

		return {
			x,
			y,
			vx: (Math.random() - 0.5) * speed * 0.5,
			vy: -speed * (0.5 + Math.random() * 0.5), // Upward
			size: 1 + Math.random() * 2,
			alpha: 0,
			life: 0,
			maxLife
		};
	}

	function initParticles() {
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;
		const width = canvas.width / dpr;
		const height = canvas.height / dpr;

		particles = [];
		for (let i = 0; i < particleCount; i++) {
			const p = createParticle(width, height);
			// Stagger initial positions
			p.y = Math.random() * height;
			p.life = Math.random() * p.maxLife;
			particles.push(p);
		}
	}

	function draw(time: number, deltaTime: number) {
		if (!ctx || !mounted) return;

		const dpr = window.devicePixelRatio || 1;
		const width = canvas.width / dpr;
		const height = canvas.height / dpr;

		ctx.clearRect(0, 0, width, height);

		const [r, g, b] = strokeColor();

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			// Update position
			p.x += p.vx * deltaTime * 0.05;
			p.y += p.vy * deltaTime * 0.05;
			p.life += deltaTime;

			// Add slight waviness
			p.x += Math.sin(time * 0.001 + i) * 0.02;

			// Fade in and out
			const lifeRatio = p.life / p.maxLife;
			if (lifeRatio < 0.1) {
				p.alpha = lifeRatio / 0.1;
			} else if (lifeRatio > 0.8) {
				p.alpha = (1 - lifeRatio) / 0.2;
			} else {
				p.alpha = 1;
			}

			// Reset if off screen or life ended
			if (p.y < -20 || p.x < -20 || p.x > width + 20 || p.life > p.maxLife) {
				particles[i] = createParticle(width, height);
				continue;
			}

			// Draw particle
			const finalAlpha = p.alpha * opacity;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fill();

			// Draw trail
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.3})`;
			ctx.lineWidth = p.size * 0.5;
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.x - p.vx * 20, p.y - p.vy * 20);
			ctx.stroke();
		}

		// Draw connections between nearby particles
		ctx.lineWidth = 0.5;
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < 100) {
					const connectionAlpha = (1 - dist / 100) * opacity * 0.5 * particles[i].alpha * particles[j].alpha;
					ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${connectionAlpha})`;
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		}
	}

	let lastTime = 0;
	function animate(time: number) {
		if (!mounted) return;
		const deltaTime = lastTime ? time - lastTime : 16;
		lastTime = time;
		draw(time, deltaTime);
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

		initParticles();
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

<canvas bind:this={canvas} class="fixed inset-0 z-0 h-full w-full pointer-events-none"></canvas>
