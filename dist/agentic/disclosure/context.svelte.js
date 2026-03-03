import { getContext, setContext } from 'svelte';
const DISCLOSURE_CONTEXT_KEY = Symbol('disclosure');
export function setDisclosureContext(ctx) {
    setContext(DISCLOSURE_CONTEXT_KEY, ctx);
}
export function getDisclosureContext() {
    const ctx = getContext(DISCLOSURE_CONTEXT_KEY);
    if (!ctx) {
        throw new Error('Disclosure context not found. Make sure to use Disclosure components inside Disclosure.Root');
    }
    return ctx;
}
