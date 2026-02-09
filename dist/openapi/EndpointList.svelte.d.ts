import type { EndpointGroup, Endpoint } from './types.js';
export interface EndpointListProps {
    /** Endpoint groups */
    groups: EndpointGroup[];
    /** Currently selected endpoint */
    selectedEndpoint: Endpoint | null;
    /** Callback when endpoint is selected */
    onSelect: (endpoint: Endpoint) => void;
    /** Additional CSS classes */
    class?: string;
}
declare const EndpointList: import("svelte").Component<EndpointListProps, {}, "">;
type EndpointList = ReturnType<typeof EndpointList>;
export default EndpointList;
