import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid'

/* 
  Keyframes are injected once at module level — no duplicate <style> tags 
  even when dozens of cards are rendered in a grid.
*/
if (typeof document !== 'undefined' && !document.getElementById('pc-keyframes')) {
  const s = document.createElement('style')
  s.id = 'pc-keyframes'
  s.textContent = `
    @keyframes pc-savings-pop {
      0%   { opacity: 0; transform: translateY(10px) scale(0.95); }
      60%  { transform: translateY(-2px) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes pc-badge-pulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.15); }
    }
    .pc-savings-pop  { animation: pc-savings-pop  0.45s ease forwards; }
    .pc-badge-active { animation: pc-badge-pulse  0.6s ease 0.1s 2; }
  `
  document.head.appendChild(s)
}

const ProductCard = ({ product }) => {
  const [revealed, setRevealed] = useState(false)

  const discount        = product.discount_percentage || 0
  const discountedPrice = product.final_price || product.discounted_price
  const hasDiscount     = discount > 0 && discountedPrice
  const savings         = hasDiscount
    ? Math.round(product.base_price - discountedPrice)
    : 0

  /* Trigger the reveal after 1.5 s */
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.slug}`}>

        {/* ── IMAGE ─────────────────────────────────────── */}
        {/* aspect-square = 1:1 ratio always. Image is absolute so it fills
            the container exactly — nothing bleeds out, nothing gets squished. */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <img
            src={product.thumbnail_url || product.primary_image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Discount badge — bounces bigger on reveal */}
          {hasDiscount && (
            <span
              className={`absolute top-2 right-2 bg-red-500 text-white text-xs font-black px-2.5 py-1.5 rounded-full shadow-lg select-none ${revealed ? 'pc-badge-active' : ''}`}
            >
              🔥 {discount}% OFF
            </span>
          )}

          {/* "Limited Time Deal" fades in over image bottom */}
          {hasDiscount && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3 flex items-center gap-1.5 transition-opacity duration-700"
              style={{ opacity: revealed ? 1 : 0 }}
            >
              <ClockIcon className="w-3 h-3 text-white flex-shrink-0" />
              <span className="text-white text-xs font-bold tracking-wide">
                Limited Time Deal
              </span>
            </div>
          )}
        </div>

        {/* ── BODY ──────────────────────────────────────── */}
        <div className="p-4">

          {/* Title */}
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-gray-500 mb-2">{product.category_name}</p>

          {/* ⭐ 5 filled stars */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-3.5 h-3.5 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">4.8</span>
            <span className="text-xs text-gray-400">(128 reviews)</span>
          </div>

          {/* ── PRICING BLOCK ─────────────────────────── */}
          <div className="min-h-[68px]">
            {hasDiscount ? (
              <>
                {/* Base price: shrinks + grays + gets struck through */}
                <div className="relative inline-block mb-1">
                  <span
                    className="block font-bold transition-all duration-500"
                    style={{
                      fontSize:   revealed ? '0.8rem'   : '1.25rem',
                      color:      revealed ? '#9ca3af'  : 'var(--color-primary, #4f46e5)',
                      lineHeight: 1.3,
                    }}
                  >
                    Rs. {product.base_price}
                  </span>

                  {/* Animated red strike line slides left → right */}
                  <span
                    className="absolute top-1/2 left-0 block h-[2px] bg-red-400 rounded-full"
                    style={{
                      width:     revealed ? '100%' : '0%',
                      transition:'width 0.55s ease',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>

                {/* Discounted price — fades up with 400 ms delay */}
                <div
                  style={{
                    opacity:    revealed ? 1 : 0,
                    transform:  revealed ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
                  }}
                >
                  <span className="text-xl font-black text-green-600">
                    Rs. {discountedPrice}
                  </span>

                  {/* Pulsing dot + "updated just now" */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-green-600">
                      New pricing updated just now
                    </span>
                  </div>
                </div>
              </>
            ) : (
              /* No discount — just show base price normally */
              <span className="text-xl font-bold text-primary-600">
                Rs. {product.base_price}
              </span>
            )}
          </div>

          {/* ── SAVINGS CALLOUT — pops in after reveal ── */}
          {hasDiscount && revealed && (
            <div className="pc-savings-pop mt-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-xs font-bold text-green-700">
                💰 You save Rs. {savings}!
              </span>
              <span className="text-xs font-black bg-green-500 text-white rounded-full px-2.5 py-0.5">
                {discount}% off
              </span>
            </div>
          )}

        </div>
      </Link>
    </div>
  )
}

export default ProductCard