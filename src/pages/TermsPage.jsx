const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-white/80 text-sm">Last updated: June 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Primary Order website and placing an order, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">2. Products & Pricing</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>All prices are listed in Pakistani Rupees (PKR).</li>
              <li>We reserve the right to change product prices without prior notice.</li>
              <li>Product images are for illustration purposes; actual product may vary slightly.</li>
              <li>We do our best to keep stock information accurate, but availability is not always guaranteed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">3. Order Placement</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>By placing an order, you confirm that all provided information is accurate and complete.</li>
              <li>Orders are subject to availability and confirmation.</li>
              <li>We reserve the right to cancel any order at our discretion, with a full refund if payment was made.</li>
              <li>Once an order is confirmed, changes may not be possible. Please contact us immediately for any amendments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">4. Payment</h2>
            <p>Currently, we only accept <strong>Cash on Delivery (COD)</strong> as a payment method. Payment is collected at the time of delivery by our courier partner.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">5. Delivery</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Delivery times are estimates and may vary based on location and demand.</li>
              <li>We are not responsible for delays caused by courier companies or natural events beyond our control.</li>
              <li>Delivery charges (if any) are shown clearly at checkout before you place your order.</li>
              <li>If you are not available at the time of delivery, the courier may attempt redelivery or contact you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">6. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>You must provide accurate contact and delivery information.</li>
              <li>You must not use our platform for any fraudulent or unlawful purpose.</li>
              <li>Repeated fake orders or order rejections may result in being blocked from our service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">7. Intellectual Property</h2>
            <p>All content on this website, including logos, images, text, and design, is the property of Primary Order and may not be copied, reproduced, or used without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">8. Limitation of Liability</h2>
            <p>Primary Order shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our liability is limited to the value of the product purchased.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">9. Changes to Terms</h2>
            <p>We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-primary-600 pl-4">10. Contact Us</h2>
            <p>For any questions regarding these terms, please reach out:</p>
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

export default TermsPage