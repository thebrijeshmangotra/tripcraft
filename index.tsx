import React from "react";
import ReactDOM from "react-dom/client";

import "./src/index.css";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "@/components/theme-provider";
import router from "@/routes";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
