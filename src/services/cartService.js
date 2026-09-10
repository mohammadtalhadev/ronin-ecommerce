import { readStore, writeStore, removeFromStore, local } from './storageService'

// Carts are USER-AWARE so two accounts never share items:
//   ronin:cart:guest   → anonymous browsing cart
//   ronin:cart:usr_123 → per-user cart
// Merging guest → user on login is handled by CartContext.

export const GUEST_CART_ID = 'guest'

export function cartKey(userId) {
  return `cart:${userId ?? GUEST_CART_ID}`
}

export function loadCart(userId) {
  return readStore(local(), cartKey(userId)) ?? []
}

export function saveCart(userId, items) {
  writeStore(local(), cartKey(userId), items)
}

export function clearCart(userId) {
  removeFromStore(local(), cartKey(userId))
}

// Merge guest cart into a user cart after login. Duplicate products
// (same id + color) have their quantities summed; others are appended.
export function mergeCarts(guestItems, userItems) {
  const merged = [...userItems]
  for (const guestItem of guestItems) {
    const existing = merged.find(
      (item) => item.id === guestItem.id && item.color === guestItem.color
    )
    if (existing) {
      existing.quantity += guestItem.quantity
    } else {
      merged.push(guestItem)
    }
  }
  return merged
}

export default {
  GUEST_CART_ID,
  cartKey,
  loadCart,
  saveCart,
  clearCart,
  mergeCarts,
}

