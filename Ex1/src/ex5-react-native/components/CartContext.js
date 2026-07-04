import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish, restaurantId) => {
    setCartItems(prevItems => {
      const dishId = dish._id || dish.id;

      const existingItem = prevItems.find(item => (item._id || item.id) === dishId);
     
      if (existingItem) {
        return prevItems.map(item =>
          (item._id || item.id) === dishId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...dish, quantity: 1, restaurantId }];
      }
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems(prevItems => prevItems.filter(item => (item._id || item.id) !== dishId));
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