import PeerVideo from "../components/small/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";
import UserVideo from "../components/small/UserVideo";

const Room = () => {
    const { peers, userVideo, videoOn, audioOn, onControlChange } = useWebRTC();

    return (
        <div>
            <UserVideo videoRef={userVideo} videoOn={videoOn} audioOn={audioOn} />

            <ul>
                {peers.map((p, index) => (
                    <li key={index}>
                        <PeerVideo peerID={p.peerID} peer={p.peer} video={p.video} audio={p.audio} />
                    </li>
                ))}
            </ul>

            <Chat />

            <Controls onChange={onControlChange} />
        </div>
    );
};

export default Room;
