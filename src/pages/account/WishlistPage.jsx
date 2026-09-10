import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { HeartIcon } from '../../components/ui/Icons'

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const toast = useToast()

  const handleMoveToCart = (item) => {
    addToCart(item, 1)
    removeFromWishlist(item.id)
    toast.success(`${item.name} moved to cart.`)
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-900">Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 py-12 text-center">
          <span className="mb-3 text-red-300"><HeartIcon className="w-10 h-10" /></span>
          <p className="text-sm font-semibold text-slate-900">Your wishlist is empty</p>
          <p className="mt-1 text-xs text-gray-500">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/"
            className="mt-4 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-600"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 p-4"
            >
              <Link to={`/products/${item.handle}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl bg-gray-50 object-contain" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.handle}`}
                  className="text-sm font-semibold text-slate-900 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm">
                  <span className="font-bold text-slate-900">Rs.{item.price.toLocaleString()}</span>{' '}
                  <span className="text-xs text-gray-400 line-through">
                    Rs.{item.originalPrice.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                >
                  Move to cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className="rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:border-red-300 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistPage
