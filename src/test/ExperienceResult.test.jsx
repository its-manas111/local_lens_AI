import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceResult from '../components/ExperienceResult';

const MOCK_DATA = {
  title: 'Chai and Royal Shadows',
  tagline: 'Walk into history at dusk.',
  story: 'A sensory journey through the old city.',
  experiences: [
    { id: '1', time: '9:00 AM', title: 'Morning Walk', description: 'Walk through alleys.', localTip: 'Go early.', type: 'Heritage' },
    { id: '2', time: '1:00 PM', title: 'Lunch', description: 'Try the local thali.', localTip: 'Ask for no spice.', type: 'Culinary' },
    { id: '3', time: '5:00 PM', title: 'Sunset View', description: 'Watch the sunset.', localTip: 'Bring water.', type: 'Nature' },
  ],
  hiddenGem: { name: 'The Hidden Courtyard', story: 'A forgotten gem.', howToFind: 'Turn left at the blue door.' },
  localHost: { name: 'Priya Sharma', bio: 'Born in old Jaipur.', specialty: 'Heritage walks' },
  foodMoment: { dish: 'Masala Chai', story: 'Family recipe.', whereToFind: 'Corner of the bazaar.' },
  communityTip: 'Visit on a weekday morning.',
};

const MOCK_PARAMS = {
  destination: 'Jaipur, India',
  mood: 'Reflective & Regal',
  companion: 'Solo traveler',
};

describe('ExperienceResult', () => {
  test('returns null when no data', () => {
    const { container } = render(<ExperienceResult />);
    expect(container.firstChild).toBeNull();
  });

  test('renders title and tagline', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={false} />);
    expect(screen.getByText('Chai and Royal Shadows')).toBeInTheDocument();
    expect(screen.getByText(/"Walk into history at dusk\."/i)).toBeInTheDocument();
  });

  test('renders all experience cards', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={false} />);
    expect(screen.getByText('Morning Walk')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Sunset View')).toBeInTheDocument();
  });

  test('renders hidden gem and food moment', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={false} />);
    expect(screen.getByText('The Hidden Courtyard')).toBeInTheDocument();
    expect(screen.getByText('Masala Chai')).toBeInTheDocument();
  });

  test('renders local host name', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={false} />);
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
  });

  test('Save button calls onSave', () => {
    const onSave = vi.fn();
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={onSave} isSaved={false} />);
    fireEvent.click(screen.getByText('Save Journey'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  test('shows Journey Saved when isSaved=true', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={true} />);
    expect(screen.getByText('Journey Saved')).toBeInTheDocument();
  });

  test('save button is disabled when isSaved=true', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={true} />);
    expect(screen.getByText('Journey Saved').closest('button')).toBeDisabled();
  });

  test('New Journey button calls onReset', () => {
    const onReset = vi.fn();
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={onReset} onSave={vi.fn()} isSaved={false} />);
    fireEvent.click(screen.getByText('New Journey'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  test('renders destination and mood in hero', () => {
    render(<ExperienceResult data={MOCK_DATA} params={MOCK_PARAMS} onReset={vi.fn()} onSave={vi.fn()} isSaved={false} />);
    expect(screen.getByText('Jaipur, India')).toBeInTheDocument();
    expect(screen.getByText('Reflective & Regal')).toBeInTheDocument();
  });
});