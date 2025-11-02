import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    API.get("/sweets").then(res => setSweets(res.data));
  }, []);

  return (
    <div>
      <h2>Sweets List</h2>
      {sweets.map(s => (
        <p key={s.id}>{s.name} - ₹{s.price}</p>
      ))}
    </div>
  );
}
