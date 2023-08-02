import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { socket } from "./socket";

export default function UseChat() {
    const { name, id } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [hasNewMsgs, setHasNewMsgs] = useState(false);

    function sendTextMessage(text) {
        const roomId = location.pathname.replace("/room/", "");
        const message = { text, roomId, userId: id, username: name || "someone" };
        setMessages((prev) => [...prev, message]);
        socket.emit("send-text-message", message);
    }

    function toggleChat() {
      setShowChat(p => !p)
    }
    function closeChat() {
      setShowChat(false)
    }

    useEffect(() => {
        socket.on("receive-text-message", (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, [setMessages]);

    useEffect(() => {
        if (showChat) {
            setHasNewMsgs(false);
        }
    }, [showChat]);

    useEffect(() => {
        if (messages.length && !showChat) {
            setHasNewMsgs(true);
        }
    }, [messages]);

    return {
        messages,
        hasNewMsgs,
        showChat,
        toggleChat,
        closeChat,
        sendTextMessage,
    };
}
