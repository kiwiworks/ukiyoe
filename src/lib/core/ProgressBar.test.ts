import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ProgressBarTest from './test/ProgressBarTest.svelte';

describe('ProgressBar', () => {
	it('renders with default props', () => {
		render(ProgressBarTest);
		const progressbar = screen.getByRole('progressbar');
		expect(progressbar).toBeInTheDocument();
	});

	it('sets correct aria values', () => {
		render(ProgressBarTest, { props: { value: 30, max: 100 } });
		const progressbar = screen.getByRole('progressbar');
		expect(progressbar).toHaveAttribute('aria-valuenow', '30');
		expect(progressbar).toHaveAttribute('aria-valuemin', '0');
		expect(progressbar).toHaveAttribute('aria-valuemax', '100');
	});

	it('renders different sizes', () => {
		const { rerender } = render(ProgressBarTest, { props: { size: 'sm' } });
		expect(screen.getByRole('progressbar')).toHaveClass('h-1');

		rerender({ size: 'md' });
		expect(screen.getByRole('progressbar')).toHaveClass('h-2');

		rerender({ size: 'lg' });
		expect(screen.getByRole('progressbar')).toHaveClass('h-3');
	});

	it('renders all variant types', () => {
		const variants = ['default', 'success', 'warning', 'danger'] as const;

		for (const variant of variants) {
			const { unmount } = render(ProgressBarTest, { props: { variant } });
			expect(screen.getByRole('progressbar')).toBeInTheDocument();
			unmount();
		}
	});

	it('shows percentage value when showValue is true', () => {
		render(ProgressBarTest, { props: { value: 75, showValue: true } });
		expect(screen.getByText('75%')).toBeInTheDocument();
	});

	it('does not show value when showValue is false', () => {
		render(ProgressBarTest, { props: { value: 75, showValue: false } });
		expect(screen.queryByText('75%')).not.toBeInTheDocument();
	});

	it('handles indeterminate state', () => {
		render(ProgressBarTest, { props: { indeterminate: true } });
		const progressbar = screen.getByRole('progressbar');
		expect(progressbar).not.toHaveAttribute('aria-valuenow');
	});

	it('clamps percentage between 0 and 100', () => {
		const { rerender } = render(ProgressBarTest, { props: { value: 150, max: 100, showValue: true } });
		expect(screen.getByText('100%')).toBeInTheDocument();

		rerender({ value: -10, max: 100, showValue: true });
		expect(screen.getByText('0%')).toBeInTheDocument();
	});
});
