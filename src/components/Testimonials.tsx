import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { localDB, type Testimonial } from '../lib/mockData';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await localDB.testimonials.getAll();
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Testimonials
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied clients across the globe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-2 ${
                testimonial.is_featured ? 'border-yellow-400' : 'border-gray-100'
              } relative group hover:-translate-y-1`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {testimonial.is_featured && (
                <div className="absolute -top-3 right-6 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  Featured
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <Quote className="h-10 w-10 text-green-700 opacity-50" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.testimonial_text}"
              </p>

              <div className="border-t-2 border-gray-100 pt-4">
                <p className="font-bold text-gray-900 text-lg">{testimonial.client_name}</p>
                <p className="text-green-700 font-medium">{testimonial.client_company}</p>
                <p className="text-gray-500 text-sm mt-1">{testimonial.client_country}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Growing Family of Satisfied Clients
              </h3>
              <p className="text-green-100 text-lg mb-8">
                Experience the difference of working with a trusted export partner committed to
                your success.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold text-yellow-400 mb-1">98%</p>
                  <p className="text-green-100">Client Retention</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-yellow-400 mb-1">4.9/5</p>
                  <p className="text-green-100">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy clients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
