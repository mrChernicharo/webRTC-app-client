import { useRef, useEffect, useState } from "react";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import { videoConstraints } from "../../useWebRTC";
import TurnedOffAudioSplash from "./TurnedOffAudioSplash";

const { width, height } = videoConstraints;

function PeerVideo({ peerID, video, audio, peer }) {
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

    useEffect(() => {
        console.log("PeerVideo", { audio });
    }, [audio]);

    return (
        <div className="relative h-full">
            <div className="absolute">id: {peerID}</div>

            <div className="h-full" style={{ display: video ? "block" : "none" }}>
                <video
                    className="object-cover h-full w-full border"
                    playsInline
                    autoPlay={audio}
                    muted={!audio}
                    ref={ref}
                    width={width}
                    height={height}
                    style={{ height: 400 }}
                />
            </div>

            {loading && <div>loading...</div>}
            {!video && <TurnedOffCamSplash />}
            {!audio && <TurnedOffAudioSplash />}
        </div>
    );
}

export default PeerVideo;
