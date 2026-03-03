export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export interface ToastData {
    id: string;
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
}
export interface ToastProps {
    toast: ToastData;
    onClose?: (id: string) => void;
}
export declare function addToast(toast: Omit<ToastData, 'id'>): `${string}-${string}-${string}-${string}-${string}`;
export declare function removeToast(id: string): void;
export declare function getToasts(): ToastData[];
declare const Toast: import("svelte").Component<ToastProps, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
