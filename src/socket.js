import { io } from "socket.io-client";

const socket = io("https://webrtc-app-server.onrender.com", {
// const socket = io("https://localhost:8000", {
    autoConnect: false,
});

socket.connect();

export { socket };
