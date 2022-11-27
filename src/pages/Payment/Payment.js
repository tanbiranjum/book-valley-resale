import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
  const [cart, setCart] = useState({});
  const { cartId } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/${cartId}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data.cart);
      });
  }, []);
  return (
    <Elements stripe={stripePromise}>
      {cart?._id && <CheckoutForm cart={cart} />}
    </Elements>
  );
};

export default Payment;
