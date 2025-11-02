import API from "./api";

export const getSweets = () => API.get("/sweets");

export const addSweet = (data) => API.post("/sweets", data);

export const searchSweets = (params) =>
  API.get(`/sweets/search`, { params });

export const purchaseSweet = (id) =>
  API.post(`/sweets/${id}/purchase`);

export const restockSweet = (id, amount) =>
  API.post(`/sweets/${id}/restock`, { amount });

export const deleteSweet = (id) =>
  API.delete(`/sweets/${id}`);

export const updateSweet = (id, data) =>
  API.put(`/sweets/${id}`, data);
