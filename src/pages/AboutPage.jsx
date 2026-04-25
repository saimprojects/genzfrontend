import { Link } from 'react-router-dom'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeartIcon,
  UsersIcon,
  StarIcon,
  GlobeAltIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: UsersIcon, color: 'bg-blue-500' },
    { label: 'Products Sold', value: '200,000+', icon: ShoppingBagIcon, color: 'bg-green-500' },
    { label: "Cities Served", value: '30+', icon: GlobeAltIcon, color: 'bg-purple-500' },
    { label: '5-Star Ratings', value: '4.8/5', icon: StarIcon, color: 'bg-yellow-500' },
  ]

  const features = [
    {
      icon: ShoppingBagIcon,
      title: 'Premium Quality',
      description: 'We source only the best products from trusted brands and manufacturers.',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping across all major cities in Pakistan.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Shopping',
      description: 'Your data and payments are protected with industry-standard security.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: HeartIcon,
      title: 'Customer First',
      description: 'Our dedicated support team is always here to help you.',
      color: 'bg-red-100 text-red-600'
    },
  ]

  const teamMembers = [
    {
      name: 'Ahmed Raza',
      role: 'Founder & CEO',
      image: null,
      bio: '10+ years of experience in ecommerce industry'
    },
    {
      name: 'Sara Khan',
      role: 'Operations Manager',
      image: null,
      bio: 'Ensuring smooth deliveries and customer satisfaction'
    },
    {
      name: 'Usman Ali',
      role: 'Head of Products',
      image: null,
      bio: 'Curating the best products for our customers'
    },
    {
      name: 'Fatima Zafar',
      role: 'Customer Support',
      image: null,
      bio: 'Always ready to assist our valued customers'
    },
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Primary Order was established with a vision to revolutionize online shopping in Pakistan' },
    { year: '2021', title: 'First Milestone', description: 'Reached 10,000 happy customers across Lahore and Karachi' },
    { year: '2022', title: 'Expansion', description: 'Expanded operations to 15+ cities nationwide' },
    { year: '2023', title: '50K Customers', description: 'Celebrated 50,000 satisfied customers milestone' },
    { year: '2024', title: 'The Future', description: 'Continuing to grow and serve you better every day' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About Primary Order
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
            We're on a mission to provide the best online shopping experience in Pakistan
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Primary Order, our mission is to make online shopping accessible, convenient, and enjoyable for everyone in Pakistan. We believe that everyone deserves access to quality products at fair prices.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We work tirelessly to curate the best products, ensure fast delivery, and provide exceptional customer service. Your satisfaction is our top priority.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're shopping for clothing, electronics, or accessories, we're here to make your experience seamless and memorable.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl p-8 text-center">
              <RocketLaunchIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Why Choose Us?</h3>
              <p className="text-gray-600">
                We combine quality products, competitive prices, and reliable service to give you the best shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            What Makes Us Different
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure you have the best shopping experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey Timeline */}
      <div className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The story of Primary Order - from humble beginnings to where we are today
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6`}>
                  <div className="md:w-1/2">
                    <div className={`bg-white rounded-xl shadow-sm p-6 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{milestone.year.slice(-2)}</span>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The dedicated people working behind the scenes to serve you better
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800">{member.name}</h3>
              <p className="text-primary-600 text-sm mb-2">{member.role}</p>
              <p className="text-gray-500 text-xs">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Explore our collection of premium products and experience the best online shopping
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage