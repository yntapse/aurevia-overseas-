import { Shield, Award, FileCheck, CheckCircle } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      icon: Shield,
      title: 'FSSAI Certified',
      description: 'Food Safety and Standards Authority of India',
      color: 'bg-blue-500',
    },
    {
      icon: Award,
      title: 'APEDA Registered',
      description: 'Agricultural and Processed Food Products Export',
      color: 'bg-green-500',
    },
    {
      icon: FileCheck,
      title: 'ISO 9001:2015',
      description: 'Quality Management System Certified',
      color: 'bg-purple-500',
    },
    {
      icon: CheckCircle,
      title: 'Export Compliant',
      description: 'Full compliance with international trade regulations',
      color: 'bg-yellow-500',
    },
  ];

  const standards = [
    'Phytosanitary Certification',
    'Certificate of Origin',
    'Fumigation Certificate',
    'Quality Test Reports',
    'Organic Certifications',
    'Halal Certification',
    'GMP Compliance',
    'HACCP Standards',
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Certifications & Compliance
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Internationally Recognized Standards
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality is backed by rigorous certifications and compliance with
            global trade standards
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-12 md:mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 md:p-8 text-center group hover:-translate-y-2"
            >
              <div
                className={`${cert.color} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <cert.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
              <p className="text-gray-600 text-sm">{cert.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Complete Documentation Support
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                We handle all export documentation requirements, ensuring smooth customs clearance
                and compliance with destination country regulations.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {standards.map((standard, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-medium">{standard}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-5 sm:p-6 md:p-8 text-white">
                <h4 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">Quality Assurance Process</h4>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Source Verification', desc: 'Certified farms & suppliers' },
                    { step: '2', title: 'Quality Testing', desc: 'Lab-tested for safety' },
                    { step: '3', title: 'Grading & Sorting', desc: 'Expert quality control' },
                    { step: '4', title: 'Packaging', desc: 'Export-grade materials' },
                    { step: '5', title: 'Final Inspection', desc: 'Pre-shipment verification' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="bg-yellow-500 text-gray-900 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0 text-sm md:text-base">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="font-bold mb-1 text-sm md:text-base">{item.title}</h5>
                        <p className="text-green-100 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-5 sm:p-6 md:p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Your Trust is Our Priority
          </h3>
          <p className="text-base md:text-lg text-gray-800 mb-5 md:mb-6 max-w-2xl mx-auto">
            Every shipment undergoes rigorous quality checks and documentation verification before
            dispatch
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-6 items-stretch">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">100%</p>
              <p className="text-gray-800 font-medium text-sm md:text-base">Quality Assured</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Zero</p>
              <p className="text-gray-800 font-medium text-sm md:text-base">Rejections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">24/7</p>
              <p className="text-gray-800 font-medium text-sm md:text-base">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
