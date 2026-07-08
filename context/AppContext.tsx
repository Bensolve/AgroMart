import React, { createContext, useState, useContext } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  farmer: string;
  category: string;
  image: string; // Emoji placeholder
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

type ScreenType = 'home' | 'details' | 'cart';

interface AppContextType {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItemType[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Data requested for the MVP demo
export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Tomatoes', price: 20, farmer: 'Kofi Mensah', category: 'Vegetables', image: '🍅' },
  { id: '2', name: 'Plantain', price: 30, farmer: 'Ama Serwaa', category: 'Tubers', image: '🍌' },
  { id: '3', name: 'Yam', price: 45, farmer: 'Kwame Osei', category: 'Tubers', image: '🥔' },
  { id: '4', name: 'Rice', price: 60, farmer: 'Baba Moro', category: 'Grains', image: '🌾' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  return (
    <AppContext.Provider value={{ currentScreen, setScreen, selectedProduct, setSelectedProduct, cart, addToCart, updateQuantity }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};