import * as process from "process";
window.global = window;
window.process = process;

import { io } from "socket.io-client";

// "localhost:8000"
const socket = io("https://webrtc-app-server.onrender.com", {
    autoConnect: false,
});

socket.connect();

export { socket };
