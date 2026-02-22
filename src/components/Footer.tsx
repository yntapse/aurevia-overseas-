import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../images/image.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Aurevia Overseas" className="h-12 w-auto" />
              <div>
                <h3 className="text-xl font-bold">Aurevia Overseas</h3>
                <p className="text-xs text-gray-400">Global Trading Excellence</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Delivering premium Indian agricultural products and authentic handicrafts to the
              world with unmatched quality and service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', page: 'home' },
                { name: 'About Us', page: 'about' },
                { name: 'Products', page: 'products' },
                { name: 'Why Choose Us', page: 'why-us' },
                { name: 'Contact', page: 'contact' },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onNavigate(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Export House, Trade Center<br />
                  Nashik, Maharashtra 422001, India
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>+91 8862051131</div>
                  <div>+91 8862041131</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <div>info@aureviaoverseas.com</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Aurevia Overseas. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
