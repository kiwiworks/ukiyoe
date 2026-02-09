import type { Endpoint, OpenAPI } from './types.js';
export interface EndpointTesterProps {
    /** The endpoint to test */
    endpoint: Endpoint;
    /** The full OpenAPI spec (for servers and schema lookups) */
    spec: OpenAPI.Document;
    /** Base URL to use when spec servers are relative (e.g., the URL where the spec was loaded from) */
    baseUrl?: string;
    /** Additional CSS classes */
    class?: string;
}
declare const EndpointTester: import("svelte").Component<EndpointTesterProps, {}, "">;
type EndpointTester = ReturnType<typeof EndpointTester>;
export default EndpointTester;
