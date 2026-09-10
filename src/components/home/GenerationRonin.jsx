import { generationRonin } from '../../data/generationRonin'

function GenerationRonin() {
  // Doubled so the -50% marquee translate loops seamlessly.
  const doubledVideos = [...generationRonin, ...generationRonin]

  return (
    <section data-reveal className="px-8 py-10 overflow-hidden">
      <div className="relative flex items-center justify-center mb-8">
        {/* divider line behind the badge */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200" />

        {/* pill badge */}
        <div className="relative bg-white rounded-full px-10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl font-extrabold tracking-widest uppercase bg-gradient-to-r from-indigo-600 via-purple-600 to-red-500 bg-clip-text text-transparent">
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
                autoPlay
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