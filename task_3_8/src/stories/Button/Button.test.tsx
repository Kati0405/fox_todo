import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  it('renders component', () => {
    render(<Button ariaLabel='Button'>Button</Button>);
    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toHaveAttribute('aria-label', 'Button');
  });

  it('renders primary variant', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button', { name: /Primary Button/i });
    expect(button).toHaveClass('primary-btn');
  });

  it('renders secondary variant', () => {
    render(<Button variant='secondary'>Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /Secondary Button/i });
    expect(button).toHaveClass('secondary-btn');
  });

  it('renders with an icon', () => {
    const icon = <img src='icon.png' alt='icon' />;
    render(<Button icon={icon}>Button with Icon</Button>);
    const iconElement = screen.getByAltText('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders with button text and icon', () => {
    const icon = <img src='icon.png' alt='icon' />;
    render(<Button icon={icon}>Button with Icon and Text</Button>);
    const button = screen.getByRole('button', {
      name: /Button with Icon and Text/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText('icon')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /Disabled Button/i });
    expect(button).toBeDisabled();
  });

  it('button click calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const buttonElement = screen.getByText(/Clickable Button/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
