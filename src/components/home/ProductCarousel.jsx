import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { ArrowRightIcon } from '../ui/Icons'

function ProductCarousel({ title, products, linkTo = '/collections/all', maxProducts = 12 }) {
  const limitedProducts = products.slice(0, maxProducts)

  return (
    <section className="product-carousel-section px-4 py-6 sm:px-8 sm:py-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">{title}</h2>
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
        >
          View All
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="product-carousel relative">
        <div
          className="product-carousel__track flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-hide"
        >
          {limitedProducts.map((product) => (
            <div
              key={product.id}
              className="product-carousel__item flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel