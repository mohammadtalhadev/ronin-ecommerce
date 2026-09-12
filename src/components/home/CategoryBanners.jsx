import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { categoryBanners } from '../../data/categoryBanners'
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons'

function CategoryBanners() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.offsetWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section data-reveal className="py-6 sm:py-10 overflow-hidden">
      {/* Mobile / md: scrollable row */}
      <div className="relative group/scroll lg:hidden">
        {/* Left arrow — md only */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md border border-gray-200 opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Right arrow — md only */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md border border-gray-200 opacity-0 group-hover/scroll:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div
            className="inline-flex gap-4 sm:gap-6"
            style={{
              paddingLeft: 'clamp(12px, 4vw, 32px)',
              paddingRight: 'clamp(12px, 4vw, 32px)',
            }}
          >
            {categoryBanners.map((banner) => (
              <div
                key={banner.id}
                className="flex-shrink-0 snap-center w-[85vw] sm:w-[60vw] md:w-[42vw] relative rounded-2xl overflow-hidden"
              >
                <img
                  src={banner.image}
                  alt={banner.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover sm:h-56 md:h-64"
                />
                <Link
                  to={banner.link}
                  className="absolute inset-0"
                  aria-label={`Shop ${banner.name}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop lg+: 3-column grid, full height */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:px-8">
        {categoryBanners.map((banner) => (
          <div
            key={banner.id}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src={banner.image}
              alt={banner.name}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
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