import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // Redirect στο /authentication αντί για /login
    return <Navigate to="/authentication" />;
  }

  return <Outlet />;
};
