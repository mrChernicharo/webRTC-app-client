import { useContext } from "react";
import PeerVideo from "../components/small/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import { UserContext } from "../UserContext";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";

const Room = () => {
    const { id } = useContext(UserContext);
    const { peers, userVideo } = useWebRTC();

    return (
        <div>
            <div>
                <div>{id}</div>
                <video muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                    return <PeerVideo key={index} peer={peer} />;
                })}
            </div>

            <Chat />

            {/* <Controls myVideoRef={userVideo} videoHidden={videoHidden} setVideoHidden={setVideoHidden} /> */}
        </div>
    );
};

export default Room;
