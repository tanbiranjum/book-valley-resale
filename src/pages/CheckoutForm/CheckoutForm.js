import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Text } from "@mantine/core";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons";

const CheckoutForm = ({ cart }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const price = cart.bookId.sellingPrice;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        paymentId: paymentIntent.id,
        bookId: cart.bookId._id,
        cartId: cart._id,
        buyerName: user.displayName,
        buyerEmail: user.email,
        price: cart.bookId.sellingPrice,
      };

      fetch(`${process.env.REACT_APP_API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            showNotification({
              title: "Success",
              message: "Payment completed successfully",
              color: "green",
              icon: <IconCircleCheck />,
            });
            setTransactionId(paymentIntent.id);
          }
        });
      setProcessing(false);
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </Button>
      </form>
      <Text>{cardError}</Text>
      <Text>{transactionId}</Text>
    </div>
  );
};

export default CheckoutForm;
