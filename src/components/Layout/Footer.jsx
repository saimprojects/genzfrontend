import { Link } from 'react-router-dom'
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const LOGO_URL = 'https://res.cloudinary.com/dxommxt6d/image/upload/v1781846810/2_nezeyp.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'FAQs', path: '/faqs' },
  ]

  const policyLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Refund & Return Policy', path: '/refund-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
  ]

  const categories = [
    { name: 'Clothing', path: '/shop?category=clothing' },
    { name: 'Footwear', path: '/shop?category=footwear' },
    { name: 'Electronics', path: '/shop?category=electronics' },
    { name: 'Accessories', path: '/shop?category=accessories' },
  ]

  const contactInfo = [
    { icon: MapPinIcon, content: '123 Main Street, Gulberg, Lahore, Pakistan', href: null },
    { icon: PhoneIcon, content: '+92 313 1471263', href: 'tel:+923131471263' },
    { icon: PhoneIcon, content: '+92 324 4689147', href: 'tel:+923244689147' },
    { icon: EnvelopeIcon, content: 'saimpkf@gmail.com', href: 'mailto:saimpkf@gmail.com' },
    { icon: EnvelopeIcon, content: 'owner@meetsaim.online', href: 'mailto:owner@meetsaim.online' },
    { icon: ClockIcon, content: 'Mon - Sat: 9:00 AM - 9:00 PM', href: null },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="Primary Order"
                className="w-12 h-12 object-contain rounded-xl bg-white p-1"
              />
              <span className="text-xl font-bold text-white">
                Primary<span className="text-primary-400">Order</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your trusted ecommerce platform for quality products at best prices. 
              Shop with confidence and enjoy fast delivery across Pakistan.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-primary-500">
              Quick Links
            </h3>
            <ul className="space-y-2 mt-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-base font-semibold mt-6 mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-primary-500">
              Policies
            </h3>
            <ul className="space-y-2 mt-2">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-primary-500">
              Categories
            </h3>
            <ul className="space-y-2 mt-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-primary-500">
              Contact Info
            </h3>
            <ul className="space-y-3 mt-2">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                  <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary-500" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary-400 transition-colors break-all">
                      {item.content}
                    </a>
                  ) : (
                    <span>{item.content}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/923244689147?text=${encodeURIComponent('Hello! I need help with my order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-lg mb-1">Subscribe to Newsletter</h4>
              <p className="text-gray-400 text-sm">Get latest updates & special offers</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-sm">
          <p>&copy; {currentYear} Primary Order. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms</Link>
            <Link to="/refund-policy" className="hover:text-primary-400 transition-colors">Refunds</Link>
            <Link to="/shipping-policy" className="hover:text-primary-400 transition-colors">Shipping</Link>
          </div>
          <p>Made with ❤️ for Pakistan</p>
        </div>
      </div>
    </footer>
  )
}

// Inline WhatsApp SVG Icon
const WhatsAppIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default Footer