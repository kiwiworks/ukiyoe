import type { Snippet } from 'svelte';
export type BottomSheetSnapPoint = number;
export interface BottomSheetProps {
    /** Whether the sheet is open */
    open: boolean;
    /** Sheet title (renders as Dialog.Title for accessibility) */
    title?: string;
    /** Sheet description */
    description?: string;
    /** Snap points as fractions of viewport height (0-1). Default: [0.5] */
    snapPoints?: BottomSheetSnapPoint[];
    /** Whether the sheet can be dismissed by swiping down or tapping the overlay */
    dismissible?: boolean;
    /** Whether to show the drag handle */
    showDragHandle?: boolean;
    /** Called when the sheet closes */
    onClose?: () => void;
    /** Called when the sheet snaps to a point (receives the snap point index) */
    onSnap?: (snapIndex: number) => void;
    /** Custom header snippet (replaces default title/description) */
    header?: Snippet;
    /** Actions rendered in a sticky footer */
    actions?: Snippet;
    /** Sheet body content */
    children?: Snippet;
    /** Additional CSS classes for the sheet content */
    class?: string;
}
declare const BottomSheet: import("svelte").Component<BottomSheetProps, {}, "open">;
type BottomSheet = ReturnType<typeof BottomSheet>;
export default BottomSheet;
