export type StreamingSpeed = 'instant' | 'fast' | 'natural';
export interface StreamingTextProps {
    /** Text to display */
    text: string;
    /** Animation speed */
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
