import { BrowserRouter } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import ScrollToTop from "./pages/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
