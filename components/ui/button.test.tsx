import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  test('renders the button with correct text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  // Add more tests for variants, sizes, disabled state, etc.
}); 