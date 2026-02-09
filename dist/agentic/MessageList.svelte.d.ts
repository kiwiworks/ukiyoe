export interface MessageListProps {
    /** Enable auto-scroll to bottom on new messages */
    autoscroll?: boolean;
    /** Called when user scrolls to top (for loading history) */
    onLoadMore?: () => void;
    /** Show loading indicator at top */
    loadingMore?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Message content */
    children: import('svelte').Snippet;
}
declare const MessageList: import("svelte").Component<MessageListProps, {
    scrollToBottom: (smooth?: boolean) => void;
}, "">;
type MessageList = ReturnType<typeof MessageList>;
export default MessageList;
