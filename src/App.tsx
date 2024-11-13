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
import StudentQuiz from "./modules/Students/StudentQuiz/StudentQuiz";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import NotFoundComponents from "./components/NotFoundComponents";
function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
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
          element: profile?.role === "Instructor" ? <Homepage/> : <Quizzes />,
        },
        {
          path: "home-page",
          element: profile?.role === "Instructor" ? <Homepage/> : <NotFoundComponents />,
        },
        {
          path: "quizzes",
          element: <Quizzes />,
        },
        {
          path: "quizzes/:quizId",
          element: profile?.role === "Instructor" ? <ViewQuiz/> : <NotFoundComponents />,
        },
        {
          path: "question-bank",
          element: profile?.role === "Instructor" ? <QuestionBank/> : <NotFoundComponents />,
        },
        {
          path: "results",
          element: <Results />,
        },
        {
          path: "result-details",
          element: <ResultDetails/>,
        },
        {
          path: "students",
          element: profile?.role === "Instructor" ? <Students/> : <NotFoundComponents />,
        },
        {
          path: "student-quiz",
          element: profile?.role === "Student" ? <StudentQuiz/> : <NotFoundComponents />,
        },

        { path: "list-groups",
          element: profile?.role === "Instructor" ? <ListGroups/> : <NotFoundComponents />,
        
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
