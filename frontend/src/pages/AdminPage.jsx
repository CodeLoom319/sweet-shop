import { useEffect, useState } from "react";
import SweetService from "../services/sweetService";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const { token } = useAuth();

  const loadSweets = async () => {
    const data = await SweetService.getSweets();
    setSweets(data);
  };

  const addSweet = async () => {
    await SweetService.addSweet({ name, quantity: Number(quantity), price: Number(price) }, token);
    loadSweets();
    setName("");
    setQuantity("");
    setPrice("");
  };

  const deleteSweet = async (id) => {
    await SweetService.deleteSweet(id, token);
    loadSweets();
  };

  const restock = async (id) => {
    const qty = prompt("Enter quantity to add:");
    if (!qty) return;
    await SweetService.restockSweet(id, Number(qty), token);
    loadSweets();
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <h3>Add Sweet</h3>
      <input placeholder="Sweet Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addSweet}>Add Sweet</button>

      <h3>All Sweets</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.quantity}</td>
              <td>{s.price}</td>
              <td>
                <button onClick={() => restock(s.id)}>Restock</button>
                <button onClick={() => deleteSweet(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
