import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Link } from "react-router-dom";
import ClipboardCopy from "../components/ClipboardCopy";

function CreateRoom() {
    const [newRoomId, setNewRoomId] = useState("");
    const roomPath = `/room/${newRoomId}`;
    const newRoomUrl = `${location.protocol}//${location.host}${roomPath}`;

    function createRoom() {
        socket.emit("create-room");
    }

    useEffect(() => {
        socket.on("room-id-created", (roomId) => {
            setNewRoomId(roomId);
        });
    }, []);

    return (
        <div className="create-room">
            <h3>Create Room</h3>
            <h1>WebRTC</h1>

            <button onClick={createRoom}>Create Room Link</button>
            {newRoomId && (
                <div>
                    <ClipboardCopy text={newRoomUrl} />
                    <Link to={roomPath}>Start Video Call</Link>
                </div>
            )}
        </div>
    );
}

export default CreateRoom;
