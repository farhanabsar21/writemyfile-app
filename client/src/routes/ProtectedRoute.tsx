import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/feedback/Loader";
import { useAuth } from "../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
