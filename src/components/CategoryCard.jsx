import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  // Debug: Check if image_url exists
  console.log('Category:', category.name, 'Image URL:', category.image_url)
  
  return (
    <Link to={`/shop?category=${category.slug}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover">
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center overflow-hidden">
          {category.image_url ? (
            <img 
              src={category.image_url} 
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                console.error('Image failed to load:', category.image_url)
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = `<span class="text-4xl">${category.name.charAt(0)}</span>`
              }}
            />
          ) : (
            <span className="text-4xl text-white font-bold">{category.name.charAt(0)}</span>
          )}
          
          {/* Overlay for better text visibility */}
          {category.image_url && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
          )}
        </div>
        <div className="p-3 text-center">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard