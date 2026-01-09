import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ButtonTest from './test/ButtonTest.svelte';

describe('Button', () => {
	it('renders with default props', () => {
		render(ButtonTest, { props: { text: 'Click me' } });
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Click me');
	});

	it('renders primary variant', () => {
		render(ButtonTest, { props: { text: 'Primary', variant: 'primary' } });
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('bg-accent-brand');
	});

	it('renders danger variant', () => {
		render(ButtonTest, { props: { text: 'Danger', variant: 'danger' } });
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-negative');
	});

	it('renders different sizes', () => {
		const { rerender } = render(ButtonTest, { props: { text: 'Small', size: 'sm' } });
		expect(screen.getByRole('button')).toHaveClass('text-sm');

		rerender({ text: 'Large', size: 'lg' });
		expect(screen.getByRole('button')).toHaveClass('text-lg');
	});

	it('handles click events', async () => {
		const handleClick = vi.fn();
		render(ButtonTest, { props: { text: 'Click', onclick: handleClick } });

		await fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(ButtonTest, { props: { text: 'Disabled', disabled: true } });
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('is disabled and shows loading state', () => {
		render(ButtonTest, { props: { text: 'Loading', loading: true } });
		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-busy', 'true');
	});

	it('renders as link when href provided', () => {
		render(ButtonTest, { props: { text: 'Link', href: '/test' } });
		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/test');
	});

	it('applies aria-label', () => {
		render(ButtonTest, { props: { text: 'X', ariaLabel: 'Close' } });
		expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close');
	});

	it('shows pressed state when active', () => {
		render(ButtonTest, { props: { text: 'Active', active: true } });
		expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
	});

	it('applies full width', () => {
		render(ButtonTest, { props: { text: 'Full', fullWidth: true } });
		expect(screen.getByRole('button')).toHaveClass('w-full');
	});

	it('sets correct button type', () => {
		render(ButtonTest, { props: { text: 'Submit', type: 'submit' } });
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});
});
