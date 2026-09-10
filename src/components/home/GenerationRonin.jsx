import { useEffect, useRef, useState } from 'react'
import { generationRonin } from '../../data/generationRonin'

function GenerationRonin() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Doubled so the -50% marquee translate loops seamlessly.
  const doubledVideos = [...generationRonin, ...generationRonin]

  return (
    <section ref={sectionRef} data-reveal className="px-3 py-6 sm:px-8 sm:py-10 overflow-hidden">
      <div className="relative flex items-center justify-center mb-6 sm:mb-8">
        {/* divider line behind the badge */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />

        {/* pill badge */}
        <div className="relative bg-white rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:px-10 sm:py-4">
          <h2 className="text-lg font-extrabold tracking-widest uppercase bg-gradient-to-r from-indigo-600 via-purple-600 to-red-500 bg-clip-text text-transparent sm:text-2xl">
            GENERATION RONIN
          </h2>
        </div>
      </div>

      {/* Auto-scrolling marquee, matching the Brand Ambassadors feel.
          The overflow-hidden wrapper clips the track; wheel events still pass
          through to the page so vertical scrolling is never blocked. */}
      <div className="overflow-hidden py-4">
        <div className="flex gap-4 w-max animate-marquee">
          {doubledVideos.map((person, index) => (
            <div
              key={`${person.id}-${index}`}
              className="shrink-0 w-48 relative rounded-2xl overflow-hidden"
            >
              <video
                src={person.video}
                poster={person.thumbnail}
                autoPlay={isVisible}
                preload={isVisible ? 'metadata' : 'none'}
                muted
                loop
                playsInline
                className="w-full h-64 object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pointer-events-none">
                <p className="text-white text-sm font-semibold">{person.name}</p>
                <p className="text-white/70 text-xs">#{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenerationRonin