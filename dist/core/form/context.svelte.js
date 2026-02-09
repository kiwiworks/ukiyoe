import { getContext, setContext } from 'svelte';
const FORM_CONTEXT_KEY = Symbol('form');
export function setFormContext(ctx) {
    setContext(FORM_CONTEXT_KEY, ctx);
}
export function getFormContext() {
    const ctx = getContext(FORM_CONTEXT_KEY);
    if (!ctx) {
        throw new Error('Form context not found. Make sure to use Form components inside Form.Root');
    }
    return ctx;
}
