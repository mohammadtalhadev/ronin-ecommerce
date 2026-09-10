/* eslint-disable react-refresh/only-export-components -- context object + provider live together by design */
import { createContext, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import cartService from '../services/cartService'

// Cart is user-aware and persistent:
//   guests  → ronin:cart:guest
//   users   → ronin:cart:{userId}
// On login, a non-empty guest cart is MERGED into the user's cart
// (quantities summed for duplicates) and the guest cart is cleared.

export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const userId = isAuthenticated ? user.id : cartService.GUEST_CART_ID

  const [cartItems, setCartItems] = useState(() => cartService.loadCart(userId))

  // Track the previous user id to detect login/logout transitions and
  // merge the guest cart into the user cart exactly once.
  const prevUserIdRef = useRef(userId)

  useEffect(() => {
    const prevUserId = prevUserIdRef.current
    if (prevUserId !== userId) {
      const guestItems = cartService.loadCart(cartService.GUEST_CART_ID)
      const userItems = cartService.loadCart(userId)
      let nextItems
      if (isAuthenticated && prevUserId === cartService.GUEST_CART_ID && guestItems.length > 0) {
        nextItems = cartService.mergeCarts(guestItems, userItems)
      } else {
        nextItems = userItems
      }
      cartService.saveCart(userId, nextItems)
      if (isAuthenticated) cartService.clearCart(cartService.GUEST_CART_ID)
      setCartItems(nextItems)
      prevUserIdRef.current = userId
    }
  }, [userId, isAuthenticated])

  const setItemsAndPersist = useCallback(
    (updater) => {
      setCartItems((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        cartService.saveCart(userId, next)
        return next
      })
    },
    [userId]
  )

  const addToCart = useCallback(
    (product, quantity = 1, color = null) => {
      setItemsAndPersist((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.id === product.id && item.color === color
        )
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id && item.color === color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        return [...prevItems, { ...product, quantity, color }]
      })
    },
    [setItemsAndPersist]
  )

  const removeFromCart = useCallback(
    (id, color) => {
      setItemsAndPersist((prevItems) =>
        prevItems.filter((item) => !(item.id === id && item.color === color))
      )
    },
    [setItemsAndPersist]
  )

  const updateQuantity = useCallback(
    (id, color, newQuantity) => {
      if (newQuantity < 1) return
      setItemsAndPersist((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.color === color ? { ...item, quantity: newQuantity } : item
        )
      )
    },
    [setItemsAndPersist]
  )

  const clearCart = useCallback(() => {
    setItemsAndPersist([])
  }, [setItemsAndPersist])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isGuestCart: !isAuthenticated,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isAuthenticated]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
