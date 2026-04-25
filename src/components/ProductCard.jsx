import { Link } from 'react-router-dom'
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'

const ProductCard = ({ product }) => {
  const discount = product.discount_percentage || 0
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.slug}`}>
        <div className="relative overflow-hidden bg-gray-100">
          <img 
            src={product.thumbnail_url || product.primary_image || 'https://via.placeholder.com/300'} 
            alt={product.name}
            className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-2">
            {product.category_name}
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">4.5</span>
            </div>
            <span className="text-xs text-gray-400">(128 reviews)</span>
          </div>
          
          <div className="flex items-center gap-2">
            {product.discounted_price ? (
              <>
                <span className="text-lg md:text-xl font-bold text-primary-600">
                  Rs. {product.final_price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  Rs. {product.base_price}
                </span>
              </>
            ) : (
              <span className="text-lg md:text-xl font-bold text-primary-600">
                Rs. {product.base_price}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard