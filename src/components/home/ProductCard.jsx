import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { HeartIcon, StarIcon, CartIcon } from '../ui/Icons'

function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  // URL-friendly handle from the product name, e.g. "Magnitude Headphone" -> magnitude-headphone
  const handle = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const fullStars = Math.floor(product.rating)
  const totalStars = [1, 2, 3, 4, 5]

  return (
    <Link
      to={`/products/${handle}`}
      className="product-card relative mt-12 block cursor-pointer"
    >
      {/* Shape layer - diagonal-cut card background, sits behind everything */}
      <div
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url("https://ronin.pk/cdn/shop/files/prod-shape.svg?v=1769464389")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Real content - sits on top of the shape, unaffected by its cut */}
      <div className="relative z-10 flex flex-col h-full px-5 pb-5 pt-1">

        {/* Ribbon badge - rotated pill, matches Ronin's real CSS */}
        {product.tag && (
          <span
            className="absolute z-20 text-white text-[8px] font-bold leading-[8px] px-3 py-1.5 rounded-t-[15px] -rotate-90 origin-bottom-left whitespace-nowrap"
            style={{
              bottom: '35%',
              left: '0px',
              backgroundImage: 'linear-gradient(90deg, rgb(3,177,230), rgb(3,84,205))',
              fontSize: '8px',
              letterSpacing: '0.5px',
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Wishlist heart toggle - stopPropagation so it doesn't navigate */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product)
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className="absolute top-9 right-1 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <HeartIcon
            filled={wishlisted}
            className={`w-[18px] h-[18px] transition-colors duration-200 ${wishlisted ? 'text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Discount badge - top right */}
        <span className="absolute top-0 right-0 z-20 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          {discountPercent}% OFF
        </span>
        <div className="-mt-20 mb-3 flex justify-center dropshadow-md">
        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="product-card-img w-auto h-50 object-contain mb-3 mt-4"
        />
        </div>
        {/* Name + spec */}
        <h3 className="text-sm font-bold text-slate-900 uppercase">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.spec}</p>

        {/* Rating + color swatches */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {totalStars.map((star) => (
              <StarIcon
                key={star}
                filled={star <= fullStars}
                className={`w-3 h-3 ${star <= fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{product.rating}</span>

          {product.colors && (
            <div className="flex items-center gap-1.5 ml-auto">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="w-3.5 h-3.5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        <hr className="my-3 border-gray-100" />

        {/* Price + Buy button - pinned to bottom via mt-auto */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm font-bold text-slate-900">
              Rs.{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 line-through ml-2">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-orange-600 transition relative z-30">
            <CartIcon className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard