import { featuredLogos } from '../../data/featuredLogos'

function FeaturedLogos() {
  // Duplicate logos for seamless infinite scroll
  const doubledLogos = [...featuredLogos, ...featuredLogos]

  return (
    <section data-reveal className="bg-gray-100 px-3 py-6 sm:px-8 sm:py-10 overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest text-gray-500 mb-4 sm:text-sm sm:mb-6">
        FEATURED GLOBALLY
      </p>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {doubledLogos.map((brand, index) => (
            <img
              key={`${brand.id}-${index}`}
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              decoding="async"
              className="h-8 sm:h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition mx-4 sm:mx-8 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedLogos