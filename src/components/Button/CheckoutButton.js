import React, { useContext, useState } from "react";
import useRole from "../../hooks/UseRole/useRole";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const CheckoutButton = ({ book }) => {
  const [role] = useRole();
  const { user } = useContext(AuthContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      if (role === "seller" || role === "admin") {
        alert("You are not allowed to buy your own book");
        return;
      }
      setShowCheckout(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Button radius="xl" style={{ flex: 1 }} onClick={handleCheckout}>
        Book now
      </Button>
      {user?.email && (
        <CheckoutForm
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
          book={book}
        />
      )}
    </div>
  );
};

export default CheckoutButton;
