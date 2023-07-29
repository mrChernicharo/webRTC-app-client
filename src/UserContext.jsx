import { createContext, useState, useEffect } from "react";
import { socket } from "./socket";

export const UserContext = createContext({
    id: "",
    name: "",
});

export function UserContextProvider({ children }) {
    const [id, setUserId] = useState("");
    const [name, setUserName] = useState("");

    useEffect(() => {
        socket.on("hello", (userId) => {
            console.log("hello", { userId });
            setUserId(userId);
        });
    }, []);

    return <UserContext.Provider value={{ id, name, setUserName }}>{children}</UserContext.Provider>;
}
