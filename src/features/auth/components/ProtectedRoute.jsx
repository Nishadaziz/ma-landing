import { Navigate } from "react-router-dom";
import { isAdminEmail } from "../utils/roles";

export default function ProtectedRoute({
  user,
  children,
  adminOnly = false,
}) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdminEmail(user.email)) {
    return <Navigate to="/my-courses" replace />;
  }

  return children;
}