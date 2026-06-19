const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/80 text-sm">Last updated: June 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">1. Introduction</h2>
            <p>Welcome to <strong>Primary Order</strong>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or place an order with us.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">2. Information We Collect</h2>
            <p className="mb-3">When you place an order or contact us, we may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Delivery address (province, city, street, house number, landmark)</li>
              <li>Order details and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information you provide to:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Process and deliver your orders</li>
              <li>Send order confirmations and updates via SMS or WhatsApp</li>
              <li>Respond to your inquiries and customer support requests</li>
              <li>Improve our products and services</li>
              <li>Send promotional offers (only if you subscribe)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">4. Sharing of Information</h2>
            <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your delivery information only with our trusted courier partners to fulfill your order. All partners are bound to keep your data confidential.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet is 100% secure. We strive to use commercially acceptable means to protect your information but cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">6. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. Cookies help us understand how you use our site so we can improve it. You may choose to disable cookies through your browser settings, though some features may not function properly as a result.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm space-y-1">
              <p>📧 <a href="mailto:saimpkf@gmail.com" className="text-primary-600 hover:underline">saimpkf@gmail.com</a></p>
              <p>📧 <a href="mailto:owner@meetsaim.online" className="text-primary-600 hover:underline">owner@meetsaim.online</a></p>
              <p>📞 <a href="tel:+923131471263" className="text-primary-600 hover:underline">+92 313 1471263</a></p>
              <p>📞 <a href="tel:+923244689147" className="text-primary-600 hover:underline">+92 324 4689147</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage