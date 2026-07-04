const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;  // per window

// Module-level queue — shared across the app session
const timestamps = [];

/**
 * Returns true if the request is allowed, false if the rate limit is exceeded.
 * Sliding-window algorithm: counts requests in the last WINDOW_MS milliseconds.
 */
export function checkRateLimit() {
  const now = Date.now();
  // Evict expired timestamps
  while (timestamps.length > 0 && timestamps[0] < now - WINDOW_MS) {
    timestamps.shift();
  }
  if (timestamps.length >= MAX_REQUESTS) return false;
  timestamps.push(now);
  return true;
}

/** Exposed for testing only */
export function _resetRateLimit() {
  timestamps.length = 0;
}