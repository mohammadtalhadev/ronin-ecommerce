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
      link: "/products/glaze-earbuds",
    },
    {
      id: 2,
      image: SlideLucid,
      link: "/products/lucid-earbuds",
    },
    {
      id: 3,
      image: AtifAslam,
      link: "/products/rap-headphone",
    },
    {
      id: 4,
      image: MomentWatches,
      link: "/products/moment-smart-watch",
    },

  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  // Auto-advance pauses while hovering so users aren't yanked away mid-read.
  const [paused, setPaused] = useState(false)

  // Timeout (not interval) so every slide change — manual or auto — gets a
  // fresh full 5s before the next auto-advance.
  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearTimeout(timer)
  }, [paused, currentSlide, slides.length])

  return (
    <div
      className="relative px-6 group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Keyed on the slide so a change remounts the img and replays the
          fade-in — a soft crossfade-like transition instead of an abrupt swap. */}
      <img
        key={slides[currentSlide].image}
        src={slides[currentSlide].image}
        alt={`Slide ${currentSlide + 1}`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="w-full h-auto object-cover animate-slide-fade"
      />

      <Link
        to={slides[currentSlide].link}
        className="absolute inset-0 w-full h-full"
        aria-label={`Shop slide ${currentSlide + 1}`}
      />

      {/* Left arrow */}
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-10 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-5 h-5 text-slate-900" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-5 h-5 text-slate-900" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 group-hover:opacity-100">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-pressed={index === currentSlide}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel