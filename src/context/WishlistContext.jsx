/* eslint-disable react-refresh/only-export-components -- context object + provider live together by design */
import { createContext, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import wishlistService from '../services/wishlistService'

// Wishlist is user-aware (ronin:wishlist:{userId}) and merges the guest
// wishlist into the user's on login — same pattern as the cart.

export const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const userId = isAuthenticated ? user.id : null

  const [wishlistItems, setWishlistItems] = useState(() => wishlistService.loadWishlist(userId))

  // Merge the guest wishlist into the user's wishlist on login (once)
  const prevUserIdRef = useRef(userId)
  useEffect(() => {
    const prevUserId = prevUserIdRef.current
    if (prevUserId !== userId) {
      const guestItems = wishlistService.loadWishlist(null)
      const userItems = wishlistService.loadWishlist(userId)
      const nextItems =
        userId && prevUserId === null && guestItems.length > 0
          ? wishlistService.mergeWishlists(guestItems, userItems)
          : userItems
      wishlistService.saveWishlist(userId, nextItems)
      if (userId) wishlistService.clearWishlist(null)
      setWishlistItems(nextItems)
      prevUserIdRef.current = userId
    }
  }, [userId])

  // ProductCard stores a lightweight snapshot of the product so the
  // wishlist page never needs to re-resolve catalog data.
  const toSnapshot = (product) => {
    const handle = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      handle,
    }
  }

  const setItemsAndPersist = useCallback(
    (updater) => {
      setWishlistItems((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        wishlistService.saveWishlist(userId, next)
        return next
      })
    },
    [userId]
  )

  const toggleWishlist = useCallback(
    (product) => {
      setItemsAndPersist((prev) => {
        const exists = prev.some((item) => item.id === product.id)
        if (exists) {
          return prev.filter((item) => item.id !== product.id)
        }
        return [...prev, toSnapshot(product)]
      })
    },
    [setItemsAndPersist]
  )

  const removeFromWishlist = useCallback(
    (productId) => {
      setItemsAndPersist((prev) => prev.filter((item) => item.id !== productId))
    },
    [setItemsAndPersist]
  )

  const isWishlisted = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  )

  const value = useMemo(
    () => ({ wishlistItems, toggleWishlist, removeFromWishlist, isWishlisted, wishlistCount: wishlistItems.length }),
    [wishlistItems, toggleWishlist, removeFromWishlist, isWishlisted]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
