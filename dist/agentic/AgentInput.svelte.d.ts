export type AttachmentType = 'file' | 'image' | 'url';
export interface Attachment {
    id: string;
    type: AttachmentType;
    name: string;
    size?: number;
}
export interface AgentInputProps {
    /** Current input value */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Disable all interactions */
    disabled?: boolean;
    /** Show loading state (submitting) */
    loading?: boolean;
    /** Current attachments */
    attachments?: Attachment[];
    /** Maximum number of attachments */
    maxAttachments?: number;
    /** Called when user submits */
    onSubmit?: (value: string, attachments: Attachment[]) => void;
    /** Called when files are attached */
    onAttach?: (files: File[]) => void;
    /** Called when attachment is removed */
    onRemoveAttachment?: (id: string) => void;
    /** Called when stop is clicked during loading */
    onCancel?: () => void;
    /** Additional CSS classes */
    class?: string;
}
declare const AgentInput: import("svelte").Component<AgentInputProps, {}, "value">;
type AgentInput = ReturnType<typeof AgentInput>;
export default AgentInput;
