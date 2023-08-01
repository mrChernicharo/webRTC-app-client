import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    FaBeer,
    FaFileAudio,
    FaMicrophone,
    FaMicrophoneAlt,
    FaMicrophoneSlash,
    FaRegFileAudio,
    FaVideo,
    FaVideoSlash,
    FaWindowClose,
} from "react-icons/fa";
import { socket } from "../../socket";
import { UserContext } from "../../UserContext";
import ClipboardCopy from "../small/ClipboardCopy";
import Modal from "../small/Modal";

function Controls({ onChange }) {
    const [videoOff, setVideoOff] = useState(false);
    const [audioOff, setAudioOff] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { id } = useContext(UserContext);
    const roomID = location.pathname.replace("/room/", "");

    useEffect(() => {}, []);

    return (
        <div className="controls">
            <button
                onClick={() => {
                    if (videoOff) {
                        socket.emit("set-video-on", roomID, id);
                        onChange({ video: "on" });
                    } else {
                        socket.emit("set-video-off", roomID, id);
                        onChange({ video: "off" });
                    }
                    setVideoOff((prev) => !prev);
                }}
            >
                {videoOff ? (
                    <span className="">
                        <FaVideo />
                    </span>
                ) : (
                    <span className="text-red-500">
                        <FaVideoSlash />
                    </span>
                )}
            </button>

            <button
                onClick={() => {
                    if (audioOff) {
                        socket.emit("set-audio-on", roomID, id);
                        onChange({ audio: "on" });
                    } else {
                        socket.emit("set-audio-off", roomID, id);
                        onChange({ audio: "off" });
                    }
                    setAudioOff((prev) => !prev);
                }}
            >
                {audioOff ? (
                    <span className="">
                        <FaMicrophone />
                    </span>
                ) : (
                    <span className="text-red-500">
                        <FaMicrophoneSlash />
                    </span>
                )}
            </button>

            <button onClick={() => setShowModal(true)}>Invite</button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="py-4">Copy the link and share it with your friends</div>

                    <ClipboardCopy text={location.href} />
                </Modal>
            )}
        </div>
    );
}

export default Controls;
