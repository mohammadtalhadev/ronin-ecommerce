import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { XMarkIcon, TrashIcon } from '../ui/Icons'

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isGuestCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    // Preserve intended destination through the login guard chain:
    // /checkout → (guest) → /login?redirect=/checkout → back to /checkout
    navigate('/checkout')
  }

  return (
    <>
      {/* Dark overlay behind the drawer — fades in/out, never blocks when closed */}
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sliding drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Cart
              <span className="bg-gray-100 text-sm font-semibold text-slate-700 w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-slate-900 transition" aria-label="Close cart">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable item list — scrolls natively (not smooth-scrolled by Lenis) */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          >
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex gap-4 bg-gray-50 rounded-2xl p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded-xl shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.color ? (
                            <span className="inline-flex items-center gap-1.5">
                              Color:
                              <span
                                className="inline-block h-3 w-3 rounded-full border border-gray-200"
                                style={{ backgroundColor: item.color }}
                              />
                            </span>
                          ) : (
                            ''
                          )}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-bold text-slate-900">
                            Rs.{item.price.toLocaleString()}
                          </span>{' '}
                          <span className="text-gray-400 line-through text-xs">
                            Rs.{item.originalPrice.toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-gray-400 hover:text-red-500 transition"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        Rs.{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: total + checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-900">Estimated total</span>
                <span className="font-bold text-lg text-slate-900">
                  Rs.{cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Taxes and shipping calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-slate-900 text-white font-semibold py-4 rounded-full hover:bg-slate-800 transition"
              >
                Check out
              </button>
              {isGuestCart && (
                <p className="mt-2 text-center text-xs text-gray-400">
                  You&apos;ll be asked to log in at checkout — your cart will be saved.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartDrawer