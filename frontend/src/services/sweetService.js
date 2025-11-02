import API from "./api";

// GET all sweets
export const getSweets = () => API.get("/sweets");

// ADD sweet (ADMIN ONLY)
export const addSweet = (data) =>
  API.post("/sweets", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

// UPDATE sweet (ADMIN ONLY)
export const updateSweet = (id, data) =>
  API.put(`/sweets/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

// DELETE sweet (ADMIN ONLY)
export const deleteSweet = (id) =>
  API.delete(`/sweets/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

// RESTOCK sweet (ADMIN ONLY)
export const restockSweet = (id, amount) =>
  API.post(`/sweets/${id}/restock`, { amount }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });

// SEARCH sweets (public)
export const searchSweets = (params) =>
  API.get(`/sweets/search`, { params });

// PURCHASE sweet (USER)
export const purchaseSweet = (id, quantity) =>
  API.post(`/sweets/${id}/purchase`, { quantity }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
