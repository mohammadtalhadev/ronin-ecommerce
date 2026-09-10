import { Link } from 'react-router-dom'
import { categoryBanners } from '../../data/categoryBanners'

function CategoryBanners() {
  return (
    <section data-reveal className="px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryBanners.map((banner) => (
          <div key={banner.id} className="relative rounded-2xl overflow-hidden">
            <img
              src={banner.image}
              alt={banner.name}
              loading="lazy"
              decoding="async"
              className="w-full h-56 "
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