import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role: requiredRole }) {
  // Access authentication data (token & user role) from context
  const { token, role } = useContext(AuthContext);

  //  If user is not logged in, redirect to login page
  // `replace` prevents going back to this page via browser Back button
  if (!token) return <Navigate to="/login" replace />;

  //  If route requires a specific role (e.g., admin)
  // and the logged-in user doesn't match that role → redirect home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  //  Otherwise user is authorized → render protected content
  return children;
}
