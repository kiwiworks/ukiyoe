import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StatusBadgeTest from './test/StatusBadgeTest.svelte';

describe('StatusBadge', () => {
	it('renders label text', () => {
		render(StatusBadgeTest, { props: { label: 'Active' } });
		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('renders with different variants', () => {
		const variants = ['default', 'info', 'success', 'warning', 'danger'] as const;

		for (const variant of variants) {
			const { unmount } = render(StatusBadgeTest, { props: { label: variant, variant } });
			expect(screen.getByText(variant)).toBeInTheDocument();
			unmount();
		}
	});

	it('renders with different sizes', () => {
		const sizes = ['xs', 'sm', 'md', 'lg'] as const;

		for (const size of sizes) {
			const { unmount } = render(StatusBadgeTest, { props: { label: size, size } });
			expect(screen.getByText(size)).toBeInTheDocument();
			unmount();
		}
	});

	it('renders with pulse false by default', () => {
		render(StatusBadgeTest, { props: { label: 'Status' } });
		expect(screen.getByText('Status')).toBeInTheDocument();
	});

	it('renders with pulse true', () => {
		render(StatusBadgeTest, { props: { label: 'Pulsing', pulse: true } });
		expect(screen.getByText('Pulsing')).toBeInTheDocument();
	});
});
