export type StreamingSpeed = 'instant' | 'fast' | 'natural';
export type StreamingMode = 'append' | 'replace';
export interface StreamingTextProps {
    /** Text to display */
    text: string;
    /** Content arrival mode. 'append' animates new chars (autoregressive). 'replace' shows full content immediately on change (diffusion). */
    mode?: StreamingMode;
    /** Animation speed (only used in 'append' mode) */
    speed?: StreamingSpeed;
    /** Show blinking cursor */
    cursor?: boolean;
    /** Callback when streaming completes */
    onComplete?: () => void;
    /** Additional CSS classes */
    class?: string;
}
declare const StreamingText: import("svelte").Component<StreamingTextProps, {}, "">;
type StreamingText = ReturnType<typeof StreamingText>;
export default StreamingText;
