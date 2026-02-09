/**
 * OpenAPI Viewer Utilities
 */
import type { OpenAPI, HttpMethod, Endpoint, EndpointGroup } from './types.js';
/**
 * Extract all endpoints from an OpenAPI spec
 */
export declare function extractEndpoints(spec: OpenAPI.Document): Endpoint[];
/**
 * Group endpoints by tag
 */
export declare function groupEndpointsByTag(endpoints: Endpoint[], spec: OpenAPI.Document): EndpointGroup[];
/**
 * Get color class for HTTP method
 */
export declare function getMethodColor(method: HttpMethod): string;
/**
 * Get background color class for HTTP method badge
 */
export declare function getMethodBgColor(method: HttpMethod): string;
/**
 * Get API info from spec
 */
export declare function getApiInfo(spec: OpenAPI.Document): {
    title: string;
    version: string;
    description?: string;
};
