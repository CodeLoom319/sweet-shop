import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  getSweets, 
  addSweet, 
  updateSweet, 
  deleteSweet, 
  restockSweet 
} from "../services/sweetService";

const AdminSweets = () => {
  const { role, email } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ 
    name: "", 
    category: "", 
    price: "", 
    quantity: "" 
  });
  const [editId, setEditId] = useState(null);

  // Block page if NOT admin
  if (role !== "ADMIN") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Access Denied - Admin Only
      </h2>
    );
  }

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.price || !form.quantity) {
      return alert("All fields required!");
    }

    const data = {
      name: form.name,
      category: form.category,
      price: form.price,
      stock: form.quantity   
    };

    try {
      if (editId) {
        await updateSweet(editId, data);
        alert("Sweet updated!");
      } else {
        await addSweet(data);
        alert("Sweet added!");
      }

      setForm({ name: "", category: "", price: "", quantity: "" });
      setEditId(null);
      fetchSweets();
    } catch (err) {
      console.error(err);
      alert("Failed to save sweet");
    }
  };

  const handleEdit = (sweet) => {
    const id = sweet._id || sweet.id; 
    setEditId(id);

    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.stock || sweet.quantity  
    });
  };

  const handleDelete = async (id) => {
    id = id._id || id;
    if (window.confirm("Delete sweet?")) {
      await deleteSweet(id);
      alert("Deleted!");
      fetchSweets();
    }
  };

  const handleRestock = async (id) => {
    id = id._id || id;
    await restockSweet(id, 1);
    alert("Restocked!");
    fetchSweets();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Sweet Management</h2>
      <p>Welcome, <strong>{email}</strong> (Admin)</p>

      <div style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />
        <input name="quantity" placeholder="Quantity" type="number" value={form.quantity} onChange={handleChange} />

        <button onClick={handleSubmit}>
          {editId ? "Update Sweet" : "Add Sweet"}
        </button>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((sweet) => {
            const id = sweet._id || sweet.id;
            return (
              <tr key={id}>
                <td>{sweet.name}</td>
                <td>{sweet.category}</td>
                <td>₹{sweet.price}</td>
                <td>{sweet.stock || sweet.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(sweet)}>Edit</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                  <button onClick={() => handleRestock(id)}>+1</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSweets;
