import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo-white.png";
import authImage from "../../../assets/AuthLogo.png";
import { User, UserPlus } from "lucide-react";
export default function AuthLayouts() {
  const location = useLocation();
  const allowedPaths = ["/", "/login", "/register"];
  const Login =
    location.pathname === "/login"
      ? "border-[4px] border-(--color-title) text-(--color-title)"
      : location.pathname === "/"
        ? "border-[4px] border-(--color-title) text-(--color-title)"
      : "text-white";
  const Register =
    location.pathname === "/register"
      ? "border-[4px] border-(--color-title) text-(--color-title)"
      : "text-white";
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/login":
        return "Continue your learning journey with QuizWiz!";
      case "/register":
        return "Continue your learning journey with QuizWiz!";
      case "/forget-password":
        return "Forgot Password";
      case "/reset-password":
        return "Reset Password";
      case "/change-password":
        return "Change Password";
      default:
        return "Continue your learning journey with QuizWiz!";
    }
  };

  return (
    <>
      <div className="grid min-h-screen grid-cols-1 bg-black lg:grid-cols-5">
        <div className="text-(--color-title) custom:col-span-12 p-12 lg:col-span-3">
          <img src={Logo} alt="Logo" className="w-48 pb-12" />
          <h1 className="mb-8 text-2xl font-bold tracking-wider text-(--color-title)">
            {getPageTitle()}
          </h1>
          {allowedPaths.map(
            (item) =>
              item === location.pathname && (
                <div className="my-10 flex gap-8" key={item}>
                  <Link to="/login">
                    <div
                      className={`flex h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333] shadow ${Login}`}
                    >
                      <User size={60} />
                      <span className="font-bold capitalize">sign in</span>
                    </div>
                  </Link>
                  <Link to="/register">
                    <div
                      className={`flex h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333] shadow ${Register}`}
                    >
                      <UserPlus size={60} />
                      <span className="font-bold capitalize"> Sign Up</span>
                    </div>
                  </Link>
                </div>
              )
          )}
          <Outlet />
        </div>
        <div className="custom:col-span-12 p-6 px-11 sm:px-6 lg:col-span-2">
          <img
            src={authImage}
            alt="Quiz app Illustration"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
}
