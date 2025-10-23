import axios from "axios";

// ✅ Base URL of your backend API
const API_BASE_URL = "https://banana-ai.onrender.com/"; // change this if your backend runs elsewhere

// ✅ Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------
// 🌐 API Methods
// ----------------------

// GET → Fetch all properties
export const getProperties = async () => {
  const response = await api.get("properties/");
  return response.data;
};

// POST → Add a new property
export const addProperty = async (propertyData) => {
  const response = await api.post("properties/", propertyData);
  return response.data;
};

// PUT → Update a property by ID
export const updateProperty = async (propertyId, updatedData) => {
  const response = await api.put(`properties/${propertyId}`, updatedData);
  return response.data;
};

// DELETE → Delete a property by ID
export const deleteProperty = async (propertyId) => {
  const response = await api.delete(`properties/${propertyId}`);
  return response.data;
};

// Export the axios instance in case you need it elsewhere
export default api;
