import { Navigate } from "react-router-dom";
import { isAdminEmail } from "../utils/roles";

export default function ProtectedRoute({
  user,
  authLoading = false,
  children,
  adminOnly = false,
}) {
  if (authLoading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdminEmail(user.email)) {
    return <Navigate to="/my-courses" replace />;
  }

  return children;
}