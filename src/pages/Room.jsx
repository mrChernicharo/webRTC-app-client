import { useContext } from "react";
import PeerVideo from "../components/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import { UserContext } from "../UserContext";
import Chat from "../components/Chat";

const Room = () => {
    const { id } = useContext(UserContext);
    const { peers, userVideo } = useWebRTC();

    return (
        <div>
            <div>
                <div>{id}</div>
                <video style={{ border: "4px dashed dodgerblue" }} muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                    return <PeerVideo key={index} peer={peer} />;
                })}
            </div>

            <div>
                <Chat />
            </div>
        </div>
    );
};

export default Room;
