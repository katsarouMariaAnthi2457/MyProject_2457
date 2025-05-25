import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/authentication" replace />;
  }

  return <Outlet />;
};
