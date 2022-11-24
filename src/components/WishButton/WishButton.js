import { CopyButton, ActionIcon, Tooltip, createStyles } from "@mantine/core";
import { IconCopy, IconHeart } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({}));

const WisthButton = () => {
  const [listed, setListed] = useState(false);
  const { theme } = useStyles();

  return (
    <Tooltip
      label={listed ? "Added" : "Add to wishlist"}
      withArrow
      position="right"
    >
      <ActionIcon
        color={listed ? `red` : `pink`}
        onClick={() => setListed(!listed)}
      >
        <IconHeart size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

export default WisthButton;
