import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish, restaurantId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === dish.id || item._id === dish._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === dish.id || item._id === dish._id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...dish, quantity: 1, restaurantId }];
      }
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== dishId && item._id !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}