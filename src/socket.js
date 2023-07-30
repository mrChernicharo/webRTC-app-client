import { io } from "socket.io-client";

// const socket = io("webrtc-app-server.onrender.com", {
const socket = io("http://localhost:8000", {
    autoConnect: false,
});

socket.connect();

export { socket };
