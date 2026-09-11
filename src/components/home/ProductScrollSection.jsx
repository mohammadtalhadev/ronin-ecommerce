import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { ArrowRightIcon } from '../ui/Icons'

function ProductScrollSection({ title, products, linkTo = '/collections/all' }) {
  return (
    <section className="py-5 sm:py-8 overflow-hidden">
      {/* Section header */}
      <div className="px-4 sm:px-8 mb-3 sm:mb-5">
        <div className="flex items-center justify-between">
          {/* Gradient title */}
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight"
            style={{
              background: 'linear-gradient(90deg, rgb(3,84,205) 0%, rgb(220,38,38) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </h2>

          {/* View All button */}
          <Link
            to={linkTo}
            className="group inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-200 bg-white hover:bg-gray-50 whitespace-nowrap"
          >
            View All
            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Scrollable product row */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

        {/* Scrollable container */}
        <div
          data-reveal-group
          className="overflow-x-auto scrollbar-hide"
        >
          {/*
            Mobile: ~72vw → one card fully visible + second peeking.
            Desktop: 280px fixed → always scrollable when >3 cards.
          */}
          <div
            className="inline-flex items-end gap-4 sm:gap-7"
            style={{
              paddingLeft: 'clamp(16px, 4vw, 32px)',
              paddingRight: 'clamp(16px, 4vw, 32px)',
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-[32vw] lg:w-[280px]"
                style={{
                  '--reveal-delay': `${index * 80}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductScrollSection