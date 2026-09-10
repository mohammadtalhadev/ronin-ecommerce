import { readStore, writeStore, removeFromStore, local } from './storageService'

// Wishlist is user-aware like the cart: ronin:wishlist:{userId}.
// Products are stored as { id, name, price, originalPrice, image, handle }
// snapshots so the wishlist page doesn't need to re-resolve catalog data.

export function wishlistKey(userId) {
  return `wishlist:${userId ?? 'guest'}`
}

export function loadWishlist(userId) {
  return readStore(local(), wishlistKey(userId)) ?? []
}

export function saveWishlist(userId, items) {
  writeStore(local(), wishlistKey(userId), items)
}

export function clearWishlist(userId) {
  removeFromStore(local(), wishlistKey(userId))
}

// Merge guest wishlist into a user wishlist on login (dedupe by product id)
export function mergeWishlists(guestItems, userItems) {
  const ids = new Set(userItems.map((i) => i.id))
  return [...userItems, ...guestItems.filter((i) => !ids.has(i.id))]
}

export default {
  wishlistKey,
  loadWishlist,
  saveWishlist,
  clearWishlist,
  mergeWishlists,
}

