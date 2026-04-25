import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  StarIcon 
} from '@heroicons/react/24/outline'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import Loader from '../components/Loader'
import api from '../services/api'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products/'),
        api.get('/categories/')
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

  // Hero Banner Images
  const heroBanners = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105352/ChatGPT_Image_Apr_25_2026_01_22_16_PM_occxo1.png',
      link: '/shop',
      alt: 'Free Shipping Banner - Shop with confidence'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105281/ChatGPT_Image_Apr_25_2026_01_19_32_PM_etfsnv.png',
      link: '/shop',
      alt: 'Tech Products Banner - Best Airbuds & Tech Products'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dxommxt6d/image/upload/v1777105469/ChatGPT_Image_Apr_25_2026_01_24_17_PM_kgr9bk.png',
      link: '/shop',
      alt: 'Luxurious Banner - Premium Quality Products'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Swiper Slider - Mobile Responsive */}
      <section className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          loop={true}
          className="w-full"
          style={{ height: 'auto' }}
        >
          {heroBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link} className="block w-full cursor-pointer">
                <img 
                  src={banner.image} 
                  alt={banner.alt}
                  className="w-full h-auto object-cover object-center"
                  style={{ 
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-gray-600 text-sm md:text-base">High quality products from trusted brands</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <TruckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm md:text-base">Quick shipping across all cities</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600 text-sm md:text-base">100% secure payments and data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our wide range of categories and find what you need
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-gray-600 mt-2">Handpicked just for you</p>
            </div>
            <Link to="/shop" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-1">
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

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom">
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Check out our latest products
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Trusted by thousands of happy customers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md card-hover">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing experience! The product quality is excellent and delivery was super fast. Highly recommend Primary Order."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ahmed Raza</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Get the latest updates on new products and upcoming sales
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
            <button type="submit" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage