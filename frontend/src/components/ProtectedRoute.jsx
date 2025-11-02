// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role: requiredRole }) {
  const { token, role } = useContext(AuthContext);

  // ❌ No token → go to login
  if (!token) return <Navigate to="/login" replace />;

  // 👑 If route needs admin and user isn't admin → deny
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
