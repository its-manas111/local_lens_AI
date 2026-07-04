import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceForm from '../components/ExperienceForm';

const renderForm = (overrides = {}) =>
  render(<ExperienceForm onSubmit={vi.fn()} onBack={vi.fn()} {...overrides} />);

describe('ExperienceForm — Step 1 (Destination)', () => {
  test('renders step 1 heading', () => {
    renderForm();
    expect(screen.getByText(/Where does your story take place/i)).toBeInTheDocument();
  });

  test('Continue button is disabled initially', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  test('Continue button is disabled when custom field is empty after selecting custom', () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter any destination/i), { target: { value: '' } });
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  test('custom destination input accepts text', () => {
    renderForm();
    const input = screen.getByPlaceholderText(/Enter any destination/i);
    fireEvent.change(input, { target: { value: 'Tokyo' } });
    expect(input.value).toBe('Tokyo');
  });

  test('Continue button enables after typing a valid custom destination', () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter any destination/i), { target: { value: 'Tokyo' } });
    expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
  });

  test('selecting a preset destination enables Continue', () => {
    renderForm();
    fireEvent.click(screen.getByText('Jaipur, India'));
    expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
  });

  test('Back button calls onBack on step 1', () => {
    const onBack = vi.fn();
    renderForm({ onBack });
    fireEvent.click(screen.getByRole('button', { name: /go back to home/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  test('renders progress bar with aria attributes', () => {
    renderForm();
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '33');
  });
});

describe('ExperienceForm — Step 2 (Mood)', () => {
  const goToStep2 = () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter any destination/i), { target: { value: 'Kyoto' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
  };

  test('renders step 2 after advancing from step 1', () => {
    goToStep2();
    expect(screen.getByText(/How do you want to feel today/i)).toBeInTheDocument();
  });

  test('Continue is disabled until a mood is selected', () => {
    goToStep2();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  test('Continue enables after selecting a mood', () => {
    goToStep2();
    fireEvent.click(screen.getByText('Reflective & Regal'));
    expect(screen.getByRole('button', { name: /continue/i })).not.toBeDisabled();
  });
});

describe('ExperienceForm — Step 3 (Preferences)', () => {
  const goToStep3 = () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter any destination/i), { target: { value: 'Kyoto' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByText('Reflective & Regal'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
  };

  test('renders step 3 heading', () => {
    goToStep3();
    expect(screen.getByText(/Tune your experience pace/i)).toBeInTheDocument();
  });

  test('time of day buttons are rendered', () => {
    goToStep3();
    expect(screen.getByText('Dawn')).toBeInTheDocument();
    expect(screen.getByText('Dusk')).toBeInTheDocument();
    expect(screen.getByText('Night')).toBeInTheDocument();
  });

  test('companion options are rendered', () => {
    goToStep3();
    expect(screen.getByText('Solo traveler')).toBeInTheDocument();
    expect(screen.getByText('With a partner')).toBeInTheDocument();
  });

  test('Generate Journey button is enabled on step 3', () => {
    goToStep3();
    expect(screen.getByRole('button', { name: /Generate Journey/i })).not.toBeDisabled();
  });

  test('Generate Journey calls onSubmit with correct shape', () => {
    const onSubmit = vi.fn();
    render(<ExperienceForm onSubmit={onSubmit} onBack={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter any destination/i), { target: { value: 'Oaxaca' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByText('Connected & Warm'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    fireEvent.click(screen.getByRole('button', { name: /Generate Journey/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    const submitted = onSubmit.mock.calls[0][0];
    expect(submitted.destination).toBe('Oaxaca');
    expect(submitted.mood).toBe('Connected & Warm');
    expect(submitted.pace).toBeDefined();
    expect(submitted.time).toBeDefined();
    expect(submitted.companion).toBeDefined();
  });
});