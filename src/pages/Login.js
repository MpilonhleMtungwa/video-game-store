import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "https://my-blog-9i38.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);

      navigate("/createpost");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
        >
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Login
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
