import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import orderService from '../services/orderService'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { CheckIcon, CartIcon } from '../components/ui/Icons'

// Checkout flow: Address → Payment → Review → Order placed.
// Payment is a placeholder (Cash on Delivery works; card is mocked) —
// a real gateway is attached when the backend lands.
function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const toast = useToast()

  const [step, setStep] = useState(1) // 1 address, 2 payment, 3 review
  const [address, setAddress] = useState({
    fullName: user?.name ?? '',
    phone: user?.phone ?? '',
    street: '',
    city: '',
    province: 'Punjab',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const SHIPPING_FREE_THRESHOLD = 5000
  const shipping = cartTotal >= SHIPPING_FREE_THRESHOLD || cartTotal === 0 ? 0 : 250
  const grandTotal = cartTotal + shipping

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateAddress = () => {
    const next = {}
    if (!address.fullName.trim()) next.fullName = 'Full name is required.'
    if (!address.phone.trim()) next.phone = 'Phone is required.'
    if (!address.street.trim()) next.street = 'Street address is required.'
    if (!address.city.trim()) next.city = 'City is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handlePlaceOrder = async () => {
    setPlacing(true)
    try {
      const order = {
        id: orderService.createOrderId(),
        userId: user.id,
        items: cartItems,
        address,
        paymentMethod,
        subtotal: cartTotal,
        shipping,
        total: grandTotal,
        status: 'placed',
        createdAt: new Date().toISOString(),
      }
      orderService.saveOrder(user.id, order)
      clearCart()
      setPlacedOrder(order)
      toast.success(`Order ${order.id} placed successfully!`)
    } finally {
      setPlacing(false)
    }
  }

  // ── Order confirmation state ─────────────────────────────────────────
  if (placedOrder) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-3 py-16 bg-[#F0F0F0] md:px-4 md:py-20">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-xl md:rounded-3xl md:p-8 lg:p-10">
          <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckIcon className="w-8 h-8" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Order confirmed!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for shopping with Ronin. Your order{' '}
            <span className="font-bold text-slate-900">{placedOrder.id}</span> has been placed.
          </p>
          <div className="my-6 rounded-2xl bg-gray-50 p-4 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Payment method</span>
              <span className="font-semibold text-slate-900">
                {placedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card (demo)'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-slate-900">Rs.{placedOrder.total.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/account/orders" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              View my orders
            </Link>
            <Link to="/" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:border-slate-900">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Empty cart guard ─────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 text-slate-400"><CartIcon className="w-12 h-12" /></span>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mb-6 text-sm text-gray-500">Add some products before checking out.</p>
        <Link to="/" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
          Browse products
        </Link>
      </div>
    )
  }

  const steps = ['Address', 'Payment', 'Review']

  return (
    <div className="bg-[#F0F0F0] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Checkout</h1>
        <CheckoutStepper step={step} steps={steps} />
        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Shipping address</h2>
              <Input label="Full name" name="fullName" value={address.fullName} onChange={handleAddressChange} error={errors.fullName} />
              <Input label="Phone" name="phone" type="tel" value={address.phone} onChange={handleAddressChange} error={errors.phone} />
              <Input label="Street address" name="street" placeholder="House #, street, area" value={address.street} onChange={handleAddressChange} error={errors.street} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="City" name="city" value={address.city} onChange={handleAddressChange} error={errors.city} />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Province</label>
                  <select
                    name="province"
                    value={address.province}
                    onChange={handleAddressChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
                  >
                    {['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button variant="dark" className="w-full" onClick={() => { if (validateAddress()) setStep(2) }}>
                Continue to payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Payment method</h2>
              {[
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay in cash when your order arrives.' },
                { id: 'card', label: 'Card (demo)', desc: 'Payment gateway will be integrated with the backend.' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    paymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-1 accent-orange-500"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{method.label}</span>
                    <span className="block text-xs text-gray-500">{method.desc}</span>
                  </span>
                </label>
              ))}
              {paymentMethod === 'card' && (
                <p className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-700">
                  Card fields are a demo placeholder. Real payment processing requires a backend —
                  no card data is ever stored.
                </p>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button variant="dark" className="flex-1" onClick={() => setStep(3)}>Review order</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-slate-900">Review your order</h2>
              <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl bg-white object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      Rs.{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gray-50 p-4 text-sm">
                <div className="flex justify-between py-1"><span className="text-gray-500">Subtotal</span><span className="font-semibold">Rs.{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between py-1"><span className="text-gray-500">Shipping</span><span className="font-semibold">{shipping === 0 ? 'Free' : `Rs.${shipping}`}</span></div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between py-1"><span className="font-bold text-slate-900">Total</span><span className="text-lg font-bold text-slate-900">Rs.{grandTotal.toLocaleString()}</span></div>
              </div>
              <p className="text-xs text-gray-500">
                Delivering to: {address.fullName}, {address.street}, {address.city}, {address.province} — {address.phone}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button variant="dark" loading={placing} className="flex-1" onClick={handlePlaceOrder}>
                  {placing ? 'Placing order…' : 'Place order'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CheckoutStepper({ step, steps }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {steps.map((label, i) => (
        <div key={label} className="flex flex-1 items-center gap-2">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-orange-500 text-white' : 'border border-gray-200 bg-white text-gray-400'
            }`}
          >
            {step > i + 1 ? <CheckIcon className="w-4 h-4" /> : i + 1}
          </span>
          <span className={`text-sm font-semibold ${step >= i + 1 ? 'text-slate-900' : 'text-gray-400'}`}>{label}</span>
          {i < steps.length - 1 && <hr className="flex-1 border-gray-300" />}
        </div>
      ))}
    </div>
  )
}

export default CheckoutPage

