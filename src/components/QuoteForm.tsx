import { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { localDB, type Product } from '../lib/mockData';

interface QuoteFormProps {
  onNavigate: (page: string) => void;
}

export default function QuoteForm({ onNavigate }: QuoteFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await localDB.products.getAll();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your interest. Our team will review your request and get back to you
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Get a Quote
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Request a Custom Quote
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and our team will get back to you with a competitive quote
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form 
            action="https://formsubmit.co/info@aureviaoverseas.com" 
            method="POST"
            className="space-y-6"
          >
            {/* Hidden fields for FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New Quote Request from Aurevia Overseas" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="product_name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Product *
                </label>
                <select
                  id="product_name"
                  name="product_name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                >
                  <option value="">Choose a product</option>
                  {products.map((product) => (
                    <option key={product.name} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity Required *
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  required
                  placeholder="e.g., 1 Container (20 MT)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="destination_country" className="block text-sm font-semibold text-gray-900 mb-2">
                Destination Country *
              </label>
              <input
                type="text"
                id="destination_country"
                name="destination_country"
                required
                placeholder="e.g., United Arab Emirates"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
              />
            </div>

            <div className="border-t-2 border-gray-100 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company_name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    required
                    placeholder="Your company name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact_name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="contact_name"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additional_notes" className="block text-sm font-semibold text-gray-900 mb-2">
                Additional Requirements (Optional)
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                rows={4}
                placeholder="Please share any specific requirements, packaging preferences, or questions..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-800 hover:to-green-900 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <Send className="h-5 w-5" />
              <span>Submit Quote Request</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
