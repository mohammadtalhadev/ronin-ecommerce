import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { ArrowRightIcon } from '../ui/Icons'

function ProductGrid({ title, products, linkTo = '/collections/all' }) {
  return (
    <section className="px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {/* Real navigation link — was a dead <button> before */}
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
        >
          View All
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid