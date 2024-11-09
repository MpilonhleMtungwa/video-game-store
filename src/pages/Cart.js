import React, { useEffect } from "react";
import styles from "../styles/cart.module.css";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, subtotal, setCartItems } = useCart();

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, [setCartItems]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className={styles.cartpage}>
      <h1>My Cart</h1>
      <div className={styles.cartcontent}>
        <div className={styles.cartitems}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className={styles.cartitem} key={item.id}>
                <img
                  src={item.background_image}
                  alt={item.title}
                  className={styles.itemimage}
                />
                <div className={styles.itemdetails}>
                  <span className={styles.itemtitle}>{item.title}</span>
                  <span className={styles.itemprice}>ZAR {item.price}</span>

                  <div className={styles.itemactions}>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className={styles.removebtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className={styles.cartsummary}>
          <h2>Games and Apps Summary</h2>
          <div className={styles.summarydetails}>
            <div className={styles.summaryitem}>
              <span>Price</span>
              <span>ZAR {subtotal}</span>
            </div>
            <div className={styles.summaryitem}>
              <span>Taxes</span>
              <span>Calculated at Checkout</span>
            </div>
            <div className="summary-item total">
              <span>Subtotal</span>
              <span>ZAR {calculateTotalPrice()}</span>
            </div>
          </div>
          <button className={styles.checkoutbtn}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
