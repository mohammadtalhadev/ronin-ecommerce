import MiniBanner from '../../assets/Mini_Banner_converted.avif'

function PromoBanner() {
  return (
    <div data-reveal className="relative px-6 py-4">
      <img
        src={MiniBanner}
        alt="Pebble Limited Edition"
        className="w-full h-auto object-cover rounded-3xl"
      />

      <a
        href="https://ronin.pk/products/pebble-7130"
        className="absolute inset-6 z-[2]"
        aria-label="Shop Pebble Limited Edition"
      />
    </div>
  )
}

export default PromoBanner