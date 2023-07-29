import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { socket } from "../socket";

function Chat() {
    const { name, id } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [show, setShow] = useState(false);
    const [hasNewMsgs, setHasNewMsgs] = useState(false);

    function sendTextMessage(text) {
        const roomId = location.pathname.replace("/room/", "");
        const message = { text, roomId, userId: id, username: name || "someone" };
        setMessages((prev) => [...prev, message]);
        socket.emit("send-text-message", message);
    }

    useEffect(() => {
        socket.on("receive-text-message", (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, [setMessages]);

    useEffect(() => {
        if (show) {
            setHasNewMsgs(false);
        }
    }, [show]);

    useEffect(() => {
        if (messages.length && !show) {
            setHasNewMsgs(true);
        }
    }, [messages]);

    return (
        <div className="chat" style={{ border: "1px solid #555", width: 300 }}>
            {show ? (
                <>
                    <button onClick={() => setShow(false)}>Hide Chat</button>

                    <ul>
                        {messages.map((msg, i) => (
                            <li key={msg.id || i}>
                                <span>
                                    {msg.username}: {msg.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <textarea
                        style={{ maxWidth: 298, width: "100%", minHeight: 60 }}
                        onKeyDown={(e) => {
                            if (e.target.value.trim() && e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendTextMessage(e.target.value.trim());
                                e.target.value = "";
                            }
                        }}
                    />
                </>
            ) : (
                <div>
                    {hasNewMsgs && <div style={{ width: 10, height: 10, background: "red" }}></div>}

                    <button onClick={() => setShow(true)}>Open Chat</button>
                </div>
            )}
        </div>
    );
}

export default Chat;
