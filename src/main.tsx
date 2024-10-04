import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

import App from "./App.tsx";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { ToastContainer } from 'react-toastify';
import { createRoot } from "react-dom/client";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <ToastContainer theme='light'
      autoClose={2000} />
    </StrictMode>
  </Provider>
);
