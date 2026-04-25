import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon,
  StarIcon,
  Squares2X2Icon,
  ViewColumnsIcon
} from '@heroicons/react/24/outline'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import api from '../services/api'

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sortBy: 'newest',
    minPrice: 0,
    maxPrice: 50000,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCategories()
    fetchProducts()
  }, [filters])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories/')
      setCategories(res.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let url = `/products/?`
      
      if (filters.category) {
        url += `category=${filters.category}&`
      }
      if (filters.search) {
        url += `search=${filters.search}&`
      }
      if (filters.minPrice && filters.minPrice > 0) {
        url += `min_price=${filters.minPrice}&`
      }
      if (filters.maxPrice && filters.maxPrice < 50000) {
        url += `max_price=${filters.maxPrice}&`
      }
      
      if (filters.sortBy === 'price_low') {
        url += `ordering=price`
      } else if (filters.sortBy === 'price_high') {
        url += `ordering=-price`
      } else if (filters.sortBy === 'newest') {
        url += `ordering=-created_at`
      }
      
      const res = await api.get(url)
      setProducts(res.data)
      setAllProducts(res.data)
      
      if (res.data.length > 0) {
        const prices = res.data.map(p => p.base_price)
        setPriceRange({
          min: Math.min(...prices),
          max: Math.max(...prices)
        })
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key === 'category') {
      if (value) {
        setSearchParams({ category: value })
      } else {
        setSearchParams({})
      }
    }
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      sortBy: 'newest',
      minPrice: 0,
      maxPrice: 50000,
    })
    setSearchParams({})
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
  ]

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-10 mb-8 text-white">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {filters.search ? `Search: "${filters.search}"` : 'Shop Collection'}
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            {products.length} products found
          </p>
        </div>

        {/* Categories Section - TOP with Images */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Shop by Category</h2>
              {filters.category && (
                <button 
                  onClick={() => handleFilterChange('category', '')}
                  className="text-sm text-primary-600 hover:underline"
                >
                  Clear Category
                </button>
              )}
            </div>
            
            {/* Horizontal Scroll Categories */}
            <div className="overflow-x-auto pb-2 -mx-1 px-1">
              <div className="flex gap-3 min-w-max">
                {/* All Categories Option */}
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all min-w-[70px] ${
                    filters.category === '' 
                      ? 'bg-primary-50 ring-2 ring-primary-500' 
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <span className={`text-xs font-medium ${filters.category === '' ? 'text-primary-600' : 'text-gray-600'}`}>
                    All
                  </span>
                </button>
                
                {/* Category Buttons */}
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange('category', cat.slug)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all min-w-[70px] ${
                      filters.category === cat.slug 
                        ? 'bg-primary-50 ring-2 ring-primary-500' 
                        : 'bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {cat.image_url ? (
                        <img 
                          src={cat.image_url} 
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-gray-400">
                          {cat.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-medium truncate max-w-[70px] ${
                      filters.category === cat.slug ? 'text-primary-600' : 'text-gray-600'
                    }`}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 font-medium text-gray-700 shadow-sm"
          >
            <FunnelIcon className="w-5 h-5" />
            Filter & Sort
            {(filters.minPrice > 0 || filters.maxPrice < 50000) && (
              <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-gray-800">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Min</label>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Max</label>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value) || priceRange.max)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Range: Rs. {priceRange.min.toLocaleString()} - Rs. {priceRange.max.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ViewColumnsIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Active Filters Display */}
              <div className="flex flex-wrap gap-2">
                {filters.category && categories.find(c => c.slug === filters.category) && (
                  <span className="bg-primary-50 text-primary-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    {categories.find(c => c.slug === filters.category)?.name}
                    <button onClick={() => handleFilterChange('category', '')}>
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {(filters.minPrice > 0 || filters.maxPrice < priceRange.max) && (
                  <span className="bg-primary-50 text-primary-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    Rs. {filters.minPrice} - Rs. {filters.maxPrice}
                    <button onClick={() => {
                      handleFilterChange('minPrice', 0)
                      handleFilterChange('maxPrice', priceRange.max)
                    }}>
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 hover:shadow-md transition">
                    <Link to={`/product/${product.slug}`} className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={product.thumbnail_url || product.primary_image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-800 hover:text-primary-600 transition">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">{product.category_name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {product.discounted_price ? (
                          <>
                            <span className="text-lg font-bold text-primary-600">Rs. {product.final_price}</span>
                            <span className="text-sm text-gray-400 line-through">Rs. {product.base_price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary-600">Rs. {product.base_price}</span>
                        )}
                      </div>
                      <Link to={`/product/${product.slug}`} className="inline-block mt-3 text-sm text-primary-600 font-medium hover:underline">View Details →</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end lg:hidden">
          <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-5">
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value) || 0)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value) || priceRange.max)}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button onClick={clearFilters} className="flex-1 border border-gray-300 py-3 rounded-lg font-medium">Clear All</button>
                <button onClick={() => setIsFilterOpen(false)} className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium">Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopPage