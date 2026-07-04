import { render, screen } from '@testing-library/react';
import LocalHostCard from '../components/LocalHostCard';

const mockHost = {
  id: 'priya-sharma',
  name: 'Priya Sharma',
  location: 'Jaipur, India',
  avatarColor: 'bg-amber-500',
  specialty: 'Heritage Walks',
  tagline: 'Every alley tells a story.',
  bio: 'Born in the shadow of Amber Fort.',
  experienceTypes: ['Heritage', 'Cultural'],
  rating: 4.9,
  reviewCount: 142,
  languages: ['English', 'Hindi'],
  verified: true,
};

describe('LocalHostCard', () => {
  test('renders host name and location', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Jaipur, India')).toBeInTheDocument();
  });

  test('renders specialty badge', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByText('Heritage Walks')).toBeInTheDocument();
  });

  test('renders rating and review count', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('(142 reviews)')).toBeInTheDocument();
  });

  test('renders verified badge for verified hosts', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByLabelText('Verified host')).toBeInTheDocument();
  });

  test('renders experience type badges', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByText('Heritage')).toBeInTheDocument();
    expect(screen.getByText('Cultural')).toBeInTheDocument();
  });

  test('renders languages spoken', () => {
    render(<LocalHostCard host={mockHost} />);
    expect(screen.getByText(/English/)).toBeInTheDocument();
  });

  test('does not render verified badge for unverified hosts', () => {
    render(<LocalHostCard host={{ ...mockHost, verified: false }} />);
    expect(screen.queryByLabelText('Verified host')).toBeNull();
  });
});