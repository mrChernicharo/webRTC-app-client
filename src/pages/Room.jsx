import { useContext, useEffect } from "react";
import { useWebRTC } from "../useWebRTC";
import Chat from "../components/large/Chat";
import Controls from "../components/large/Controls";
import { UserVideo, PeerVideo } from "../components/small/Video";
import UseChat from "../useChat";
import { UserContext } from "../UserContext";
import Modal from "../components/small/Modal";
import UsernameInput from "../components/small/UsernameInput";

function getGridParams(frameCount) {
    switch (frameCount) {
        case 1:
            return { cols: 1, rows: 1 };
        case 2:
            return { cols: 2, rows: 1 };
        case 3:
            return { cols: 2, rows: 2 };
        case 4:
            return { cols: 2, rows: 2 };
        case 5:
            return { cols: 3, rows: 2 };
        case 6:
            return { cols: 3, rows: 2 };
        default:
            return { cols: 1, rows: 2 };
    }
}

const Room = () => {
    const { id, name } = useContext(UserContext);
    const { peers, userVideo, videoOn, audioOn, onControlChange } = useWebRTC();
    const { messages, hasNewMsgs, sendTextMessage, showChat, closeChat, toggleChat } = UseChat();

    const frameCount = peers.length + 1;
    const { rows, cols } = getGridParams(frameCount);
    const pushLeft = (idx) => [3, 5].includes(frameCount) && idx > cols - 2;

    return (
        <>
            <div className="flex overflow-hidden" style={{ width: showChat ? "calc(100vw - 300px)" : "100vw" }}>
                <div className="relative w-full">
                    <ul
                        className="grid"
                        style={{
                            height: "calc(100dvh - 94px)",
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                        }}
                    >
                        <li key={id}>
                            <UserVideo videoRef={userVideo} videoOn={videoOn} audioOn={audioOn} />
                        </li>
                        {peers.map((p, index) => (
                            <li key={p.peerID} style={{ transform: pushLeft(index) ? "translateX(50%)" : "unset" }}>
                                <PeerVideo peerID={p.peerID} peer={p.peer} video={p.video} audio={p.audio} />
                            </li>
                        ))}
                    </ul>
                </div>

                {showChat && <Chat messages={messages} closeChat={closeChat} sendTextMessage={sendTextMessage} />}

                {/* {!name && (
                    <Modal noCloseBtn>
                        <div>
                            <h1 className="pb-4">Enter your name</h1>
                            <UsernameInput />
                        </div>
                    </Modal>
                )} */}

                <Controls onChange={onControlChange} toggleChat={toggleChat} hasNewMsgs={hasNewMsgs} />
            </div>
        </>
    );
};

export default Room;
