import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.ts";
import AuthInitializer from "./modules/auth/AuthInitializer.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>

    <AuthInitializer/>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000} // Toast automatically closes after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
  </Provider>
);
