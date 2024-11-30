import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginForm = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages
    try {
      const response = await axios.post(
        "https://video-game-store.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;

        // Call the login function from AuthContext
        await login(token);

        // Redirect to the previous page or homepage
        navigate(from, { replace: true });
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className={styles.registerLink}>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <footer>
            <p>Copyright © 2024. All rights reserved.</p>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
