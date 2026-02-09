import { getContext, setContext } from 'svelte';
const DATA_TABLE_CONTEXT_KEY = Symbol('data-table');
export function setDataTableContext(ctx) {
    setContext(DATA_TABLE_CONTEXT_KEY, ctx);
}
export function getDataTableContext() {
    const ctx = getContext(DATA_TABLE_CONTEXT_KEY);
    if (!ctx) {
        throw new Error('DataTable context not found. Make sure to use DataTable components inside DataTable.Root');
    }
    return ctx;
}
