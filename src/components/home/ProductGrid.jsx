import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { ArrowRightIcon } from '../ui/Icons'

function ProductGrid({ title, products, linkTo = '/collections/all' }) {
  return (
    <section className="py-5 sm:py-8">
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

      {/* Product grid */}
      <div
        data-reveal-group
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7 px-4 sm:px-8"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex justify-center"
            style={{
              '--reveal-delay': `${index * 80}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid