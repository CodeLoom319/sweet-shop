import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name:"", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Register Success ");
      window.location.href = "/login";
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Registration Failed ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setForm({...form, name:e.target.value})}
        required
      />

      <input
        placeholder="Email"
        type="email"
        onChange={(e)=>setForm({...form, email:e.target.value})}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setForm({...form, password:e.target.value})}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
