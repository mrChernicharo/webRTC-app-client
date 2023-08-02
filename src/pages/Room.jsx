import PeerVideo from "../components/small/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";
import UserVideo from "../components/small/UserVideo";
import UseChat from "../useChat";

const Room = () => {
    const { peers, userVideo, videoOn, audioOn, onControlChange } = useWebRTC();
    const { messages, hasNewMsgs, sendTextMessage, showChat, closeChat, toggleChat } = UseChat();

    return (
        <>
            <div className="border flex" style={{ width: showChat ? "calc(100vw - 300px)" : "100vw" }}>
                <div className="w-full">
                    <ul>
                        {peers.map((p, index) => (
                            <li key={index}>
                                <PeerVideo peerID={p.peerID} peer={p.peer} video={p.video} audio={p.audio} />
                            </li>
                        ))}
                    </ul>

                    <UserVideo videoRef={userVideo} videoOn={videoOn} audioOn={audioOn} />
                </div>

                <Controls onChange={onControlChange} toggleChat={toggleChat} hasNewMsgs={hasNewMsgs} />
                {showChat && <Chat messages={messages} closeChat={closeChat} sendTextMessage={sendTextMessage} />}
            </div>
        </>
    );
};

export default Room;
