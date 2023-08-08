import { useRef, useEffect, useState, useContext } from "react";
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
                    ref={videoRef}
                    muted
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
    };

    useEffect(() => {
        peer.on("stream", onStream);

        return () => {
            peer.off("stream", onStream);
        };
    }, []);

    // useEffect(() => {
    //     ref.current.addEventListener("error", console.log);
    //     ref.current.addEventListener("canplay", console.log);
    //     ref.current.addEventListener("progress", console.log);
    // }, []);

    return (
        <div className="relative h-full">
            <div className="absolute">{peerID}</div>

            <div className="h-full">
                <video
                    className="object-cover h-full w-full border"
                    playsInline
                    // autoPlay={audio}
                    muted={!audio}
                    ref={ref}
                    style={{ display: video ? "block" : "none", height: video ? "100%" : "0px" }}
                    onCanPlay={console.log}
                    onProgress={console.log}
                    onLoad={console.log}
                    onLoadStart={console.log}
                    onError={console.log}
                    onLoadedMetadata={(e) => {
                        console.log(e);
                        setLoading(false);
                        const quality = e.target.getVideoPlaybackQuality();
                        console.log({ quality });
                        ref.current.play();
                    }}
                    onAbort={console.log}
                    onChange={console.log}
                    onRateChange={console.log}
                    onEmptied={console.log}
                    onEnded={console.log}
                    onStalled={console.log}
                    onSuspend={console.log}
                    onCompositionStart={console.log}
                    onCompositionUpdate={console.log}
                    onCompositionEnd={console.log}
                    onWaiting={console.log}
                    onInvalid={console.log}
                    onPlay={console.log}
                    onPlaying={console.log}
                    onPause={console.log}

                    // onCanPlay={console.log}
                    // onCanPlay={console.log}
                />

                {(loading || !video) && <TurnedOffCamSplash />}
                {!audio && <TurnedOffAudioSplash />}
            </div>
        </div>
    );
}
