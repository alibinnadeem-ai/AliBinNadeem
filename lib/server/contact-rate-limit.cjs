'use strict';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const globalRateLimit = global;
if (!globalRateLimit.__abnContactRateLimit) {
  globalRateLimit.__abnContactRateLimit = new Map();
}

const store = globalRateLimit.__abnContactRateLimit;

function checkContactRateLimit(key) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_PER_WINDOW - 1 };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_PER_WINDOW - entry.count };
}

module.exports = {
  checkContactRateLimit,
};
