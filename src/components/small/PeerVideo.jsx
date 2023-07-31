import { useRef, useEffect, useState } from "react";
import TurnedOffCamSplash from "./TurnedOffCamSplash";
import { videoConstraints } from "../../useWebRTC";

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
        console.log("PeerVideo", { video });
    }, [video]);

    return (
        <div>
            <div>id: {peerID}</div>

            {loading && <div>loading...</div>}

            <div style={{ display: video ? "block" : "none" }}>
                <video playsInline autoPlay ref={ref} width={width} height={height} />
            </div>

            {!video && <TurnedOffCamSplash />}
        </div>
    );
}

export default PeerVideo;
