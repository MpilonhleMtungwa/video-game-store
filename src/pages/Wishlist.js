import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext"; // Assuming you have a CartContext
import styles from "../styles/Wishlist.module.css";
import NavBar from "../components/NavBar";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sideBar";

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Function to add items to the cart
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div className={styles.pageContainer}>
      {/* Navbar at the top */}
      <NavBar />
      <div className={styles.wholepagecontain}>
        <div className={styles.wishlistContainer}>
          <h2>Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ul className={styles.wishlistItems}>
              {wishlist.map((item) => (
                <li key={item.id} className={styles.wishlistItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.title}</h3>
                    <p>Price: R{item.price}</p>
                    <div className={styles.actions}>
                      <button
                        onClick={() => {
                          addToCart(item);
                          alert(`${item.title} added to cart!`);
                        }}
                        className={styles.addToCartBtn}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          removeFromWishlist(item.id);
                          alert(`${item.title} removed from wishlist.`);
                        }}
                        className={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
