import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Register/Register";
import ForgotPassword from "./modules/Auth/Forgot Password/ForgotPassword";
import ResetPassword from "./modules/Auth/Reset password/ResetPassword";
import ChangePassword from "./modules/Auth/Change Password/ChangePassword";
import AuthLayouts from "./modules/Shared/AuthLayouts/AuthLayouts";
import { ToastContainer } from "react-toastify";
import Dashboard from "./modules/Dashboard/Dashboard";
import QuestionList from "./modules/Instructors/Question/QuestionList/QuestionList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Students from "./modules/Instructors/Students/Students/Students";
import GroupList from "./modules/Instructors/Groups/GroupList/GroupList";
import Quiz from "./modules/Instructors/Quizzes/Quiz";
import Result from "./modules/Result/Result";
import NotFoundPage from "./modules/Shared/NotFoundPage/NotFoundPage";
import MasterAdminLayout from "./modules/Shared/MasterAdminLayout/MasterAdminLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayouts />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: <MasterAdminLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "quizzes", element: <Quiz /> },
      { path: "groups", element: <GroupList /> },
      { path: "questions", element: <QuestionList /> },
      { path: "students", element: <Students /> },
      { path: "results", element: <Result /> },
    ],
  },
]);
const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
