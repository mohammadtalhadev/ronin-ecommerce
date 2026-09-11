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
      className="product-card relative mt-8 block cursor-pointer sm:mt-12"
    >
      {/* Shape layer - diagonal-cut card background, sits behind everything */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("https://ronin.pk/cdn/shop/files/prod-shape.svg?v=1769464389")`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Real content - sits on top of the shape, unaffected by its cut */}
      <div className="relative z-10 flex flex-col h-full px-3 pb-3 pt-1 sm:px-5 sm:pb-5 sm:pt-1">

        {/* Ribbon badge - rotated pill, matches Ronin's real CSS */}
        {product.tag && (
          <span
            className="absolute z-20 text-white text-[7px] font-bold leading-[7px] px-2 py-1 rounded-t-[15px] -rotate-90 origin-bottom-left whitespace-nowrap sm:text-[8px] sm:px-3 sm:py-1.5"
            style={{
              bottom: '30%',
              left: '22px',
              backgroundImage: 'linear-gradient(90deg, rgb(3,177,230), rgb(3,84,205))',
              fontSize: '7px',
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
          className="absolute top-7 right-1 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:top-9"
        >
          <HeartIcon
            filled={wishlisted}
            className={`w-[18px] h-[18px] transition-colors duration-200 ${wishlisted ? 'text-red-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Discount badge - top right */}
        <span className="absolute top-0 right-0 z-20 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full sm:text-[10px] sm:px-2.5 sm:py-1">
          {discountPercent}% OFF
        </span>
        <div className="-mt-14 mb-2 flex h-40 justify-center dropshadow-md sm:-mt-20 sm:mb-3 sm:h-52">
        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="product-card-img w-auto h-36 object-contain sm:mb-3 sm:mt-4 sm:h-50"
        />
        </div>
        <div className="pl-[20px]">
          {/* Name + spec */}
          <h3 className="h-10 text-xs font-bold text-slate-900 uppercase sm:text-sm">{product.name}</h3>
          <p className="mt-1 h-8 line-clamp-2 text-[11px] text-gray-500 sm:text-xs">{product.spec}</p>

          {/* Rating + color swatches */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {totalStars.map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= fullStars}
                    className={`w-5 h-5 ${star <= fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-[20px] text-gray-400 sm:text-xs">{product.rating}</span>
            </div>

            {product.colors && (
              <div className="ml-10 flex items-center gap-1.5">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

          <hr className="mx-3 my-2 border-gray-300 sm:my-3" />

        {/* Price + Buy button - pinned to bottom via mt-auto */}
        <div className="flex items-center gap-4 mt-auto">
          <div className='pl-6'>
            <span className="text-sm font-bold text-slate-900 sm:text-base">
              Rs.{product.price.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 line-through ml-1 sm:text-xs sm:ml-2">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          </div>
          <button className="bg-orange-500 text-white text-[9px] font-semibold px-3 py-2 rounded-full flex items-center gap-1 hover:bg-orange-600 transition relative z-30 min-h-[12px] sm:text-xs sm:px-4">
            <CartIcon className="w-3.5 h-3.5" /> Buy Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard