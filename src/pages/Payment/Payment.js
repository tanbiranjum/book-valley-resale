import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import API from "../../api/api";
import { getTokenFromLocalStorage } from "../../utils/utils";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
  const [cart, setCart] = useState({});
  const { cartId } = useParams();

  useEffect(() => {
    API(getTokenFromLocalStorage())
      .get(`/carts/${cartId}`)
      .then((res) => setCart(res.data.data.cart));
  }, []);
  return (
    <Elements stripe={stripePromise}>
      {cart?._id && <CheckoutForm cart={cart} />}
    </Elements>
  );
};

export default Payment;
