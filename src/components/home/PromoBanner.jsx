import MiniBanner from '../../assets/Mini_Banner_converted.avif'

function PromoBanner() {
  return (
    <section
      data-reveal
      className="
        relative
        w-full
        px-3
        py-3
        sm:px-6
        sm:py-4
        md:px-6
        md:py-5
      "
      aria-label="Pebble Limited Edition promotion"
    >
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl">
        <img
          src={MiniBanner}
          alt="Pebble Limited Edition earbuds"
          loading="lazy"
          decoding="async"
          className="
            block
            h-auto
            min-h-[150px]
            w-full
            object-cover
            object-center
            sm:min-h-0
          "
        />

        <a
          href="https://ronin.pk/products/pebble-7130"
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute
            inset-2
            z-[2]
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-offset-2
            focus:ring-offset-transparent
            sm:inset-4
            sm:rounded-2xl
            md:inset-6
            md:rounded-3xl
          "
          aria-label="Shop Pebble Limited Edition earbuds"
        />
      </div>
    </section>
   )
}

export default PromoBanner
