import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;
export const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("socket id =", socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log("socket id =", socket.id); // undefined
});
