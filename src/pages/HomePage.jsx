import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  StarIcon,
  FireIcon,
  TagIcon,
} from '@heroicons/react/24/solid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import Loader from '../components/Loader'
import api from '../services/api'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

/* ── Ticker keyframe (injected once) ── */
if (typeof document !== 'undefined' && !document.getElementById('hp-kf')) {
  const s = document.createElement('style')
  s.id = 'hp-kf'
  s.textContent = `
    @keyframes hp-ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .hp-ticker-inner { animation: hp-ticker 22s linear infinite; }
  `
  document.head.appendChild(s)
}

const TICKER_ITEMS = [
  '🔥 Flash Sale Live Now',
  '🚚 FREE Delivery Across Pakistan',
  '💳 Cash on Delivery Available',
  '⭐ 10,000+ Happy Customers',
  '🎁 New Arrivals Every Week',
  '🔒 100% Secure Shopping',
]

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals]           = useState([])
  const [categories, setCategories]             = useState([])
  const [loading, setLoading]                   = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products/'),
        api.get('/categories/'),
      ])
      setFeaturedProducts(productsRes.data.slice(0, 8))
      setNewArrivals(productsRes.data.slice(8, 16))
      setCategories(categoriesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  const heroBanners = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105352/ChatGPT_Image_Apr_25_2026_01_22_16_PM_occxo1.png',
      link: '/shop',
      alt: 'Free Shipping Banner',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105281/ChatGPT_Image_Apr_25_2026_01_19_32_PM_etfsnv.png',
      link: '/shop',
      alt: 'Tech Products Banner',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105469/ChatGPT_Image_Apr_25_2026_01_24_17_PM_kgr9bk.png',
      link: '/shop',
      alt: 'Premium Products Banner',
    },
  ]

  const features = [
    {
      icon: ShoppingBagIcon,
      bg: 'from-primary-400 to-primary-600',
      title: 'Premium Products',
      desc: 'High quality products from trusted brands',
    },
    {
      icon: TruckIcon,
      bg: 'from-green-400 to-green-600',
      title: 'Fast Delivery',
      desc: 'Quick shipping across all cities in Pakistan',
    },
    {
      icon: ShieldCheckIcon,
      bg: 'from-orange-400 to-orange-600',
      title: 'Secure Shopping',
      desc: '100% secure payments & data protection',
    },
  ]

  const testimonials = [
    {
      name: 'Ahmed Raza',
      city: 'Lahore',
      initials: 'AR',
      color: 'from-primary-400 to-primary-600',
      text: 'Amazing experience! The product quality is excellent and delivery was super fast. Highly recommend Primary Order.',
    },
    {
      name: 'Sara Khan',
      city: 'Karachi',
      initials: 'SK',
      color: 'from-pink-400 to-rose-500',
      text: 'Best online shopping experience in Pakistan. Got my order next day and the packaging was perfect!',
    },
    {
      name: 'Usman Ali',
      city: 'Islamabad',
      initials: 'UA',
      color: 'from-orange-400 to-orange-600',
      text: 'Cash on delivery made it super easy. Product exactly as shown. Will definitely order again!',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Slider ── */}
      <section className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          loop={true}
          className="w-full"
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link} className="block w-full">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-auto object-cover object-center block"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── Flash Sale Ticker ── */}
      <div className="bg-primary-900 text-white py-2.5 overflow-hidden">
        <div className="flex hp-ticker-inner whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-10 text-sm font-medium">
              {item}
              <span className="text-primary-400 mx-6">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, bg, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${bg} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-800">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
              <p className="text-gray-500">Explore our wide range of categories</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Products ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FireIcon className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Selling Fast</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-gray-500 mt-1 text-sm">Handpicked deals — limited stock available</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700 text-sm"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      {newArrivals.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TagIcon className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Just Dropped</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">New Arrivals</h2>
                <p className="text-gray-500 mt-1 text-sm">Fresh stock — be the first to grab it</p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700 text-sm"
              >
                View All <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              What Our Customers Say
            </h2>
            <p className="text-gray-500">Trusted by 10,000+ happy customers across Pakistan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city} · Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white relative overflow-hidden">
        {/* Subtle background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container-custom text-center relative">
          <p className="text-primary-300 text-sm font-semibold uppercase tracking-widest mb-3">Stay in the Loop</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Exclusive Deals First</h2>
          <p className="text-primary-200 mb-8 max-w-md mx-auto text-sm">
            Subscribe and be the first to know about flash sales, new arrivals, and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-semibold transition text-sm whitespace-nowrap"
            >
              Subscribe 🎁
            </button>
          </form>

          <p className="text-primary-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}

export default HomePage