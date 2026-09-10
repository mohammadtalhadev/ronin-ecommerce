import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ProductCard from '../components/home/ProductCard'
import { newArrivals, softwareBased, topTrending } from '../data/products'

// SEO copy per collection, matching ronin.pk's style
const seoCopy = {
  headphones: {
    intro:
      'Headphones are personal audio devices designed to deliver sound directly to the listener for a private, immersive experience. They convert electrical signals into audio through built-in speakers and are commonly used for music, calls, gaming, work, and entertainment. Modern headphones are available in both wired and wireless (Bluetooth) formats and come in multiple designs to suit different listening preferences, environments, and lifestyles. Today\u2019s headphones also feature advanced technologies such as noise cancellation, built-in microphones, low-latency modes, and long battery life, making them an essential part of everyday digital life.',
    more: 'At Ronin, our headphone series is engineered for every listener \u2014 from the studio-tuned Magnitude with Mood Tuned Sound, to the gaming-grade Hurricane with 25ms ultra-low latency, to everyday companions like Rap and Bang built for massive bass and dual-device connectivity. Whether you need over-ear comfort for long sessions or ANC for noisy commutes, there is a Ronin headphone built for you, backed by nationwide warranty and easy returns.',
  },
}

const defaultCopy = (title) => ({
  intro: `${title} are personal audio and tech devices designed to deliver a seamless, immersive everyday experience. Explore the full Ronin ${title} collection with the latest features, premium build quality, and nationwide warranty at the best prices in Pakistan.`,
  more: '',
})

function CollectionPage() {
  const { collectionName } = useParams()
  const [expanded, setExpanded] = useState(false)
  const [sortBy, setSortBy] = useState('Sort')

  const isAll = collectionName === 'all'
  const collectionTitle = isAll
    ? 'All Products'
    : collectionName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())

  // Filter all products by the collection's category from the URL
  const allProducts = [...newArrivals, ...softwareBased, ...topTrending]
  const collectionProducts = isAll
    ? allProducts
    : allProducts.filter((product) => product.category === collectionName)

  // Apply sorting
  const sortedProducts = [...collectionProducts]
  if (sortBy === 'Price: Low to High') sortedProducts.sort((a, b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') sortedProducts.sort((a, b) => b.price - a.price)

  const copy = isAll
    ? {
        intro:
          'Explore the complete range of Ronin smart wearables and tech accessories in one place — earbuds, headphones, neckbands, speakers, power banks, chargers and smart watches, all backed by a nationwide warranty.',
        more: '',
      }
    : seoCopy[collectionName] || defaultCopy(collectionTitle)

  return (
    <div className="bg-white">
      {/* Category hero banner with overlay text - navbar floats over it, like ronin.pk */}
      <div className="px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden h-[280px] bg-gradient-to-b from-gray-200 via-gray-100 to-black/90 md:h-[480px]">
          <img
            src={`https://placehold.co/1600x600/2a2a2a/white?text=${encodeURIComponent(collectionTitle + ' Series')}`}
            alt={`${collectionTitle} collection banner`}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Dark gradient at bottom so the text stays readable */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
          {/* Overlay text, like "EXPERIENCE THE ICONIC / HEADPHONE SERIES" */}
          <div className="absolute inset-x-0 bottom-10 text-center text-white z-10">
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase mb-2 text-gray-200">
              Experience the Iconic
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide">
              {collectionTitle}{' '}
              {!isAll && <span className="font-light italic">Series</span>}
            </h1>
          </div>
        </div>
      </div>

      {/* Item count + sort row - right aligned like ronin.pk */}
      <div className="flex items-center justify-end gap-4 px-4 md:px-8 py-4 md:py-6">
        <span className="text-xs text-gray-500 md:text-sm">{sortedProducts.length} items</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm text-gray-600 bg-transparent cursor-pointer outline-none"
        >
          <option>Sort</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Product grid - reusing our existing ProductCard */}
      {sortedProducts.length > 0 ? (
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-8 pb-10 md:gap-5 md:pb-14">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="px-8 pb-14 text-gray-500 text-sm">
          No products found in this collection yet.
        </p>
      )}

      {/* SEO text block with Read More toggle, like ronin.pk */}
      <div className="px-4 md:px-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Buy {collectionTitle} Online in Pakistan at the Best Prices
        </h2>
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          What Are {collectionTitle}?
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed max-w-6xl">{copy.intro}</p>
        {copy.more && (
          <>
            {expanded && (
              <p className="text-sm text-gray-700 leading-relaxed max-w-6xl mt-4">
                {copy.more}
              </p>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-semibold text-slate-900 mt-6 hover:underline"
            >
              {expanded ? 'Read Less \u2212' : 'Read More +'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CollectionPage