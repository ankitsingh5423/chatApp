import axios from "axios";
const axoisInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/",
  headers: { accept: "application/json", "content-type": "application/json" },
});

export default axoisInstance;
