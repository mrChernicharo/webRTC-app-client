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
import { FaHeart, Fa500Px, FaAmbulance } from "react-icons/fa";
import Swap from "../small/Swap";

function Controls({ onChange, toggleChat, hasNewMsgs }) {
    const [videoOff, setVideoOff] = useState(false);
    const [audioOff, setAudioOff] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

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
                <button className="btn flex flex-col items-center" onClick={toggleAudio}>
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

                {/* <Swap size={40} On={<FaHeart />} Off={<FaAmbulance />} checked={audioOff} /> */}

                <button className="btn flex flex-col items-center" onClick={toggleVideo}>
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

                <button className="btn flex flex-col items-center" onClick={() => setShowInviteModal(true)}>
                    <span className="flex flex-col items-center">
                        Participants <FiUsers />
                    </span>
                </button>
            </div>

            <FaViadeo size={24} />

            <div className="flex items-center">
                <button className="btn flex flex-col items-center" onClick={() => setShowInviteModal(true)}>
                    <span className="flex flex-col items-center">
                        Invite <FiShare />
                    </span>
                </button>

                <button className="btn flex flex-col items-center" onClick={() => setShowInviteModal(true)}>
                    <span className="flex flex-col items-center">
                        Screen Share <FaLaptop />
                    </span>
                </button>

                <div className="relative">
                    {hasNewMsgs && (
                        <div className="absolute h-3 w-3 rounded-full bg-red-500 -translate-x-0.5 -translate-y-0.5"></div>
                    )}

                    <button className="btn btn-accent flex flex-col items-center" onClick={toggleChat}>
                        <span className="flex flex-col items-center">
                            <BiChat size={32} />
                        </span>
                    </button>
                </div>

                <button
                    className="btn flex flex-col items-center text-white font-bold bg-red-500"
                    onClick={() => navigateTo("/create")}
                >
                    End
                </button>
            </div>

            {showInviteModal && (
                <Modal onClose={() => setShowInviteModal(false)}>
                    <div className="py-4">Copy the link and share it with your friends</div>

                    <ClipboardCopy text={location.href} />
                </Modal>
            )}
        </div>
    );
}

export default Controls;
