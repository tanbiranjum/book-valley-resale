import { CopyButton, ActionIcon, Tooltip, createStyles } from "@mantine/core";
import { IconCopy, IconHeart } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const useStyles = createStyles((theme) => ({}));

const WishButton = ({ bookId }) => {
  const { theme } = useStyles();
  const [wishlist, setWishlist] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSaveToWishlist = () => {
    fetch(`${process.env.REACT_APP_API_URL}/wishlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        buyer: user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlist(true);
      });
  };

  const handleDeleteFromWishlist = () => {
    fetch(`${process.env.REACT_APP_API_URL}/wishlists/${bookId}`, {
      method: "DELETE",
    }).then(() => {
      setWishlist(false);
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/wishlists/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.wishlist) {
          setWishlist(true);
        }
      });
  }, []);

  return (
    <Tooltip
      label={wishlist ? "Added" : "Add to wishlist"}
      withArrow
      position="right"
      color={wishlist ? theme.colors.pink[6] : theme.colors.red[6]}
    >
      <ActionIcon
        onClick={() => {
          wishlist ? handleDeleteFromWishlist() : handleSaveToWishlist();
        }}
      >
        <IconHeart size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

export default WishButton;
