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
    FaPowerOff,
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
        <div className="w-full max-w-full fixed bottom-0 left-0 border flex items-center justify-center gap-4">
            <div className="flex items-center">
                <MenuButton
                    text={audioOff ? "unmute" : "mute"}
                    Icon={audioOff ? <FaVideo /> : <FaVideoSlash />}
                    onClick={toggleAudio}
                    style={{ background: videoOff ? "red" : "" }}
                />
                <MenuButton
                    text={videoOff ? "start video" : "stop video"}
                    Icon={videoOff ? <FaVideo /> : <FaVideoSlash />}
                    onClick={toggleVideo}
                    style={{ background: videoOff ? "red" : "" }}
                />
                <MenuButton text="Participants" Icon={<FiUsers />} onClick={() => setShowInviteModal(true)} />
            </div>

            <FaViadeo size={24} />

            <div className="flex items-center">
                <MenuButton text="Invite" Icon={<FiShare />} onClick={() => setShowInviteModal(true)} />
                <MenuButton text="Screen Share" Icon={<FaLaptop />} onClick={() => setShowInviteModal(true)} />

                <div className="relative">
                    {hasNewMsgs && <Badge />}
                    <MenuButton Icon={<BiChat size={32} />} onClick={toggleChat} className="btn-accent" />
                </div>
                <MenuButton
                    Icon={<FaPowerOff size={24} />}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold"
                    onClick={() => navigateTo("/create")}
                />
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

function MenuButton({ Icon = undefined, onClick, text = "", className = "", style = {} }) {
    return (
        <button className={`btn flex flex-col items-center ${className}`} onClick={onClick} style={style}>
            <span className="flex flex-col items-center">
                <span className="hidden md:inline">{text}</span> {!!Icon && Icon}
            </span>
        </button>
    );
}

function Badge() {
    return <div className="absolute h-3 w-3 rounded-full bg-red-500 -translate-x-0.5 -translate-y-0.5"></div>;
}

export default Controls;
