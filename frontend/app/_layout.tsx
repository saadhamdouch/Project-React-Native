import React from "react";
import { ThemeProvider } from "styled-components";
import Tabs from "./tabs";
import { theme } from "../styles/theme";

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Tabs />
    </ThemeProvider>
  );
}
