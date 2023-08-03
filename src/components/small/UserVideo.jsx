import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import TurnedOffAudioSplash from "./TurnedOffAudioSplash";

export default function UserVideo({ videoRef, videoOn, audioOn }) {
    const { id } = useContext(UserContext);

    return (
        // <div className="absolute bottom-4 right-4">
        <div className="relative h-full">
            <div className="absolute">{id}</div>

            <div className="h-full" style={{ display: videoOn ? "block" : "none" }}>
                <video
                    className="object-cover w-full h-full -scale-x-100"
                    muted
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ height: 400 }}
                />
            </div>

            {!videoOn && <TurnedOffCamSplash />}
            {!audioOn && <TurnedOffAudioSplash />}
        </div>
    );
}
