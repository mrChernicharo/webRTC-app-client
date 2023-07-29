import React from "react";

function Controls({ myVideoRef, videoHidden, setVideoHidden }) {
    return (
        <div className="controls">
            <button
                onClick={() => {
                    myVideoRef.current.paused ? myVideoRef.current.play() : myVideoRef.current.pause();
                    myVideoRef.current.style.display = myVideoRef.current.paused ? "none" : "block";
                    setVideoHidden(myVideoRef.current.paused);
                }}
            >
                {videoHidden ? "Turn On Video" : "Hide Video"}
            </button>
        </div>
    );
}

export default Controls;
