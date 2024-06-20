import { useEffect, useState } from 'react';

const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, amount: 1 }]);
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
