import { useRef, useEffect } from "react";

function PeerVideo({ peer }) {
    const ref = useRef();

    useEffect(() => {
        console.log(peer);

        peer.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <div>
            <div>id: {peer.peerID}</div>
            <video playsInline autoPlay ref={ref} />
        </div>
    );
}

export default PeerVideo;
