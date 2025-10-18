import axios from "axios";

const API = axios.create({
  baseURL: "https://spa-backend-5xtx.onrender.com/api",
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
