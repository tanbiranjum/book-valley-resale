import React, { useContext, useState } from "react";

import { Button, Modal, TextInput, LoadingOverlay } from "@mantine/core";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons";
import API from "../../api/api";
import { getTokenFromLocalStorage } from "../../utils/utils";

const CheckoutForm = ({ showCheckout, setShowCheckout, book }) => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const handleSaveOrder = (data) => {
    setVisible(true);
    const seller = book.seller;
    const buyer = user.email;
    const bookId = book._id;
    const buyerNumber = data.phoneNumber;
    const buyerAddress = data.meetLocation;

    const order = { seller, buyer, bookId, buyerNumber, buyerAddress };

    API(getTokenFromLocalStorage())
      .post("/carts", order)
      .then((res) => {
        showNotification({
          title: "Order placed",
          message: "Your order has been placed successfully",
          color: "green",
          icon: <IconCircleCheck />,
        });
        setVisible(false);
        setShowCheckout(false);
      })
      .catch((err) => {
        showNotification({
          title: "Oops!",
          message: "Something went wrong",
          color: "red",
        });
        setVisible(false);
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
      <LoadingOverlay visible={visible} overlayBlur={2} />
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
          required
          {...form.getInputProps("meetLocation")}
        />
        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          size="md"
          mb="sm"
          required
          {...form.getInputProps("phoneNumber")}
        />
        <Button type="submit">Book Order</Button>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
