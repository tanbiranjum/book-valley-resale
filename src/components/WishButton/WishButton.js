import { ActionIcon, Tooltip, createStyles } from "@mantine/core";
import { IconBookmark, IconBookmarkOff } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useRole from "../../hooks/UseRole/useRole";

const useStyles = createStyles((theme) => ({}));

const WishButton = ({ bookId }) => {
  const { theme } = useStyles();
  const [wishlist, setWishlist] = useState(false);
  const { user } = useContext(AuthContext);
  const [role] = useRole();

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
    <>
      {user?.email && role === "buyer" && (
        <Tooltip
          label={wishlist ? "Added" : "Add to wishlist"}
          withArrow
          position="right"
          color={wishlist ? theme.colors.pink[6] : theme.colors.red[6]}
        >
          <ActionIcon
            variant={wishlist ? "light" : "transparent"}
            sx={{
              color: wishlist ? theme.colors.pink[6] : theme.colors.red[6],
            }}
            onClick={() => {
              wishlist ? handleDeleteFromWishlist() : handleSaveToWishlist();
            }}
          >
            {wishlist ? (
              <IconBookmarkOff size="20px" />
            ) : (
              <IconBookmark size="20px" />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </>
  );
};

export default WishButton;
