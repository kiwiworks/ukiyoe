import { type ClassValue } from 'clsx';
/**
 * Merge class names with Tailwind CSS conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @example
 * cn('p-4 bg-red-500', 'p-2') // => 'bg-red-500 p-2' (p-2 wins)
 * cn('text-sm', isLarge && 'text-lg') // conditional classes
 * cn(['flex', 'items-center'], className) // arrays and user classes
 */
export declare function cn(...inputs: ClassValue[]): string;
