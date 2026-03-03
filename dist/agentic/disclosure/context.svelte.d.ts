export interface DisclosureContext {
    readonly expanded: boolean;
    toggle: () => void;
}
export declare function setDisclosureContext(ctx: DisclosureContext): void;
export declare function getDisclosureContext(): DisclosureContext;
