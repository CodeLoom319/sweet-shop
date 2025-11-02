import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        </>
      )}

      {token && (
        <>
          <Link to="/sweets" style={{ marginRight: "10px" }}>Sweets</Link>

          <button
            onClick={logout}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              border: "1px solid #777",
              background: "#fff"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
