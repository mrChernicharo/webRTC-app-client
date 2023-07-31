import { useContext, useEffect, useState } from "react";
import { FaBeer, FaVideo, FaVideoSlash } from "react-icons/fa";
import { socket } from "../../socket";
import { UserContext } from "../../UserContext";

function Controls({ onChange }) {
    const [videoOff, setVideoOff] = useState(false);
    const [mute, setMute] = useState(false);
    const { id } = useContext(UserContext);
    const roomID = location.pathname.replace("/room/", "");

    useEffect(() => {}, []);

    return (
        <div className="controls">
            <button
                onClick={() => {
                    // myVideoRef.current.paused ? myVideoRef.current.play() : myVideoRef.current.pause();
                    // myVideoRef.current.style.display = myVideoRef.current.paused ? "none" : "block";
                    // setVideoHidden(!videoHidden);
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
                    <span>
                        Turn Camera On <FaVideo />
                    </span>
                ) : (
                    <span>
                        Turn Camera Off <FaVideoSlash />
                    </span>
                )}
            </button>
        </div>
    );
}

export default Controls;
