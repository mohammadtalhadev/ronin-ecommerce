import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { scrollToTop } from './utils/scrollManager'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/ui/ErrorBoundary'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'
import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountLayout from './pages/account/AccountLayout'
import ProfilePage from './pages/account/ProfilePage'
import OrdersPage from './pages/account/OrdersPage'
import WishlistPage from './pages/account/WishlistPage'
import AddressesPage from './pages/account/AddressesPage'
import SecurityPage from './pages/account/SecurityPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const location = useLocation()

  // Reset scroll to the top (instantly) on route change, so each page starts
  // at the top like a native navigation while Lenis stays as the scroller.
  useEffect(() => {
    scrollToTop({ immediate: true })
  }, [location.pathname])

  return (
    <div>
      {/* Shared layout - renders on every page of the site */}
      <AnnouncementBar />
      {/* relative wrapper lets the absolute Navbar overlay the hero on the homepage */}
      <div className="relative">
        <Navbar />
        {/* Page fade-in on route change — short, non-blocking. The key forces a
            remount on navigation so the enter animation runs per page. */}
        <div key={window.location.pathname} className="page-enter">
          {/* ErrorBoundary keeps a crash in one page from blanking the app */}
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:collectionName" element={<CollectionPage />} />
            <Route path="/products/:handle" element={<ProductPage />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignupPage />
                </GuestRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            {/* Account section with nested routes under a shared layout */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="security" element={<SecurityPage />} />
            </Route>
            {/* Catch-all: any unknown URL shows the 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
