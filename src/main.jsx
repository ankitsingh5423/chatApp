import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/basicComponents/ThemeProvider.jsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
          <Analytics />
          <ToastContainer autoClose={1500} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
