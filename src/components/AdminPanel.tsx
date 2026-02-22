import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Loader2, LogOut, Lock, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import type { Product } from '../lib/mockData';
import { productsApi } from '../lib/productsApi';

type ProductForm = {
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  features: string;
  packaging_options: string;
  moq: string;
  countries_served: string;
  shelf_life: string;
  grades: string;
  display_order: string;
};

const defaultForm: ProductForm = {
  name: '',
  slug: '',
  category: '',
  description: '',
  image_url: '',
  features: '',
  packaging_options: '',
  moq: '',
  countries_served: '',
  shelf_life: '',
  grades: '',
  display_order: '1',
};

const toForm = (product: Product): ProductForm => ({
  name: product.name || '',
  slug: product.slug || '',
  category: product.category || '',
  description: product.description || '',
  image_url: product.image_url || '',
  features: (product.features || []).join(', '),
  packaging_options: product.packaging_options || '',
  moq: product.moq || '',
  countries_served: (product.countries_served || []).join(', '),
  shelf_life: product.shelf_life || '',
  grades: product.grades || '',
  display_order: String(product.display_order || 1),
});

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [editingId, setEditingId] = useState<string>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(productsApi.isAdminLoggedIn());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const heading = useMemo(() => (editingId ? 'Update Product' : 'Add Product'), [editingId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productsApi.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Make sure backend server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!productsApi.isAdminLoggedIn()) {
        setLoading(false);
        return;
      }

      try {
        await productsApi.adminVerify();
        setIsAuthenticated(true);
      } catch {
        await productsApi.adminLogout();
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId('');
  };

  const onChange = (field: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');

      const payload: Partial<Product> = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim(),
        features: form.features
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        packaging_options: form.packaging_options.trim(),
        moq: form.moq.trim(),
        countries_served: form.countries_served
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        shelf_life: form.shelf_life.trim(),
        grades: form.grades.trim(),
        display_order: Number(form.display_order) || 1,
      };

      if (editingId) {
        await productsApi.update(editingId, payload);
      } else {
        await productsApi.create(payload);
      }

      await loadProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(toForm(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(`Delete ${product.name}?`);
    if (!confirmed) return;

    try {
      setError('');
      await productsApi.remove(product.id);
      if (editingId === product.id) {
        resetForm();
      }
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setAuthenticating(true);
      setError('');
      await productsApi.adminLogin(username.trim(), password);
      setPassword('');
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await productsApi.adminLogout();
    setIsAuthenticated(false);
    setEditingId('');
    setProducts([]);
    setForm(defaultForm);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-5">
              <Lock className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            </div>
            <p className="text-sm text-gray-600 mb-6">Sign in to manage products.</p>

            {error && (
              <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                autoComplete="username"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                autoComplete="current-password"
                required
              />
              <button
                type="submit"
                disabled={authenticating}
                className="w-full inline-flex justify-center items-center gap-2 bg-green-700 text-white rounded-lg px-4 py-2.5 hover:bg-green-800 disabled:opacity-70"
              >
                {authenticating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Login
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-500">Default: admin / admin123</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Add, update, and delete products.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadProducts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {error && <p className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">{error}</p>}

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{heading}</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                value={form.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Product Name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
              <input
                value={form.slug}
                onChange={(e) => onChange('slug', e.target.value)}
                placeholder="Slug (optional)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.category}
                onChange={(e) => onChange('category', e.target.value)}
                placeholder="Category"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
              <textarea
                value={form.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Description"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
              <input
                value={form.image_url}
                onChange={(e) => onChange('image_url', e.target.value)}
                placeholder="Image URL"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.features}
                onChange={(e) => onChange('features', e.target.value)}
                placeholder="Features (comma-separated)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.packaging_options}
                onChange={(e) => onChange('packaging_options', e.target.value)}
                placeholder="Packaging options"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.moq}
                onChange={(e) => onChange('moq', e.target.value)}
                placeholder="MOQ"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.countries_served}
                onChange={(e) => onChange('countries_served', e.target.value)}
                placeholder="Countries served (comma-separated)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.shelf_life}
                onChange={(e) => onChange('shelf_life', e.target.value)}
                placeholder="Shelf life"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                value={form.grades}
                onChange={(e) => onChange('grades', e.target.value)}
                placeholder="Grades"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => onChange('display_order', e.target.value)}
                placeholder="Display order"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 flex-1 bg-green-700 text-white rounded-lg px-4 py-2.5 hover:bg-green-800 disabled:opacity-70"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>

            {loading ? (
              <div className="py-16 flex justify-center">
                <Loader2 className="h-7 w-7 text-green-700 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-gray-500 text-sm">No products found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
