import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('renders correctly', () => {
    render(<Checkbox ariaLabel='Checkbox' />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute('aria-label', 'Checkbox');
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays checkmark when checked', () => {
    render(<Checkbox checked />);
    const checkmarkElement = screen.getByRole('img');
    expect(checkmarkElement).toBeInTheDocument();
  });

  it('does not call onChange handler when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} disabled />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
