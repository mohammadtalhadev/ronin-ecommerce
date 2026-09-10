import { featuredLogos } from '../../data/featuredLogos'

function FeaturedLogos() {
  return (
    <section data-reveal className="bg-gray-100 px-3 py-6 sm:px-8 sm:py-10">
      <p className="text-center text-xs font-semibold tracking-widest text-gray-500 mb-4 sm:text-sm sm:mb-6">
        FEATURED GLOBALLY
      </p>

      <div className="flex items-center justify-center gap-6 flex-wrap sm:gap-10">
        {featuredLogos.map((brand) => (
          <img
            key={brand.id}
            src={brand.logo}
            alt={brand.name}
            loading="lazy"
            decoding="async"
            className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition"
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedLogos