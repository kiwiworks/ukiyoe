export type ThemeToggleSize = 'xs' | 'sm' | 'md' | 'lg';
export interface ThemeToggleProps {
    size?: ThemeToggleSize;
    class?: string;
    showLabel?: boolean;
}
declare const ThemeToggle: import("svelte").Component<ThemeToggleProps, {}, "">;
type ThemeToggle = ReturnType<typeof ThemeToggle>;
export default ThemeToggle;
