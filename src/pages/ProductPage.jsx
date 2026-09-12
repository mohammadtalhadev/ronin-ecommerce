import { useParams, Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useState, useRef, useEffect } from 'react'
import ProductCard from '../components/home/ProductCard'
import { scrollToSection } from '../utils/scrollManager'
import {
  StarIcon, RefreshIcon, ShieldIcon, TruckIcon, CreditCardIcon,
  ClipboardIcon, CogIcon, QuestionIcon, ChatIcon, CartIcon,
  ChevronLeftIcon, ChevronRightIcon, TagIcon, GiftIcon, CheckIcon,
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

  // Use proper product data
  const productSpecs = product.specs || []
  const productOverview = product.overview || `${product.name} is built to evolve with how you use it every day, delivering reliable performance and premium build quality.`
  const productFaqs = product.faqs || [
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
    scrollToSection(`product_${id}`)
  }

  return (
    <div className="pt-14 bg-[#F0F0F0] md:pt-18">
      {/* Product top section */}
      <div ref={productSectionRef} className="px-3 py-4 grid grid-cols-1 gap-4 pb-4 items-start md:px-8 md:py-8 md:grid-cols-1 lg:grid-cols-2 md:gap-8 md:pb-8">

        {/* LEFT: Gallery */}
        <div className="lg:sticky lg:top-28 rounded-2xl bg-white p-3 md:rounded-[30px] md:p-6">
          {/* Main image */}
          <div className="relative flex items-center justify-center min-h-[260px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[440px]">
            <img
              key={imageIndex}
              src={product.image}
              alt={product.name}
              className="gallery-main-img max-w-full max-h-[400px] md:max-h-[460px] object-contain"
            />
            <button
              onClick={() => setImageIndex((imageIndex + 5) % 6)}
              className="gallery-arrow absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-900 opacity-0 hover:opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setImageIndex((imageIndex + 1) % 6)}
              className="gallery-arrow absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-900 opacity-0 hover:opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          <div
            data-lenis-prevent-horizontal
            className="mt-3 flex gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-center"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={imageIndex === i}
                className={`gallery-thumb shrink-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-xl border-2 p-1 transition ${
                  imageIndex === i ? 'is-active border-slate-900 bg-white' : 'border-transparent bg-gray-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Info card */}
        <div className="flex flex-col items-start gap-2.5 rounded-2xl bg-white p-4 md:rounded-[30px] md:p-6">
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap gap-1 text-[11px] font-medium text-gray-400">
            <Link to="/" className="hover:text-gray-600 transition">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            {product.category && (
              <>
                <Link to={`/collections/${product.category}`} className="hover:text-gray-600 transition capitalize">
                  {product.category.replace(/-/g, ' ')}
                </Link>
                <ChevronRightIcon className="w-3 h-3" />
              </>
            )}
            <span className="text-slate-900">{product.name}</span>
          </div>

          {/* Name */}
          <h1 className="text-lg font-bold text-slate-900 uppercase md:text-xl leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={star <= Math.floor(product.rating)}
                  className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-900">{product.rating}</span>
            <span className="text-xs text-gray-400">({Math.round(product.rating * 20)})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-bold text-slate-900 md:text-2xl">Rs.{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-400 line-through">Rs.{product.originalPrice.toLocaleString()}</span>
          </div>

          {/* Trust badges inline */}
          <div className="flex items-center gap-4 w-full py-2 border-b border-gray-100">
            {trustBadges.map((badge) => (
              <div key={badge.label[0]} className="flex items-center gap-1.5">
                <badge.icon className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="leading-tight">
                  <span className="block text-[11px] font-semibold text-slate-800">{badge.label[0]}</span>
                  <span className="block text-[10px] text-gray-400">{badge.label[1]}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Color selection */}
          {product.colors && (
            <div className="w-full">
              <p className="text-xs font-semibold text-slate-900 mb-2">
                Color:{' '}
                <span className="text-gray-500 font-normal">
                  {selectedColor === product.colors[1] ? 'Black' : selectedColor === product.colors[0] ? 'Beige' : product.colors[0] === '#1a1a2e' ? 'Black' : 'Beige'}
                </span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition ${
                      selectedColor === color || (selectedColor === null && i === 0)
                        ? 'border-slate-900'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span className="block w-full h-full rounded-full" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Discount banner */}
          <div className="w-full rounded-xl border border-yellow-200 bg-yellow-50 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="font-bold text-slate-900 text-xs">Get 5% Additional Discount</span>
              <TagIcon className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-yellow-200 text-xs">
              <span className="text-gray-500">Get express delivery in Karachi within 3-6 hours!</span>
              <button className="flex items-center gap-0.5 font-semibold text-slate-900 whitespace-nowrap hover:gap-1 transition-all">
                Details
                <ChevronRightIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Gift wrap */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500">Gift Wrapping Details</span>
              <button className="text-[10px] text-gray-400 underline">Learn more</button>
            </div>
            <button
              onClick={() => setGiftWrap(!giftWrap)}
              className="w-full flex items-center gap-2 rounded-xl bg-yellow-50 border border-yellow-200 px-3 py-2.5 text-left"
            >
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                  giftWrap ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-gray-400'
                }`}
              >
                {giftWrap ? <CheckIcon className="w-3 h-3" /> : ''}
              </span>
              <span className="text-xs text-slate-800">
                Wrap it with love @ <span className="font-bold">PKR 49.00/-</span>
              </span>
              <GiftIcon className="w-4 h-4 ml-auto text-yellow-600 shrink-0" />
            </button>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs font-semibold text-slate-900">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-sm text-gray-600 hover:text-slate-900"
              >
                −
              </button>
              <span className="px-2.5 text-xs font-semibold min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-sm text-gray-600 hover:text-slate-900"
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3.5 rounded-full transition-all duration-200 ${
                justAdded
                  ? 'bg-green-500 text-white scale-[1.02]'
                  : 'bg-white border border-gray-200 text-slate-900 hover:bg-gray-50'
              }`}
            >
              {justAdded ? <CheckIcon className="w-4 h-4" /> : <CartIcon className="w-4 h-4" />}
              {justAdded ? 'Added!' : 'Add to cart'}
            </button>
            <button className="flex-1 bg-orange-500 text-white text-sm font-bold py-3.5 rounded-full hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>
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
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-[70] w-[92%] max-w-[400px] transition-all duration-500 md:bottom-5 md:w-[400px] ${
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
      <div className="border-t border-gray-200 bg-white">
        {/* Overview */}
        <section id="product_overview" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-10 md:py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-lg font-bold text-slate-900 uppercase">Overview</h2>
          <div className="md:col-span-9">
            <p className="text-sm text-gray-600 leading-relaxed">{productOverview}</p>
          </div>
        </section>

        {/* Specs */}
        <section id="product_specs" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-10 md:py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-lg font-bold text-slate-900 uppercase">Specs</h2>
          <div className="md:col-span-9">
            <div className="w-full text-sm">
              {productSpecs.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-start py-3 ${
                    i < productSpecs.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="w-36 md:w-44 shrink-0 text-xs font-bold text-slate-800 md:text-sm">{row.label}</span>
                  <span className="text-xs text-gray-600 md:text-sm">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="product_faqs" data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 py-10 md:py-12 border-b border-gray-200 scroll-mt-24">
          <h2 className="md:col-span-3 text-lg font-bold text-slate-900 uppercase">FAQ's</h2>
          <div className="md:col-span-9">
            {productFaqs.map((item, i) => (
              <details
                key={item.question}
                className={`faq-detail ${i < productFaqs.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-slate-800 py-3.5 text-sm">
                  {item.question}
                  <svg className="w-4 h-4 text-gray-400 shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="faq-detail-content">
                  <p className="text-sm text-gray-500 pb-4 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="product_reviews" data-reveal className="px-4 md:px-8 py-10 md:py-12 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <h2 className="md:col-span-3 text-lg font-bold text-slate-900 uppercase">Reviews</h2>
            <div className="md:col-span-9">
              {/* Rating summary */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-extrabold text-slate-900">{product.rating}</span>
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
                  <p className="text-xs text-gray-400 mt-0.5">Based on {Math.round(product.rating * 20)} reviews</p>
                </div>
              </div>

              {/* Sample review */}
              <div className="border-t border-gray-100 pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={true} className="w-3 h-3 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">2 weeks ago</span>
                </div>
                <p className="font-semibold text-slate-900 text-sm">{product.name} is worth every rupee</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Really good product for the price. Sound quality and battery life are both excellent. Build quality feels premium and the design is sleek.
                </p>
                <p className="text-xs text-gray-400 mt-2">Verified Buyer</p>
              </div>

              <div className="border-t border-gray-100 pt-4 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= 4} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">1 month ago</span>
                </div>
                <p className="font-semibold text-slate-900 text-sm">Great value for money</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Excellent build quality and performance. Battery lasts long and the sound is crystal clear. Highly recommended for the price range.
                </p>
                <p className="text-xs text-gray-400 mt-2">Verified Buyer</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Related products */}
      <div className="px-4 md:px-8 py-10 bg-[#F0F0F0]">
        <h2 className="text-xl font-bold text-slate-900 mb-5 uppercase">You may also like</h2>
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
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
    <div className="flex w-fit max-w-full overflow-x-auto rounded-full bg-white/80 backdrop-blur-md border border-gray-200 p-1.5 gap-1 shadow-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            aria-pressed={isActive}
            className={`product-tab ${
              isActive ? 'is-active' : ''
            } flex items-center gap-1.5 rounded-full px-4 md:px-5 py-2 text-xs md:text-sm font-medium transition ${
              isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4" /> {tab.label}
          </button>
        )
      })}
    </div>
  )
}