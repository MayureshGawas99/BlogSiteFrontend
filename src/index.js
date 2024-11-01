import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";
import { BlogContextProvider } from "./context/BlogContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BlogContextProvider>
    <ThemeProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </BlogContextProvider>
);
