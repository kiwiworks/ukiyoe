/**
 * UUID to Julia set fractal visualization.
 *
 * Converts a UUID into a Julia set parameter (c) and renders
 * a deterministic image that can be used as avatar/placeholder.
 * Julia sets have more uniform visual interest than Mandelbrot
 * because every pixel has varying iteration counts.
 */

interface Complex {
	re: number;
	im: number;
}

interface JuliaParams {
	c: Complex;
	hue: number;
	satBase: number;
}

// LRU cache for rendered images
const cache = new Map<string, string>();
const MAX_CACHE_SIZE = 100;

/**
 * Convert UUID to Julia set parameters.
 * Maps UUID to interesting c values along the Mandelbrot boundary.
 */
export function uuidToJuliaParams(uuid: string): JuliaParams {
	const hex = uuid.replace(/-/g, '');

	// Parse UUID into normalized floats
	const a = parseInt(hex.slice(0, 8), 16) / 0xffffffff;
	const b = parseInt(hex.slice(8, 16), 16) / 0xffffffff;
	const c = parseInt(hex.slice(16, 24), 16) / 0xffffffff;
	const d = parseInt(hex.slice(24, 32), 16) / 0xffffffff;

	// Interesting Julia set c values (on/near Mandelbrot boundary)
	// These produce connected, visually interesting Julia sets
	const cValues: Complex[] = [
		{ re: -0.8, im: 0.156 }, // Dendrite
		{ re: -0.4, im: 0.6 }, // Spiral
		{ re: 0.285, im: 0.01 }, // Siegel disk
		{ re: -0.70176, im: -0.3842 }, // Douady rabbit
		{ re: -0.835, im: -0.2321 }, // Elaborate spiral
		{ re: -0.74543, im: 0.11301 }, // Feathery
		{ re: 0.355, im: 0.355 }, // Branching
		{ re: -0.1, im: 0.651 } // Seahorse-like
	];

	// Select base c from UUID
	const baseC = cValues[Math.floor(a * cValues.length)];

	// Add small perturbation for uniqueness
	const perturbScale = 0.08;
	const juliaC: Complex = {
		re: baseC.re + (b - 0.5) * perturbScale,
		im: baseC.im + (c - 0.5) * perturbScale
	};

	// Derive hue from UUID - full 360 degree range
	const hue = d * 360;

	// Saturation base varies too
	const satBase = 0.5 + (parseInt(hex.slice(20, 24), 16) / 0xffff) * 0.4;

	return { c: juliaC, hue, satBase };
}

/**
 * Compute Julia set escape iteration for a point.
 * z₀ = pixel position, iterate z = z² + c
 */
function juliaIter(z0: Complex, c: Complex, maxIter: number): number {
	let zRe = z0.re;
	let zIm = z0.im;

	for (let i = 0; i < maxIter; i++) {
		const zRe2 = zRe * zRe;
		const zIm2 = zIm * zIm;

		if (zRe2 + zIm2 > 4) {
			// Smooth coloring
			const log_zn = Math.log(zRe2 + zIm2) / 2;
			const nu = Math.log(log_zn / Math.LN2) / Math.LN2;
			return i + 1 - nu;
		}

		const newRe = zRe2 - zIm2 + c.re;
		zIm = 2 * zRe * zIm + c.im;
		zRe = newRe;
	}
	return maxIter;
}

/**
 * Convert iteration count to RGB color.
 * Uses varied color palette based on hue parameter.
 */
function iterToColor(
	iter: number,
	maxIter: number,
	hue: number,
	satBase: number
): [number, number, number] {
	if (iter >= maxIter) {
		// Inside set - dark but tinted
		const h = hue / 360;
		return [Math.round(15 + h * 10), Math.round(12 + h * 8), Math.round(20 + h * 5)];
	}

	// Normalize iteration with log scaling for smoother gradients
	const t = Math.sqrt(iter / maxIter);

	// Sweep through hue range
	const h = (hue + t * 180) % 360;
	const s = satBase + t * 0.3;
	const l = 0.1 + t * 0.5;

	// HSL to RGB
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - chroma / 2;

	let r = 0,
		g = 0,
		b = 0;
	if (h < 60) {
		r = chroma;
		g = x;
	} else if (h < 120) {
		r = x;
		g = chroma;
	} else if (h < 180) {
		g = chroma;
		b = x;
	} else if (h < 240) {
		g = x;
		b = chroma;
	} else if (h < 300) {
		r = x;
		b = chroma;
	} else {
		r = chroma;
		b = x;
	}

	return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

/**
 * Render Julia set to a data URL.
 */
export function renderMandelbrot(uuid: string, size: number = 64, maxIter: number = 50): string {
	const cacheKey = `julia-${uuid}-${size}-${maxIter}`;
	const cached = cache.get(cacheKey);
	if (cached) return cached;

	const params = uuidToJuliaParams(uuid);
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	const imageData = ctx.createImageData(size, size);
	const data = imageData.data;

	// Viewport: -1.5 to 1.5 in both dimensions
	const viewSize = 3.0;
	const scale = viewSize / size;

	for (let py = 0; py < size; py++) {
		for (let px = 0; px < size; px++) {
			const z0: Complex = {
				re: (px - size / 2) * scale,
				im: (py - size / 2) * scale
			};

			const iter = juliaIter(z0, params.c, maxIter);
			const [r, g, b] = iterToColor(iter, maxIter, params.hue, params.satBase);

			const idx = (py * size + px) * 4;
			data[idx] = r;
			data[idx + 1] = g;
			data[idx + 2] = b;
			data[idx + 3] = 255;
		}
	}

	ctx.putImageData(imageData, 0, 0);
	const dataUrl = canvas.toDataURL('image/png');

	// LRU cache management
	if (cache.size >= MAX_CACHE_SIZE) {
		const firstKey = cache.keys().next().value;
		if (firstKey) cache.delete(firstKey);
	}
	cache.set(cacheKey, dataUrl);

	return dataUrl;
}

/**
 * Get CSS background style for a UUID.
 * Useful for card backgrounds with overlay.
 */
export function getMandelbrotBackground(uuid: string, size: number = 64): string {
	const dataUrl = renderMandelbrot(uuid, size);
	return `url(${dataUrl})`;
}
