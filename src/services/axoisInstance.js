import axios from "axios";
const AppUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const axoisInstance = axios.create({
  baseURL: AppUrl,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  // withCredentials: true,
});

export default axoisInstance;
