import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
} from "@mantine/core";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { showNotification } from "@mantine/notifications";
import {
  IconCircleCheck,
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "40%",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const CheckoutForm = ({ cart }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
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
            navigate("/dashboard/my-orders");
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
      {console.log(cart)}
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={cart.bookId.photo} alt="Book Image" />
        </Card.Section>

        <Group position="apart" mt="md">
          <div>
            <Text weight={500}>{cart.bookId.title}</Text>
            <Text size="xs" color="dimmed">
              {cart.bookId.description}
            </Text>
          </div>
          <Badge variant="outline">{cart.bookId.condition} copy</Badge>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text size="sm" color="dimmed" className={classes.label}>
            Author: {cart.bookId.author}
          </Text>

          <Group spacing={8} mb={-8}></Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                ${cart.bookId.sellingPrice}
              </Text>
              <Text
                size="sm"
                color="dimmed"
                weight={500}
                sx={{ lineHeight: 1 }}
                mt={3}
              >
                Resell Price
              </Text>
            </div>
          </Group>
        </Card.Section>
      </Card>
      <form onSubmit={handleSubmit}>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.colors.gray[3]}`,
            width: "40%",
            padding: "20px",
            radius: `${theme.radius.sm}`,
          })}
        >
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
          <Button
            type="submit"
            mt="md"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </Button>
        </Box>
      </form>
      <Text>{cardError}</Text>
      <Text>{transactionId}</Text>
    </div>
  );
};

export default CheckoutForm;
