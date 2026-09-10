import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Inverse of ProtectedRoute: keeps already-signed-in users off the
// login/signup pages and bounces them to their account instead.
function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
        Loading…
      </div>
    )
  }

  if (isAuthenticated) {
    // Preserve any intended destination from the login link
    const params = new URLSearchParams(location.search)
    const redirect = params.get('redirect') || '/account'
    return <Navigate to={redirect} replace />
  }

  return children
}

export default GuestRoute
