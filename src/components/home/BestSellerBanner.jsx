import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { promoBanners } from '../../data/promoBanners'
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons'

function BestSellerBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? promoBanners.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length)
  }

  const activeBanner = promoBanners[currentIndex]

  return (
    <section data-reveal className="px-3 py-6 sm:px-8 sm:py-10">
      <div className="relative aspect-[16/10] sm:aspect-[16/7] rounded-3xl overflow-hidden group">
        <img
          src={activeBanner.image}
          alt={`Promo ${currentIndex + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        <Link
          to={activeBanner.link}
          className="absolute inset-0"
          aria-label="Shop this promotion"
        />

        {/* Left arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-900" />
        </button>

        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-5 h-5 text-slate-900" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {promoBanners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition ${
                index === currentIndex ? "bg-white w-6" : "bg-white/40 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellerBanner