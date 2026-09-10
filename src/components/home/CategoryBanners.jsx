import { Link } from 'react-router-dom'
import { categoryBanners } from '../../data/categoryBanners'

function CategoryBanners() {
  return (
    <section data-reveal className="px-3 py-6 sm:px-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categoryBanners.map((banner) => (
          <div key={banner.id} className="relative rounded-2xl overflow-hidden">
            <img
              src={banner.image}
              alt={banner.name}
              loading="lazy"
              decoding="async"
              className="w-full h-40 object-cover sm:h-56"
            />
            <Link
              to={banner.link}
              className="absolute inset-0"
              aria-label={`Shop ${banner.name}`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoryBanners