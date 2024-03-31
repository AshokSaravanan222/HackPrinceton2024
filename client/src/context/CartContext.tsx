'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../../types';

const CartContext = createContext({
    cart: [] as CartItem[],
    addToCart: (item: CartItem) => {},
  });
  
  type CartProviderProps = {
    children: ReactNode;
  };
  
  export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]); // Explicitly type the useState hook
  
    const addToCart = (item: CartItem) => {
      setCart((currentCart) => [...currentCart, item]);
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext);