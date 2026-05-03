import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingOfficeIcon,
  HomeIcon,
  IdentificationIcon,
  BoltIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api from '../services/api'
import ReactPixel from 'react-facebook-pixel'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderItem, setOrderItem] = useState(null)
  const [productDeliveryCharges, setProductDeliveryCharges] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    province: 'punjab',
    city: '',
    main_address: '',
    street_number: '',
    house_number: '',
    landmark: '',
    notes: ''
  })

  const provinces = [
    { value: 'punjab', label: 'Punjab' },
    { value: 'sindh', label: 'Sindh' },
    { value: 'kpk', label: 'Khyber Pakhtunkhwa' },
    { value: 'balochistan', label: 'Balochistan' },
    { value: 'gilgit', label: 'Gilgit-Baltistan' },
    { value: 'kashmir', label: 'Azad Kashmir' },
    { value: 'islamabad', label: 'Islamabad' },
  ]

  // Form steps configuration
  const formSteps = [
    {
      title: 'Full Name',
      description: 'What should we call you?',
      icon: UserIcon,
      field: 'customer_name',
      type: 'text',
      placeholder: 'e.g., Muhammad Ali',
      required: true,
      validate: (value) => value.trim().length >= 2
    },
    {
      title: 'Email Address',
      description: 'We\'ll send order confirmation here',
      icon: EnvelopeIcon,
      field: 'customer_email',
      type: 'email',
      placeholder: 'your@email.com',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      title: 'Phone Number',
      description: 'For delivery updates & tracking',
      icon: PhoneIcon,
      field: 'customer_phone',
      type: 'tel',
      placeholder: '03XXXXXXXXX',
      required: true,
      validate: (value) => value.trim().length >= 10
    },
    {
      title: 'Province',
      description: 'Select your province',
      icon: MapPinIcon,
      field: 'province',
      type: 'select',
      options: provinces,
      required: true,
      validate: (value) => value !== ''
    },
    {
      title: 'City',
      description: 'Enter your city name',
      icon: MapPinIcon,
      field: 'city',
      type: 'text',
      placeholder: 'e.g., Lahore, Karachi',
      required: true,
      validate: (value) => value.trim().length >= 2
    },
    {
      title: 'Main Address Area',
      description: 'Sector, Colony, or Area Name',
      icon: BuildingOfficeIcon,
      field: 'main_address',
      type: 'text',
      placeholder: 'e.g., Gulberg III, DHA Phase 5',
      required: true,
      validate: (value) => value.trim().length >= 5
    },
    {
      title: 'Street Number',
      description: 'Street number or name',
      icon: MapPinIcon,
      field: 'street_number',
      type: 'text',
      placeholder: 'Street #12, Main Boulevard',
      required: false,
      validate: () => true
    },
    {
      title: 'House / Flat Number',
      description: 'Your house, building or flat number',
      icon: HomeIcon,
      field: 'house_number',
      type: 'text',
      placeholder: 'House #42, Flat #3B',
      required: true,
      validate: (value) => value.trim().length >= 1
    },
    {
      title: 'Landmark',
      description: 'Nearby famous place (Optional)',
      icon: IdentificationIcon,
      field: 'landmark',
      type: 'text',
      placeholder: 'Near City Hospital, Opposite Park',
      required: false,
      validate: () => true
    },
    {
      title: 'Order Notes',
      description: 'Any special instructions? (Optional)',
      icon: IdentificationIcon,
      field: 'notes',
      type: 'textarea',
      placeholder: 'e.g., Call before delivery, Leave at gate, Ring doorbell',
      required: false,
      validate: () => true
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    const savedOrder = localStorage.getItem('quickOrder')
    if (!savedOrder) {
      toast.error('No item to checkout')
      navigate('/shop')
      return
    }
    const order = JSON.parse(savedOrder)
    
    // Ensure price is number
    const processedOrder = {
      ...order,
      price: typeof order.price === 'string' ? parseFloat(order.price) : order.price,
      quantity: typeof order.quantity === 'string' ? parseInt(order.quantity) : order.quantity
    }
    
    setOrderItem(processedOrder)
    
    if (order.product_slug) {
      fetchProductDeliveryChargesBySlug(order.product_slug)
    } else if (order.product_id) {
      fetchProductDeliveryChargesById(order.product_id)
    }
  }, [navigate])

  const fetchProductDeliveryChargesBySlug = async (slug) => {
    try {
      const response = await api.get(`/products/${slug}/`)
      if (response.data) {
        const charges = response.data.delivery_charges || 0
        setProductDeliveryCharges(parseFloat(charges))
      }
    } catch (error) {
      console.error('Error fetching delivery charges by slug:', error)
      setProductDeliveryCharges(0)
    }
  }

  const fetchProductDeliveryChargesById = async (productId) => {
    try {
      const response = await api.get('/products/')
      const product = response.data.find(p => p.id === productId)
      if (product) {
        const charges = product.delivery_charges || 0
        setProductDeliveryCharges(parseFloat(charges))
      }
    } catch (error) {
      console.error('Error fetching delivery charges by id:', error)
      setProductDeliveryCharges(0)
    }
  }

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateCurrentStep = () => {
    const step = formSteps[currentStep]
    if (step.required) {
      const value = formData[step.field]
      const isValid = step.validate(value)
      if (!isValid) {
        toast.error(`Please enter valid ${step.title.toLowerCase()}`)
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handlePlaceOrder()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    if (!orderItem) {
      toast.error('No item to order')
      return
    }

    setLoading(true)

    // Ensure numeric values
    const productPrice = parseFloat(orderItem.price)
    const productQuantity = parseInt(orderItem.quantity)
    const deliveryCharges = parseFloat(productDeliveryCharges)
    const totalAmount = productPrice * productQuantity + deliveryCharges

    // Meta Pixel - InitiateCheckout Event
    ReactPixel.track('InitiateCheckout', {
      content_ids: [orderItem.product_id],
      content_name: orderItem.product_name,
      content_type: 'product',
      value: totalAmount,
      currency: 'USD',
      num_items: productQuantity
    })

    const orderData = {
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      province: formData.province,
      city: formData.city,
      main_address: formData.main_address,
      street_number: formData.street_number,
      house_number: formData.house_number,
      landmark: formData.landmark,
      notes: formData.notes,
      items: [{
        product_id: orderItem.product_id,
        product_name: orderItem.product_name,
        variant_id: orderItem.variant_id,
        variant_details: orderItem.variant_details,
        quantity: productQuantity,
        unit_price: productPrice
      }],
      delivery_charges: deliveryCharges,
      payment_method: 'cod'
    }

    try {
      const response = await api.post('/orders/create/', orderData)
      
      if (response.data.success) {
        // Meta Pixel - Purchase Event
        ReactPixel.track('Purchase', {
          content_ids: [orderItem.product_id],
          content_name: orderItem.product_name,
          content_type: 'product',
          value: totalAmount,
          currency: 'PKR',
          num_items: productQuantity,
          transaction_id: response.data.order_id || response.data.order?.order_id
        })
        
        localStorage.removeItem('quickOrder')
        toast.success('Order placed successfully!')
        navigate(`/order-confirmation/${response.data.order_id}`)
      } else {
        toast.error(response.data.message || 'Failed to place order')
      }
    } catch (error) {
      console.error('Order error:', error)
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!orderItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Calculate totals with proper numbers
  const productPrice = parseFloat(orderItem.price) || 0
  const productQuantity = parseInt(orderItem.quantity) || 1
  const deliveryCharge = parseFloat(productDeliveryCharges) || 0
  
  const subtotal = productPrice * productQuantity
  const hasFreeShipping = deliveryCharge === 0
  const totalAmount = subtotal + deliveryCharge

  const currentStepData = formSteps[currentStep]
  const CurrentIcon = currentStepData.icon
  const isLastStep = currentStep === formSteps.length - 1
  const isFirstStep = currentStep === 0
  const currentValue = formData[currentStepData.field]

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Checkout</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {formSteps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Progress Steps (Mobile Friendly) */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {formSteps.map((step, idx) => {
            const Icon = step.icon
            const isCompleted = idx < currentStep
            const isCurrent = idx === currentStep
            return (
              <button
                key={idx}
                onClick={() => {
                  if (idx < currentStep) setCurrentStep(idx)
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs md:text-sm transition-all ${
                  isCompleted 
                    ? 'bg-green-100 text-green-700' 
                    : isCurrent 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircleIcon className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                )}
                <span className="hidden sm:inline">{step.title.split(' ')[0]}</span>
                <span className="sm:hidden">{idx + 1}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Form Section - One Field at a Time */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {/* Current Step Icon & Title */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CurrentIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {currentStepData.description}
                </p>
                {!currentStepData.required && (
                  <span className="inline-block mt-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                )}
              </div>

              {/* Current Field Input */}
              <div className="mb-6">
                {currentStepData.type === 'select' ? (
                  <select
                    value={currentValue}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  >
                    {currentStepData.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : currentStepData.type === 'textarea' ? (
                  <textarea
                    value={currentValue || ''}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    placeholder={currentStepData.placeholder}
                    rows="4"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    autoFocus
                  />
                ) : (
                  <input
                    type={currentStepData.type}
                    value={currentValue || ''}
                    onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
                    placeholder={currentStepData.placeholder}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {!isFirstStep && (
                  <button
                    onClick={handlePrevious}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed ${
                    isFirstStep ? 'w-full' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : isLastStep ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Place Order
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRightIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Press Enter to go next
              </p>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 sticky top-20">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex gap-3 pb-4 border-b">
                <img 
                  src={orderItem.image || 'https://via.placeholder.com/80'} 
                  alt={orderItem.product_name} 
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {orderItem.product_name}
                  </h3>
                  {orderItem.variant_details && (
                    <p className="text-xs text-gray-500 mt-1">{orderItem.variant_details}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {productQuantity} × Rs. {productPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  {hasFreeShipping ? (
                    <span className="text-green-600 font-medium">Free Shipping</span>
                  ) : (
                    <span>Rs. {deliveryCharge.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-lg md:text-xl font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span className="text-primary-600">Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  *Cash on Delivery only
                </p>
              </div>

              <div className="mt-6 pt-4 border-t space-y-2">
                {hasFreeShipping ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <BoltIcon className="w-4 h-4" />
                    <span>✨ Free Shipping on this product!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    <TruckIcon className="w-4 h-4" />
                    <span>Delivery charges: Rs. {deliveryCharge.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                  <span>Secure & encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage