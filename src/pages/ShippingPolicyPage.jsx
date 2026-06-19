const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shipping Policy</h1>
          <p className="text-white/80 text-sm">Last updated: June 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">🚀</p>
              <p className="font-semibold text-green-800 text-sm">Fast Dispatch</p>
              <p className="text-green-600 text-xs mt-1">Orders dispatched in 24–48 hrs</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">📦</p>
              <p className="font-semibold text-blue-800 text-sm">Nationwide Delivery</p>
              <p className="text-blue-600 text-xs mt-1">Delivery across all of Pakistan</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">💵</p>
              <p className="font-semibold text-yellow-800 text-sm">COD Available</p>
              <p className="text-yellow-600 text-xs mt-1">Pay when you receive</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">1. Order Processing Time</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Orders are processed within <strong>24–48 hours</strong> of placement (excluding weekends and public holidays).</li>
              <li>You will receive an order confirmation via SMS or WhatsApp after placing your order.</li>
              <li>Once dispatched, you will receive a tracking ID to monitor your shipment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">2. Delivery Timeframes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="text-left px-4 py-3 font-semibold text-primary-800 border border-primary-100 rounded-tl-lg">Location</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary-800 border border-primary-100">Estimated Delivery</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary-800 border border-primary-100 rounded-tr-lg">Delivery Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-100">Major Cities (Lahore, Karachi, Islamabad)</td>
                    <td className="px-4 py-3 border border-gray-100">2–4 Business Days</td>
                    <td className="px-4 py-3 border border-gray-100">As per product</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 border border-gray-100">Other Cities (Punjab, Sindh, KPK)</td>
                    <td className="px-4 py-3 border border-gray-100">3–5 Business Days</td>
                    <td className="px-4 py-3 border border-gray-100">As per product</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-100">Remote Areas (Balochistan, GB, AJK)</td>
                    <td className="px-4 py-3 border border-gray-100">5–8 Business Days</td>
                    <td className="px-4 py-3 border border-gray-100">As per product</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">* Delivery times are estimates and may vary during peak seasons or due to courier delays.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">3. Delivery Charges</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Delivery charges vary by product and are shown clearly on the checkout page <strong>before</strong> you confirm your order.</li>
              <li>Some products offer <strong>Free Shipping</strong> — this will be clearly marked on the product page.</li>
              <li>Delivery charges are <strong>non-refundable</strong> once the order has been dispatched.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">4. Courier Partners</h2>
            <p>We work with trusted courier companies across Pakistan, including TCS, Leopards, and other reliable services, to ensure safe and timely delivery of your orders.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">5. Order Tracking</h2>
            <p>Once your order is dispatched, you can track it using:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-2">
              <li>Our <strong>Track Order</strong> page using your Order ID</li>
              <li>The courier tracking number sent via SMS/WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">6. Failed Delivery Attempts</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>If the courier is unable to deliver due to an incorrect address or unavailability, they will attempt redelivery or contact you.</li>
              <li>After multiple failed attempts, the order may be returned to us. In such cases, re-shipping charges will apply.</li>
              <li>Please ensure your contact number and address are correct when placing an order.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">7. Delayed or Lost Shipments</h2>
            <p>If your order is significantly delayed beyond the estimated delivery window, please contact us. We will investigate with our courier partner and provide an update within 2 business days. In rare cases of lost shipments, we will send a replacement or issue a refund.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">8. Contact Us</h2>
            <p>For shipping-related queries, please reach out to us:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm space-y-1">
              <p>📧 <a href="mailto:saimpkf@gmail.com" className="text-primary-600 hover:underline">saimpkf@gmail.com</a></p>
              <p>📧 <a href="mailto:owner@meetsaim.online" className="text-primary-600 hover:underline">owner@meetsaim.online</a></p>
              <p>📞 <a href="tel:+923131471263" className="text-primary-600 hover:underline">+92 313 1471263</a></p>
              <p>📞 <a href="tel:+923244689147" className="text-primary-600 hover:underline">+92 324 4689147</a></p>
              <p>💬 WhatsApp: <a href="https://wa.me/923244689147" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">+92 324 4689147</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default ShippingPolicyPage