import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext"; // Assuming you have a CartContext
import styles from "../styles/Wishlist.module.css";
import NavBar from "../components/NavBar";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart(); // Function to add items to the cart
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // For error handling

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the wishlist data when the user is authenticated
      const fetchWishlist = async () => {
        try {
          const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
          const response = await axios.get(
            "https://video-game-store.onrender.com/api/wishlist",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Send the token in the request header
              },
            }
          );
          setWishlist(response.data); // Set the wishlist data
          setLoading(false); // Stop loading
        } catch (err) {
          setError("Error fetching wishlist"); // Set error if something goes wrong
          setLoading(false); // Stop loading
        }
      };

      fetchWishlist();
    } else {
      setError("Please log in to view your wishlist");
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Function to remove an item from wishlist
  const handleRemoveItem = async (gameId) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      console.log("Game ID to remove:", gameId);

      const response = await axios.delete(
        `https://video-game-store.onrender.com/api/wishlist/${gameId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the request header
          },
        }
      );

      setWishlist(response.data); // Update the wishlist after removing item
    } catch (err) {
      console.error(
        "Error removing item from wishlist",
        err.response?.data || err
      );
    }
  };

  if (error) return <div>{error}</div>;

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
                          handleRemoveItem(item.id);
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
