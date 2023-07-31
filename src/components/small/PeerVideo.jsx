import { useRef, useEffect, useState } from "react";

function PeerVideo({ peer }) {
    const ref = useRef();
    const [loading, setLoading] = useState(true);

    const onStream = (stream) => {
        setLoading(false);
        ref.current.srcObject = stream;
    };

    useEffect(() => {
        console.log(peer);
        peer.peer.on("stream", onStream);

        return () => {
            peer.peer.off("stream", onStream);
        };
    }, []);

    return (
        <div>
            <div>id: {peer.peerID}</div>
            {loading && <div>loading...</div>}
            <video playsInline autoPlay ref={ref} />
        </div>
    );
}

export default PeerVideo;
