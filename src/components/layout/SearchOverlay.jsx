import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SearchIcon, XMarkIcon } from '../ui/Icons'
import { newArrivals, softwareBased, topTrending } from '../../data/products'

const STORAGE_KEY = 'ronin_recently_viewed'

function getRecentlyViewed() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const inputRef = useRef(null)

  const allProducts = [...newArrivals, ...softwareBased, ...topTrending]

  // Show random products as default when no query and no recently viewed
  const defaultProducts = useMemo(() => {
    return allProducts.slice().sort(() => 0.5 - Math.random()).slice(0, 6)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setRecentlyViewed(getRecentlyViewed())
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const filtered = query.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.spec.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const clearRecentlyViewed = () => {
    localStorage.removeItem(STORAGE_KEY)
    setRecentlyViewed([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto mt-20 max-w-2xl w-[92%] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <SearchIcon className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 text-base text-slate-900 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Results or recently viewed */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() ? (
            /* Search results */
            filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <SearchProductCard key={product.id} product={product} onClose={onClose} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">No products found</p>
            )
          ) : recentlyViewed.length > 0 ? (
            /* Recently viewed */
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-widest text-slate-900">RECENTLY VIEWED</span>
                <button
                  onClick={clearRecentlyViewed}
                  className="text-xs text-gray-400 hover:text-gray-600 transition"
                >
                  Clear
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {recentlyViewed.map((product) => (
                  <SearchProductCard key={product.id} product={product} onClose={onClose} />
                ))}
              </div>
            </div>
          ) : (
            /* Default products */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {defaultProducts.map((product) => (
                <SearchProductCard key={product.id} product={product} onClose={onClose} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SearchProductCard({ product, onClose }) {
  const handle = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <Link
      to={`/products/${handle}`}
      onClick={onClose}
      className="block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      <div className="bg-gray-50 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-28 object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-xs font-bold text-slate-900 uppercase leading-tight">{product.name}</h4>
          {product.tag && (
            <span className="text-[8px] font-semibold text-red-500 whitespace-nowrap shrink-0">{product.tag}</span>
          )}
        </div>
        <p className="text-[10px] text-gray-400 leading-snug line-clamp-1 mb-2">{product.spec}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-blue-600">Rs.{product.price.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}

export default SearchOverlay