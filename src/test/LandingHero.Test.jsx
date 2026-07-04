import { render, screen, fireEvent } from '@testing-library/react';
import LandingHero from '../components/LandingHero';

describe('LandingHero', () => {
  test('renders h1 heading', () => {
    render(<LandingHero onBegin={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('renders Begin Your Journey button', () => {
    render(<LandingHero onBegin={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Begin Your Journey/i })).toBeInTheDocument();
  });

  test('calls onBegin when button is clicked', () => {
    const onBegin = vi.fn();
    render(<LandingHero onBegin={onBegin} />);
    fireEvent.click(screen.getByRole('button', { name: /Begin Your Journey/i }));
    expect(onBegin).toHaveBeenCalledTimes(1);
  });

  test('contains philosophy tagline text', () => {
    render(<LandingHero onBegin={vi.fn()} />);
    expect(screen.getByText(/Travel by/i)).toBeInTheDocument();
  });
});