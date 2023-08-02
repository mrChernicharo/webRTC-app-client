import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import TurnedOffAudioSplash from "./TurnedOffAudioSplash";

export default function UserVideo({ videoRef, videoOn, audioOn }) {
    const { id } = useContext(UserContext);

    return (
        <div>
            <div>{id}</div>

            <div style={{ display: videoOn ? "block" : "none" }}>
                <video muted ref={videoRef} autoPlay playsInline />
            </div>

            {!videoOn && <TurnedOffCamSplash />}
            {!audioOn && <TurnedOffAudioSplash />}
        </div>
    );
}
