const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Refund & Return Policy</h1>
          <p className="text-white/80 text-sm">Last updated: June 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">✅</p>
              <p className="font-semibold text-green-800 text-sm">Easy Returns</p>
              <p className="text-green-600 text-xs mt-1">Within 7 days of delivery</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">🔄</p>
              <p className="font-semibold text-blue-800 text-sm">Exchange Available</p>
              <p className="text-blue-600 text-xs mt-1">Wrong size or color</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <p className="text-2xl mb-1">💬</p>
              <p className="font-semibold text-purple-800 text-sm">Contact Us First</p>
              <p className="text-purple-600 text-xs mt-1">Via WhatsApp or email</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">1. Return Eligibility</h2>
            <p className="mb-3">We accept returns under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>The item was received <strong>damaged, defective, or incorrect</strong>.</li>
              <li>The return request is made <strong>within 7 days</strong> of receiving the order.</li>
              <li>The product is <strong>unused, unwashed</strong>, and in its <strong>original packaging</strong>.</li>
              <li>You have the <strong>original order ID</strong> and proof of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">2. Non-Returnable Items</h2>
            <p className="mb-3">The following items <strong>cannot</strong> be returned or exchanged:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Items that have been used, washed, or damaged after delivery</li>
              <li>Products returned after 7 days of delivery</li>
              <li>Sale or discounted items (unless defective)</li>
              <li>Undergarments, innerwear, or hygiene-sensitive products</li>
              <li>Items without original packaging or tags removed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">3. How to Request a Return</h2>
            <ol className="list-decimal pl-6 space-y-3 text-sm">
              <li>
                <strong>Contact us</strong> via WhatsApp at <a href="tel:+923244689147" className="text-primary-600 hover:underline">+92 324 4689147</a> or email <a href="mailto:saimpkf@gmail.com" className="text-primary-600 hover:underline">saimpkf@gmail.com</a> within 7 days of delivery.
              </li>
              <li>
                <strong>Share your Order ID</strong> and clearly describe the issue with photos of the item.
              </li>
              <li>
                Our team will <strong>review your request</strong> within 1–2 business days.
              </li>
              <li>
                If approved, we will arrange a <strong>pickup or guide you</strong> on how to send the item back.
              </li>
              <li>
                Once received and inspected, we will process your <strong>exchange or refund</strong>.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">4. Refund Process</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Since we operate on <strong>Cash on Delivery (COD)</strong>, refunds are processed via <strong>bank transfer or EasyPaisa/JazzCash</strong>.</li>
              <li>Refunds are processed within <strong>3–5 business days</strong> after the returned item is received and verified.</li>
              <li>Delivery charges are <strong>non-refundable</strong> unless the return is due to our error (wrong or defective item).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">5. Exchange Policy</h2>
            <p>If you received the wrong size or color, we'll happily exchange it at no extra delivery charge, subject to availability. Contact us within 7 days with your Order ID and photos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">6. Damaged or Defective Items</h2>
            <p>If your item arrives damaged or defective, please take photos immediately and contact us within <strong>48 hours</strong> of delivery. We will arrange a free replacement or full refund.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">7. Contact Us</h2>
            <p>For return/refund queries, please contact us:</p>
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

export default RefundPolicyPage