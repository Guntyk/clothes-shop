import { useState } from 'react';

const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== Number(itemId));
    setCartItems(updatedCartItems);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
  };
};

export default useShoppingCart;
