// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UserContext } from "../UserContext";

// const [width, height] = [400, 300];
// const videoConstraints = { width, height };

// function VideoGrid({ myVideoRef, videoHidden }) {
//     const { name } = useContext(UserContext);

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
//             myVideoRef.current.srcObject = stream;
//         });
//     }, []);

//     return (
//         <>
//             <div className="video-grid">
//                 <video
//                     muted
//                     ref={myVideoRef}
//                     autoPlay
//                     playsInline
//                     width={width}
//                     height={height}
//                     style={{ objectFit: "cover" }}
//                 />
//                 {videoHidden && (
//                     <div className="poster" style={{ width, height, background: "#000" }}>
//                         {name || "user"}
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default VideoGrid;
