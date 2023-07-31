import { useContext } from "react";
import PeerVideo from "../components/small/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import { UserContext } from "../UserContext";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";
import TurnedOffCamSplash from "../components/small/TurnedOffCamSplash";
import TurnedOffAudioSplash from "../components/small/TurnedOffAudioSplash";

const Room = () => {
    const { id } = useContext(UserContext);
    const { peers, userVideo, videoOn, audioOn, setVideoOn, setAudioOn } = useWebRTC();

    return (
        <div>
            <div>
                <div>{id}</div>

                <div style={{ display: videoOn ? "block" : "none" }}>
                    <video muted ref={userVideo} autoPlay playsInline />
                </div>

                {!videoOn && <TurnedOffCamSplash />}
                {!audioOn && <TurnedOffAudioSplash />}

                {peers.map((p, index) => {
                    return <PeerVideo key={index} peerID={p.peerID} peer={p.peer} video={p.video} audio={p.audio} />;
                })}
            </div>

            <Chat />

            <Controls
                onChange={(change) => {
                    if (change.video) {
                        if (change.video === "on") {
                            userVideo.current.play();
                            setVideoOn(true);
                        }
                        if (change.video === "off") {
                            userVideo.current.pause();
                            setVideoOn(false);
                        }
                    }

                    if (change.audio) {
                        if (change.audio === "on") {
                            setAudioOn(true);
                        }
                        if (change.audio === "off") {
                            setAudioOn(false);
                        }
                    }
                }}
            />
        </div>
    );
};

export default Room;
