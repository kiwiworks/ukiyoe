export interface ModalProps {
    /** Whether the modal is open */
    open: boolean;
    /** Title displayed in the modal header */
    title?: string;
    /** Width of the modal (CSS value) */
    width?: string;
    /** Height of the modal (CSS value) */
    height?: string;
    /** Whether to show the close button */
    showClose?: boolean;
    /** Callback when modal is closed */
    onclose?: () => void;
    /** Children content */
    children?: import('svelte').Snippet;
}
declare const Modal: import("svelte").Component<ModalProps, {}, "open">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
