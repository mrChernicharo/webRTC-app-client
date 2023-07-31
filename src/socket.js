import { io } from "socket.io-client";

const socket = io("https://webrtc-app-server.onrender.com", {
    autoConnect: false,
});

socket.connect();

export { socket };
