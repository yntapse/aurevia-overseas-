import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ProductsShowcase from './components/ProductsShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import GlobalPresence from './components/GlobalPresence';
import QuoteForm from './components/QuoteForm';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const [page] = hash.split('/');
        if (page === 'product-detail') {
          setCurrentPage('products');
          window.location.hash = 'products';
          return;
        }
        setCurrentPage(page || 'home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setCurrentPage('admin');
        window.location.hash = 'admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page);
    if (page === 'product-detail') {
      window.location.hash = 'products';
      return;
    }
    if (slug) {
      window.location.hash = `${page}/${slug}`;
      return;
    }
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <AboutUs />
            <ProductsShowcase onNavigate={handleNavigate} />
            <WhyChooseUs />
            <GlobalPresence />
            <Certifications />
            <Testimonials />
          </>
        );
      case 'about':
        return (
          <>
            <div className="h-20"></div>
            <AboutUs />
            <WhyChooseUs />
            <Testimonials />
          </>
        );
      case 'products':
        return (
          <>
            <div className="h-20"></div>
            <ProductsShowcase onNavigate={handleNavigate} variant="list" />
            <Certifications />
          </>
        );
      case 'why-us':
        return (
          <>
            <div className="h-20"></div>
            <WhyChooseUs />
            <GlobalPresence />
            <Certifications />
            <Testimonials />
          </>
        );
      case 'contact':
        return <Contact />;
      case 'quote':
        return <QuoteForm onNavigate={handleNavigate} />;
      case 'admin':
        return (
          <>
            <div className="h-20"></div>
            <AdminPanel />
          </>
        );
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <AboutUs />
            <ProductsShowcase onNavigate={handleNavigate} />
            <WhyChooseUs />
            <GlobalPresence />
            <Certifications />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
