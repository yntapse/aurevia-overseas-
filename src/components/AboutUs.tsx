import { Target, Eye, Handshake, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-12 bg-green-700 rounded"></div>
              <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connecting Indian Excellence with Global Markets
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a trusted international trading company specializing in premium agricultural
              exports and authentic Indian handicrafts. With deep roots in India's farming
              communities and artisan networks, we bring the finest quality products to discerning
              buyers worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our commitment to excellence, sustainable sourcing practices, and customer
              satisfaction has made us a preferred partner for businesses across 25+ countries. We
              handle every aspect of the export process with meticulous attention to detail.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Agricultural excellence"
                className="rounded-lg shadow-lg object-cover h-64 w-full"
              />
              <img
                src="https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Quality products"
                className="rounded-lg shadow-lg object-cover h-64 w-full mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-700 to-green-900 text-white p-8 rounded-lg shadow-xl">
              <p className="text-4xl font-bold mb-1">10+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-green-700 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700">
              To bridge the gap between Indian producers and global markets, delivering premium
              quality with integrity and reliability.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-yellow-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Eye className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              To become the most trusted name in agricultural and handicraft exports, setting
              benchmarks in quality and service.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-blue-700 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Handshake className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Sourcing</h3>
            <p className="text-gray-700">
              We work directly with farmers and artisans, ensuring fair trade practices and
              authentic, high-quality products.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="bg-purple-700 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Partnerships</h3>
            <p className="text-gray-700">
              Building lasting relationships with buyers worldwide through transparency,
              consistency, and exceptional service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
