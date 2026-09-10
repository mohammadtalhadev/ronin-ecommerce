import { readStore, writeStore, removeFromStore, local } from './storageService'

// Simulated "users table" for the frontend demo.
//
// ⚠️ DEMO ONLY: this lives in localStorage and is NOT secure
// authentication. Passwords are hashed with SHA-256 (better than plain
// text, but still not production-grade — a real backend must use
// bcrypt/argon2 and never expose password material to the client).
// When the database is attached, this entire module is replaced by
// REST API calls; the exported interface stays identical.

const USERS_KEY = 'users'
function getUsers() {
  return readStore(local(), USERS_KEY) ?? []
}

function saveUsers(users) {
  writeStore(local(), USERS_KEY, users)
}

export function findUserByEmail(email) {
  const normalized = email.trim().toLowerCase()
  return getUsers().find((u) => u.email.toLowerCase() === normalized) ?? null
}

// crypto.subtle is async; async service methods make the future swap to
// `fetch()` seamless (same call signature for components).
async function hashPassword(password) {
  const salted = `ronin-demo-salt::${password}`
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salted))
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function signup({ name, email, phone, password }) {
  if (findUserByEmail(email)) {
    throw new Error('An account with this email already exists.')
  }
  const passwordHash = await hashPassword(password)
  const user = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    passwordHash,
    avatar: null,
    addresses: [],
    createdAt: new Date().toISOString(),
  }
  saveUsers([...getUsers(), user])
  // Return the "public" user — never expose the hash
  return toPublicUser(user)
}

export async function login(email, password) {
  const user = findUserByEmail(email)
  if (!user) throw new Error('No account found with this email.')
  const passwordHash = await hashPassword(password)
  if (passwordHash !== user.passwordHash) {
    throw new Error('Incorrect password. Please try again.')
  }
  return toPublicUser(user)
}

export function getCurrentUser(id) {
  if (!id) return null
  return getUsers().find((u) => u.id === id) ?? null
}

export function updateProfile(id, patch) {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('User not found.')
  users[index] = { ...users[index], ...patch }
  saveUsers(users)
  return toPublicUser(users[index])
}

export async function changePassword(id, currentPassword, newPassword) {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('User not found.')
  const currentHash = await hashPassword(currentPassword)
  if (currentHash !== users[index].passwordHash) {
    throw new Error('Current password is incorrect.')
  }
  users[index].passwordHash = await hashPassword(newPassword)
  saveUsers(users)
  return true
}

export function clearUsers() {
  removeFromStore(local(), USERS_KEY)
}

// Strip password material — this is the shape used everywhere in the UI
function toPublicUser(user) {
  const publicUser = { ...user }
  delete publicUser.passwordHash
  return publicUser
}

export default {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  findUserByEmail,
  clearUsers,
}

