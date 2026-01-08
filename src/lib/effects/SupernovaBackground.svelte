<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { themeStore, type BgQualityPreset } from '../stores/theme.svelte';

	interface Props {
		/** Override quality settings (for preview in settings) */
		qualityOverride?: BgQualityPreset;
		/** Show FPS overlay (for settings preview) */
		showStats?: boolean;
	}

	let { qualityOverride, showStats = false }: Props = $props();

	// Use override if provided, otherwise use store
	const quality = $derived(qualityOverride ?? themeStore.bgQuality);

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let animationId: number;
	let mounted = false;
	let startTime = 0;

	// FPS tracking
	let fps = $state(0);
	let frameCount = 0;
	let lastFpsUpdate = 0;
	let lastFrameTime = 0;

	const vertexShaderSource = `
		attribute vec2 a_position;
		varying vec2 v_coord;
		void main() {
			v_coord = a_position;
			gl_Position = vec4(a_position, 0.0, 1.0);
		}
	`;

	// Supernova / cosmic gas formation shader
	// Creates flowing nebula gas with bright stellar cores
	const fragmentShaderSource = `
		precision highp float;
		varying vec2 v_coord;
		uniform float u_time;
		uniform vec2 u_resolution;
		uniform float u_is_dark;

		#define PI 3.14159265359
		#define TAU 6.28318530718

		// Hash functions
		float hash(vec2 p) {
			return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
		}

		vec2 hash2(vec2 p) {
			p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
			return fract(sin(p) * 43758.5453);
		}

		vec3 hash3(vec2 p) {
			vec3 q = vec3(
				dot(p, vec2(127.1, 311.7)),
				dot(p, vec2(269.5, 183.3)),
				dot(p, vec2(419.2, 371.9))
			);
			return fract(sin(q) * 43758.5453);
		}

		// Smooth noise
		float noise(vec2 p) {
			vec2 i = floor(p);
			vec2 f = fract(p);
			f = f * f * (3.0 - 2.0 * f);

			float a = hash(i);
			float b = hash(i + vec2(1.0, 0.0));
			float c = hash(i + vec2(0.0, 1.0));
			float d = hash(i + vec2(1.0, 1.0));

			return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
		}

		// Fractal Brownian Motion - flowing gas
		float fbm(vec2 p) {
			float v = 0.0;
			float a = 0.5;
			mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));

			for (int i = 0; i < 6; i++) {
				v += a * noise(p);
				p = rot * p * 2.0 + vec2(100.0);
				a *= 0.5;
			}
			return v;
		}

		// Turbulent FBM for more chaotic gas
		float turbulence(vec2 p) {
			float v = 0.0;
			float a = 0.5;
			mat2 rot = mat2(cos(0.37), sin(0.37), -sin(0.37), cos(0.37));

			for (int i = 0; i < 5; i++) {
				v += a * abs(noise(p) * 2.0 - 1.0);
				p = rot * p * 2.0 + vec2(50.0);
				a *= 0.5;
			}
			return v;
		}

		// Voronoi for stellar structures
		float voronoi(vec2 p) {
			vec2 i = floor(p);
			vec2 f = fract(p);

			float minDist = 1.0;
			for (int y = -1; y <= 1; y++) {
				for (int x = -1; x <= 1; x++) {
					vec2 neighbor = vec2(float(x), float(y));
					vec2 point = hash2(i + neighbor);
					vec2 diff = neighbor + point - f;
					float dist = length(diff);
					minDist = min(minDist, dist);
				}
			}
			return minDist;
		}

		// Star field
		vec3 stars(vec2 uv) {
			vec3 col = vec3(0.0);

			for (float layer = 0.0; layer < 3.0; layer++) {
				float scale = 30.0 + layer * 20.0;
				vec2 grid = uv * scale;
				vec2 id = floor(grid);

				for (float dy = -1.0; dy <= 1.0; dy++) {
					for (float dx = -1.0; dx <= 1.0; dx++) {
						vec2 cellId = id + vec2(dx, dy);
						float h = hash(cellId + layer * 100.0);

						if (h > 0.92 - layer * 0.03) {
							vec2 starPos = (cellId + hash2(cellId)) / scale;
							float d = length(uv - starPos) * scale;

							float size = 0.6 + hash(cellId + 10.0) * 0.5;
							float brightness = exp(-d * d / (size * size * 0.12));
							float twinkle = 0.85 + 0.15 * sin(u_time * 0.4 + h * TAU);

							// Star colors
							vec3 starCol;
							float temp = hash(cellId + 50.0);
							if (temp < 0.2) starCol = vec3(1.0, 0.7, 0.5);       // Orange
							else if (temp < 0.5) starCol = vec3(1.0, 0.95, 0.9); // Warm white
							else if (temp < 0.8) starCol = vec3(1.0);             // White
							else starCol = vec3(0.8, 0.9, 1.0);                   // Blue-white

							col += starCol * brightness * twinkle * (1.0 - layer * 0.15);
						}
					}
				}
			}

			return col;
		}

		// Main supernova/nebula color palette
		vec3 nebulaColor(float t, float variant) {
			// Multiple color schemes blended
			vec3 hot = vec3(1.0, 0.4, 0.1);       // Orange-red (hot gas)
			vec3 warm = vec3(1.0, 0.6, 0.3);      // Gold
			vec3 cool = vec3(0.3, 0.5, 0.9);      // Blue
			vec3 purple = vec3(0.6, 0.3, 0.8);    // Purple
			vec3 cyan = vec3(0.2, 0.7, 0.9);      // Cyan
			vec3 pink = vec3(0.9, 0.4, 0.6);      // Pink

			// Blend based on position in nebula
			vec3 col;
			if (variant < 0.33) {
				// Hot orange-yellow palette (supernova remnant)
				col = mix(hot, warm, t);
			} else if (variant < 0.66) {
				// Cool blue-purple palette (reflection nebula)
				col = mix(cool, purple, t);
			} else {
				// Mixed pink-cyan palette (emission nebula)
				col = mix(pink, cyan, t);
			}

			return col;
		}

		void main() {
			vec2 uv = v_coord;
			float aspect = u_resolution.x / u_resolution.y;
			uv.x *= aspect;

			// Slow drift
			float drift = u_time * 0.02;

			// Start with stars (full screen)
			vec3 col = stars(uv * 0.8 + drift * 0.1);

			// === Main Supernova - positioned bottom right, rotated on side ===

			// Center in bottom right corner
			vec2 center = vec2(aspect * 0.7, -0.6);

			// Rotate coordinates around center (tilt the formation ~60 degrees)
			vec2 relUV = uv - center;
			float rotAngle = 1.0; // ~57 degrees
			mat2 rot = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle));
			vec2 rotatedUV = rot * relUV;

			vec2 driftUV = rotatedUV + vec2(cos(drift), sin(drift * 0.7)) * 0.15;
			float distToCenter = length(driftUV);

			// Expanding shell structure (very slow pulse)
			float shellRadius = 0.8 + sin(u_time * 0.03) * 0.05;
			float shell = smoothstep(shellRadius + 0.15, shellRadius, distToCenter) *
			              smoothstep(shellRadius - 0.3, shellRadius - 0.1, distToCenter);

			// Turbulent gas within shell
			vec2 gasUV = driftUV * 2.5;
			float gas1 = fbm(gasUV + u_time * 0.05);
			float gas2 = fbm(gasUV * 1.5 - u_time * 0.03 + 100.0);
			float turb = turbulence(gasUV * 0.8 + u_time * 0.02);

			// Swirling motion (slow)
			float angle = atan(driftUV.y, driftUV.x);
			float spiral = sin(angle * 3.0 - distToCenter * 8.0 + u_time * 0.08) * 0.5 + 0.5;

			// Combine gas layers
			float gasIntensity = gas1 * 0.5 + gas2 * 0.3 + turb * 0.2;
			gasIntensity *= spiral * 0.4 + 0.6;
			gasIntensity *= smoothstep(1.8, 0.0, distToCenter);

			// Hot core (smaller, more focused)
			float core = exp(-distToCenter * distToCenter * 6.0);
			float coreFlicker = 0.95 + 0.05 * sin(u_time * 0.5 + fbm(driftUV * 10.0) * 2.0);

			// Secondary smaller cloud (upper area, subtle)
			vec2 cloud2Rel = uv - vec2(aspect * 0.3, 0.5);
			float dist2 = length(cloud2Rel);
			float cloud2 = fbm(cloud2Rel * 5.0 + u_time * 0.03);
			cloud2 *= smoothstep(0.5, 0.0, dist2) * 0.4;

			// Filamentary structures (Voronoi-based) - concentrated near main formation
			float filaments = 1.0 - voronoi(driftUV * 3.0 + fbm(driftUV * 2.0) * 0.5);
			filaments = pow(filaments, 2.0) * 0.5;
			filaments *= smoothstep(1.2, 0.3, distToCenter);

			// === Color mixing ===

			// Main nebula - hot colors (reduced intensity)
			vec3 mainNebula = nebulaColor(gasIntensity, 0.2);
			mainNebula *= gasIntensity * 0.9;
			mainNebula += vec3(1.0, 0.9, 0.7) * core * coreFlicker * 0.8; // Bright core
			mainNebula += vec3(1.0, 0.5, 0.2) * shell * 0.15; // Shell edge glow

			// Secondary cloud - cooler, more subtle
			vec3 secondaryNebula = nebulaColor(cloud2, 0.6);
			secondaryNebula *= cloud2 * 0.5;

			// Filaments - subtle cyan/purple
			vec3 filamentCol = mix(vec3(0.4, 0.6, 0.9), vec3(0.7, 0.4, 0.8),
			                       fbm(driftUV * 4.0));
			filamentCol *= filaments;

			// Combine all
			col += mainNebula;
			col += secondaryNebula;
			col += filamentCol * 0.3;

			// Dust lanes (dark absorption)
			float dust = fbm(driftUV * 2.0 + 50.0);
			dust = smoothstep(0.4, 0.6, dust);
			col *= 1.0 - dust * 0.25 * smoothstep(1.2, 0.3, distToCenter);

			// Adjust for theme
			float alpha;
			if (u_is_dark > 0.5) {
				alpha = 0.5;
			} else {
				col *= 0.4;
				alpha = 0.25;
			}

			// Fade towards top-left (UI area) more aggressively
			float uiFade = smoothstep(-0.3, 0.5, uv.x - uv.y * 0.5);
			alpha *= uiFade * 0.7 + 0.3;

			// Content-based alpha
			float contentAlpha = smoothstep(0.0, 0.12, length(col));
			alpha *= contentAlpha * 0.8 + 0.2;

			gl_FragColor = vec4(col, alpha);
		}
	`;

	function createShader(type: number, source: string): WebGLShader | null {
		if (!gl) return null;
		const shader = gl.createShader(type);
		if (!shader) return null;

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('Shader compile error:', gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	function initWebGL(): boolean {
		if (!canvas) return false;

		gl = canvas.getContext('webgl', {
			alpha: true,
			antialias: false,
			depth: false,
			preserveDrawingBuffer: false
		});

		if (!gl) return false;

		const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

		if (!vertexShader || !fragmentShader) return false;

		program = gl.createProgram();
		if (!program) return false;

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Program link error:', gl.getProgramInfoLog(program));
			return false;
		}

		const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		return true;
	}

	function draw(timestamp: number) {
		if (!gl || !program || !mounted) return;

		// Frame limiting based on target FPS
		const frameInterval = 1000 / quality.targetFps;
		const deltaTime = timestamp - lastFrameTime;

		if (deltaTime < frameInterval) {
			animationId = requestAnimationFrame(draw);
			return;
		}

		lastFrameTime = timestamp - (deltaTime % frameInterval);

		// FPS tracking
		frameCount++;
		if (timestamp - lastFpsUpdate >= 1000) {
			fps = frameCount;
			frameCount = 0;
			lastFpsUpdate = timestamp;
		}

		if (startTime === 0) startTime = timestamp;
		const elapsed = (timestamp - startTime) / 1000;

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);

		const timeLoc = gl.getUniformLocation(program, 'u_time');
		const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
		const isDarkLoc = gl.getUniformLocation(program, 'u_is_dark');

		gl.uniform1f(timeLoc, elapsed);
		gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
		gl.uniform1f(isDarkLoc, themeStore.mode === 'dark' ? 1.0 : 0.0);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		animationId = requestAnimationFrame(draw);
	}

	function handleResize() {
		if (!canvas) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const rect = canvas.getBoundingClientRect();

		canvas.width = Math.floor(rect.width * quality.resolution * dpr);
		canvas.height = Math.floor(rect.height * quality.resolution * dpr);
	}

	// Re-apply resolution when quality changes
	$effect(() => {
		if (mounted && canvas) {
			// Access quality to trigger reactivity
			const _ = quality.resolution;
			handleResize();
		}
	});

	onMount(() => {
		mounted = true;
		handleResize();

		if (initWebGL()) {
			animationId = requestAnimationFrame(draw);
		}

		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		mounted = false;
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		window.removeEventListener('resize', handleResize);
	});
</script>

<canvas bind:this={canvas} class="nebula-canvas"></canvas>

{#if showStats}
	<div class="stats-overlay">
		<span class="stat">{fps} FPS</span>
		<span class="stat">{Math.round(quality.resolution * 100)}%</span>
	</div>
{/if}

<style>
	.nebula-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}

	.stats-overlay {
		position: absolute;
		bottom: 8px;
		right: 8px;
		display: flex;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 10px;
		z-index: 10;
	}

	.stat {
		background: var(--bg-overlay);
		color: var(--positive);
		padding: 2px 6px;
		border-radius: 3px;
	}
</style>
