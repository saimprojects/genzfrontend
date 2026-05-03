import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  CheckCircleIcon, 
  TruckIcon,
  ArrowPathIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import api from '../services/api'
import toast from 'react-hot-toast'
import ReactPixel from 'react-facebook-pixel'

const OrderConfirmationPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/orders/${orderId}/`)
      setOrder(response.data)
      
      // Meta Pixel - Purchase Event (Backup/Deduplication)
      if (response.data) {
        ReactPixel.track('Purchase', {
          content_ids: response.data.order_items?.map(item => item.product_id) || [],
          content_type: 'product',
          value: response.data.total_amount,
          currency: 'PKR',
          num_items: response.data.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
          transaction_id: response.data.order_id || orderId
        })
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      toast.error('Order not found')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`Track your order: ${window.location.origin}/track-order?order=${orderId}`)
    toast.success('Tracking link copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">We couldn't find your order</p>
          <Link to="/shop" className="bg-primary-600 text-white px-6 py-2 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: CheckCircleIcon },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircleIcon },
    { key: 'processing', label: 'Processing', icon: ArrowPathIcon },
    { key: 'shipped', label: 'Shipped', icon: TruckIcon },
    { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon },
  ]

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status)

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full mb-4">
            <CheckCircleIcon className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for shopping with Primary Order
          </p>
        </div>

        {/* Order ID Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 mb-6 text-center">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-600 font-mono mb-2">
            {order.order_id}
          </h2>
          <p className="text-sm text-gray-500">
            Order placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
          </p>
          
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <PrinterIcon className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 mb-6">
          <h3 className="font-semibold text-lg mb-6">Order Status</h3>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>
            <div className="relative flex flex-col md:flex-row justify-between gap-4">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                const Icon = step.icon
                
                return (
                  <div key={step.key} className="flex md:flex-col items-center gap-3 md:gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${isCompleted 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 
                        ${isCompleted 
                          ? 'text-green-600' 
                          : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className={`font-medium text-sm md:text-center 
                        ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                      `}>
                        {step.label}
                      </p>
                      {isCurrent && order.status !== 'delivered' && (
                        <p className="text-xs text-gray-500 mt-1 hidden md:block">In Progress</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Items Ordered */}
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
            <h3 className="font-semibold text-lg mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.order_items?.map((item, idx) => (
                <div key={idx} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.product_name}</h4>
                    {item.variant_details && (
                      <p className="text-xs text-gray-500">{item.variant_details}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity} × Rs. {item.unit_price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">
                      Rs. {item.total_price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
            <h3 className="font-semibold text-lg mb-4">Delivery Address</h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-gray-800">{order.customer_name}</p>
              <p>{order.customer_phone}</p>
              <p>{order.customer_email}</p>
              <div className="pt-2 border-t mt-2">
                <p className="text-sm">
                  {order.house_number && `House #${order.house_number}, `}
                  {order.street_number && `Street #${order.street_number}, `}
                  <br />
                  {order.main_address}
                  <br />
                  {order.landmark && `Near: ${order.landmark}`}
                  <br />
                  {order.city}, {order.province}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
            <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {order.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charges</span>
                <span>Rs. {order.delivery_charges?.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-600">Rs. {order.total_amount?.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 text-center font-medium">
                  Payment Method: Cash on Delivery (COD)
                </p>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6">
              <h3 className="font-semibold text-lg mb-2">Order Notes</h3>
              <p className="text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/track-order"
            className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            <TruckIcon className="w-5 h-5" />
            Track Your Order
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage