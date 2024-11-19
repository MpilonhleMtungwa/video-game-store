import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to register the user
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      // If registration is successful, show success message
      setSuccess("Registration successful! You can now log in.");
      setError("");

      // clear the form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      // Handle different error responses
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg); // Display the error message from the server
      } else {
        setError("Error during registration. Please try again.");
      }
      setSuccess("");
    }
  };
  return (
    <div className={styles.formcontainer}>
      <div className={styles.registercard}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.registerbtn}>
            REGISTER
          </button>
          {success && <p className={styles.successmsg}>{success}</p>}
          {error && <p className={styles.errormsg}>{error}</p>}
          <p className={styles.loginlink}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
