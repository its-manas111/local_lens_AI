import { render, screen, fireEvent } from '@testing-library/react';
import SavedJourneys from '../components/SavedJourneys';

const mockJourneys = [
  {
    id: 'abc',
    savedAt: new Date().toISOString(),
    data: { title: 'Evening in Oaxaca', tagline: 'Comal smoke and clay.' },
    params: { destination: 'Oaxaca, Mexico' },
  },
  {
    id: 'def',
    savedAt: new Date().toISOString(),
    data: { title: 'Kyoto at Dawn', tagline: 'Moss and quiet paths.' },
    params: { destination: 'Kyoto, Japan' },
  },
];

describe('SavedJourneys', () => {
  test('renders null when saved list is empty', () => {
    const { container } = render(
      <SavedJourneys saved={[]} onLoad={vi.fn()} onDelete={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders all saved journey titles', () => {
    render(<SavedJourneys saved={mockJourneys} onLoad={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Evening in Oaxaca')).toBeInTheDocument();
    expect(screen.getByText('Kyoto at Dawn')).toBeInTheDocument();
  });

  test('calls onLoad when re-live button is clicked', () => {
    const onLoad = vi.fn();
    render(<SavedJourneys saved={mockJourneys} onLoad={onLoad} onDelete={vi.fn()} />);
    fireEvent.click(screen.getAllByText('Re-live this journey')[0]);
    expect(onLoad).toHaveBeenCalledWith(mockJourneys[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<SavedJourneys saved={mockJourneys} onLoad={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByLabelText('Remove saved journey')[0]);
    expect(onDelete).toHaveBeenCalledWith('abc');
  });

  test('shows correct saved count in heading', () => {
    render(<SavedJourneys saved={mockJourneys} onLoad={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/2 journeys/i)).toBeInTheDocument();
  });
});