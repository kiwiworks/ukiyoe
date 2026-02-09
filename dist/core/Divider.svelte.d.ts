export type DividerVariant = 'subtle' | 'default' | 'strong';
export type DividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export interface DividerProps {
    variant?: DividerVariant;
    spacing?: DividerSpacing;
    vertical?: boolean;
    class?: string;
}
declare const Divider: import("svelte").Component<DividerProps, {}, "">;
type Divider = ReturnType<typeof Divider>;
export default Divider;
