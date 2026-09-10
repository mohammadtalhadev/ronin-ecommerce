import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import NavIconWithMenu from './NavIconWithMenu'
import CartDrawer from './CartDrawer'
import UserMenu from './UserMenu'
import { navCategories } from '../../data/navCategories'
import RoninLogo from '../../assets/ronin-logo_alt_1-1.png'
import IconAccessories from '../../assets/Icon-all.svg'
import { SearchIcon, UserIcon, CartIcon, XMarkIcon } from '../ui/Icons'

const glassStyle = {
  background: 'rgba(13, 13, 13, 0.1)',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 30px 0px',
}

function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated, user } = useAuth()

  const [activeCategory, setActiveCategory] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeTimerRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = setTimeout(() => {
      setActiveCategory(null)
      closeTimerRef.current = null
    }, 150)
  }

  const toggleCategory = (label) => {
    setActiveCategory((currentCategory) =>
      currentCategory === label ? null : label,
    )
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen)
    setActiveCategory(null)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Navbar wrapper
          Mobile:
          - 12px top spacing
          - 12px left/right spacing

          Desktop:
          - Original full-width positioning
      */}
      <div
        className="absolute left-0 right-0 top-3 z-50 flex justify-center px-3 transition-all duration-300 md:top-0 md:px-0"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {/* Main navbar */}
        <nav
          className={`relative flex w-full max-w-none items-center justify-between gap-2 rounded-[40px] px-3 py-2 text-white backdrop-blur-md transition-all duration-300 md:max-w-[calc(100%-100px)] md:gap-4 md:px-[14px] md:py-[6px] ${
            scrolled ? 'bg-black/40' : ''
          }`}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: '22.4px',
            ...(scrolled ? {} : glassStyle),
          }}
        >
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="shrink-0 rounded-full p-1.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70 lg:hidden"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
             )}
          </button>

          {/* Ronin logo */}
          <div className="flex shrink-0 items-center md:mr-2">
            <Link
              to="/"
              aria-label="Ronin - Home"
              title="Ronin - Home"
              className="flex items-center"
            >
              <img
                src={RoninLogo}
                alt="Ronin"
                className="h-[18px] w-auto object-contain md:mr-5 md:h-5"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex md:gap-2">
            {navCategories.map((category) => (
              <NavIconWithMenu
                key={category.label}
                icon={category.icon}
                label={category.label}
                isActive={activeCategory === category.label}
                onHover={setActiveCategory}
                onToggle={toggleCategory}
              />
            ))}
          </div>

          {/* Right-side actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5 md:ml-5 md:gap-3">
            {/* Shop All button - desktop only */}
            <Link
              to="/collections/all"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/70 md:flex md:px-5"
            >
              <img
                src={IconAccessories}
                alt=""
                className="h-6 w-7 object-contain"
              />

              <span>Shop All</span>
            </Link>

            {/* Search button */}
            <button
              type="button"
              aria-label="Search"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* User account */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                aria-label="Log in"
                title={`Log in${user ? ` as ${user.name || ''}` : ''}`}
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            )}

            {/* Shopping cart */}
            <button
              type="button"
              aria-label={`Shopping cart with ${cartCount} items`}
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <CartIcon className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#8b4513]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-3 right-3 top-full z-[1100] mt-3 md:hidden">
            <div
              className="animate-menu-in max-h-[65vh] overflow-y-auto rounded-2xl border border-white/15 p-3 backdrop-blur-2xl"
              style={glassStyle}
              data-lenis-prevent
            >
              {/* Shop All */}
              <Link
                to="/collections/all"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <img
                  src={IconAccessories}
                  alt=""
                  className="h-5 w-6 object-contain"
                />

                <span>Shop All</span>
              </Link>

              <div className="my-2 border-t border-white/15" />

              {/* Mobile category links */}
              <div className="grid grid-cols-2 gap-1">
                {navCategories.map((category) => (
                  <Link
                    key={category.label}
                    to={`/collections/${category.collection || 'all'}`}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    <span className="text-lg leading-none">
                      {category.icon}
                    </span>

                    <span>{category.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invisible hover bridge for desktop mega menu */}
        <div
          aria-hidden="true"
          className="mega-menu-bridge"
        />

        {/* Desktop mega menu */}
        {activeCategory && (
          <div className="mega-menu-panel pointer-events-auto absolute left-0 right-0 top-full z-[1100] hidden md:block">
            <div
              className="mx-auto max-w-6xl rounded-2xl border border-white/15 p-3 backdrop-blur-2xl md:p-6"
              style={glassStyle}
            >
              <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                {/* Active category title */}
                <div className="shrink-0">
                  <div className="rounded-xl border border-white/15 bg-white/20 px-4 py-3 md:px-5 md:py-4">
                    <span
                      className="text-base font-bold text-white md:text-lg"
                      style={{
                        textShadow: '0px 1px 3px rgba(0,0,0,0.4)',
                      }}
                    >
                      {navCategories.find(
                        (category) => category.label === activeCategory,
                      )?.label}
                    </span>
                  </div>
                </div>

                {/* Mega menu products */}
                <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                  {navCategories
                    .find(
                      (category) => category.label === activeCategory,
                    )
                    ?.items?.map((item, index) => (
                      <Link
                        key={item.name}
                        to={`/collections/${
                          navCategories.find(
                            (category) =>
                              category.label === activeCategory,
                          )?.collection || 'all'
                        }`}
                        aria-label={`Shop ${item.name} collection`}
                        className="mega-card flex flex-col items-center rounded-xl border border-white/10 bg-white/10 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/25 hover:bg-white/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
                        style={{
                          animationDelay: `${index * 45}ms`,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="mb-3 h-24 w-28 object-contain transition-transform duration-300 hover:scale-105"
                        />

                        <span
                          className="text-center text-sm font-semibold leading-tight text-white"
                          style={{
                            textShadow: '0px 1px 3px rgba(0,0,0,0.4)',
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}

export default Navbar
