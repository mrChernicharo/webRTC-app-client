import { FaBeer, FaVideo, FaVideoSlash } from "react-icons/fa";

function Controls({ myVideoRef, videoHidden, setVideoHidden }) {
    return (
        <div className="controls">
            <button
                onClick={() => {
                    // myVideoRef.current.paused ? myVideoRef.current.play() : myVideoRef.current.pause();
                    // myVideoRef.current.style.display = myVideoRef.current.paused ? "none" : "block";
                    setVideoHidden(!videoHidden);
                }}
            >
                {videoHidden ? (
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
