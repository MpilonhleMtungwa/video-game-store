import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage on first render
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    // Reset any additional cart-related state here, if applicable
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        calculateCartTotal,
        clearCart,

        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
