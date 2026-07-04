import { render, screen } from '@testing-library/react';
import FeaturedFeed from '../components/FeaturedFeed';

describe('FeaturedFeed', () => {
  test('renders section heading', () => {
    render(<FeaturedFeed />);
    expect(screen.getByRole('heading', { name: /Immersive Previews/i })).toBeInTheDocument();
  });

  test('renders all 3 featured experience cards', () => {
    render(<FeaturedFeed />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(3);
  });

  test('renders Jaipur experience', () => {
    render(<FeaturedFeed />);
    expect(screen.getByText('Chai and Royal Shadows in Jaipur')).toBeInTheDocument();
  });

  test('renders host names', () => {
    render(<FeaturedFeed />);
    expect(screen.getByText(/Hosted by Aarav Sharma/i)).toBeInTheDocument();
  });

  test('renders mood badges', () => {
    render(<FeaturedFeed />);
    expect(screen.getByText('Reflective & Regal')).toBeInTheDocument();
  });
});