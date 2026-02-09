import type { Component } from 'svelte';
export interface CommandItem {
    /** Unique identifier */
    id: string;
    /** Display label */
    label: string;
    /** Optional description */
    description?: string;
    /** Optional icon component */
    icon?: Component;
    /** Optional keyboard shortcut display (e.g., "⌘K") */
    shortcut?: string;
    /** Optional group/category */
    group?: string;
    /** Optional keywords for search matching */
    keywords?: string[];
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Action to execute when selected */
    onSelect?: () => void;
    /** Optional href for navigation items */
    href?: string;
}
export interface CommandGroup {
    /** Group identifier */
    id: string;
    /** Group display label */
    label: string;
    /** Items in this group */
    items: CommandItem[];
}
export interface CommandPaletteProps {
    /** Whether the palette is open */
    open?: boolean;
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Flat list of items (will be auto-grouped if items have group property) */
    items?: CommandItem[];
    /** Pre-grouped items */
    groups?: CommandGroup[];
    /** Empty state message when no results */
    emptyMessage?: string;
    /** Callback when an item is selected */
    onSelect?: (item: CommandItem) => void;
    /** Callback when the palette is closed */
    onClose?: () => void;
    /** Additional CSS classes */
    class?: string;
}
declare const CommandPalette: Component<CommandPaletteProps, {}, "open">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;
