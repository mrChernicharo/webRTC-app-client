import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    FaBeer,
    FaFileAudio,
    FaMicrophone,
    FaMicrophoneAlt,
    FaMicrophoneSlash,
    FaRegFileAudio,
    FaViadeo,
    FaVideo,
    FaVideoSlash,
    FaWindowClose,
    FaLaptop,
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

    // useEffect(() => {}, []);

    function toggleVideo() {
        if (videoOff) {
            socket.emit("set-video-on", roomID, id);
            onChange({ video: "on" });
        } else {
            socket.emit("set-video-off", roomID, id);
            onChange({ video: "off" });
        }
        setVideoOff((prev) => !prev);
    }

    function toggleAudio() {
        if (audioOff) {
            socket.emit("set-audio-on", roomID, id);
            onChange({ audio: "on" });
        } else {
            socket.emit("set-audio-off", roomID, id);
            onChange({ audio: "off" });
        }
        setAudioOff((prev) => !prev);
    }

    return (
        <div className="w-full fixed bottom-0 left-0 border flex items-center justify-center gap-4">
            <div>
                <button onClick={toggleVideo}>
                    {videoOff ? (
                        <span className="text-red-500">
                            <FaVideo />
                        </span>
                    ) : (
                        <span className="">
                            <FaVideoSlash />
                        </span>
                    )}
                </button>

                <button onClick={toggleAudio}>
                    {audioOff ? (
                        <span className="text-red-500">
                            <FaMicrophone />
                        </span>
                    ) : (
                        <span className="">
                            <FaMicrophoneSlash />
                        </span>
                    )}
                </button>
            </div>

            <FaViadeo size={24} />

            <div className="flex items-center">
                <button onClick={() => setShowModal(true)}>Invite</button>
                <button className="h-10" onClick={() => setShowModal(true)}>
                    <FaLaptop />
                </button>
            </div>

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
