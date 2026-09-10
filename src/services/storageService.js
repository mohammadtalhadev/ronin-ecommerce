// Central storage helpers.
//
// IMPORTANT: This is the ONLY file in the app allowed to touch
// localStorage / sessionStorage directly. Everything else must go
// through services (authService, cartService, etc.). When a real
// backend is added, this adapter is swapped out — components and
// contexts should never know a browser storage API exists.

const PREFIX = 'ronin:'

export function readStore(storage, key) {
  try {
    const raw = storage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeStore(storage, key, value) {
  try {
    storage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeFromStore(storage, key) {
  try {
    storage.removeItem(PREFIX + key)
  } catch {
    // storage unavailable (e.g. private mode) — ignore
  }
}

// Local (persists across browser restarts) — used for "Remember me"
export const local = () => window.localStorage
// Session (cleared when the tab closes) — used for non-persistent login
export const session = () => window.sessionStorage
