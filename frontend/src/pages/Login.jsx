// Login.jsx
import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      //  Save to context + localStorage
      login({
        token: res.data.token,
        role: res.data.role,
        email: form.email,
      });

      //  Correct redirect without losing context
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Login</button>
    </form>
  );
}
