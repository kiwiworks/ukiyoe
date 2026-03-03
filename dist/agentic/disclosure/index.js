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
