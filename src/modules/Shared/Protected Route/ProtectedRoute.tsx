import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
interface RootState {
  auth: {
    token: string;
    user: {
      role: string;
    };
  };
}
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const blockedRoutes = ["groups", "questions", "students"];
    const currentPath = location.pathname.split("/").pop() || "";
    if (blockedRoutes.includes(currentPath) && user?.role !== "Instructor") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, user, navigate]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
