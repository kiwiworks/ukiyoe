export interface ThemeLabModalProps {
    /** Whether the modal is open (bindable) */
    open?: boolean;
    /** Callback when modal is closed */
    onClose?: () => void;
}
declare const ThemeLabModal: import("svelte").Component<ThemeLabModalProps, {}, "open">;
type ThemeLabModal = ReturnType<typeof ThemeLabModal>;
export default ThemeLabModal;
