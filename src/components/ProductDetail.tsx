import { useEffect, useState } from 'react';
import { ArrowLeft, Package, Globe, Clock, Award, Truck, CheckCircle } from 'lucide-react';
import type { Product } from '../lib/mockData';
import { productsApi } from '../lib/productsApi';

interface ProductDetailProps {
  productSlug: string;
  onNavigate: (page: string) => void;
}

export default function ProductDetail({ productSlug, onNavigate }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      const data = await productsApi.getBySlug(productSlug);
      setProduct(data || null);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-700 mb-8 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div>
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-4 mb-8">
              {product.moq && (
                <div className="flex items-start space-x-3">
                  <Package className="h-6 w-6 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Minimum Order Quantity</p>
                    <p className="text-gray-600">{product.moq}</p>
                  </div>
                </div>
              )}

              {product.shelf_life && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Shelf Life</p>
                    <p className="text-gray-600">{product.shelf_life}</p>
                  </div>
                </div>
              )}

              {product.grades && (
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Available Grades</p>
                    <p className="text-gray-600">{product.grades}</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('quote')}
              className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-800 hover:to-green-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request Quote for {product.name}
            </button>
          </div>
        </div>

        {product.features && product.features.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.packaging_options && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Truck className="h-8 w-8 text-green-700" />
              <h2 className="text-3xl font-bold text-gray-900">Packaging & Delivery</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{product.packaging_options}</p>
          </div>
        )}

        {product.countries_served && product.countries_served.length > 0 && (
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Global Reach</h2>
            </div>
            <p className="text-green-100 mb-6 text-lg">
              This product is currently exported to the following countries:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {product.countries_served.map((country) => (
                <div
                  key={country}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-center hover:bg-white/20 transition-colors"
                >
                  {country}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
