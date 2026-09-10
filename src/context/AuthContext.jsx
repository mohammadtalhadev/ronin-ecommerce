/* eslint-disable react-refresh/only-export-components -- context object + provider live together by design */
import { createContext, useState, useCallback, useMemo } from 'react'
import authService from '../services/authService'
import { readStore, writeStore, removeFromStore, local, session } from '../services/storageService'

// Auth is a thin state layer over the service. Components never touch
// localStorage — they only call login/signup/logout/updateProfile.
//
// Design decisions:
// - `isAuthenticated` is DERIVED from the session (Boolean(user)), never
//   stored inside the user object.
// - "Remember me" decides WHERE the session lives:
//     checked   → localStorage  (survives browser restart)
//     unchecked → sessionStorage (dies with the tab)

const SESSION_KEY = 'session'

function readSession() {
  return readStore(local(), SESSION_KEY) ?? readStore(session(), SESSION_KEY)
}
function writeSession(user, rememberMe) {
  // Clear both first so switching modes never leaves a stale copy behind
  removeFromStore(local(), SESSION_KEY)
  removeFromStore(session(), SESSION_KEY)
  writeStore(rememberMe ? local() : session(), SESSION_KEY, user)
}

function clearSession() {
  removeFromStore(local(), SESSION_KEY)
  removeFromStore(session(), SESSION_KEY)
}

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Session restore is synchronous, so it happens in the lazy state
  // initializer (no effect, no cascading render). A real backend would
  // validate a token here — same shape, no component changes needed later.
  // `isLoading` will be reintroduced when session validation becomes async.
  const [user, setUser] = useState(() => {
    const stored = readSession()
    if (stored?.id) {
      // Re-read the user record so profile edits show up
      return authService.getCurrentUser(stored.id) ?? stored
    }
    return null
  })

  const login = useCallback(async (email, password, { rememberMe = true } = {}) => {
    const loggedInUser = await authService.login(email, password)
    writeSession(loggedInUser, rememberMe)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  const signup = useCallback(async (formData) => {
    const newUser = await authService.signup(formData)
    writeSession(newUser, true)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (patch) => {
    if (!user) throw new Error('Not signed in.')
    const updated = authService.updateProfile(user.id, patch)
    // Refresh the session copy too, so a reload shows the same data
    writeSession(updated, Boolean(readStore(local(), SESSION_KEY)))
    setUser(updated)
    return updated
  }, [user])

  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      if (!user) throw new Error('Not signed in.')
      return authService.changePassword(user.id, currentPassword, newPassword)
    },
    [user]
  )

  // Derived — not stored on the user object
  const isAuthenticated = Boolean(user)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
      changePassword,
    }),
    [user, isAuthenticated, login, signup, logout, updateProfile, changePassword]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
