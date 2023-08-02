import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { socket } from "../../socket";
import { BiChat } from "react-icons/bi";
import { MdClose } from "react-icons/md";

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
        <>
            {show ? (
                <div className="bg-[#222] p-4">
                    <div className="flex justify-end">
                        <button onClick={() => setShow(false)}>
                            <MdClose />
                        </button>
                    </div>

                    <ul className="min-h-[160px] max-h-[50vh] overflow-y-auto">
                        {messages.map((msg, i) => (
                            <li key={msg.id || i}>
                                <span>
                                    {msg.username}: {msg.text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <textarea
                        className="max-w-[320px] max-h-[120px] min-h-[60px]"
                        // style={{ maxWidth: 298, width: "100%", minHeight: 60 }}
                        onKeyDown={(e) => {
                            if (e.target.value.trim() && e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendTextMessage(e.target.value.trim());
                                e.target.value = "";
                            }
                        }}
                    />
                </div>
            ) : (
                <div className="fixed bottom-4 right-4 z-30">
                    {hasNewMsgs && <div style={{ width: 10, height: 10, background: "red" }}></div>}

                    <button onClick={() => setShow(true)}>
                        <BiChat size={42} />
                    </button>
                </div>
            )}
        </>
    );
}

export default Chat;
