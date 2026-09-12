import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { navCategories } from '../../data/navCategories'
import { categoryBanners } from '../../data/categoryBanners'
import RoninLogo from '../../assets/ronin-logo_alt_1-1.png'
import { XMarkIcon, ChevronRightIcon } from '../ui/Icons'

const promoLinks = [
  { label: 'Mega independence Sale', to: '/collections/sale', color: 'text-emerald-600' },
  { label: 'Software Based Earbuds', to: '/collections/earbuds', gradient: true },
  { label: 'Software Based Headphones', to: '/collections/headphones', gradient: true },
]

const bottomLinks = [
  { label: 'Product Customization', to: '/pages/customization' },
  { label: 'Express Delivery', to: '/pages/express-delivery' },
  { label: 'Gift Store', to: '/collections/gift-store' },
  { label: 'Corporate Orders', to: '/pages/corporate-orders' },
  { label: 'Official Brand Outlet', to: '/pages/outlet' },
  { label: 'Customer Care Center', to: '/pages/customer-care' },
  { label: 'Contact Us', to: '/pages/contact' },
  { label: 'About us', to: '/pages/about' },
  { label: 'Track your order', to: '/pages/track-order' },
  { label: 'Warranty policy', to: '/pages/warranty' },
  { label: 'Exchange & refund policy', to: '/pages/exchange-refund' },
]

const gradientTextStyle = {
  background: 'linear-gradient(90deg, rgb(3,84,205) 0%, rgb(220,38,38) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const goldGradientStyle = {
  background: 'linear-gradient(90deg, #b8860b 0%, #daa520 50%, #b8860b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function MobileMenu({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [currentBanner, setCurrentBanner] = useState(0)
  const scrollRef = useRef(null)

  const toggleCategory = (label) => {
    setExpandedCategory((prev) => (prev === label ? null : label))
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[2000] bg-white lg:hidden"
      data-lenis-prevent
    >
      {/* Scrollable content */}
      <div ref={scrollRef} className="h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <Link to="/" onClick={onClose} aria-label="Ronin - Home">
            <img
              src={RoninLogo}
              alt="Ronin"
              className="h-5 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-800 transition hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Promo links */}
        <div className="px-5 py-3 space-y-3">
          {promoLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className={`block text-base font-bold ${link.color || ''}`}
              style={link.gradient ? gradientTextStyle : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Banner carousel */}
        <div className="px-5 py-3">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={categoryBanners[currentBanner]?.image}
              alt={categoryBanners[currentBanner]?.name}
              className="w-full h-44 object-cover rounded-2xl"
            />
            <Link
              to={categoryBanners[currentBanner]?.link || '#'}
              onClick={onClose}
              className="absolute inset-0"
              aria-label={`Shop ${categoryBanners[currentBanner]?.name}`}
            />
          </div>
          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {categoryBanners.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => setCurrentBanner(index)}
                aria-label={`Show ${banner.name} banner`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentBanner
                    ? 'w-6 bg-red-500'
                    : 'w-2.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 my-4 border-t border-gray-200" />

        {/* Categories */}
        <div className="px-5 pb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2.5">
            {navCategories.map((category) => {
              const isExpanded = expandedCategory === category.label
              return (
                <div
                  key={category.label}
                  className="rounded-2xl bg-gray-100 overflow-hidden"
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category.label)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className="text-base font-bold text-gray-900">
                      {category.label}
                    </span>
                    <ChevronRightIcon
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isExpanded ? '-rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Subcategory icons — scrollable, no visible scrollbar */}
                  {isExpanded && (
                    <div className="px-4 pb-4 overflow-x-auto scrollbar-hide">
                      <div className="flex gap-3">
                        {/* View All */}
                        <Link
                          to={`/collections/${category.collection || 'all'}`}
                          onClick={onClose}
                          className="flex flex-col items-center gap-2 flex-shrink-0 w-20"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center">
                            <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                          <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                            View All
                          </span>
                        </Link>

                        {/* Subcategory items */}
                        {category.items?.map((item) => (
                          <Link
                            key={item.name}
                            to={`/collections/${category.collection || 'all'}`}
                            onClick={onClose}
                            className="flex flex-col items-center gap-2 flex-shrink-0 w-20"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[11px] font-medium text-gray-600 text-center leading-tight">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 my-4 border-t border-gray-200" />

        {/* Bottom links */}
        <div className="px-5 pb-8">
          <h3
            className="text-lg font-bold mb-4"
            style={goldGradientStyle}
          >
            10th Year Anniversary Programs
          </h3>
          <div className="space-y-3.5">
            {bottomLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={onClose}
                className="block text-[15px] font-medium text-gray-700 transition hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu