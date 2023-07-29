import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];

import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { socket } from "./socket";

const videoConstraints = {
    height: 280,
    width: 400,
};

export function useWebRTC() {
    const [peers, setPeers] = useState([]);
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = location.pathname.replace("/room/", "");

    useEffect(() => {
        console.log({ peers });
    }, [peers]);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((stream) => {
                userVideo.current.srcObject = stream;
                socket.emit("join room", roomID);

                socket.on("all users", (users) => {
                    const peers = [];
                    users.forEach((userID) => {
                        const peer = createPeer(userID, socket.id, stream);
                        peersRef.current.push(peer);
                        peers.push(peer);
                    });

                    console.log("SERVER: all users", { users, peers });
                    setPeers(peers);
                });

                socket.on("user joined", (payload) => {
                    const { signal, callerID } = payload;
                    console.log("SERVER: user joined", { signalType: signal.type, callerID });

                    const peer = addPeer(signal, callerID, stream);
                    peersRef.current.push(peer);
                    setPeers((peers) => [...peers, peer]);
                    console.log("new peer", { peer });
                });

                socket.on("receiving returned signal", (payload) => {
                    const { signal, id } = payload;
                    console.log("SERVER: receiving returned signal", { signalType: signal.type, id });

                    const { peer } = peersRef.current.find((p) => p.peerID === id);
                    peer.signal(signal);
                });

                socket.on("user left", ({ user, remainingUsers }) => {
                    // const leavingPeer = peersRef.current.find((p) => p.peerID === user);
                    console.log("SERVER: user left", { user, remainingUsers });

                    destroyPeer(user, remainingUsers, stream);
                });
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peerObject = {
            peerID: userToSignal,
            peer: new Peer({
                initiator: true,
                trickle: false,
                allowHalfTrickle: true,
                stream,
            }),
        };

        peerObject.peer.on("signal", (signal) => {
            socket.emit("sending signal", { userToSignal, callerID, signal });
        });

        return peerObject;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peerObject = {
            peerID: callerID,
            peer: new Peer({
                initiator: false,
                trickle: false,
                allowHalfTrickle: true,
                stream,
            }),
        };

        peerObject.peer.on("signal", (signal) => {
            console.log("SERVER: signal", {
                signalType: signal.type,
                incomingSignalType: incomingSignal.type,
                callerID,
            });
            socket.emit("returning signal", { signal, callerID });
        });

        peerObject.peer.signal(incomingSignal);

        return peerObject;
    }

    function destroyPeer(user, remainingUsers, stream) {
        console.log("destroyPeer", { user, remainingUsers, stream });

        const [leavingPeer, remainingPeers] = [
            peersRef.current.find((p) => p.peerID === user),
            peersRef.current.filter((p) => p.peerID !== user),
        ];
        peersRef.current = remainingPeers;
        setPeers([...peersRef.current]);

        leavingPeer.peer.destroy();
    }

    return {
        peers,
        userVideo,
    };
}
