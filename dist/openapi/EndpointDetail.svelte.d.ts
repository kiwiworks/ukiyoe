import type { Endpoint, OpenAPI } from './types.js';
export interface EndpointDetailProps {
    /** The endpoint to display */
    endpoint: Endpoint;
    /** The full OpenAPI spec (for schema lookups) */
    spec: OpenAPI.Document;
    /** Base URL for resolving relative server URLs */
    baseUrl?: string;
    /** Additional CSS classes */
    class?: string;
}
declare const EndpointDetail: import("svelte").Component<EndpointDetailProps, {}, "">;
type EndpointDetail = ReturnType<typeof EndpointDetail>;
export default EndpointDetail;
