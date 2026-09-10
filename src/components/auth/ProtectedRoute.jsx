import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Wraps any route that requires a signed-in user. Unauthenticated
// visitors are redirected to /login with a `redirect` param so they
// land back on the page they wanted after signing in
// (e.g. /checkout → /login?redirect=/checkout → /checkout).
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
        Loading…
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute
