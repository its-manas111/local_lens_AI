import { render, screen } from '@testing-library/react';
import ExperienceCard from '../components/ExperienceCard';

const mockExp = {
  id: '1',
  time: '9:00 AM',
  title: 'Morning at the Silk Weavers',
  description: 'Watch master weavers thread centuries-old looms.',
  localTip: 'Ask for Ramu — he will show you the dye pots.',
  type: 'Heritage',
};

describe('ExperienceCard', () => {
  test('renders title and description', () => {
    render(<ExperienceCard exp={mockExp} index={0} />);
    expect(screen.getByText(mockExp.title)).toBeInTheDocument();
    expect(screen.getByText(mockExp.description)).toBeInTheDocument();
  });

  test('renders time and type badge', () => {
    render(<ExperienceCard exp={mockExp} index={0} />);
    expect(screen.getByText(mockExp.time)).toBeInTheDocument();
    expect(screen.getByText(mockExp.type)).toBeInTheDocument();
  });

  test('renders local tip', () => {
    render(<ExperienceCard exp={mockExp} index={0} />);
    expect(screen.getByText(mockExp.localTip)).toBeInTheDocument();
  });

  test('renders sequential number padded', () => {
    render(<ExperienceCard exp={mockExp} index={2} />);
    expect(screen.getByText('#03')).toBeInTheDocument();
  });

  test('falls back to Cultural color for unknown type', () => {
    const exp = { ...mockExp, type: 'Unknown' };
    render(<ExperienceCard exp={exp} index={0} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});