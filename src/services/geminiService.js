import { GoogleGenAI } from '@google/genai';
import { sanitizeDestination } from '../utils/sanitize';
import { checkRateLimit } from '../utils/rateLimit';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Singleton — one instance for the lifetime of the app session.
// NOTE: VITE_ prefix exposes this key to the client bundle; this is expected
// for a purely client-side SPA. For production, proxy via a backend function.
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const LOADING_INTERVAL_MS = 2200;
export { LOADING_INTERVAL_MS };

const EXPERIENCE_SCHEMA = {
  type: 'object',
  properties: {
    title:    { type: 'string' },
    tagline:  { type: 'string' },
    story:    { type: 'string' },
    experiences: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id:          { type: 'string' },
          time:        { type: 'string' },
          title:       { type: 'string' },
          description: { type: 'string' },
          localTip:    { type: 'string' },
          type:        { type: 'string' },
        },
        required: ['id', 'time', 'title', 'description', 'localTip', 'type'],
      },
    },
    hiddenGem: {
      type: 'object',
      properties: {
        name:      { type: 'string' },
        story:     { type: 'string' },
        howToFind: { type: 'string' },
      },
      required: ['name', 'story', 'howToFind'],
    },
    localHost: {
      type: 'object',
      properties: {
        name:      { type: 'string' },
        bio:       { type: 'string' },
        specialty: { type: 'string' },
      },
      required: ['name', 'bio', 'specialty'],
    },
    foodMoment: {
      type: 'object',
      properties: {
        dish:        { type: 'string' },
        story:       { type: 'string' },
        whereToFind: { type: 'string' },
      },
      required: ['dish', 'story', 'whereToFind'],
    },
    communityTip: { type: 'string' },
  },
  required: ['title', 'tagline', 'story', 'experiences', 'hiddenGem', 'localHost', 'foodMoment', 'communityTip'],
};

function buildPrompt({ destination, mood, pace, time, companion }) {
  // Sanitize destination before interpolating to prevent prompt injection
  const safeDestination = sanitizeDestination(destination);

  return `You are a local experience curator — not a tour guide. You craft deeply immersive, emotional, sensory journeys for travelers who want to feel a place, not just see it.

A traveler has shared the following:
- Destination: ${safeDestination}
- Mood / Desired feeling: ${mood}
- Preferred pace: ${pace === 'slow' ? 'Deep & Slow (fewer experiences, longer lingering)' : 'Active Explorer (wandering far, seeing transitions)'}
- Time of day preference: ${time}
- Traveling: ${companion}

Create a single-day immersive local experience itinerary. Follow these rules strictly:

1. Do NOT recommend tourist attractions, landmarks, or famous sights.
2. Every experience MUST feel emotional, sensory, and deeply local.
3. Write as a storyteller — not a travel agent. Use present tense, vivid imagery.
4. Hidden gems must be genuinely off the beaten path — something that would require a local to find.
5. The local host should feel like a real person with a specific story and craft.
6. Food moments should center on human connection, not just the dish.
7. Generate exactly 3-4 experiences in the timeline.
8. Each experience type must be one of: Cultural, Culinary, Nature, Social, Heritage.
9. Return ONLY the JSON object matching the schema — no extra commentary.`;
}

function isValidParsed(parsed) {
  return (
    parsed &&
    typeof parsed.title === 'string' &&
    typeof parsed.tagline === 'string' &&
    Array.isArray(parsed.experiences) &&
    parsed.experiences.length >= 3 &&
    parsed.hiddenGem &&
    parsed.localHost &&
    parsed.foodMoment
  );
}

async function callGemini(params, attempt = 1) {
  const response = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: buildPrompt(params),
    config: {
      responseMimeType: 'application/json',
      responseSchema: EXPERIENCE_SCHEMA,
      temperature: 0.85,
      maxOutputTokens: 2048,
    },
  });

  const text = response.text();
  if (!text) {
    // One automatic retry on empty response (transient Gemini issue)
    if (attempt < 2) return callGemini(params, attempt + 1);
    throw new Error('EMPTY_RESPONSE');
  }
  return text;
}

export async function generateExperience(params) {
  if (!API_KEY) throw new Error('MISSING_API_KEY');
  if (!checkRateLimit()) throw new Error('RATE_LIMIT');

  try {
    const text = await callGemini(params);
    const parsed = JSON.parse(text);

    if (!isValidParsed(parsed)) {
      throw new Error('INVALID_RESPONSE');
    }

    return parsed;
  } catch (err) {
    const knownErrors = new Set(['MISSING_API_KEY', 'EMPTY_RESPONSE', 'INVALID_RESPONSE', 'RATE_LIMIT']);
    if (knownErrors.has(err.message)) throw err;

    if (
      err.message?.includes('429') ||
      err.message?.includes('RESOURCE_EXHAUSTED') ||
      err.message?.includes('quota')
    ) {
      throw new Error('RATE_LIMIT');
    }

    throw new Error('API_ERROR');
  }
}