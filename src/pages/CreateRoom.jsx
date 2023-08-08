// import { useEffect, useState } from "react";
// import { socket } from "../socket";
// import { Link } from "react-router-dom";
// import ClipboardCopy from "../components/small/ClipboardCopy";

// function CreateRoom() {
//     const [newRoomId, setNewRoomId] = useState("");
//     const roomPath = `/room/${newRoomId}`;
//     const newRoomUrl = `${location.protocol}//${location.host}${roomPath}`;

//     function createRoom() {
//         socket.emit("create-room");
//     }

//     useEffect(() => {
//         socket.on("room-id-created", (roomId) => {
//             setNewRoomId(roomId);
//         });
//     }, []);

//     return (
//         <div className="create-room">
//             <h3>Create Room</h3>

//             {newRoomId ? (
//                 <div className="flex flex-col">
//                     <ClipboardCopy text={newRoomUrl} />
//                     <Link to={roomPath}>Start Video Chat</Link>
//                 </div>
//             ) : (
//                 <button onClick={createRoom}>Create Room Link</button>
//             )}
//         </div>
//     );
// }

// export default CreateRoom;
