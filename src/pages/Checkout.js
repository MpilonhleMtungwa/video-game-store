import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/checkOutForm.module.css"; // Assuming CSS modules for styling
import emailjs from "emailjs-com";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";

const CheckoutForm = () => {
  const { cartItems, calculateCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const sendEmailInvoice = (transactionDetails) => {
    const templateParams = {
      user_email: transactionDetails.user_email,
      user_name: transactionDetails.user_name,
      transaction_id: transactionDetails.transaction_id,
      amount: transactionDetails.amount,
    };
    console.log("Template parameters:", templateParams);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Failed to send email", error);
      });
  };

  return (
    <div className={styles.checkoutcontainer}>
      <div className={styles.cartsummary}>
        <h3>Cart</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <br />
              <span>R{item.price}</span>
            </li>
          ))}
        </ul>
        <p>
          Total: <strong>R{calculateCartTotal()}</strong>
        </p>
      </div>

      <div className={styles.checkoutform}>
        <div className={styles.billingsection}>
          <h3>Billing Address</h3>
          <form>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
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

          <div className={styles.paypalButton}>
            <PayPalScriptProvider
              options={{
                "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calculateCartTotal().toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const transactionDetails = {
                      transaction_id: details.id,
                      amount: calculateCartTotal().toFixed(2),
                      user_email: userData.email, // use userData for email
                      user_name: userData.name, // use userData for name
                    };
                    sendEmailInvoice(transactionDetails); // Pass all details for email
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );
                    clearCart();
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
