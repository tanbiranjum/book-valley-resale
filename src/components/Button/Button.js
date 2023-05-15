import React from "react";
import { Button as MantineButton } from "@mantine/core";

const ThemeButton = ({ name, variant = "default", ...others }) => {
  return variant === "gradient" ? (
    <MantineButton
      {...others}
      variant={variant}
      gradient={{ from: "pink", to: "yellow" }}
    >
      {name}
    </MantineButton>
  ) : (
    <MantineButton variant={variant} {...others}>
      {name}
    </MantineButton>
  );
};

export default ThemeButton;
