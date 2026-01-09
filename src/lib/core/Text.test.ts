import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import TextTest from './test/TextTest.svelte';

describe('Text', () => {
	it('renders text content', () => {
		render(TextTest, { props: { text: 'Hello World' } });
		expect(screen.getByText('Hello World')).toBeInTheDocument();
	});

	it('renders different sizes', () => {
		const { rerender } = render(TextTest, { props: { text: 'Small', size: 'sm' } });
		expect(screen.getByText('Small')).toHaveClass('text-sm');

		rerender({ text: 'Large', size: 'lg' });
		expect(screen.getByText('Large')).toHaveClass('text-lg');

		rerender({ text: 'XL', size: 'xl' });
		expect(screen.getByText('XL')).toHaveClass('text-xl');
	});

	it('renders different variants', () => {
		const { rerender } = render(TextTest, { props: { text: 'Primary', variant: 'primary' } });
		expect(screen.getByText('Primary')).toHaveClass('text-text-primary');

		rerender({ text: 'Secondary', variant: 'secondary' });
		expect(screen.getByText('Secondary')).toHaveClass('text-text-secondary');

		rerender({ text: 'Muted', variant: 'muted' });
		expect(screen.getByText('Muted')).toHaveClass('text-text-muted');

		rerender({ text: 'Positive', variant: 'positive' });
		expect(screen.getByText('Positive')).toHaveClass('text-positive');

		rerender({ text: 'Negative', variant: 'negative' });
		expect(screen.getByText('Negative')).toHaveClass('text-negative');
	});

	it('renders different weights', () => {
		const { rerender } = render(TextTest, { props: { text: 'Bold', weight: 'bold' } });
		expect(screen.getByText('Bold')).toHaveClass('font-bold');

		rerender({ text: 'Medium', weight: 'medium' });
		expect(screen.getByText('Medium')).toHaveClass('font-medium');
	});

	it('renders as different elements', () => {
		const { container, rerender } = render(TextTest, { props: { text: 'Paragraph', as: 'p' } });
		expect(container.querySelector('p')).toBeInTheDocument();

		rerender({ text: 'Span', as: 'span' });
		expect(container.querySelector('span')).toBeInTheDocument();

		rerender({ text: 'Div', as: 'div' });
		expect(container.querySelector('div')).toBeInTheDocument();

		rerender({ text: 'Label', as: 'label' });
		expect(container.querySelector('label')).toBeInTheDocument();
	});

	it('applies mono font', () => {
		render(TextTest, { props: { text: 'Mono', mono: true } });
		expect(screen.getByText('Mono')).toHaveClass('font-mono');
	});

	it('applies truncation', () => {
		render(TextTest, { props: { text: 'Truncated', truncate: true } });
		expect(screen.getByText('Truncated')).toHaveClass('truncate');
	});
});
