import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./components/NotFound";
import LoginRegister from "./modules/auth/LoginRegister/LoginRegister";
import ForgotPassword from "./modules/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";
import MasterLayout from "./layouts/MasterLayout";
import Homepage from "./modules/Dashboard/HomePage";
import Quizzes from "./modules/instructor/Quizzes/Quizzes";
import QuestionBank from "./modules/instructor/Question Bank/QuestionBank";
import ListGroups from "./modules/instructor/ListGroups/ListGroups";
import Results from "./modules/instructor/Results/Results";
import ResultDetails from "./modules/instructor/Results/ResultDetails";
import ViewQuiz from "./modules/instructor/Quizzes/ViewQuiz";
import Students from "./modules/instructor/Students/Students";

function App() {
  const routes = createBrowserRouter([
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
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "quizzes",
          element: <Quizzes />,
        },
        {
          path: "quizzes/:quizId",
          element: <ViewQuiz />,
        },
        {
          path: "question-bank",
          element: <QuestionBank />,
        },
        {
          path: "results",
          element: <Results />,
        },
        {
          path: "result-details",
          element: <ResultDetails />,
        },
        {
          path: "Students",
          element: <Students />,
        },

        { path: "list-groups", element: <ListGroups /> },
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
