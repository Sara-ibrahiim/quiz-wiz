import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeToggle from "./modules/theme/ThemeToggle";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./components/NotFound";
import LoginRegister from "./modules/auth/LoginRegister/LoginRegister";
import ForgotPassword from "./modules/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";

function App() {
  const routes = createBrowserRouter([
    // Auth Routes first
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LoginRegister />,
        },
        {
          path: "auth",
          element: <LoginRegister />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-passwrd",
          element: <ResetPassword />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
