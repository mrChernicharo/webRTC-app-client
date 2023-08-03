import PeerVideo from "../components/small/PeerVideo";
import { useWebRTC } from "../useWebRTC";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";
import UserVideo from "../components/small/UserVideo";
import UseChat from "../useChat";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const Room = () => {
    const { id } = useContext(UserContext);
    const { peers, userVideo, videoOn, audioOn, onControlChange } = useWebRTC();
    const { messages, hasNewMsgs, sendTextMessage, showChat, closeChat, toggleChat } = UseChat();

    return (
        <>
            <div className="border flex" style={{ width: showChat ? "calc(100vw - 300px)" : "100vw" }}>
                <div className="relative w-full">
                    <ul className="grid grid-cols-2 border" style={{ height: 800 }}>
                        {/* <ul className="grid grid-cols-2 border" style={{ height: "calc(100dvh - 108px)" }}> */}
                        <li key={id} className="border border-blue-500">
                            <UserVideo videoRef={userVideo} videoOn={videoOn} audioOn={audioOn} />
                        </li>
                        {peers.map((p, index) => (
                            <li key={p.peerID} className="border border-red-500">
                                <PeerVideo peerID={p.peerID} peer={p.peer} video={p.video} audio={p.audio} />
                            </li>
                        ))}
                    </ul>
                </div>

                {showChat && <Chat messages={messages} closeChat={closeChat} sendTextMessage={sendTextMessage} />}

                <Controls onChange={onControlChange} toggleChat={toggleChat} hasNewMsgs={hasNewMsgs} />
            </div>
        </>
    );
};

export default Room;
