import { ArrowRight, Globe, Award } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5, 46, 22, 0.85), rgba(21, 94, 51, 0.75)), url(https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-6 animate-fade-in">
            <div className="h-1 w-12 bg-yellow-500 rounded"></div>
            <span className="text-yellow-400 font-semibold tracking-wide uppercase text-sm">
              Trusted Global Partner
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Delivering India's Finest Produce to the World
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Premium agricultural exports and authentic handicrafts with uncompromising quality
            assurance and global logistics excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => onNavigate('quote')}
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Products</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Globe className="h-10 w-10 text-yellow-400 mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">25+</h3>
              <p className="text-gray-200">Countries Served</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Award className="h-10 w-10 text-yellow-400 mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">100%</h3>
              <p className="text-gray-200">Quality Assured</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-2xl font-bold text-white mb-1">500+</h3>
              <p className="text-gray-200">Containers Shipped</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
    </div>
  );
}
