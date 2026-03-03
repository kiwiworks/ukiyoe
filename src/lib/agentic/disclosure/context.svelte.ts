import { getContext, setContext } from 'svelte';

export interface DisclosureContext {
	readonly expanded: boolean;
	toggle: () => void;
}

const DISCLOSURE_CONTEXT_KEY = Symbol('disclosure');

export function setDisclosureContext(ctx: DisclosureContext): void {
	setContext(DISCLOSURE_CONTEXT_KEY, ctx);
}

export function getDisclosureContext(): DisclosureContext {
	const ctx = getContext<DisclosureContext>(DISCLOSURE_CONTEXT_KEY);
	if (!ctx) {
		throw new Error(
			'Disclosure context not found. Make sure to use Disclosure components inside Disclosure.Root'
		);
	}
	return ctx;
}
