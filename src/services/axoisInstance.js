import axios from "axios";
const axoisInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  withCredentials: true,
});

export default axoisInstance;
