import type { Snippet, Component } from 'svelte';
export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    dismissible?: boolean;
    icon?: Component;
    class?: string;
    children: Snippet;
    onDismiss?: () => void;
}
declare const Alert: Component<AlertProps, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
