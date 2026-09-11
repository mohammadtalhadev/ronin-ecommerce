import { Link } from 'react-router-dom'
import { useWishlist } from '../../hooks/useWishlist'
import { HeartIcon, StarIcon, CartIcon } from '../ui/Icons'

function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const handle = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const fullStars = Math.floor(product.rating)
  const totalStars = [1, 2, 3, 4, 5]

  return (
    <Link
      to={`/products/${handle}`}
      className="group relative block cursor-pointer h-full w-full"
    >
      {/* Shadow — square/rectangular, offset downward */}
      <div
        className="absolute inset-x-1 bottom-0 top-2 sm:top-3 bg-black/[0.06]"
        style={{ borderRadius: '24px' }}
      />

      {/* Card body — white, rounded all 4 sides */}
      <div className="relative bg-white h-full overflow-visible" style={{ borderRadius: '24px' }}>

        {/* Ribbon badge — left side, 15px inset, vertical */}
        {product.tag && (
          <div className="absolute z-20" style={{ left: '-15px', top: '38%' }}>
            <span
              className={`inline-block text-white font-bold tracking-wider rounded-r-sm ${
                product.tagColor || 'bg-gradient-to-b from-sky-400 to-blue-700'
              }`}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                lineHeight: 1,
                letterSpacing: '0.5px',
                fontSize: '8px',
                padding: '4px 3px',
              }}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product)
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
        >
          <HeartIcon
            filled={wishlisted}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-200 ${
              wishlisted ? 'text-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Content wrapper — sits above the diagonal shape */}
        <div className="relative z-[2]">
          {/* Product image */}
          <div className="relative px-3 pt-3 pb-0 sm:px-5 sm:pt-5 flex items-center justify-center h-[120px] sm:h-[160px] md:h-[190px]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-sm"
            />
          </div>

          {/* Product info */}
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            {/* Name */}
            <h3 className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-gray-900 uppercase tracking-wide leading-tight line-clamp-1">
              {product.name}
            </h3>

            {/* Spec — always reserves 2 lines of space */}
            <p className="mt-0.5 text-[9px] sm:text-[10px] text-gray-500 line-clamp-2 leading-snug" style={{ minHeight: '28px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.spec}
            </p>

            {/* Rating + Color dots */}
            <div className="mt-1.5 flex items-center justify-between h-[16px] sm:h-[18px]">
              <div className="flex items-center gap-0.5">
                <div className="flex items-center gap-px">
                  {totalStars.map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= fullStars}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        star <= fullStars ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium ml-0.5">
                  {product.rating}
                </span>
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="mt-1.5 border-gray-100" />

            {/* Price + Buy Now */}
            <div className="mt-1.5 flex items-center justify-between gap-1">
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap">
                  Rs.{product.price.toLocaleString()}
                </span>
                <span className="text-[8px] sm:text-[9px] text-gray-400 line-through whitespace-nowrap">
                  Rs.{product.originalPrice.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex-shrink-0 text-[7px] sm:text-[8px] md:text-[9px] px-2 py-1.5 sm:px-2.5 sm:py-2"
              >
                <CartIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard