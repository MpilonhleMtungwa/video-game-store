import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const handlePayment = async (amount) => {
  const stripe = await stripePromise;
  const response = await fetch("/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const session = await response.json();
  stripe.redirectToCheckout({ sessionId: session.id });
};
