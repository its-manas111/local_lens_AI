import { renderHook, act } from '@testing-library/react';
import { useSavedJourneys } from '../hooks/useSavedJourneys';

const mockData = { title: 'Jaipur at Dusk', tagline: 'Where dust meets gold.' };
const mockParams = { destination: 'Jaipur, India', mood: 'Reflective & Regal' };

beforeEach(() => {
  localStorage.clear();
});

describe('useSavedJourneys', () => {
  test('starts with empty saved list', () => {
    const { result } = renderHook(() => useSavedJourneys());
    expect(result.current.saved).toHaveLength(0);
  });

  test('saveJourney adds an entry with id and savedAt', () => {
    const { result } = renderHook(() => useSavedJourneys());
    act(() => { result.current.saveJourney(mockData, mockParams); });
    expect(result.current.saved).toHaveLength(1);
    expect(result.current.saved[0].id).toBeDefined();
    expect(result.current.saved[0].savedAt).toBeDefined();
    expect(result.current.saved[0].data.title).toBe(mockData.title);
  });

  test('deleteJourney removes the correct entry', () => {
    const { result } = renderHook(() => useSavedJourneys());
    act(() => { result.current.saveJourney(mockData, mockParams); });
    const id = result.current.saved[0].id;
    act(() => { result.current.deleteJourney(id); });
    expect(result.current.saved).toHaveLength(0);
  });

  test('isJourneySaved returns true when title matches', () => {
    const { result } = renderHook(() => useSavedJourneys());
    act(() => { result.current.saveJourney(mockData, mockParams); });
    expect(result.current.isJourneySaved(mockData.title)).toBe(true);
  });

  test('isJourneySaved returns false for unknown title', () => {
    const { result } = renderHook(() => useSavedJourneys());
    expect(result.current.isJourneySaved('Nonexistent Journey')).toBe(false);
  });

  test('persists to localStorage on save', () => {
    const { result } = renderHook(() => useSavedJourneys());
    act(() => { result.current.saveJourney(mockData, mockParams); });
    const stored = JSON.parse(localStorage.getItem('locallens_journeys'));
    expect(stored).toHaveLength(1);
    expect(stored[0].data.title).toBe(mockData.title);
  });
});