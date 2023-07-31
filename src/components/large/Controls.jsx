import { useContext, useEffect, useState } from "react";
import {
    FaBeer,
    FaFileAudio,
    FaMicrophone,
    FaMicrophoneAlt,
    FaMicrophoneSlash,
    FaRegFileAudio,
    FaVideo,
    FaVideoSlash,
} from "react-icons/fa";
import { socket } from "../../socket";
import { UserContext } from "../../UserContext";

function Controls({ onChange }) {
    const [videoOff, setVideoOff] = useState(false);
    const [audioOff, setAudioOff] = useState(false);
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
        </div>
    );
}

export default Controls;
