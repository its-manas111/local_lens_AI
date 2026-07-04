import { render, screen } from '@testing-library/react';
import LoadingExperience from '../components/LoadingExperience';

describe('LoadingExperience', () => {
  test('has role="status" for screen readers', () => {
    render(<LoadingExperience />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows heading text', () => {
    render(<LoadingExperience />);
    expect(screen.getByText(/Crafting your local journey/i)).toBeInTheDocument();
  });

  test('shows destination when provided', () => {
    render(<LoadingExperience destination="Jaipur, India" />);
    expect(screen.getByText(/in Jaipur, India/i)).toBeInTheDocument();
  });

  test('does not show destination paragraph when omitted', () => {
    render(<LoadingExperience />);
    expect(screen.queryByText(/^in /)).toBeNull();
  });

  test('has aria-busy="true"', () => {
    render(<LoadingExperience />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  test('has aria-label describing the loading state', () => {
    render(<LoadingExperience destination="Kyoto" />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-label')).toContain('Kyoto');
  });
});