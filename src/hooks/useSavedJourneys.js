import { useState } from 'react';

const STORAGE_KEY = 'locallens_journeys';
const MAX_SAVED = 10;

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteJourney = (id) => {
    const updated = saved.filter((j) => j.id !== id);
    setSaved(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isJourneySaved = (title) => saved.some((j) => j.data?.title === title);

  return { saved, saveJourney, deleteJourney, isJourneySaved };
}