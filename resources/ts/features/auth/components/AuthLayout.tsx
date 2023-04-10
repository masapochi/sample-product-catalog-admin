import { useAuth } from "../providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout(): JSX.Element {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
