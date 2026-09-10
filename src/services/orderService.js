import { readStore, writeStore, removeFromStore, local } from './storageService'

// Orders are stored per user: ronin:orders:{userId}.
// Order model (this shape is what the future backend should return):
// {
//   id: 'ord_...',                 // order number
//   userId: 'usr_...',
//   items: [{ id, name, image, price, quantity, color }],
//   address: { fullName, phone, street, city, province },
//   paymentMethod: 'cod' | 'card',
//   subtotal, shipping, total,
//   status: 'placed',
//   createdAt: ISO string
// }

const ORDERS_KEY = 'orders'

export function loadOrders(userId) {
  return readStore(local(), `${ORDERS_KEY}:${userId}`) ?? []
}

export function saveOrder(userId, order) {
  const orders = loadOrders(userId)
  const next = [order, ...orders]
  writeStore(local(), `${ORDERS_KEY}:${userId}`, next)
  return order
}

export function getOrder(userId, orderId) {
  return loadOrders(userId).find((o) => o.id === orderId) ?? null
}

export function createOrderId() {
  return `RN-${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`
}

export function clearOrders(userId) {
  removeFromStore(local(), `${ORDERS_KEY}:${userId}`)
}

export default {
  loadOrders,
  saveOrder,
  getOrder,
  createOrderId,
  clearOrders,
}

