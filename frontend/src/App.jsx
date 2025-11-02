// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Home";
import Navbar from "./components/Navbar";
import Sweets from "./pages/Sweets";
import AdminSweets from "./pages/AdminSweets";

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Correct import

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ User protected route */}
        <Route
          path="/sweets"
          element={
            <ProtectedRoute>
              <Sweets />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin protected route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminSweets />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
