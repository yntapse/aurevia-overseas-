import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { Product } from '../lib/mockData';
import { productsApi } from '../lib/productsApi';

const bundledImages = import.meta.glob('../images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const resolveProductImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';

  const normalizedPath = imageUrl.replace(/\\/g, '/');
  const isLocalSrcImage =
    normalizedPath.startsWith('/src/images/') || normalizedPath.startsWith('src/images/');

  if (!isLocalSrcImage) {
    return imageUrl;
  }

  const fileName = normalizedPath.split('/').pop();
  if (!fileName) {
    return imageUrl;
  }

  const match = Object.entries(bundledImages).find(([path]) => path.endsWith(`/${fileName}`));
  return match?.[1] || imageUrl;
};

interface ProductsShowcaseProps {
  onNavigate: (page: string, productSlug?: string) => void;
  variant?: 'grid' | 'list';
}

export default function ProductsShowcase({ onNavigate, variant = 'grid' }: ProductsShowcaseProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsApi.getAll();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 text-green-700 animate-spin" />
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-1 w-12 bg-green-700 rounded"></div>
              <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
                Products List
              </span>
              <div className="h-1 w-12 bg-green-700 rounded"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">All Products</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Full product details in one page for easy viewing.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {products.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="grid sm:grid-cols-3 gap-0">
                  <div className="sm:col-span-1">
                    <img
                      src={resolveProductImageUrl(product.image_url)}
                      alt={product.name}
                      className="w-full h-44 sm:h-full object-cover"
                    />
                  </div>
                  <div className="sm:col-span-2 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="font-semibold text-gray-900">MOQ</p>
                        <p className="text-gray-600">{product.moq || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Shelf Life</p>
                        <p className="text-gray-600">{product.shelf_life || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Grades</p>
                        <p className="text-gray-600">{product.grades || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Packaging</p>
                        <p className="text-gray-600">{product.packaging_options || 'N/A'}</p>
                      </div>
                    </div>

                    {product.features?.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-gray-900 mb-1.5 text-sm">Features</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          {product.features.slice(0, 4).map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                          {product.features.length > 4 && (
                            <li>+{product.features.length - 4} more</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {product.countries_served?.length > 0 && (
                      <div>
                        <p className="font-semibold text-gray-900 mb-2 text-sm">Countries Served</p>
                        <div className="flex flex-wrap gap-2">
                          {product.countries_served.slice(0, 5).map((country) => (
                            <span
                              key={country}
                              className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                            >
                              {country}
                            </span>
                          ))}
                          {product.countries_served.length > 5 && (
                            <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                              +{product.countries_served.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-yellow-500 text-gray-900 px-7 py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-green-700 rounded"></div>
            <span className="text-green-700 font-semibold tracking-wide uppercase text-sm">
              Our Products
            </span>
            <div className="h-1 w-12 bg-green-700 rounded"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Premium Export Quality Products
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            From farm-fresh produce to exquisite handicrafts, we deliver India's finest to global
            markets
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={resolveProductImageUrl(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>

                {product.countries_served && product.countries_served.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Exported to:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.countries_served.slice(0, 3).map((country) => (
                        <span
                          key={country}
                          className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                        >
                          {country}
                        </span>
                      ))}
                      {product.countries_served.length > 3 && (
                        <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                          +{product.countries_served.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onNavigate('products')}
                  className="group/btn w-full bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:from-green-800 hover:to-green-900 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View Full Product List</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('quote')}
            className="bg-yellow-500 text-gray-900 px-7 py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
