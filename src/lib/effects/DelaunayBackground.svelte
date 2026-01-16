<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { themeStore } from '../stores/theme.svelte';

	interface Props {
		pointCount?: number;
		animationSpeed?: number;
		opacity?: number;
	}

	let {
		pointCount = 24,
		animationSpeed = 0.3,
		opacity = 0.04
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let animationId: number;
	let mounted = false;

	interface Point {
		x: number;
		y: number;
		vx: number;
		vy: number;
		baseX: number;
		baseY: number;
		phase: number;
	}

	interface Triangle {
		p1: Point;
		p2: Point;
		p3: Point;
	}

	let points: Point[] = [];
	let triangles: Triangle[] = [];

	// Get stroke color based on theme (negative of background with low contrast)
	const strokeColor = $derived(() => {
		const isDark = themeStore.mode === 'dark';
		// For dark theme: light stroke, for light theme: dark stroke
		return isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
	});

	// Bowyer-Watson algorithm for Delaunay triangulation
	function circumcircle(p1: Point, p2: Point, p3: Point) {
		const ax = p1.x, ay = p1.y;
		const bx = p2.x, by = p2.y;
		const cx = p3.x, cy = p3.y;

		const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
		if (Math.abs(d) < 1e-10) return null;

		const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
		const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;

		const dx = ax - ux;
		const dy = ay - uy;
		const r = Math.sqrt(dx * dx + dy * dy);

		return { x: ux, y: uy, r };
	}

	function pointInCircumcircle(p: Point, t: { p1: Point; p2: Point; p3: Point }) {
		const cc = circumcircle(t.p1, t.p2, t.p3);
		if (!cc) return false;
		const dx = p.x - cc.x;
		const dy = p.y - cc.y;
		return Math.sqrt(dx * dx + dy * dy) < cc.r;
	}

	function triangulate(pts: Point[]): Triangle[] {
		if (pts.length < 3) return [];

		// Create super triangle that contains all points
		const minX = Math.min(...pts.map(p => p.x)) - 100;
		const minY = Math.min(...pts.map(p => p.y)) - 100;
		const maxX = Math.max(...pts.map(p => p.x)) + 100;
		const maxY = Math.max(...pts.map(p => p.y)) + 100;

		const dx = maxX - minX;
		const dy = maxY - minY;
		const dmax = Math.max(dx, dy);
		const midX = (minX + maxX) / 2;
		const midY = (minY + maxY) / 2;

		const superP1: Point = { x: midX - 2 * dmax, y: midY - dmax, vx: 0, vy: 0, baseX: 0, baseY: 0, phase: 0 };
		const superP2: Point = { x: midX, y: midY + 2 * dmax, vx: 0, vy: 0, baseX: 0, baseY: 0, phase: 0 };
		const superP3: Point = { x: midX + 2 * dmax, y: midY - dmax, vx: 0, vy: 0, baseX: 0, baseY: 0, phase: 0 };

		let tris: Triangle[] = [{ p1: superP1, p2: superP2, p3: superP3 }];

		for (const point of pts) {
			const badTriangles: Triangle[] = [];
			const polygon: { p1: Point; p2: Point }[] = [];

			for (const tri of tris) {
				if (pointInCircumcircle(point, tri)) {
					badTriangles.push(tri);
				}
			}

			for (const tri of badTriangles) {
				const edges = [
					{ p1: tri.p1, p2: tri.p2 },
					{ p1: tri.p2, p2: tri.p3 },
					{ p1: tri.p3, p2: tri.p1 }
				];

				for (const edge of edges) {
					let shared = false;
					for (const other of badTriangles) {
						if (other === tri) continue;
						const otherEdges = [
							{ p1: other.p1, p2: other.p2 },
							{ p1: other.p2, p2: other.p3 },
							{ p1: other.p3, p2: other.p1 }
						];
						for (const oe of otherEdges) {
							if ((edge.p1 === oe.p1 && edge.p2 === oe.p2) || (edge.p1 === oe.p2 && edge.p2 === oe.p1)) {
								shared = true;
								break;
							}
						}
						if (shared) break;
					}
					if (!shared) polygon.push(edge);
				}
			}

			tris = tris.filter(t => !badTriangles.includes(t));

			for (const edge of polygon) {
				tris.push({ p1: edge.p1, p2: edge.p2, p3: point });
			}
		}

		// Remove triangles connected to super triangle
		tris = tris.filter(t =>
			t.p1 !== superP1 && t.p1 !== superP2 && t.p1 !== superP3 &&
			t.p2 !== superP1 && t.p2 !== superP2 && t.p2 !== superP3 &&
			t.p3 !== superP1 && t.p3 !== superP2 && t.p3 !== superP3
		);

		return tris;
	}

	function initPoints() {
		if (!canvas) return;

		const width = canvas.width;
		const height = canvas.height;

		// Points spread across most of the canvas area
		const regionX = width * 0.1;
		const regionY = height * 0.1;
		const regionWidth = width * 0.9;
		const regionHeight = height * 0.9;

		points = [];
		for (let i = 0; i < pointCount; i++) {
			const x = regionX + Math.random() * regionWidth;
			const y = regionY + Math.random() * regionHeight;

			points.push({
				x,
				y,
				baseX: x,
				baseY: y,
				vx: (Math.random() - 0.5) * animationSpeed,
				vy: (Math.random() - 0.5) * animationSpeed,
				phase: Math.random() * Math.PI * 2
			});
		}

		// Add corner anchors for stable edges
		const corners = [
			{ x: 0, y: 0 },
			{ x: width, y: 0 },
			{ x: width, y: height },
			{ x: 0, y: height },
			{ x: width * 0.5, y: 0 },
			{ x: width * 0.5, y: height },
			{ x: 0, y: height * 0.5 },
			{ x: width, y: height * 0.5 }
		];

		for (const corner of corners) {
			points.push({
				...corner,
				baseX: corner.x,
				baseY: corner.y,
				vx: 0,
				vy: 0,
				phase: 0
			});
		}

		triangles = triangulate(points);
	}

	function updatePoints(time: number) {
		for (const point of points) {
			if (point.vx === 0 && point.vy === 0) continue; // Skip anchor points

			// Gentle oscillation around base position
			const amplitude = 15;
			const frequency = 0.001 * animationSpeed;

			point.x = point.baseX + Math.sin(time * frequency + point.phase) * amplitude;
			point.y = point.baseY + Math.cos(time * frequency * 0.7 + point.phase) * amplitude;
		}

		triangles = triangulate(points);
	}

	function draw(time: number) {
		if (!ctx || !mounted) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const color = strokeColor();

		ctx.strokeStyle = color;
		ctx.lineWidth = 1;

		ctx.beginPath();
		for (const tri of triangles) {
			ctx.moveTo(tri.p1.x, tri.p1.y);
			ctx.lineTo(tri.p2.x, tri.p2.y);
			ctx.lineTo(tri.p3.x, tri.p3.y);
			ctx.closePath();
		}
		ctx.stroke();

		// Draw subtle vertices
		ctx.fillStyle = color;
		for (const point of points) {
			if (point.vx === 0 && point.vy === 0) continue; // Skip anchor points
			ctx.beginPath();
			ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function animate(time: number) {
		if (!mounted) return;
		updatePoints(time);
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

		initPoints();
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

<canvas bind:this={canvas} class="fixed bottom-0 right-0 w-[85%] h-[90%] pointer-events-none z-0"></canvas>
