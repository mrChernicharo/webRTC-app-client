import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import { UserContext } from "../../UserContext";
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
import { FiShare, FiUsers } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import ClipboardCopy from "../small/ClipboardCopy";
import Modal from "../small/Modal";
import { useNavigate } from "react-router-dom";

function Controls({ onChange, toggleChat, hasNewMsgs }) {
    const [videoOff, setVideoOff] = useState(false);
    const [audioOff, setAudioOff] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { id } = useContext(UserContext);
    const roomID = location.pathname.replace("/room/", "");

    const navigateTo = useNavigate();

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
            <div className="flex items-center">
                <button className="flex flex-col items-center" onClick={toggleAudio}>
                    {audioOff ? (
                        <span className="flex flex-col items-center text-red-500">
                            unmute <FaMicrophone />
                        </span>
                    ) : (
                        <span className="flex flex-col items-center">
                            mute <FaMicrophoneSlash />
                        </span>
                    )}
                </button>

                <button onClick={toggleVideo}>
                    {videoOff ? (
                        <span className="flex flex-col items-center text-red-500">
                            start video <FaVideo />
                        </span>
                    ) : (
                        <span className="flex flex-col items-center">
                            stop video <FaVideoSlash />
                        </span>
                    )}
                </button>

                <button className="flex flex-col items-center" onClick={() => setShowModal(true)}>
                    Participants <FiUsers />
                </button>
            </div>

            <FaViadeo size={24} />

            <div className="flex items-center">
                <button className="flex flex-col items-center" onClick={() => setShowModal(true)}>
                    Invite <FiShare />
                </button>

                <button className="flex flex-col items-center" onClick={() => setShowModal(true)}>
                    Screen Share <FaLaptop />
                </button>

                <div className="relative">
                    {hasNewMsgs && <div className="absolute h-4 w-4 rounded-full bg-red-500"></div>}

                    <button onClick={toggleChat}>
                        <BiChat size={42} />
                    </button>
                </div>

                <button
                    className="flex flex-col items-center text-white font-bold bg-red-500"
                    onClick={() => navigateTo("/create")}
                >
                    End
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
