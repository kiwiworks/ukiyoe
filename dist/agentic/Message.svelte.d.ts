export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'idle' | 'streaming' | 'complete' | 'error';
export interface MessageProps {
    /** Message author role */
    role: MessageRole;
    /** Current message state */
    status?: MessageStatus;
    /** Timestamp for the message */
    timestamp?: Date;
    /** Error message when status is error */
    error?: string;
    /** Collapsed reasoning trace content */
    thinkContent?: string;
    /** Called when retry is clicked */
    onRetry?: () => void;
    /** Called when copy is clicked */
    onCopy?: () => void;
    /** Called when delete is clicked */
    onDelete?: () => void;
    /** Pass-through metadata (not rendered) */
    metadata?: Record<string, unknown>;
    /** Additional CSS classes */
    class?: string;
    /** Message content */
    children: import('svelte').Snippet;
    /** Actions slot (copy, regenerate, etc.) */
    actions?: import('svelte').Snippet;
}
declare const Message: import("svelte").Component<MessageProps, {}, "">;
type Message = ReturnType<typeof Message>;
export default Message;
