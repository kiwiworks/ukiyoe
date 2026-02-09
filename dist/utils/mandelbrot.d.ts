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
/**
 * Convert UUID to Julia set parameters.
 * Maps UUID to interesting c values along the Mandelbrot boundary.
 */
export declare function uuidToJuliaParams(uuid: string): JuliaParams;
/**
 * Render Julia set to a data URL.
 */
export declare function renderMandelbrot(uuid: string, size?: number, maxIter?: number): string;
/**
 * Get CSS background style for a UUID.
 * Useful for card backgrounds with overlay.
 */
export declare function getMandelbrotBackground(uuid: string, size?: number): string;
export {};
