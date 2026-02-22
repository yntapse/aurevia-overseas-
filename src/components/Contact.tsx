import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 8862051131', '+91 8862041131'],
      color: 'bg-blue-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@aureviaoverseas.com'],
      color: 'bg-green-500',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Export House, Trade Center', 'Nashik, Maharashtra 422001, India'],
      color: 'bg-purple-500',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM'],
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Contact Us
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Start a Conversation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for inquiries, quotes, or any questions about our products and
            services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group hover:-translate-y-1"
            >
              <div
                className={`${info.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <info.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm mb-1">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form 
              action="https://formsubmit.co/info@aureviaoverseas.com" 
              method="POST"
              className="space-y-6"
            >
              {/* Hidden fields for FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New Contact Message from Aurevia Overseas" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-800 hover:to-green-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-xl p-8 text-white h-full">
              <h3 className="text-3xl font-bold mb-6">Why Contact Us?</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Quick Response',
                    desc: 'We respond to all inquiries within 24 hours',
                  },
                  {
                    title: 'Expert Guidance',
                    desc: 'Get advice from our experienced export team',
                  },
                  {
                    title: 'Custom Solutions',
                    desc: 'Tailored export solutions for your specific needs',
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'Clear, competitive quotes with no hidden costs',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-yellow-500 text-gray-900 w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-green-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t-2 border-white/20">
                <h4 className="font-bold text-xl mb-4">Connect on WhatsApp</h4>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60288.89486840267!2d73.74306794863281!3d19.997453900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb3257b4d5c1%3A0x9b69f43f1a1b5e89!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
