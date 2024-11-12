import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/checkOutForm.module.css"; // Assuming CSS modules for styling
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";

const CheckoutForm = () => {
  const { cartItems, calculateCartTotal } = useCart();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  return (
    <div className={styles.checkoutcontainer}>
      {/* Cart Summary */}
      <div className={styles.cartsummary}>
        <h3>Cart</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <br></br>
              <span>R{item.price}</span>
            </li>
          ))}
        </ul>
        <p>
          Total: <strong>R{calculateCartTotal()}</strong>
        </p>
      </div>

      {/* Billing & Payment Section */}
      <div className={styles.checkoutform}>
        {/* Billing Address */}
        <div className={styles.billingsection}>
          <h3>Billing Address</h3>
          <form>
            <div>
              <label>Full Name</label>
              <input type="text" placeholder="John M. Doe" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label>Address</label>
              <input type="text" placeholder="542 W. 15th Street" />
            </div>
            <div>
              <label>City</label>
              <input type="text" placeholder="New York" />
            </div>
            <div className={styles.smallfields}>
              <div>
                <label>State</label>
                <input type="text" placeholder="NY" />
              </div>
              <div>
                <label>Zip</label>
                <input type="text" placeholder="10001" />
              </div>
            </div>
            <div>
              <input type="checkbox" />
              <label>Shipping address same as billing</label>
            </div>
          </form>

          {/* PayPal button integration */}
          <div className={styles.paypalButton}>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AWTgbnTxr7Cgbx28epQwNkHmGoXITFErOlvnozttXDmpZQLBf9h7RzwFrT4yrIJ9N3yrwVN5DIH29whM",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calculateCartTotal().toFixed(2), // Convert total to a string with two decimal places
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // Clear the cart
                    clearCart();

                    // Redirect to the homepage
                    navigate("/");
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
