import { Link } from 'react-router-dom'
import { FaceFrownIcon, ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-md mx-auto">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-black text-gray-200">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaceFrownIcon className="w-20 h-20 md:w-24 md:h-24 text-primary-500 animate-bounce" />
            </div>
          </div>
          
          {/* Error Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-3">Try these pages instead:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/" className="text-primary-600 hover:underline text-sm">Home</Link>
              <span className="text-gray-300">|</span>
              <Link to="/shop" className="text-primary-600 hover:underline text-sm">Shop</Link>
              <span className="text-gray-300">|</span>
              <Link to="/track-order" className="text-primary-600 hover:underline text-sm">Track Order</Link>
              <span className="text-gray-300">|</span>
              <Link to="/contact" className="text-primary-600 hover:underline text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage