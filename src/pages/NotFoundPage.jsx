import { Link } from 'react-router-dom'
import RoninLogo from '../assets/ronin-logo_alt_1-1.png'

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-8 pt-24 pb-16 bg-white">
      <img src={RoninLogo} alt="Ronin" className="h-8 w-auto object-contain mb-10" />

      {/* Big 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-slate-900 tracking-tight">
        4<span className="text-orange-500">0</span>4
      </h1>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-4">
        This page could not be found
      </h2>
      <p className="text-sm text-gray-500 mt-3 max-w-md leading-relaxed">
        The page you are looking for doesn't exist or has been moved. Check the URL or head back to the homepage to continue shopping.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link
          to="/"
          className="bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-orange-600 transition"
        >
          Back to Homepage
        </Link>
        <Link
          to="/collections/headphones"
          className="border border-slate-900 text-slate-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-slate-900 hover:text-white transition"
        >
          Shop Headphones
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage