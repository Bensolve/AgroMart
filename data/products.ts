// data/products.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  farmer: string;
  price: number;
  rating: number;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    farmer: 'Kofi Mensah',
    price: 20,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Sweet Plantain',
    category: 'Tubers',
    farmer: 'Ama Serwaa',
    price: 30,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Pona Yam',
    category: 'Tubers',
    farmer: 'Kwame Osei',
    price: 45,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    name: 'Local White Rice',
    category: 'Grains',
    farmer: 'Baba Moro',
    price: 60,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '5',
    name: 'Organic Apples',
    category: 'Fruits',
    farmer: 'Sister Beatrice',
    price: 25,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '6',
    name: 'Fresh Beef Cuts',
    category: 'Meat',
    farmer: 'Alhaji Ibrahim',
    price: 85,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '7',
    name: 'Tilapia Fish',
    category: 'Fish',
    farmer: 'Keta Marine Farms',
    price: 50,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: '8',
    name: 'Green Bell Peppers',
    category: 'Vegetables',
    farmer: 'Kofi Mensah',
    price: 15,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1563565313-2e998f51cb82?w=400&auto=format&fit=crop&q=60',
  },
];