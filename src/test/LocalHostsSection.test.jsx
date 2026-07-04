import { render, screen } from '@testing-library/react';
import LocalHostsSection from '../components/LocalHostsSection';

const mockHosts = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    location: 'Jaipur, India',
    avatarColor: 'bg-amber-500',
    specialty: 'Heritage Walks',
    tagline: 'Every alley tells a story.',
    experienceTypes: ['Heritage'],
    rating: 4.9,
    reviewCount: 142,
    languages: ['English'],
    verified: true,
  },
  {
    id: 'hiroshi-nakamura',
    name: 'Hiroshi Nakamura',
    location: 'Kyoto, Japan',
    avatarColor: 'bg-emerald-600',
    specialty: 'Zen Garden Meditation',
    tagline: 'Silence is the loudest teacher.',
    experienceTypes: ['Nature'],
    rating: 5.0,
    reviewCount: 89,
    languages: ['English', 'Japanese'],
    verified: true,
  },
];

const mockUseLocalHosts = vi.fn();

vi.mock('../hooks/useLocalHosts', () => ({
  useLocalHosts: () => mockUseLocalHosts(),
}));

describe('LocalHostsSection', () => {
  test('renders section heading and all hosts when loaded', () => {
    mockUseLocalHosts.mockReturnValue({ loading: false, hosts: mockHosts });
    render(<LocalHostsSection />);
    expect(screen.getByText('Hosted by Locals')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Hiroshi Nakamura')).toBeInTheDocument();
  });

  test('renders null while loading', () => {
    mockUseLocalHosts.mockReturnValue({ loading: true, hosts: [] });
    const { container } = render(<LocalHostsSection />);
    expect(container.firstChild).toBeNull();
  });

  test('renders null when hosts list is empty', () => {
    mockUseLocalHosts.mockReturnValue({ loading: false, hosts: [] });
    const { container } = render(<LocalHostsSection />);
    expect(container.firstChild).toBeNull();
  });

  test('renders Community label', () => {
    mockUseLocalHosts.mockReturnValue({ loading: false, hosts: mockHosts });
    render(<LocalHostsSection />);
    expect(screen.getByText('Community')).toBeInTheDocument();
  });
});