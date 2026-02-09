export interface ApiResponse {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: unknown;
    duration: number;
    error?: string;
    contentType?: string;
}
export interface ResponseViewerProps {
    /** The response to display */
    response: ApiResponse | null;
    /** Whether a request is in progress */
    loading?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const ResponseViewer: import("svelte").Component<ResponseViewerProps, {}, "">;
type ResponseViewer = ReturnType<typeof ResponseViewer>;
export default ResponseViewer;
