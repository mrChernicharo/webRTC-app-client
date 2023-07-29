import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter";
import { UserContextProvider } from "./UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <UserContextProvider>
        <AppRouter />
    </UserContextProvider>
    // </React.StrictMode>
);
