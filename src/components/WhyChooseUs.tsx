import { Shield, Clock, DollarSign, FileCheck, Truck, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Quality Control',
      description:
        'Rigorous quality checks at every stage ensure only the finest products reach your doorstep. APEDA and FSSAI certified processes.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description:
        'Committed delivery schedules with real-time tracking. We understand the importance of your supply chain and ensure on-time shipments.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description:
        'Direct sourcing from producers eliminates middlemen, offering you the best prices without compromising on quality.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: FileCheck,
      title: 'Export Compliance',
      description:
        'Full compliance with international trade regulations, customs documentation, and country-specific requirements handled expertly.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Truck,
      title: 'Logistics Excellence',
      description:
        'End-to-end logistics management with temperature-controlled containers and secure packaging for product integrity.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description:
        'Dedicated account managers and round-the-clock customer support to address your queries and ensure smooth transactions.',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Why Choose Us
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Trusted Export Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combining traditional values with modern logistics to deliver excellence in every
            shipment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-green-200 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} rounded-t-xl`}
              ></div>
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Export Journey?
              </h3>
              <p className="text-green-100 text-lg mb-6">
                Join hundreds of satisfied clients worldwide who trust us for their import needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg">
                  Get Started Today
                </button>
              </div>
            </div>
            <div className="hidden md:block h-full">
              <img
                src="https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Global trade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
