import { getContext, setContext } from 'svelte';
import type { DataTableContext } from './types';

const DATA_TABLE_CONTEXT_KEY = Symbol('data-table');

export function setDataTableContext<T>(ctx: DataTableContext<T>): void {
	setContext(DATA_TABLE_CONTEXT_KEY, ctx);
}

export function getDataTableContext<T = Record<string, unknown>>(): DataTableContext<T> {
	const ctx = getContext<DataTableContext<T>>(DATA_TABLE_CONTEXT_KEY);
	if (!ctx) {
		throw new Error('DataTable context not found. Make sure to use DataTable components inside DataTable.Root');
	}
	return ctx;
}
