import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { initReveal } from './utils/reveal'
import { initLenis } from './utils/scrollManager'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'

// Gate scroll-reveal (hidden-start) styles behind `.js` so content is always
// visible when JavaScript is disabled or fails to load.
document.documentElement.classList.add('js')

// Provider order matters: Cart and Wishlist read the auth user
// (for per-user storage + guest merging), so Auth must wrap them.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Initialize the centralized scroll-reveal observer once the app has rendered,
// so it can begin watching for sections/cards on the first page.
initReveal()

// Initialize Lenis as the global smooth-scroll foundation once rendered.
initLenis()
