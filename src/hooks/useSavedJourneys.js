import { useState } from 'react';

const STORAGE_KEY = 'locallens_journeys';
const MAX_SAVED = 10;

function isValidJourney(j) {
  return (
    j &&
    typeof j.id === 'string' &&
    typeof j.savedAt === 'string' &&
    j.data &&
    typeof j.data.title === 'string' &&
    j.params &&
    typeof j.params.destination === 'string'
  );
}

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Validate each entry so corrupt data never reaches the UI
    return parsed.filter(isValidJourney);
  } catch {
    return [];
  }
}

function writeStorage(journeys) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
  } catch {
    // Storage quota exceeded — fail silently; app still works in-memory
  }
}

export function useSavedJourneys() {
  const [saved, setSaved] = useState(readStorage);

  const saveJourney = (data, params) => {
    const journey = {
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      data,
      params,
    };
    const updated = [journey, ...saved].slice(0, MAX_SAVED);
    setSaved(updated);
    writeStorage(updated);
  };

  const deleteJourney = (id) => {
    const updated = saved.filter((j) => j.id !== id);
    setSaved(updated);
    writeStorage(updated);
  };

  const isJourneySaved = (title) => saved.some((j) => j.data?.title === title);

  return { saved, saveJourney, deleteJourney, isJourneySaved };
}