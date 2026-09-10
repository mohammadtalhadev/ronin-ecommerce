import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SlideGlaze from '../../assets/Banner-D--glaze_converted.avif'
import SlideLucid from '../../assets/Banner-D--lucid_converted.avif'
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons'
import AtifAslam from '../../assets/Banner-D--Atif-aslam_converted-1.avif'
import MomentWatches from '../../assets/Banner-D--_converted-1.avif'

function HeroCarousel() {
  const slides = [
    {
      id: 1,
      image: SlideGlaze,
      alt: 'Glaze earbuds promotion',
      link: '/products/glaze-earbuds',
    },
    {
      id: 2,
      image: SlideLucid,
      alt: 'Lucid earbuds promotion',
      link: '/products/lucid-earbuds',
    },
    {
      id: 3,
      image: AtifAslam,
      alt: 'Ronin headphones promotion featuring Atif Aslam',
      link: '/products/rap-headphone',
    },
    {
      id: 4,
      image: MomentWatches,
      alt: 'Moment smart watch promotion',
      link: '/products/moment-smart-watch',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const currentSlideData = slides[currentSlide]

  useEffect(() => {
    if (paused) {
      return undefined
    }

    const timer = setTimeout(() => {
      setCurrentSlide((previousSlide) => {
        return (previousSlide + 1) % slides.length
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [paused, currentSlide, slides.length])

  const goToPreviousSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (previousSlide - 1 + slides.length) % slides.length
    })
  }

  const goToNextSlide = () => {
    setCurrentSlide((previousSlide) => {
      return (previousSlide + 1) % slides.length
    })
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      goToPreviousSlide()
    }

    if (event.key === 'ArrowRight') {
      goToNextSlide()
    }
  }

  return (
    <section
      className="group relative w-full px-3 pt-4 sm:px-4 sm:pt-5 md:px-6 md:pt-0"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="
          relative
          w-full
          overflow-hidden
          rounded-xl
          bg-slate-100
          aspect-[4/5]
          sm:aspect-[4/3]
          md:aspect-[16/9]
          lg:aspect-[21/9]
        "
      >
        {/* Current slide image */}
        <img
          key={currentSlideData.image}
          src={currentSlideData.image}
          alt={currentSlideData.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            animate-slide-fade
            select-none
          "
        />

        {/* Clickable slide area */}
        <Link
          to={currentSlideData.link}
          aria-label={`Open ${currentSlideData.alt}`}
          className="absolute inset-0 z-[1] h-full w-full"
        />

        {/* Previous button */}
        <button
          type="button"
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="
            absolute
            left-2
            top-1/2
            z-20
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-slate-900
            shadow-md
            transition
            hover:bg-white
            hover:scale-105
            focus:outline-none
            focus:ring-2
            focus:ring-white
            sm:left-3
            sm:h-10
            sm:w-10
            md:left-8
            md:opacity-0
            md:group-hover:opacity-100
          "
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="
            absolute
            right-2
            top-1/2
            z-20
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-slate-900
            shadow-md
            transition
            hover:bg-white
            hover:scale-105
            focus:outline-none
            focus:ring-2
            focus:ring-white
            sm:right-3
            sm:h-10
            sm:w-10
            md:right-8
            md:opacity-0
            md:group-hover:opacity-100
          "
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        {/* Carousel indicators */}
        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-20
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            bg-black/10
            px-3
            py-2
            backdrop-blur-sm
            sm:bottom-4
          "
          aria-label="Slide controls"
        >
          {slides.map((slide, index) => {
            const isActive = index === currentSlide

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`
                  h-2.5
                  rounded-full
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  ${
                    isActive
                      ? 'w-7 bg-white'
                      : 'w-2.5 bg-white/50 hover:bg-white/80'
                  }
                `}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel
