import type { Product } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const ADMIN_TOKEN_KEY = 'admin_token';

type ApiRequestOptions = RequestInit & {
  requireAuth?: boolean;
};

const getToken = () => localStorage.getItem(ADMIN_TOKEN_KEY) || '';

const request = async <T>(path: string, options?: ApiRequestOptions): Promise<T> => {
  const token = options?.requireAuth ? getToken() : '';

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};

export const productsApi = {
  getAll: () => request<Product[]>('/products'),
  getBySlug: (slug: string) => request<Product>(`/products/${slug}`),
  create: (payload: Partial<Product>) =>
    request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
      requireAuth: true,
    }),
  update: (id: string, payload: Partial<Product>) =>
    request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      requireAuth: true,
    }),
  remove: (id: string) =>
    request<void>(`/products/${id}`, {
      method: 'DELETE',
      requireAuth: true,
    }),
  adminLogin: async (username: string, password: string) => {
    const data = await request<{ token: string; message: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
    return data;
  },
  adminVerify: () => request<{ ok: boolean }>('/admin/verify', { requireAuth: true }),
  adminLogout: async () => {
    const token = getToken();
    if (token) {
      await request<{ message: string }>('/admin/logout', {
        method: 'POST',
        requireAuth: true,
      }).catch(() => undefined);
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  },
  isAdminLoggedIn: () => Boolean(getToken()),
};
