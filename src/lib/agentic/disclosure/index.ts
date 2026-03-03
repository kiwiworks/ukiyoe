// Types
export type { DisclosureContext } from './context.svelte';
export type { DisclosureRootProps } from './Root.svelte';
export type { DisclosureHeaderProps } from './Header.svelte';
export type { DisclosureContentProps } from './Content.svelte';
export type { DisclosureSectionProps } from './Section.svelte';

// Context helpers
export { getDisclosureContext, setDisclosureContext } from './context.svelte';

// Import components
import Root from './Root.svelte';
import Header from './Header.svelte';
import Content from './Content.svelte';
import Section from './Section.svelte';

// Individual component exports
export { Root, Header, Content, Section };

// Compound component export
export const Disclosure = Object.assign(Root, {
	Root,
	Header,
	Content,
	Section
});
