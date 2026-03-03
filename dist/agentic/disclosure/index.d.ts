export type { DisclosureContext } from './context.svelte';
export type { DisclosureRootProps } from './Root.svelte';
export type { DisclosureHeaderProps } from './Header.svelte';
export type { DisclosureContentProps } from './Content.svelte';
export type { DisclosureSectionProps } from './Section.svelte';
export { getDisclosureContext, setDisclosureContext } from './context.svelte';
import Root from './Root.svelte';
import Header from './Header.svelte';
import Content from './Content.svelte';
import Section from './Section.svelte';
export { Root, Header, Content, Section };
export declare const Disclosure: import("svelte").Component<import("./Root.svelte").DisclosureRootProps, {}, "expanded"> & {
    Root: import("svelte").Component<import("./Root.svelte").DisclosureRootProps, {}, "expanded">;
    Header: import("svelte").Component<import("./Header.svelte").DisclosureHeaderProps, {}, "">;
    Content: import("svelte").Component<import("./Content.svelte").DisclosureContentProps, {}, "">;
    Section: import("svelte").Component<import("./Section.svelte").DisclosureSectionProps, {}, "">;
};
