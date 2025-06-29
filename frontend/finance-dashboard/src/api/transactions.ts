import axios from "./axios";

export const fetchSummary = () => axios.get("/analytics/summary");
export const fetchTrends = () => axios.get("/analytics/trends");
export const fetchCategories = () => axios.get("/analytics/categories");
export const fetchTransactions = (params: any) => axios.get("/transactions", { params });
export const exportCSV = (data: any) =>
  axios.post("/export", data, { responseType: "blob" });