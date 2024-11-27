import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Tracks token verification status

  // Verify the token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/verify-token",
            {
              token,
            }
          );
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          console.error("Invalid token:", error.message);
          setIsAuthenticated(false);
          localStorage.removeItem("authToken");
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // End loading once verification completes
    };

    verifyToken();
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token in local storage
    setIsAuthenticated(true); // Set authenticated state to true
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken"); // Clear token from local storage
    setIsAuthenticated(false); // Set authenticated state to false
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
