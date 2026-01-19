import { getContext, setContext } from 'svelte';
import type { FormContext, FieldValue } from './types';

const FORM_CONTEXT_KEY = Symbol('form');

export function setFormContext<T = Record<string, FieldValue>>(ctx: FormContext<T>): void {
	setContext(FORM_CONTEXT_KEY, ctx);
}

export function getFormContext<T = Record<string, FieldValue>>(): FormContext<T> {
	const ctx = getContext<FormContext<T>>(FORM_CONTEXT_KEY);
	if (!ctx) {
		throw new Error('Form context not found. Make sure to use Form components inside Form.Root');
	}
	return ctx;
}
