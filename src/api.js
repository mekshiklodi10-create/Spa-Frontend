import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-delta-weld-98.vercel.app/api", 
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);