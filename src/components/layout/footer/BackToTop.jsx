import { useState, useEffect } from 'react'
import { scrollToTop } from '../../../utils/scrollManager'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  // Appear after the user scrolls down a little, and hide again near the top.
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y =
          window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
        setVisible(y > 600)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTopClick = () => {
    // Smooth scroll to top via Lenis (native smooth fallback if needed).
    scrollToTop()
  }

  return (
    <button
      type="button"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTopClick}
      aria-label="Back to top"
      className={`back-to-top float-btn fixed bottom-6 left-6 z-50 w-[56px] h-[56px] md:w-[65px] md:h-[65px] rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1f2937"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}

export default BackToTop