import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import TurnedOffAudioSplash from "./TurnedOffAudioSplash";

export default function UserVideo({ videoRef, videoOn, audioOn }) {
    const { id } = useContext(UserContext);

    return (
        <div className="absolute bottom-4 right-4">
            <div className="absolute">{id}</div>

            <div style={{ display: videoOn ? "block" : "none" }}>
                <video className="rounded-lg" muted ref={videoRef} autoPlay playsInline />
            </div>

            {!videoOn && <TurnedOffCamSplash />}
            {!audioOn && <TurnedOffAudioSplash />}
        </div>
    );
}
