import { useRef, useEffect, useState, useContext } from "react";
import { videoConstraints } from "../../useWebRTC";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import TurnedOffAudioSplash from "./TurnedOffAudioSplash";
import { UserContext } from "../../UserContext";

export function UserVideo({ videoRef, videoOn, audioOn }) {
    const { id, name } = useContext(UserContext);

    return (
        // <div className="absolute bottom-4 right-4">
        <div className="relative h-full">
            <div className="absolute z-10">{name}</div>

            <div className="h-full">
                <video
                    className="object-cover w-full -scale-x-100"
                    muted
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ display: videoOn ? "block" : "none", height: videoOn ? "100%" : "0px" }}
                />
                {!videoOn && <TurnedOffCamSplash />}
                {!audioOn && <TurnedOffAudioSplash />}
            </div>
        </div>
    );
}

export function PeerVideo({ peerID, video, audio, peer }) {
    const ref = useRef();
    const [loading, setLoading] = useState(true);

    const onStream = (stream) => {
        ref.current.srcObject = stream;
        setLoading(false);
    };

    useEffect(() => {
        peer.on("stream", onStream);
        return () => {
            peer.off("stream", onStream);
        };
    }, []);

    return (
        <div className="relative h-full">
            <div className="absolute">{peerID}</div>

            <div className="h-full">
                <video
                    className="object-cover h-full w-full border"
                    playsInline
                    autoPlay={audio}
                    muted={!audio}
                    ref={ref}
                    style={{ display: video ? "block" : "none", height: video ? "100%" : "0px" }}
                />

                {(loading || !video) && <TurnedOffCamSplash />}
                {!audio && <TurnedOffAudioSplash />}
            </div>
        </div>
    );
}
