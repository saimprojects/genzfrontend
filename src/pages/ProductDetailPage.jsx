import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  StarIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  SparklesIcon,
  FireIcon,
  ClockIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import api from '../services/api'
import toast from 'react-hot-toast'
import ReactPixel from 'react-facebook-pixel'

/* ── FOMO keyframes (injected once) ── */
if (typeof document !== 'undefined' && !document.getElementById('pdp-kf')) {
  const s = document.createElement('style')
  s.id = 'pdp-kf'
  s.textContent = `
    @keyframes pdp-savings-pop {
      0%   { opacity: 0; transform: translateY(8px) scale(0.95); }
      60%  { transform: translateY(-2px) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes pdp-badge-bounce {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.12); }
    }
    @keyframes pdp-viewer-fade {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pdp-toast-in {
      from { opacity: 0; transform: translateY(16px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes pdp-toast-out {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to   { opacity: 0; transform: translateY(16px) scale(0.96); }
    }
    @keyframes pdp-sticky-in {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    @keyframes pdp-pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(239,68,68,0.45); }
      100% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
    }
    .pdp-savings-pop   { animation: pdp-savings-pop  0.45s ease forwards; }
    .pdp-badge-bounce  { animation: pdp-badge-bounce 0.6s ease 2; }
    .pdp-viewer-fade   { animation: pdp-viewer-fade  0.5s ease forwards; }
    .pdp-toast-in      { animation: pdp-toast-in     0.35s ease forwards; }
    .pdp-toast-out     { animation: pdp-toast-out    0.35s ease forwards; }
    .pdp-sticky-in     { animation: pdp-sticky-in    0.3s ease forwards; }
    .pdp-pulse-ring    { animation: pdp-pulse-ring   1.6s ease-out infinite; }
  `
  document.head.appendChild(s)
}

/* Rotating "recent purchase" social-proof toast — names/cities are illustrative,
   not pulled from real order data. Keep this in mind if you ever want to wire
   it up to real recent-orders instead. */
const RECENT_BUYERS = [
  { name: 'Ahmed',  city: 'Lahore' },
  { name: 'Ayesha', city: 'Karachi' },
  { name: 'Bilal',  city: 'Islamabad' },
  { name: 'Sara',   city: 'Faisalabad' },
  { name: 'Usman',  city: 'Rawalpindi' },
  { name: 'Hina',   city: 'Multan' },
  { name: 'Zain',   city: 'Sialkot' },
]

const ProductDetailPage = () => {
  const { slug }       = useParams()
  const navigate       = useNavigate()
  const [product, setProduct]                   = useState(null)
  const [relatedProducts, setRelatedProducts]   = useState([])
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loading, setLoading]                   = useState(true)
  const [selectedVariant, setSelectedVariant]   = useState(null)
  const [quantity, setQuantity]                 = useState(1)
  const [selectedImage, setSelectedImage]       = useState(null)
  const [activeTab, setActiveTab]               = useState('description')

  /* ── FOMO state ── */
  const [priceRevealed, setPriceRevealed] = useState(false)
  const [viewerCount]                     = useState(() => Math.floor(Math.random() * 16) + 12) // 12–27
  const [soldToday]                       = useState(() => Math.floor(Math.random() * 41) + 20) // 20–60
  const [countdown, setCountdown]         = useState('')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [notification, setNotification]   = useState(null)
  const [notificationLeaving, setNotificationLeaving] = useState(false)

  const buyBtnRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProduct()
    /* Reset price reveal each time product changes */
    setPriceRevealed(false)
  }, [slug])

  /* Trigger price animation 1.5 s after product loads */
  useEffect(() => {
    if (!product) return
    const t = setTimeout(() => setPriceRevealed(true), 1500)
    return () => clearTimeout(t)
  }, [product])

  /* Countdown to midnight — frames today's price as a ticking clock */
  useEffect(() => {
    const tick = () => {
      const now      = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight - now
      const h = String(Math.floor(diff / 3_600_000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0')
      const s = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, '0')
      setCountdown(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* Show a sticky mobile buy bar once the main CTA scrolls out of view */
  useEffect(() => {
    if (!buyBtnRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(buyBtnRef.current)
    return () => obs.disconnect()
  }, [product])

  /* Rotating recent-purchase toast */
  useEffect(() => {
    if (!product) return
    let i = 0
    const showNext = () => {
      const buyer   = RECENT_BUYERS[i % RECENT_BUYERS.length]
      const minsAgo = Math.floor(Math.random() * 14) + 1
      i++
      setNotificationLeaving(false)
      setNotification({ ...buyer, minsAgo })
      const leaveTimer = setTimeout(() => setNotificationLeaving(true), 4200)
      const hideTimer  = setTimeout(() => setNotification(null), 4600)
      return () => { clearTimeout(leaveTimer); clearTimeout(hideTimer) }
    }
    const first    = setTimeout(showNext, 2500)
    const interval = setInterval(showNext, 9000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [product])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/products/${slug}/`)
      setProduct(res.data)
      setSelectedImage(res.data.images?.[0] || null)
      if (res.data.variants?.length > 0) setSelectedVariant(res.data.variants[0])

      ReactPixel.track('ViewContent', {
        content_ids:      [res.data.id || slug],
        content_name:     res.data.name,
        content_category: res.data.category?.name || '',
        content_type:     'product',
        value:            res.data.final_price || res.data.base_price,
        currency:         'PKR',
      })

      if (res.data.category) {
        const relatedRes = await api.get(`/products/?category=${res.data.category.slug}`)
        setRelatedProducts(relatedRes.data.filter(p => p.slug !== slug).slice(0, 4))
      }

      const allRes = await api.get('/products/')
      setSuggestedProducts(
        allRes.data.filter(p => p.slug !== slug && p.category !== res.data.category?.id).slice(0, 4)
      )
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
      navigate('/shop')
    } finally {
      setLoading(false)
    }
  }

  const handleVariantSelect  = (variant) => setSelectedVariant(variant)

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < (selectedVariant?.stock_quantity || 10))
      setQuantity(prev => prev + 1)
    if (type === 'decrease' && quantity > 1)
      setQuantity(prev => prev - 1)
  }

  const handleBuyNow = () => {
    if (!selectedVariant && product?.variants?.length > 0) {
      toast.error('Please select a variant')
      return
    }
    const currentPrice = selectedVariant?.price || product.final_price
    ReactPixel.track('AddToCart', {
      content_ids:  [product.id],
      content_name: product.name,
      content_type: 'product',
      value:        currentPrice * quantity,
      currency:     'PKR',
      contents:     [{ id: product.id, quantity, item_price: currentPrice }],
    })
    localStorage.setItem('quickOrder', JSON.stringify({
      product_id:      product.id,
      product_slug:    product.slug,
      product_name:    product.name,
      variant_id:      selectedVariant?.id || null,
      variant_details: selectedVariant
        ? `${selectedVariant.size || ''} ${selectedVariant.color || ''}`.trim()
        : 'Default',
      quantity,
      price: currentPrice,
      image: product.thumbnail_url || product.primary_image,
    }))
    navigate('/checkout')
  }

  if (loading) return <Loader />
  if (!product) return null

  const currentPrice  = selectedVariant?.price || product.final_price
  const discount      = product.discount_percentage || 0

  // FIX: originalPrice used to fall back to `selectedVariant?.price` too,
  // which is the exact same value as currentPrice — so whenever a variant
  // was selected, originalPrice === currentPrice and "You save Rs. 0!"
  // showed up no matter what the real discount was. Now we derive the
  // original price from the product's discount %, applied on top of
  // whatever price is actually showing (variant or product-level).
  const originalPrice = discount > 0
    ? Math.round(currentPrice / (1 - discount / 100))
    : (selectedVariant?.price || product.base_price)

  const inStock       = selectedVariant ? selectedVariant.stock_quantity > 0 : true
  const stockQty      = selectedVariant?.stock_quantity || product.stock || null
  const savings       = discount > 0 ? Math.round(originalPrice - currentPrice) : 0
  const isLowStock    = stockQty && stockQty <= 10

  // Urgency progress bar — assumes a restock baseline of 50 units so the bar
  // has something to visually drain against. Purely a UI device, not real data.
  const stockBaseline = 50
  const stockPercent  = stockQty
    ? Math.min(100, Math.max(4, Math.round((stockQty / stockBaseline) * 100)))
    : 100

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-4 transition-colors text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 p-4 md:p-6 lg:p-8">

            {/* ── Images ── */}
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-2xl overflow-hidden mb-3 aspect-square relative">
                <img
                  src={selectedImage?.image_url || selectedImage || product.thumbnail_url || 'https://via.placeholder.com/500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Discount badge on image */}
                {discount > 0 && (
                  <span className={`absolute top-3 right-3 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg ${priceRevealed ? 'pdp-badge-bounce' : ''}`}>
                    🔥 {discount}% OFF
                  </span>
                )}
              </div>

              {product.images?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage?.id === img.id ? 'border-primary-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div className="lg:w-1/2 pt-4 lg:pt-0">

              {/* Category */}
              {product.category && (
                <Link
                  to={`/shop?category=${product.category.slug}`}
                  className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2 inline-block hover:underline"
                >
                  {product.category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Stars + sold-today badge */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">4.8</span>
                <span className="text-sm text-gray-400">(128 reviews)</span>
                <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full ml-1">
                  <FireIcon className="w-3 h-3" />
                  {soldToday} sold in last 24h
                </span>
              </div>

              {/* ══ FOMO PRICE BLOCK ══ */}
              <div className="mb-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">

                {/* Countdown — deal "ends" at midnight */}
                {discount > 0 && (
                  <div className="flex items-center justify-between gap-2 mb-3 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                      <ClockIcon className="w-3.5 h-3.5" />
                      Today's price ends in
                    </span>
                    <span className="text-sm font-black text-red-600 tabular-nums tracking-wide">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Viewer count — fades in on load */}
                <div className="pdp-viewer-fade flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                  <span className="text-xs font-semibold text-red-600">
                    🔥 {viewerCount} people are viewing this right now
                  </span>
                </div>

                {discount > 0 ? (
                  <>
                    {/* Original price — shrinks + gets struck through */}
                    <div className="relative inline-block mb-2">
                      <span
                        className="block font-bold transition-all duration-500"
                        style={{
                          fontSize:   priceRevealed ? '0.9rem'  : '1.5rem',
                          color:      priceRevealed ? '#9ca3af' : 'var(--color-primary, #4f46e5)',
                          transition: 'font-size 0.5s ease, color 0.5s ease',
                        }}
                      >
                        Rs. {originalPrice?.toLocaleString()}
                      </span>
                      {/* Sliding red strike line */}
                      <span
                        className="absolute top-1/2 left-0 h-[2px] bg-red-400 rounded-full block"
                        style={{
                          width:     priceRevealed ? '100%' : '0%',
                          transition:'width 0.55s ease',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    </div>

                    {/* Discounted price — fades up */}
                    <div
                      style={{
                        opacity:    priceRevealed ? 1 : 0,
                        transform:  priceRevealed ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
                      }}
                    >
                      <div className="flex items-baseline gap-3 flex-wrap mb-1">
                        <span className="text-3xl font-black text-green-600">
                          Rs. {currentPrice?.toLocaleString()}
                        </span>
                        <span className="text-sm font-black bg-red-500 text-white px-2.5 py-1 rounded-full">
                          {discount}% OFF
                        </span>
                      </div>

                      {/* "Updated just now" */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                        <span className="text-xs font-semibold text-green-600">
                          New pricing updated just now
                        </span>
                      </div>
                    </div>

                    {/* Savings callout — pops in */}
                    {priceRevealed && savings > 0 && (
                      <div className="pdp-savings-pop flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                        <span className="text-sm font-bold text-green-700">
                          💰 You save Rs. {savings.toLocaleString()}!
                        </span>
                        <span className="text-xs font-black bg-green-500 text-white rounded-full px-2.5 py-0.5">
                          {discount}% off
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-primary-600">
                    Rs. {currentPrice?.toLocaleString()}
                  </span>
                )}
              </div>
              {/* ══ END FOMO PRICE BLOCK ══ */}

              {/* Stock status */}
              <div className="mb-4">
                {inStock ? (
                  <>
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <p className="text-green-600 text-sm flex items-center gap-1 font-medium">
                        <CheckIcon className="w-4 h-4" />
                        In Stock
                        {stockQty && <span className="text-gray-500 font-normal">({stockQty} available)</span>}
                      </p>
                      {/* Low stock urgency */}
                      {isLowStock && (
                        <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                          <BoltIcon className="w-3 h-3" />
                          Only {stockQty} left!
                        </span>
                      )}
                    </div>
                    {/* Stock urgency progress bar */}
                    {isLowStock && (
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700"
                          style={{ width: `${stockPercent}%` }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-red-600 text-sm font-semibold">Out of Stock</p>
                )}
              </div>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">Select Variant</h3>

                  {product.variants.some(v => v.size) && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {[...new Map(product.variants.map(v => [v.size, v])).values()].map((variant) => (
                          <button
                            key={variant.size}
                            onClick={() => handleVariantSelect(variant)}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                              selectedVariant?.size === variant.size
                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-primary-300 text-gray-600'
                            }`}
                          >
                            {variant.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.variants.some(v => v.color) && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {[...new Map(product.variants.map(v => [v.color, v])).values()].map((variant) => (
                          <button
                            key={variant.color}
                            onClick={() => handleVariantSelect(variant)}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                              selectedVariant?.color === variant.color
                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-primary-300 text-gray-600'
                            }`}
                          >
                            {variant.color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5">
                <h3 className="font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wider">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buy Now CTA */}
              <div ref={buyBtnRef}>
                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                    inStock
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-200 hover:shadow-primary-300 active:scale-95 pdp-pulse-ring'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  {inStock ? 'Buy Now — Order Today!' : 'Out of Stock'}
                </button>
              </div>

              {/* Limited time note below button */}
              {inStock && discount > 0 && (
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <ClockIcon className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-xs text-orange-600 font-semibold">
                    Limited time price — order before it changes!
                  </span>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t grid grid-cols-2 gap-3">
                {[
                  { icon: TruckIcon,       label: 'Free Delivery' },
                  { icon: ShieldCheckIcon, label: 'Secure Shopping' },
                  { icon: ArrowPathIcon,   label: '7 Days Return' },
                  { icon: CheckIcon,       label: 'COD Available' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="border-t">
            <div className="flex flex-wrap border-b">
              {[
                { key: 'description', label: 'Description' },
                { key: 'reviews',     label: 'Reviews' },
                { key: 'shipping',    label: 'Shipping Info' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 md:px-7 py-3.5 font-semibold text-sm transition-all ${
                    activeTab === key
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-5 md:p-7">
              {activeTab === 'description' && (
                <div
                  className="prose max-w-none text-gray-600 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-10">
                  <p className="text-4xl mb-3">⭐</p>
                  <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2.5 text-sm text-gray-600">
                  <p>• Free delivery on orders above Rs. 5,000</p>
                  <p>• Delivery time: 3–5 business days</p>
                  <p>• Cash on Delivery available nationwide</p>
                  <p>• Easy returns within 7 days</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Related Products</h2>
              <Link to={`/shop?category=${product.category?.slug}`} className="text-primary-600 hover:underline text-sm font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── You May Also Like ── */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {suggestedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Recent-purchase social-proof toast ── */}
      {notification && (
        <div
          className={`fixed bottom-4 left-4 z-40 max-w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex items-center gap-3 ${
            notificationLeaving ? 'pdp-toast-out' : 'pdp-toast-in'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
            <ShoppingBagIcon className="w-4 h-4 text-primary-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">
              {notification.name} from {notification.city}
            </p>
            <p className="text-[11px] text-gray-500">
              just bought this · {notification.minsAgo} min ago
            </p>
          </div>
        </div>
      )}

      {/* ── Sticky mobile buy bar ── */}
      {showStickyBar && (
        <div className="pdp-sticky-in fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 leading-none mb-1">
              {discount > 0 && (
                <span className="line-through mr-1">Rs. {originalPrice?.toLocaleString()}</span>
              )}
            </p>
            <p className="text-base font-black text-gray-800 leading-none">
              Rs. {currentPrice?.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              inStock
                ? 'bg-primary-600 hover:bg-primary-700 text-white active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBagIcon className="w-4 h-4" />
            {inStock ? 'Buy Now' : 'Out of Stock'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage