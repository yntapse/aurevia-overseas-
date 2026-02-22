export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  features: string[];
  packaging_options: string;
  moq: string;
  countries_served: string[];
  shelf_life: string;
  grades: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_country: string;
  testimonial_text: string;
  rating: number;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  product_name: string;
  quantity: string;
  destination_country: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  additional_notes: string;
  status: string;
  created_at: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Red Onions',
    slug: 'red-onions',
    category: 'Agricultural Products',
    description: 'Fresh, high-quality red onions sourced from the finest farms in India. Our red onions are known for their rich flavor, firm texture, and extended shelf life.',
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800',
    features: [
      'Size: 40mm to 80mm diameter',
      'Color: Deep red to purple',
      'Moisture content: Below 85%',
      'Free from sprouting and diseases',
      'Pungency: Medium to high',
      'Storage: Cool, dry conditions'
    ],
    packaging_options: '10kg, 20kg, 25kg mesh bags or as per buyer requirement',
    moq: '1 container (20-25 MT)',
    countries_served: ['UAE', 'Malaysia', 'Bangladesh', 'Sri Lanka', 'Singapore'],
    shelf_life: '2-3 months under proper storage',
    grades: 'A Grade, B Grade available',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Organic Jaggery (Gur)',
    slug: 'jaggery',
    category: 'Agricultural Products',
    description: 'Pure, organic jaggery made from sugarcane juice without any chemicals. Rich in minerals and iron, our jaggery is a healthy alternative to refined sugar.',
    image_url: '/src/images/brown-refined-gud-jaggery.jpg',
    features: [
      'Made from 100% pure sugarcane juice',
      'No chemicals or additives',
      'Rich in iron and minerals',
      'Natural golden to dark brown color',
      'Traditional production methods',
      'Unrefined and chemical-free'
    ],
    packaging_options: '500g, 1kg blocks; 25kg bulk packs',
    moq: '500kg',
    countries_served: ['USA', 'UK', 'Canada', 'Australia', 'UAE'],
    shelf_life: '12 months',
    grades: 'Premium Grade, Standard Grade',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Fresh Green Chillies',
    slug: 'green-chillies',
    category: 'Agricultural Products',
    description: 'Farm-fresh green chillies with optimal heat and flavor. Carefully selected and packed to maintain freshness during export.',
    image_url: '/src/images/Green-Chillis.jpg',
    features: [
      'Length: 8-12 cm',
      'Fresh green color',
      'Medium to high heat level',
      'Crisp texture',
      'Free from blemishes',
      'Properly graded and sorted'
    ],
    packaging_options: '5kg corrugated boxes with ventilation',
    moq: '1 ton',
    countries_served: ['UK', 'UAE', 'Malaysia', 'Singapore'],
    shelf_life: '2-3 weeks under cold storage',
    grades: 'Export Grade A',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Quality Groundnuts',
    slug: 'groundnuts',
    category: 'Agricultural Products',
    description: 'Premium quality groundnuts (peanuts) available in shell and shelled forms. Rich in protein and healthy fats.',
    image_url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800',
    features: [
      'Bold and Java varieties',
      'Natural color and taste',
      'Free from aflatoxin',
      'Uniform size grading',
      'High oil content',
      'Quality tested and certified'
    ],
    packaging_options: '25kg, 50kg PP bags; vacuum packs for kernels',
    moq: '5 tons',
    countries_served: ['Vietnam', 'Indonesia', 'Philippines', 'Middle East'],
    shelf_life: '6-8 months',
    grades: 'Bold, Java, TJ varieties',
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Indian Handicrafts',
    slug: 'handicrafts',
    category: 'Handicrafts',
    description: 'Authentic handmade Indian handicrafts including textiles, pottery, metalwork, and wooden artifacts. Each piece reflects traditional Indian craftsmanship.',
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    features: [
      'Handmade by skilled artisans',
      'Traditional designs and patterns',
      'Eco-friendly materials',
      'Variety: textiles, pottery, metalwork',
      'Unique cultural heritage',
      'Fair trade certified'
    ],
    packaging_options: 'Individual protective packaging, custom boxes available',
    moq: 'Varies by product type',
    countries_served: ['USA', 'UK', 'Germany', 'France', 'Australia', 'Japan'],
    shelf_life: 'N/A (durable goods)',
    grades: 'Premium handcrafted quality',
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Ahmed Al-Mansouri',
    client_company: 'Dubai Fresh Foods LLC',
    client_country: 'UAE',
    testimonial_text: 'We have been importing red onions from Aurevia Overseas for over 2 years. The quality is consistently excellent, and their logistics management is top-notch. Highly recommended for anyone looking for reliable Indian produce.',
    rating: 5,
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    client_name: 'Sarah Mitchell',
    client_company: 'Organic Delights UK',
    client_country: 'United Kingdom',
    testimonial_text: 'The organic jaggery we import is a bestseller in our stores. Customers love the authentic taste and quality. Aurevia Overseas has been a trustworthy partner in our business growth.',
    rating: 5,
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    client_name: 'Tan Wei Ming',
    client_company: 'Singapore Spice Traders',
    client_country: 'Singapore',
    testimonial_text: 'Excellent service and premium quality green chillies. The packaging ensures freshness upon arrival, and the documentation is always perfect. A professional team to work with.',
    rating: 5,
    display_order: 3,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    client_name: 'Maria Rodriguez',
    client_company: 'Heritage Imports',
    client_country: 'USA',
    testimonial_text: 'The Indian handicrafts collection is stunning! Each piece is unique and showcases authentic craftsmanship. Our customers appreciate the quality and cultural authenticity.',
    rating: 5,
    display_order: 4,
    is_featured: false,
    created_at: new Date().toISOString()
  }
];

// Simple in-memory storage for quote requests
let quoteRequests: QuoteRequest[] = [];

export const localDB = {
  products: {
    getAll: () => Promise.resolve(products),
    getBySlug: (slug: string) => Promise.resolve(products.find(p => p.slug === slug)),
  },
  testimonials: {
    getAll: () => Promise.resolve(testimonials),
  },
  quoteRequests: {
    create: (data: Omit<QuoteRequest, 'id' | 'created_at' | 'status'>) => {
      const newRequest: QuoteRequest = {
        id: Date.now().toString(),
        ...data,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      quoteRequests.push(newRequest);
      console.log('Quote request saved:', newRequest);
      return Promise.resolve(newRequest);
    },
    getAll: () => Promise.resolve(quoteRequests),
  },
};
