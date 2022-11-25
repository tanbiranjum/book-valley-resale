import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = {
  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
  }),
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
