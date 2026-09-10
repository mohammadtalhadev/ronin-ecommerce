import { featuredLogos } from '../../data/featuredLogos'

function FeaturedLogos() {
  return (
    <section data-reveal className="bg-gray-100 px-8 py-10">
      <p className="text-center text-sm font-semibold tracking-widest text-gray-500 mb-6">
        FEATURED GLOBALLY
      </p>

      <div className="flex items-center justify-center gap-10 flex-wrap">
        {featuredLogos.map((brand) => (
          <img
            key={brand.id}
            src={brand.logo}
            alt={brand.name}
            className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition"
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedLogos