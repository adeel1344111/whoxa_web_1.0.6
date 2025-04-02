import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";

const VideoCall = ({ roomId = "7dd96c19-921c-4e31-83a2-191c4d8ee283" }) => {
  const [myPeer, setMyPeer] = useState(null);
  const [peers, setPeers] = useState({});
  const videoGridRef = useRef(null);
  const myVideoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO
    const socket = io("http://192.168.0.19:3000");
    socketRef.current = socket;

    // Initialize PeerJS
    const peer = new Peer(undefined, {
      host: "/",
      port: "4001",
    });
    setMyPeer(peer);

    // Request access to user's media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Add local video stream to video grid
        if (myVideoRef.current) {
          addVideoStream(myVideoRef.current, stream);
        }

        // Handle incoming calls
        peer.on("call", (call) => {
          call.answer(stream); // Answer call with local stream
          const video = document.createElement("video");

          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        // Listen for new users connecting
        socket.on("user-connected-to-call", (userId) => {
          connectToNewUser(userId, stream, peer);
        });
      })
      .catch((error) => {
        alert("requested device not found");
      });

    // Handle user disconnection
    socket.on("user-disconnected-from-call", (userId) => {
      if (peers[userId]) {
        peers[userId].close();
      }
      setPeers((prevPeers) => {
        const updatedPeers = { ...prevPeers };
        delete updatedPeers[userId];
        return updatedPeers;
      });
    });

    // Join the room once PeerJS connection is open
    peer.on("open", (id) => {
      socket.emit("join-call", { room_id: roomId, user_id: id });
    });

    return () => {
      peer.destroy();
      socket.disconnect();
    };
  }, [roomId]);

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGridRef.current.append(video);
  };

  const connectToNewUser = (userId, stream, peer) => {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");

    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });

    call.on("close", () => {
      video.remove();
    });

    setPeers((prevPeers) => ({
      ...prevPeers,
      [userId]: call,
    }));
  };

  return (
    <div>
      <div id="video-grid" ref={videoGridRef}>
        {/* Local Video */}
        <video ref={myVideoRef} muted autoPlay playsInline></video>
      </div>
    </div>
  );
};

export default VideoCall;
