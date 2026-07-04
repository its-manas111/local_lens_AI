import { describe, test, expect, vi, beforeEach } from 'vitest';
import { _resetRateLimit } from '../utils/rateLimit';

// Mock the SDK — text() must be a function, not a property
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(() => ({
    models: {
      generateContent: vi.fn(),
    },
  })),
}));

// Mock rate limit so it never blocks during tests
vi.mock('../utils/rateLimit', () => ({
  checkRateLimit: vi.fn(() => true),
  _resetRateLimit: vi.fn(),
}));

// Mock sanitize — return input unchanged
vi.mock('../utils/sanitize', () => ({
  sanitizeDestination: vi.fn((v) => v),
}));

const VALID_RESPONSE = {
  title: 'Chai and Royal Shadows',
  tagline: 'Walk into history',
  story: 'A story of the old city.',
  experiences: [
    { id: '1', time: '9am', title: 'Morning Walk', description: 'desc', localTip: 'tip', type: 'Heritage' },
    { id: '2', time: '1pm', title: 'Lunch', description: 'desc', localTip: 'tip', type: 'Culinary' },
    { id: '3', time: '5pm', title: 'Sunset', description: 'desc', localTip: 'tip', type: 'Nature' },
  ],
  hiddenGem: { name: 'Hidden Spot', story: 'story', howToFind: 'find it' },
  localHost: { name: 'Priya', bio: 'bio', specialty: 'specialty' },
  foodMoment: { dish: 'Chai', story: 'story', whereToFind: 'corner stall' },
  communityTip: 'Go at dawn.',
};

const PARAMS = {
  destination: 'Jaipur, India',
  mood: 'Reflective & Regal',
  pace: 'slow',
  time: 'Dusk',
  companion: 'Solo traveler',
};

let generateContent;

beforeEach(async () => {
  vi.resetModules();
  _resetRateLimit();

  const { GoogleGenAI } = await import('@google/genai');
  const instance = new GoogleGenAI({ apiKey: 'test' });
  generateContent = instance.models.generateContent;
});

describe('generateExperience', () => {
  test('returns parsed data on happy path', async () => {
    const { generateExperience } = await import('../services/geminiService');
    generateContent.mockResolvedValueOnce({ text: () => JSON.stringify(VALID_RESPONSE) });

    const result = await generateExperience(PARAMS);
    expect(result.title).toBe(VALID_RESPONSE.title);
    expect(result.experiences).toHaveLength(3);
  });

  test('throws EMPTY_RESPONSE when text() returns empty string', async () => {
    const { generateExperience } = await import('../services/geminiService');
    // two calls (one retry) both return empty
    generateContent
      .mockResolvedValueOnce({ text: () => '' })
      .mockResolvedValueOnce({ text: () => '' });

    await expect(generateExperience(PARAMS)).rejects.toThrow('EMPTY_RESPONSE');
  });

  test('throws INVALID_RESPONSE when JSON is missing required fields', async () => {
    const { generateExperience } = await import('../services/geminiService');
    generateContent.mockResolvedValueOnce({
      text: () => JSON.stringify({ title: 'Only title' }),
    });

    await expect(generateExperience(PARAMS)).rejects.toThrow('INVALID_RESPONSE');
  });

  test('throws RATE_LIMIT when quota is exhausted (HTTP 429)', async () => {
    const { generateExperience } = await import('../services/geminiService');
    generateContent.mockRejectedValueOnce(new Error('429 RESOURCE_EXHAUSTED quota'));

    await expect(generateExperience(PARAMS)).rejects.toThrow('RATE_LIMIT');
  });

  test('throws API_ERROR on generic network failure', async () => {
    const { generateExperience } = await import('../services/geminiService');
    generateContent.mockRejectedValueOnce(new Error('Network error'));

    await expect(generateExperience(PARAMS)).rejects.toThrow('API_ERROR');
  });

  test('retries once on empty response and succeeds', async () => {
    const { generateExperience } = await import('../services/geminiService');
    generateContent
      .mockResolvedValueOnce({ text: () => '' })                            // first attempt → empty
      .mockResolvedValueOnce({ text: () => JSON.stringify(VALID_RESPONSE) }); // retry → success

    const result = await generateExperience(PARAMS);
    expect(result.title).toBe(VALID_RESPONSE.title);
    expect(generateContent).toHaveBeenCalledTimes(2);
  });
});