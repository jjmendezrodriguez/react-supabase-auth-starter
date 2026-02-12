// Client-side rate limiter with exponential backoff for auth attempts

const MAX_ATTEMPTS = 5
const BASE_DELAY_MS = 1000

interface RateLimiterState {
  attempts: number
  lockedUntil: number
}

const store = new Map<string, RateLimiterState>()

function getState(key: string): RateLimiterState {
  return store.get(key) ?? { attempts: 0, lockedUntil: 0 }
}

export function getRemainingLockSeconds(key: string): number {
  const state = getState(key)
  const remaining = Math.ceil((state.lockedUntil - Date.now()) / 1000)
  return remaining > 0 ? remaining : 0
}

export function isRateLimited(key: string): boolean {
  return getRemainingLockSeconds(key) > 0
}

export function recordFailedAttempt(key: string): void {
  const state = getState(key)
  const attempts = state.attempts + 1
  const delay = BASE_DELAY_MS * Math.pow(2, Math.min(attempts - 1, 5))
  store.set(key, {
    attempts,
    lockedUntil: attempts >= MAX_ATTEMPTS ? Date.now() + delay : 0,
  })
}

export function resetAttempts(key: string): void {
  store.delete(key)
}
