import { io } from "socket.io-client";

const socket = io("localhost:8000", {
    autoConnect: false,
});

socket.connect();

export { socket };
