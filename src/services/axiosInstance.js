import axios from "axios";
const AppUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: AppUrl,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

  // withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
