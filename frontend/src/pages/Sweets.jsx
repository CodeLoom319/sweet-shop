import { useEffect, useState } from "react";
import { getSweets, purchaseSweet } from "../services/sweetService";

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id);
      fetchSweets();
    } catch {
      alert("Login required to purchase.");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  if (loading) return <h3 style={styles.loading}>Loading sweets...</h3>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Sweet Store</h2>

      <div style={styles.grid}>
        {sweets.map((s) => (
          <div key={s.id} style={styles.card}>
            <h3 style={styles.name}>{s.name}</h3>
            <p style={styles.text}>
              <strong>Category:</strong> {s.category}
            </p>
            <p style={styles.text}>
              <strong>Price:</strong> ₹{s.price}
            </p>
            <p style={styles.text}>
              <strong>Available:</strong> {s.quantity}
            </p>

            <button
              onClick={() => handlePurchase(s.id)}
              disabled={s.quantity === 0}
              style={{
                ...styles.button,
                background: s.quantity === 0 ? "#aaa" : "#ff4d6d",
                cursor: s.quantity === 0 ? "not-allowed" : "pointer",
              }}
            >
              {s.quantity === 0 ? "Out of Stock" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
  },
  loading: {
    textAlign: "center",
    paddingTop: "50px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "#fff",
    textAlign: "center",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  text: {
    margin: "6px 0",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    width: "100%",
  },
};
