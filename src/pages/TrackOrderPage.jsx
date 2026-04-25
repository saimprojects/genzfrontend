import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  UserIcon  // ✅ ADDED: UserIcon import
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api from '../services/api'

const TrackOrderPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [orderId, setOrderId] = useState(searchParams.get('order') || '')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchType, setSearchType] = useState('order')
  const [tracking, setTracking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    const orderParam = searchParams.get('order')
    if (orderParam) {
      setOrderId(orderParam)
      handleTrackOrder(orderParam)
    }
  }, [])

  const handleTrackOrder = async (id = orderId) => {
    if (!id.trim()) {
      toast.error('Please enter an Order ID')
      return
    }

    setLoading(true)
    setTracking(null)
    setOrdersList([])

    try {
      const response = await api.get(`/tracking/${id}/`)
      if (response.data.success) {
        setTracking(response.data.tracking)
      } else {
        toast.error(response.data.error || 'Order not found')
      }
    } catch (error) {
      console.error('Tracking error:', error)
      toast.error('Order not found. Please check your Order ID.')
    } finally {
      setLoading(false)
    }
  }

  const handleTrackByPhone = async () => {
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number')
      return
    }

    setLoading(true)
    setTracking(null)
    setOrdersList([])

    try {
      const response = await api.get(`/tracking/lookup/phone/?phone=${phoneNumber}`)
      if (response.data.success && response.data.orders?.length > 0) {
        setOrdersList(response.data.orders)
      } else {
        toast.error('No orders found for this phone number')
      }
    } catch (error) {
      console.error('Phone search error:', error)
      toast.error('No orders found for this phone number')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchType === 'order') {
      handleTrackOrder()
    } else {
      handleTrackByPhone()
    }
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-purple-100 text-purple-800 border-purple-200',
    shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    out_for_delivery: 'bg-orange-100 text-orange-800 border-orange-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  }

  const statusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your Order ID or Phone Number to track your order status</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="flex border-b">
              <button onClick={() => setSearchType('order')} className={`flex-1 py-3 text-center font-medium transition ${searchType === 'order' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}>Track by Order ID</button>
              <button onClick={() => setSearchType('phone')} className={`flex-1 py-3 text-center font-medium transition ${searchType === 'phone' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-700'}`}>Track by Phone Number</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-6">
              {searchType === 'order' ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter Order ID (e.g., GHOST-XXXXXXXX)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono" />
                    <p className="text-xs text-gray-500 mt-1">Example: GHOST-48271639</p>
                  </div>
                  <button type="submit" disabled={loading} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2">
                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><MagnifyingGlassIcon className="w-5 h-5" /> Track Order</>}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number (e.g., 03001234567)" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter the phone number used when placing the order</p>
                  </div>
                  <button type="submit" disabled={loading} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2">
                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><MagnifyingGlassIcon className="w-5 h-5" /> Search Orders</>}
                  </button>
                </div>
              )}
            </form>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for your order...</p>
            </div>
          )}

          {tracking && !loading && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-5 md:px-6 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <p className="text-white/80 text-sm">Order ID</p>
                      <p className="text-white font-bold text-xl font-mono">{tracking.order_id}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[tracking.order_status] || 'bg-gray-100 text-gray-800'}`}>{statusLabels[tracking.order_status] || tracking.order_status}</div>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-4 border-b">
                    <div className="flex items-center gap-2 text-gray-600"><UserIcon className="w-4 h-4" /><span>{tracking.customer_name}</span></div>
                    <div className="flex items-center gap-2 text-gray-600"><PhoneIcon className="w-4 h-4" /><span>{tracking.customer_phone}</span></div>
                  </div>

                  {(tracking.courier_name || tracking.tracking_number) && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><TruckIcon className="w-4 h-4" /> Courier Information</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {tracking.courier_name && <div><p className="text-gray-500">Courier</p><p className="font-medium">{tracking.courier_name}</p></div>}
                        {tracking.tracking_number && <div><p className="text-gray-500">Tracking #</p><p className="font-medium">{tracking.tracking_number}</p></div>}
                        {tracking.estimated_delivery && <div><p className="text-gray-500">Est. Delivery</p><p className="font-medium">{tracking.estimated_delivery}</p></div>}
                      </div>
                    </div>
                  )}

                  {tracking.current_location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                      <MapPinIcon className="w-4 h-4 text-blue-600" />
                      <span>Current Location: {tracking.current_location}</span>
                    </div>
                  )}

                  <h4 className="font-semibold mb-4">Tracking History</h4>
                  <div className="space-y-4">
                    {tracking.status_updates && tracking.status_updates.length > 0 ? (
                      [...tracking.status_updates].reverse().map((update, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full mt-1 ${idx === tracking.status_updates.length - 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            {idx !== tracking.status_updates.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1"></div>}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <p className={`font-semibold ${idx === tracking.status_updates.length - 1 ? 'text-green-600' : 'text-gray-700'}`}>{statusLabels[update.status] || update.status}</p>
                              <p className="text-xs text-gray-400">{new Date(update.timestamp).toLocaleString()}</p>
                            </div>
                            {update.location && <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> {update.location}</p>}
                            {update.note && <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">📝 {update.note}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No tracking updates yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link to={`/order-confirmation/${tracking.order_id}`} className="text-primary-600 hover:text-primary-700 font-medium">View Order Details →</Link>
              </div>
            </div>
          )}

          {ordersList.length > 0 && !loading && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Found {ordersList.length} order(s)</h3>
              {ordersList.map((order) => (
                <div key={order.order_id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div><p className="text-sm text-gray-500">Order ID</p><p className="font-mono font-semibold text-primary-600">{order.order_id}</p></div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.order_status] || 'bg-gray-100 text-gray-800'}`}>{statusLabels[order.order_status] || order.order_status}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {new Date(order.created_at).toLocaleDateString()}</span>
                      <span>Total: Rs. {order.order_total?.toLocaleString()}</span>
                    </div>
                    <button onClick={() => { setOrderId(order.order_id); handleTrackOrder(order.order_id); setOrdersList([]); setSearchType('order'); }} className="text-primary-600 hover:text-primary-700 text-sm font-medium">Track This Order →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackOrderPage