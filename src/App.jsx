import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel' // ⬅️ Add this
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import TrackOrderPage from './pages/TrackOrderPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

// ⬇️ Meta Pixel Initialization
const PIXEL_ID = '1472228744582443'

// Initialize pixel once
ReactPixel.init(PIXEL_ID)

// Scroll to Top Component - Fixed version
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    console.log('Scrolling to top for path:', pathname)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
    // ⬇️ Track PageView on every route change
    ReactPixel.pageView()
  }, [pathname])
  
  return null
}

function App() {
  // ⬇️ Track initial page load
  useEffect(() => {
    ReactPixel.pageView()
  }, [])

  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="track-order" element={<TrackOrderPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App