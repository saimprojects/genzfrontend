import { useState, useEffect } from 'react'
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
  SparklesIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import api from '../services/api'
import toast from 'react-hot-toast'
import ReactPixel from 'react-facebook-pixel'

const ProductDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProduct()
  }, [slug])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/products/${slug}/`)
      setProduct(res.data)
      setSelectedImage(res.data.images?.[0] || null)
      
      if (res.data.variants && res.data.variants.length > 0) {
        setSelectedVariant(res.data.variants[0])
      }
      
      // Meta Pixel - ViewContent Event
      ReactPixel.track('ViewContent', {
        content_ids: [res.data.id || slug],
        content_name: res.data.name,
        content_category: res.data.category?.name || '',
        content_type: 'product',
        value: res.data.final_price || res.data.base_price,
        currency: 'PKR'
      })
      
      // Fetch related products (same category)
      if (res.data.category) {
        const relatedRes = await api.get(`/products/?category=${res.data.category.slug}`)
        const filtered = relatedRes.data.filter(p => p.slug !== slug).slice(0, 4)
        setRelatedProducts(filtered)
      }
      
      // Fetch suggested products (different category, random)
      const allProductsRes = await api.get('/products/')
      const otherProducts = allProductsRes.data.filter(p => p.slug !== slug && p.category !== res.data.category?.id).slice(0, 4)
      setSuggestedProducts(otherProducts)
      
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Product not found')
      navigate('/shop')
    } finally {
      setLoading(false)
    }
  }

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant)
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < (selectedVariant?.stock_quantity || 10)) {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleBuyNow = () => {
    if (!selectedVariant && product?.variants?.length > 0) {
      toast.error('Please select a variant')
      return
    }
    
    const currentPrice = selectedVariant?.price || product.final_price
    
    // Meta Pixel - AddToCart Event (Buy Now button)
    ReactPixel.track('AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: currentPrice * quantity,
      currency: 'PKR',
      contents: [{
        id: product.id,
        quantity: quantity,
        item_price: currentPrice
      }]
    })
    
    const orderData = {
      product_id: product.id,
      product_slug: product.slug,
      product_name: product.name,
      variant_id: selectedVariant?.id || null,
      variant_details: selectedVariant ? `${selectedVariant.size || ''} ${selectedVariant.color || ''}`.trim() : 'Default',
      quantity: quantity,
      price: selectedVariant?.price || product.final_price,
      image: product.thumbnail_url || product.primary_image
    }
    
    localStorage.setItem('quickOrder', JSON.stringify(orderData))
    navigate('/checkout')
  }

  if (loading) return <Loader />
  if (!product) return null

  const currentPrice = selectedVariant?.price || product.final_price
  const originalPrice = selectedVariant?.price || product.base_price
  const discount = product.discount_percentage || 0
  const inStock = selectedVariant ? selectedVariant.stock_quantity > 0 : true

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 p-4 md:p-6 lg:p-8">
            
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 aspect-square">
                <img
                  src={selectedImage?.image_url || selectedImage || product.thumbnail_url || 'https://via.placeholder.com/500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage?.id === img.id ? 'border-primary-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              {product.category && (
                <Link to={`/shop?category=${product.category.slug}`} className="text-sm text-primary-600 mb-2 inline-block hover:underline">
                  {product.category.name}
                </Link>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(128 reviews)</span>
              </div>
              
              <div className="mb-4">
                {discount > 0 ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl md:text-3xl font-bold text-primary-600">
                      Rs. {currentPrice?.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      Rs. {originalPrice?.toLocaleString()}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-primary-600">
                    Rs. {currentPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Select Variant</h3>
                  
                  {product.variants.some(v => v.size) && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">Size</p>
                      <div className="flex flex-wrap gap-2">
                        {[...new Map(product.variants.map(v => [v.size, v])).values()].map((variant) => (
                          <button
                            key={variant.size}
                            onClick={() => handleVariantSelect(variant)}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              selectedVariant?.size === variant.size
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-300 hover:border-primary-400'
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
                      <p className="text-sm text-gray-600 mb-2">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {[...new Map(product.variants.map(v => [v.color, v])).values()].map((variant) => (
                          <button
                            key={variant.color}
                            onClick={() => handleVariantSelect(variant)}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              selectedVariant?.color === variant.color
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-300 hover:border-primary-400'
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

              <div className="mb-4">
                {inStock ? (
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <CheckIcon className="w-4 h-4" />
                    In Stock ({selectedVariant?.stock_quantity || product.stock || 'Available'})
                  </p>
                ) : (
                  <p className="text-red-600 text-sm">Out of Stock</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Buy Now
              </button>

              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TruckIcon className="w-5 h-5 text-primary-600" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                    <span>Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowPathIcon className="w-5 h-5 text-primary-600" />
                    <span>7 Days Return</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckIcon className="w-5 h-5 text-primary-600" />
                    <span>COD Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="flex flex-wrap border-b">
              {['description', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-3 font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' ? 'Description' : tab === 'reviews' ? 'Reviews' : 'Shipping Info'}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6">
              {activeTab === 'description' && (
                <div 
                  className="prose max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="space-y-3 text-gray-600">
                  <p>• Free delivery on orders above Rs. 5000</p>
                  <p>• Delivery time: 3-5 business days</p>
                  <p>• Cash on Delivery available nationwide</p>
                  <p>• Easy returns within 7 days</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products - Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Related Products</h2>
              <Link to={`/shop?category=${product.category?.slug}`} className="text-primary-600 hover:underline text-sm">View All →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Suggested Products - You May Also Like */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12 pt-6 border-t">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {suggestedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage