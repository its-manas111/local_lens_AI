const MAX_DESTINATION_LENGTH = 100;

/**
 * Strips characters that could be used for prompt injection before the
 * destination string is interpolated into the Gemini prompt.
 * Preserves international letters, spaces, hyphens, apostrophes, and commas.
 */
export function sanitizeDestination(value) {
  if (typeof value !== 'string') return '';
  return value
    .slice(0, MAX_DESTINATION_LENGTH)
    .replace(/[<>{}\[\]\\]/g, '')   // remove HTML / JSON / shell metacharacters
    .replace(/[\r\n]+/g, ' ')       // collapse newlines (common injection vector)
    .replace(/\s{2,}/g, ' ')        // collapse whitespace runs
    .trim();
}

export function isValidDestination(value) {
  if (typeof value !== 'string') return false;
  const clean = sanitizeDestination(value);
  return clean.length >= 2 && clean.length <= MAX_DESTINATION_LENGTH;
}