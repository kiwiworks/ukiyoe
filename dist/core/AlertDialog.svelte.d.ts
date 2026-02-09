import type { Snippet, Component } from 'svelte';
export type AlertDialogVariant = 'default' | 'info' | 'warning' | 'danger';
export interface AlertDialogProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Dialog title */
    title: string;
    /** Description text (used when content snippet is not provided) */
    description?: string;
    /** Visual variant controlling icon and confirm button color */
    variant?: AlertDialogVariant;
    /** Label for the confirm button */
    confirmLabel?: string;
    /** Label for the cancel button */
    cancelLabel?: string;
    /** Show loading state on confirm button */
    loading?: boolean;
    /** Custom icon component (overrides variant default) */
    icon?: Component;
    /** Callback when confirm is clicked */
    onconfirm?: () => void | Promise<void>;
    /** Callback when cancel is clicked or dialog is dismissed */
    oncancel?: () => void;
    /** Custom content snippet (overrides description) */
    content?: Snippet;
    /** Custom actions snippet (overrides default Cancel/Confirm buttons) */
    actions?: Snippet<[() => void]>;
    /** Additional CSS classes for the dialog content */
    class?: string;
}
import { AlertDialog } from 'bits-ui';
declare const AlertDialog: Component<AlertDialogProps, {}, "open">;
type AlertDialog = ReturnType<typeof AlertDialog>;
export default AlertDialog;
