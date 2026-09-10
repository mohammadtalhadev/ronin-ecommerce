import { useParams, Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useState, useRef, useEffect } from 'react'
import ProductCard from '../components/home/ProductCard'
import { scrollToSection } from '../utils/scrollManager'
import {
  StarIcon, RefreshIcon, ShieldIcon, TruckIcon, CreditCardIcon,
  ClipboardIcon, CogIcon, QuestionIcon, ChatIcon, CartIcon,
  ChevronLeftIcon, ChevronRightIcon, TagIcon, GiftIcon, CheckIcon,
  BatteryIcon, HeadsetIcon, SignalIcon, SpeakerIcon, MutedIcon, PuzzleIcon,
  BoltIcon,
} from '../components/ui/Icons'
import { newArrivals, softwareBased, topTrending } from '../data/products'

function ProductPage() {
  const { addToCart } = useCart()
  const { handle } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [giftWrap, setGiftWrap] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const productSectionRef = useRef(null)
  const [showStickyBar, setShowStickyBar] = useState(false)

  const allProducts = [...newArrivals, ...softwareBased, ...topTrending]
  const product = allProducts.find(
    (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === handle
  )

  useEffect(() => {
    const el = productSectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product])

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h1>
        <Link to="/" className="text-orange-500 font-semibold hover:underline">
          Back to Homepage
        </Link>
      </div>
    )
  }

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || product.colors?.[0])
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const overviewIcons = [StarIcon, BatteryIcon, HeadsetIcon, SignalIcon, SpeakerIcon, BoltIcon, MutedIcon, PuzzleIcon]
  const overviewFeatures = product.spec
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text, i) => ({ text, icon: overviewIcons[i % overviewIcons.length] }))

  const specRows = product.spec
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => ({ label: 'Feature', value: s }))

  const faqItems = [
    { question: 'Does it support dual device connection?', answer: 'Yes, connect two devices at once and switch seamlessly between them.' },
    { question: 'How long is the battery life?', answer: 'Most Ronin devices deliver a full day of typical use before needing a charge.' },
    { question: 'Is there a warranty?', answer: 'Yes, 1 year official brand warranty with 7 days replacement.' },
  ]

  const trustBadges = [
    { icon: RefreshIcon, label: ['7 Days', 'Replacement'] },
    { icon: ShieldIcon, label: ['1 Year', 'Warranty'] },
    { icon: TruckIcon, label: ['Free', 'Shipping'] },
    { icon: CreditCardIcon, label: ['Secure', 'Payment'] },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ClipboardIcon },
    { id: 'specs', label: 'Specs', icon: CogIcon },
    { id: 'faqs', label: "FAQ's", icon: QuestionIcon },
    { id: 'reviews', label: 'Reviews', icon: ChatIcon },
  ]

  const goToTab = (id) => {
    setActiveTab(id)
    // Smooth-scroll to the section via Lenis, clearing the sticky header.
    scrollToSection(`product_${id}`)
  }

  return (
    <div className="pt-18 bg-[#F0F0F0]">
      <div ref={productSectionRef} className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 items-start">

        {/* LEFT: Gallery */}
        <div className="lg:sticky lg:top-28 rounded-[30px] bg-white p-7">
          <div className="relative flex items-center justify-center min-h-[380px] md:min-h-[480px]">
            <img
              key={imageIndex}
              src={product.image}
              alt={product.name}
              className="gallery-main-img max-w-full max-h-[480px] object-contain"
            />
            <button
              onClick={() => setImageIndex((imageIndex + 5) % 6)}
              className="gallery-arrow absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-slate-900"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setImageIndex((imageIndex + 1) % 6)}
              className="gallery-arrow absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-slate-900"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div
            data-lenis-prevent-horizontal
            className="mt-4 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={imageIndex === i}
                className={`gallery-thumb ${
                  imageIndex === i ? 'is-active' : ''
                } shrink-0 w-20 h-20 rounded-xl border-2 p-1 transition ${
                  imageIndex === i ? 'border-slate-900 bg-white' : 'border-transparent bg-gray-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Info card */}
        <div
          className="flex flex-col items-start gap-3 rounded-[30px] bg-white p-7"
        >
          <div className="flex items-center flex-wrap gap-1.5 text-xs font-medium text-gray-500">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRightIcon className="w-3 h-3 text-gray-400" />
            {product.category && (
              <>
                <Link to={`/collections/${product.category}`} className="hover:underline capitalize">
                  {product.category.replace(/-/g, ' ')}
                </Link>
                <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              </>
            )}
            <span className="text-slate-900">{product.name}</span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 uppercase">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.spec}</p>

          <hr className="w-full border-gray-200 my-2" />

          <div className="flex flex-wrap items-center justify-between w-full gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-slate-900">Rs.{product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="text-yellow-500"><StarIcon className="w-5 h-5" /></span>
            <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-gray-400">({Math.round(product.rating * 20)})</span>
            </div>
          </div>

          {product.colors && (
            <div className="w-full mt-2">
              <p className="text-sm font-medium text-slate-900 mb-2">
                Color:{' '}
                <span className="font-bold">
                  {selectedColor === product.colors[1] ? 'Black' : 'Beige'}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-white transition ${
                      selectedColor === color || (selectedColor === null && i === 0)
                        ? 'border-slate-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="block w-full h-full rounded-lg" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr className="w-full border-gray-200 my-2" />

          <div className="w-full rounded-xl border border-yellow-200 bg-yellow-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-bold text-slate-900 text-sm">Get 5% Additional Discount</span>
              <TagIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-yellow-200 text-sm">
              <span className="text-gray-600">Get express delivery in Karachi within 3-6 hours!</span>
              <button className="flex items-center gap-1 font-semibold text-slate-900 whitespace-nowrap hover:gap-1.5 transition-all">
                Details
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-sm text-gray-700">Gift Wrapping Details</span>
            <button className="text-xs text-gray-400 underline">Learn more</button>
          </div>
          <button
            onClick={() => setGiftWrap(!giftWrap)}
            className="w-full flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-left"
          >
            <span
              className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                giftWrap ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-gray-400'
              }`}
            >
              {giftWrap ? <CheckIcon className="w-3 h-3" /> : ''}
            </span>
            <span className="text-sm text-slate-800">
              Wrap it with love @ <span className="font-bold">PKR 49.00/-</span>
            </span>
            <GiftIcon className="w-5 h-5 ml-auto text-yellow-600 shrink-0" />
          </button>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-semibold text-slate-900">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg text-gray-600 hover:text-slate-900"
              >
                −
              </button>
              <span className="px-3 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg text-gray-600 hover:text-slate-900"
              >
                +
              </button>
            </div>
          </div>

          {/* Fixed: both buttons use flex-1 to share the row equally */}
          <div className="flex flex-col sm:flex-row gap-3 w-full ">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold py-4 rounded-full transition-all duration-200 ${
                justAdded
                  ? 'bg-green-500 text-white scale-[1.02]'
                  : 'bg-white border border-gray-200 text-slate-900 hover:bg-gray-50'
              }`}
            >
              {justAdded ? <CheckIcon className="w-4 h-4" /> : <CartIcon className="w-4 h-4" />}
              {justAdded ? 'Added!' : 'Add to cart'}
            </button>
            <button className="flex-1 bg-orange-500 text-white text-sm font-bold py-4 rounded-full hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <section
          aria-label="Service highlights"
          className="rounded-xl border border-gray-200 bg-gray-50 shadow px-4 py-3 sm:px-5 lg:col-start-2"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-x-6 gap-y-3">
            {trustBadges.map((badge) => (
              <li key={badge.label[0]} className="flex items-center gap-3">
                <badge.icon className="w-6 h-6 text-gray-400 shrink-0" />
                <span className="leading-tight">
                  <span className="block font-semibold text-sm text-slate-900">{badge.label[0]}</span>
                  <span className="block text-xs text-gray-500">{badge.label[1]}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Tab bar */}
      <div className="flex justify-center py-4">
        <TabLinks activeTab={activeTab} onSelect={goToTab} tabs={tabs} />
      </div>

      {/* Floating sticky tab bar */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ${
          showStickyBar ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <TabLinks activeTab={activeTab} onSelect={goToTab} tabs={tabs} />
      </div>

      {/* Floating bottom add-to-cart bar */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] w-[400px] max-w-[92%] transition-all duration-500 ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white/50 py-2 px-3 rounded-full shadow-lg">
          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full object-cover bg-gray-100 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-slate-900 truncate text-xs">{product.name}</p>
            <p className="text-xs">
              <span className="font-bold text-slate-900">Rs.{product.price.toLocaleString()}</span>{' '}
              <span className="text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 text-white text-xs font-bold pl-3 pr-4 py-2.5 rounded-full transition shrink-0 ${
              justAdded ? 'bg-green-500' : 'bg-slate-900 hover:bg-slate-700'
            }`}
          >
            {justAdded ? (
              <>
                <CheckIcon className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <CartIcon className="w-4 h-4" /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overview / Specs / FAQ / Reviews */}
      <div className="border-t border-gray-200">
        <section id="product_overview" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-xl font-bold text-slate-900 uppercase">Overview</h2>
          <div className="md:col-span-9 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.name} is built to evolve with how you use it every day, delivering reliable performance and premium build quality.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {overviewFeatures.map((f) => (
                <div key={f.text} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                  <f.icon className="w-5 h-5 shrink-0 text-slate-700" />
                  <span className="text-sm font-medium text-slate-800">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="product_specs" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-xl font-bold text-slate-900 uppercase">Specs</h2>
          <div className="md:col-span-9">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={i} className={i === specRows.length - 1 ? '' : 'border-b border-gray-200'}>
                    <td className="py-3 pr-5 min-w-[150px] font-bold text-slate-800">{row.label}</td>
                    <td className="py-3 text-gray-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="product_faqs" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-xl font-bold text-slate-900">FAQ's</h2>
          <div className="md:col-span-9">
            {faqItems.map((item, i) => (
              <details key={item.question} className={`faq-detail ${i === faqItems.length - 1 ? '' : 'border-b border-gray-200'}`}>
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-slate-800 py-3">
                  {item.question}
                </summary>
                <div className="faq-detail-content">
                  <p className="text-sm text-gray-600 pb-3">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="product_reviews" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-12 scroll-mt-24">
          <h2 className="md:col-span-3 text-xl font-bold text-slate-900">Reviews</h2>
          <div className="md:col-span-9 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold text-slate-900">{product.rating}</span>
              <div>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= Math.floor(product.rating)}
                      className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">Based on {Math.round(product.rating * 20)} reviews</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-semibold text-slate-900">{product.name} is worth every rupee</p>
              <p className="text-sm text-gray-600 mt-1">
                Really good product for the price. Sound quality and battery life are both excellent.
              </p>
              <p className="text-xs text-gray-400 mt-2">Verified Buyer</p>
            </div>
          </div>
        </section>
      </div>

      <div className="px-4 md:px-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">You may also like</h2>
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage

function TabLinks({ tabs, activeTab, onSelect }) {
  return (
    <div className="flex w-fit rounded-full bg-white/80 backdrop-blur-md border border-gray-200 p-1.5 gap-1 shadow-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            aria-pressed={isActive}
            className={`product-tab ${
              isActive ? 'is-active' : ''
            } flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition ${
              isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        )
      })}
    </div>
  )
}