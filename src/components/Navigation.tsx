import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../images/image.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Products', page: 'products' },
    { name: 'Why Us', page: 'why-us' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img src={logo} alt="Aurevia Overseas" className="h-12 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Aurevia Overseas</h1>
              <p className="text-xs text-green-700">Global Trading Excellence</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-green-700'
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('quote')}
              className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-2.5 rounded-lg font-medium hover:from-green-800 hover:to-green-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Request Quote
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('quote')}
              className="block w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2.5 rounded-lg font-medium hover:from-green-800 hover:to-green-900 transition-all"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
