import React, { useEffect } from "react";
import styles from "../styles/cart.module.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Cart = () => {
  const { cartItems, removeFromCart, subtotal, setCartItems } = useCart();

  // Load cart items from the local storage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    console.log("Cart items:", cartItems);
  }, [setCartItems]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((cartItem) => cartItem.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Navbar at the top */}
      <NavBar />
      <div className={styles.cartpage}>
        <h1>My Cart</h1>
        <div className={styles.cartcontent}>
          <div className={styles.cartitems}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className={styles.cartitem} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemimage}
                  />
                  <div className={styles.itemdetails}>
                    <span className={styles.itemtitle}>{item.title}</span>
                    <br></br>
                    <span className={styles.itemprice}>R {item.price}</span>

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
            <h2>Games Summary</h2>
            <div className={styles.summarydetails}>
              <div className={styles.summaryitem}>
                <span>Subtotal</span>
                <span>R {subtotal}</span>
              </div>
              <div className={styles.summaryitem}>
                <span>Shipping</span>
                <span>Calculated at Checkout</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <br></br>
                <span>R {calculateTotalPrice()}</span>
              </div>
            </div>
            <Link to="/checkout">
              <button className={styles.checkoutbtn}>Check Out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
