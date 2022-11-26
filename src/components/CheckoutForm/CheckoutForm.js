import React from "react";

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  Modal,
} from "@mantine/core";

const CheckoutForm = ({ showCheckout, setShowCheckout }) => {
  return (
    <Modal opened={showCheckout} onClose={() => setShowCheckout(false)}>
      CheckoutForm
    </Modal>
  );
};

export default CheckoutForm;
