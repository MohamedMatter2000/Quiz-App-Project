import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthLayouts from "./modules/Shared/AuthLayouts/AuthLayouts";
import MasterAdminLayout from "./modules/Shared/MasterAdminLayout/MasterAdminLayout";
import LoadingSpinner from "./modules/Shared/LoadingSpinner/LoadingSpinner";
import NotFoundPage from "./modules/Shared/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./modules/Shared/Protected Route/ProtectedRoute";
const Login = lazy(() => import("./modules/Auth/Login/Login"));
const Register = lazy(() => import("./modules/Auth/Register/Register"));
const ForgotPassword = lazy(
  () => import("./modules/Auth/Forgot Password/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("./modules/Auth/Reset password/ResetPassword")
);
const ChangePassword = lazy(
  () => import("./modules/Auth/Change Password/ChangePassword")
);
const Dashboard = lazy(() => import("./modules/Dashboard/Dashboard"));
const QuestionList = lazy(
  () => import("./modules/Instructors/Question/QuestionList/QuestionList")
);
const Students = lazy(
  () => import("./modules/Instructors/Students/Students/Students")
);
const GroupList = lazy(
  () => import("./modules/Instructors/Groups/GroupList/GroupList")
);
const Quiz = lazy(() => import("./modules/Instructors/Quizzes/Quiz"));
const Result = lazy(() => import("./modules/Result/Result"));
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
    element: (
      <ProtectedRoute>
        <MasterAdminLayout />
      </ProtectedRoute>
    ),
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
    <Suspense fallback={<LoadingSpinner />}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
