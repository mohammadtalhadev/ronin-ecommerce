import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import orderService from '../../services/orderService'
import { BoxIcon } from '../../components/ui/Icons'

// Order history loaded from orderService (per-user storage now, API later)
function OrdersPage() {
  const { user } = useAuth()
  const orders = orderService.loadOrders(user.id)

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-900">My Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-12 text-center">
          <span className="mb-3 text-slate-400"><BoxIcon className="w-10 h-10" /></span>
          <p className="text-sm font-semibold text-slate-900">No orders yet</p>
          <p className="mt-1 text-xs text-gray-500">
            Your placed orders will appear here.
          </p>
          <Link
            to="/"
            className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-600"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-gray-100 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-900">{order.id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()} · {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 capitalize">
                  {order.status}
                </span>
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={`${order.id}-${item.id}-${item.color}`}
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                    className="h-12 w-12 rounded-xl bg-gray-50 object-contain"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card (demo)'}
                </span>
                <span className="font-bold text-slate-900">Rs.{order.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
