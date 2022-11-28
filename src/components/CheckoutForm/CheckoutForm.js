import React, { useContext } from "react";

import { Button, Modal, TextInput } from "@mantine/core";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons";

const CheckoutForm = ({ showCheckout, setShowCheckout, book }) => {
  const { user } = useContext(AuthContext);

  const handleSaveOrder = (data) => {
    const seller = book.seller;
    const buyer = user.email;
    const bookId = book._id;
    const buyerNumber = data.phoneNumber;
    const buyerAddress = data.meetLocation;

    const order = { seller, buyer, bookId, buyerNumber, buyerAddress };

    fetch(`${process.env.REACT_APP_API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          showNotification({
            title: "Order placed",
            message: "Your order has been placed successfully",
            color: "green",
            icon: <IconCircleCheck />,
          });
          setShowCheckout(false);
        }
      })
      .catch((err) => {
        showNotification({
          title: "Oops!",
          message: "Something went wrong",
          color: "red",
        });
        setShowCheckout(false);
      });
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      bookTitle: "",
      price: "",
      meetLocation: "",
      phoneNumber: "",
    },
  });

  return (
    <Modal opened={showCheckout} onClose={() => setShowCheckout(false)}>
      <form onSubmit={form.onSubmit(handleSaveOrder)}>
        <TextInput
          label="Name"
          placeholder={user.displayName}
          value={user.displayName}
          size="md"
          disabled
          mb="sm"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder={user.email}
          value={user.email}
          size="md"
          disabled
          mb="sm"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Book Name"
          value={book.title}
          placeholder={book.title}
          size="md"
          disabled
          mb="sm"
          {...form.getInputProps("bookTitle")}
        />
        <TextInput
          label="Price"
          value={book.sellingPrice}
          placeholder={book.sellingPrice}
          size="md"
          disabled
          mb="sm"
          {...form.getInputProps("price")}
        />
        <TextInput
          label="Meet Location"
          placeholder="Enter your meet location"
          size="md"
          mb="sm"
          {...form.getInputProps("meetLocation")}
        />
        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          size="md"
          mb="sm"
          {...form.getInputProps("phoneNumber")}
        />
        <Button type="submit">Book Order</Button>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
