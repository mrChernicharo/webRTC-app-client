import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../UserContext";
import { socket } from "../../socket";
import { BiChat } from "react-icons/bi";
import { MdClose } from "react-icons/md";

function Chat({ messages, closeChat, sendTextMessage }) {
    const { name, id } = useContext(UserContext);
    const messagesPaneRef = useRef(null);

    function scrollToBottom() {
        setTimeout(() => {
            messagesPaneRef.current.scrollTo({
                top: 100_000_000,
            });
        }, 0);
    }

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div
            className="fixed right-0 bg-[#222] p-4 border"
            style={{ bottom: 64, width: 300, height: "calc(100% - 126px)" }}
        >
            <div className="relative h-full">
                <div className="flex justify-end">
                    <button onClick={closeChat}>
                        <MdClose />
                    </button>
                </div>

                <ul
                    className="absolute bottom-20 w-full border overflow-y-auto"
                    style={{ maxHeight: "calc(100% - 300px)" }}
                    ref={messagesPaneRef}
                >
                    {messages.map((msg, i) => (
                        <li key={msg.id || i}>
                            <span>
                                {msg.username}: {msg.text}
                            </span>
                        </li>
                    ))}
                </ul>

                <textarea
                    className="absolute bottom-0 w-full max-h-[120px] min-h-[60px]"
                    onKeyDown={(e) => {
                        if (e.target.value.trim() && e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendTextMessage(e.target.value.trim());
                            e.target.value = "";
                            scrollToBottom();
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Chat;
