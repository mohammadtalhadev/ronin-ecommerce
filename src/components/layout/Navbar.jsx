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
import { SearchIcon, UserIcon, CartIcon } from '../ui/Icons'

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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeCat = navCategories.find((c) => c.label === activeCategory)

  // ---- One continuous hover region: navbar trigger + mega menu ----
  // The mega menu is a descendant of the wrapper that also wraps the <nav>,
  // so moving between them never leaves the wrapper's hover region.
  const closeTimerRef = useRef(null)

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setActiveCategory(null)
      closeTimerRef.current = null
    }, 150)
  }

  const toggleCategory = (label) => {
    setActiveCategory(activeCategory === label ? null : label)
  }

  return (
    <>
      <div
        className="absolute top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <nav
          className={`relative navbar-enter flex w-full max-w-[calc(100%-100px)] items-center justify-between gap-4 rounded-[40px] text-white backdrop-blur-md transition-all duration-300 ${
            scrolled ? 'bg-black/40' : ''
          }`}
          style={{
            padding: '6px 28px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: '22.4px',
            ...(scrolled ? {} : glassStyle),
          }}
        >
          <div className="shrink-0 mr-2 flex items-center">
            <Link
              to="/"
              aria-label="Ronin - Home"
              title="Ronin - Home"
              className="flex items-center"
            >
              <img
                src={RoninLogo}
                alt="Ronin"
                className="h-5 w-auto object-contain md:mr-5"
              />
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-1 md:gap-2">
            {navCategories.map((cat) => (
              <NavIconWithMenu
                key={cat.label}
                icon={cat.icon}
                label={cat.label}
                isActive={activeCategory === cat.label}
                onHover={setActiveCategory}
                onToggle={toggleCategory}
              />
            ))}
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-2 md:ml-5 md:gap-3">
            <Link to="/collections/all" className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 md:px-5">
              <span>
                <img
                  src={IconAccessories}
                  alt="Ronin"
                  className="w-7 h-6 object-contain"
                />
              </span>{' '}
              Shop All
            </Link>
            <span
              role="button"
              tabIndex={0}
              aria-label="Search"
              className="cursor-pointer transition hover:scale-110"
            >
              <SearchIcon className="w-5 h-5" />
            </span>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                aria-label="Log in"
                title={`Log in${user ? '' : ''}`}
                className="transition hover:scale-110"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
            <div
              className="relative cursor-pointer transition hover:scale-110"
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#8b4513] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </nav>

        {/* Invisible hover bridge: keeps the navbar + mega menu one continuous
            hover region with no mouse-inaccessible gap. Purely interactive. */}
        <div aria-hidden="true" className="mega-menu-bridge" />

        {/* Mega Menu Dropdown - flush against navbar, same glassStyle, text-shadow for legibility */}
        {activeCat && (
          <div className="mega-menu-panel absolute top-full left-0 right-0 z-[1100] pointer-events-auto">
            <div
              className="rounded-2xl border border-white/15 backdrop-blur-2xl p-6 mx-auto max-w-6xl"
              style={glassStyle}
            >
              <div className="flex gap-6">
                <div className="shrink-0 w-56">
                  <div className="rounded-xl bg-white/20 border border-white/15 px-5 py-4">
                    <span
                      className="text-lg font-bold text-white"
                      style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.4)' }}
                    >
                      {activeCat.label}
                    </span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4">
                  {activeCat.items.map((item, index) => (
                    <Link
                      key={item.name}
                      to={`/collections/${activeCat.collection || 'all'}`}
                      aria-label={`Shop ${item.name} collection`}
                      className="mega-card flex flex-col items-center rounded-xl bg-white/10 border border-white/10 p-3 transition-all duration-200 hover:bg-white/20 hover:border-white/25 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-28 h-24 object-contain mb-3 transition-transform duration-300 hover:scale-105"
                      />
                      <span
                        className="text-sm font-semibold text-white text-center leading-tight"
                        style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.4)' }}
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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar