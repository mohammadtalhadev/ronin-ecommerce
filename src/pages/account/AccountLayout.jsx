import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import RoninLogo from '../../assets/ronin-logo_alt_1-1.png'
import { UserIcon, BoxIcon, HeartIcon, MapPinIcon, LockIcon, LogoutIcon } from '../../components/ui/Icons'

// Sidebar + content layout for the /account/* section
// (Profile, Orders, Wishlist, Addresses, Security, Logout).
const accountLinks = [
  { to: '/account/profile', label: 'Profile', icon: UserIcon },
  { to: '/account/orders', label: 'My Orders', icon: BoxIcon },
  { to: '/account/wishlist', label: 'Wishlist', icon: HeartIcon },
  { to: '/account/addresses', label: 'Addresses', icon: MapPinIcon },
  { to: '/account/security', label: 'Security', icon: LockIcon },
]

function AccountLayout() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.info('You have been logged out.')
    navigate('/')
  }

  return (
    <div className="bg-[#F0F0F0] px-3 py-12 md:px-4 md:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <img src={RoninLogo} alt="Ronin" className="h-5 w-auto object-contain md:h-6" />
          <div className="hidden h-6 w-px bg-gray-300 md:block" />
          <div>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">My Account</h1>
            <p className="text-sm text-gray-500">
              Signed in as <span className="font-semibold text-slate-700">{user.email}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl bg-white p-3 shadow-lg md:rounded-3xl md:p-4">
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                  {user.name?.trim()?.charAt(0)?.toUpperCase() ?? 'U'}
                </span>
              )}
              <p className="min-w-0 truncate text-sm font-semibold text-slate-900">{user.name}</p>
            </div>
            <nav className="space-y-1">
              {accountLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <link.icon className="w-[18px] h-[18px]" />
                  {link.label}
                </NavLink>
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
          </aside>

          {/* Content */}
          <section className="rounded-2xl bg-white p-4 shadow-lg md:rounded-3xl md:p-6 lg:p-8">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
