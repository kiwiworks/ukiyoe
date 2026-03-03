export type CopyButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type CopyButtonVariant = 'default' | 'ghost';
export interface CopyButtonProps {
    /** Text to copy to clipboard */
    text: string;
    /** Button size */
    size?: CopyButtonSize;
    /** Visual variant */
    variant?: CopyButtonVariant;
    /** Duration of success feedback in ms */
    feedbackDuration?: number;
    /** Additional CSS classes */
    class?: string;
}
declare const CopyButton: import("svelte").Component<CopyButtonProps, {}, "">;
type CopyButton = ReturnType<typeof CopyButton>;
export default CopyButton;
