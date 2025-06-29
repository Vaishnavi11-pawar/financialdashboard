import axios from "./axios";

export const login = (email: string, password: string) =>
  axios.post("/auth/login", { email, password });

export const register = (formData: FormData) =>
  axios.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });