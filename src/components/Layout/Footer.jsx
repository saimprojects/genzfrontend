import { Link } from 'react-router-dom'
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ]

  const categories = [
    { name: 'Clothing', path: '/shop?category=clothing' },
    { name: 'Footwear', path: '/shop?category=footwear' },
    { name: 'Electronics', path: '/shop?category=electronics' },
    { name: 'Accessories', path: '/shop?category=accessories' },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Primary<span className="text-primary-500">Order</span>
            </h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your trusted ecommerce platform for quality products at best prices. 
              Shop with confidence and enjoy fast delivery across Pakistan.
            </p>
            {/* Social media section removed */}
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-500">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path} 
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-500">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary-500" />
                <span>123 Main Street, Gulberg, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <PhoneIcon className="w-5 h-5 text-primary-500" />
                <a href="tel:+923001234567" className="hover:text-primary-400">+92 300 1234567</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <EnvelopeIcon className="w-5 h-5 text-primary-500" />
                <a href="mailto:info@primaryorder.com" className="hover:text-primary-400">info@primaryorder.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <ClockIcon className="w-5 h-5 text-primary-500" />
                <span>Mon - Sat: 9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-lg mb-1">Subscribe to Newsletter</h4>
              <p className="text-gray-400 text-sm">Get latest updates & special offers</p>
            </div>
            <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Primary Order. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for Pakistan</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer