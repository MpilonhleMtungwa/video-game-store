import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          await axios.post("http://localhost:5000/auth/verify-token", {
            token,
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Invalid token:", error.message);
          setIsAuthenticated(false);
          localStorage.removeItem("authToken");
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
