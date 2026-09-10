import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { UserIcon, BoxIcon, HeartIcon, MapPinIcon, LockIcon, LogoutIcon } from '../ui/Icons'

// Avatar/initial dropdown shown in the Navbar when a user is signed in.
// Closes on outside click and Escape.
function UserMenu() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false)
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    toast.info('You have been logged out.')
    navigate('/')
  }

  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() ?? 'U'

  const menuItems = [
    { to: '/account/profile', label: 'My Profile', icon: UserIcon },
    { to: '/account/orders', label: 'My Orders', icon: BoxIcon },
    { to: '/account/wishlist', label: 'Wishlist', icon: HeartIcon },
    { to: '/account/addresses', label: 'Addresses', icon: MapPinIcon },
    { to: '/account/security', label: 'Security', icon: LockIcon },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
      >
        {user.avatar ? (
          <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        >
          <div className="border-b border-gray-100 bg-slate-900 px-5 py-4">
            <p className="text-sm font-semibold text-white">Hi, {user.name.split(' ')[0]}</p>
            <p className="mt-0.5 truncate text-xs text-gray-300">{user.email}</p>
          </div>
          <nav className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-50"
              >
                <item.icon className="w-[18px] h-[18px] text-slate-500" />
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogoutIcon className="w-[18px] h-[18px]" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default UserMenu
