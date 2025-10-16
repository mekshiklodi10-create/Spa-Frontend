import axios from "axios";

const API = axios.create({
  baseURL: "https:spa-backend-nine.vercel.app/api",
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
