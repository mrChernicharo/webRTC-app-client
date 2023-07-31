import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { socket } from "./socket";

export const videoConstraints = {
    height: 280,
    width: 400,
};

export function useWebRTC() {
    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState(undefined);
    const [videoOn, setVideoOn] = useState(false);
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = location.pathname.replace("/room/", "");

    function onAllUsers(users) {
        const peers = users.map((userID) => {
            const peerObject = createPeer(userID, socket.id, stream);
            return peerObject;
        });

        console.log("SERVER: all users", { users, peers });
        peersRef.current = peers;
        setPeers(peersRef.current);
    }

    function onUserJoined(payload) {
        const { signal, callerID } = payload;
        console.log("SERVER: user joined", { signalType: signal.type, callerID });

        const peer = addPeer(signal, callerID, stream);
        console.log("new peer", { peer });

        peersRef.current = [...peersRef.current, peer];
        setPeers(peersRef.current);
    }

    function onReceiveReturn(payload) {
        const { signal, id } = payload;
        console.log("SERVER: receiving returned signal", { signalType: signal.type, id });

        const { peer } = peersRef.current.find((p) => p.peerID === id);
        peer.signal(signal);
    }

    function onUserLeft(payload) {
        const { user, remainingUsers } = payload;
        console.log("SERVER: user left", { user, remainingUsers });

        const remainingPeers = destroyPeer(user, remainingUsers, stream);

        setPeers(peersRef.current);
    }

    function onVideoOn(id) {
        console.log("SERVER:video-on", id);

        const selectedPeer = peersRef.current.find((p) => p.peerID === id);
        if (selectedPeer) selectedPeer.video = true;
        console.log({ selectedPeer });

        setPeers((p) => [...peersRef.current]);
    }

    function onVideoOff(id) {
        console.log("SERVER:video-off", id);

        const selectedPeer = peersRef.current.find((p) => p.peerID === id);
        if (selectedPeer) selectedPeer.video = false;
        console.log({ selectedPeer });

        setPeers((p) => [...peersRef.current]);
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
            setVideoOn(true);
            setStream(stream);
        });
    }, []);

    useEffect(() => {
        if (stream) {
            userVideo.current.srcObject = stream;

            socket.emit("join room", roomID);

            socket.on("video-on", onVideoOn);
            socket.on("video-off", onVideoOff);

            socket.on("all users", onAllUsers);

            socket.on("user joined", onUserJoined);

            socket.on("receiving returned signal", onReceiveReturn);

            socket.on("user left", onUserLeft);
        }

        return () => {
            if (stream) {
                socket.off("video-ff", onVideoOn);
                socket.off("video-offf", onVideoOff);

                socket.off("all users", onAllUsers);

                socket.off("user joined", onUserJoined);

                socket.off("receiving returned signal", onReceiveReturn);

                socket.off("user left", onUserLeft);

                setStream(undefined);
            }
        };
    }, [stream]);

    useEffect(() => {
        console.log({ peers });
    }, [peers]);

    useEffect(() => {
        console.log({ stream });
    }, [stream]);

    useEffect(() => {
        console.log({ videoOn });
    }, [videoOn]);

    function createPeer(userToSignal, callerID, stream) {
        const peerObject = {
            peerID: userToSignal,
            video: true,
            audio: true,
            peer: new Peer({
                initiator: true,
                trickle: false,
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
            video: true,
            audio: true,
            peer: new Peer({
                initiator: false,
                trickle: false,
                stream,
            }),
        };

        peerObject.peer.on("signal", (signal) => {
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

        leavingPeer?.peer?.destroy();
        peersRef.current = remainingPeers;

        return remainingPeers;
    }

    return {
        peers,
        userVideo,
        videoOn,
        setVideoOn,
    };
}
