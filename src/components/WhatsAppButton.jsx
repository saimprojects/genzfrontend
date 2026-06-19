import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+923244689147'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const cleanNumber = WHATSAPP_NUMBER.replace(/\s+/g, '').replace('+', '')

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello! I need help with my order.')
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Popup Card */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Primary Order Support</p>
                <p className="text-white/80 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="bg-[#ECE5DD] p-4">
            <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm leading-relaxed">
                👋 Hi there! How can we help you today? Ask us anything about your order or products.
              </p>
              <p className="text-gray-400 text-xs mt-1 text-right">12:00 PM ✓✓</p>
            </div>
          </div>

          {/* CTA */}
          <div className="p-4 bg-white border-t">
            <button
              onClick={openWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              Start Chat on WhatsApp
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">
              Available Mon–Sat, 9AM–9PM
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5C] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-0' : ''
        }`}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <WhatsAppIcon className="w-7 h-7 text-white" />
        )}
        {/* Ping animation */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>
    </>
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

export default WhatsAppButton