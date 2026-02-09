import type { Snippet } from 'svelte';
export interface StatusBarProps {
    children?: Snippet;
    rightContent?: Snippet;
    connected?: boolean;
    class?: string;
}
declare const StatusBar: import("svelte").Component<StatusBarProps, {}, "">;
type StatusBar = ReturnType<typeof StatusBar>;
export default StatusBar;
