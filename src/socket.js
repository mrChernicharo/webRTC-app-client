import { io } from "socket.io-client";

const serverURL = import.meta.env.PROD ?  "https://webrtc-app-server.onrender.com" : "localhost:8000";

const socket = io(serverURL, {
    autoConnect: false,
});

socket.connect();

console.log({ socket, serverURL });

export { socket };
