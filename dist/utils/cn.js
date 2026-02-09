import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Merge class names with Tailwind CSS conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @example
 * cn('p-4 bg-red-500', 'p-2') // => 'bg-red-500 p-2' (p-2 wins)
 * cn('text-sm', isLarge && 'text-lg') // conditional classes
 * cn(['flex', 'items-center'], className) // arrays and user classes
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
