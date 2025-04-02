import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { useStream } from "../context/StreamProvider";
import { useAppSelector } from "../utils/hooks";
import { socketInstance } from "../socket/socket";

const PEER_PORT = 4001;
let peerInstance: Peer | null = null; // Global variable to prevent multiple instances

export const usePeer = () => {
  const { addUserStream, removeUserStream, updateUserStream } = useStream();
  const { isVideoEnabled, isAudioEnabled, room_id } = useAppSelector(
    (state) => state.PeerJsSlice,
  );
  const userData = useAppSelector((state) => state.userData);

  // let room_id = "3187049a-504f-4b11-9096-d11abb307813";
  const myPeer = useRef<Peer | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const socket = socketInstance(); // Store socket in a ref

  useEffect(() => {
    if (!userData.user_id) {
      return;
    }
    if (peerInstance) {
      myPeer.current = peerInstance;
      return; // Use existing peer instead of creating a new one
    }

    peerInstance = new Peer(undefined, {
      host: "/",
      port: PEER_PORT,
    });

    myPeer.current = peerInstance;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        console.log(
          "userData.user_id while initializing peer",
          userData.user_id,
        );

        addUserStream({
          peerId: myPeer.current?.id!,
          userName: "You",
          userId: userData.user_id,
          stream,
          isAudioEnabled,
          isVideoEnabled,
          isLocal: true,
          currentVideo: true,
          isScreenSharing: false,
        });

        peerInstance?.on("call", (call) => {
          console.log("Received call from:", call.metadata); // Logs metadata

          call.answer(stream);
          call.on("stream", (userStream) => {
            console.log(call.metadata, "call.metadata inside stream");

            addUserStream({
              peerId: call.peer,
              stream: userStream,
              isLocal: false,
              userName: call.metadata.
              user_name
               || "Guest",
              userId: call.metadata.user_id,
              isAudioEnabled: true,
              isVideoEnabled: true,
              currentVideo: false,
              isScreenSharing: false,
            });
          });
        });

        socket.on(
          "user-connected-to-call",
          ({
            peer_id,
            user_name,
            user_id,
          }: {
            peer_id: string;
            user_name: string;
            user_id: number;
          }) => {
            setTimeout(() => {
              const call = peerInstance?.call(peer_id, stream, {
                metadata: {
                  user_id: userData.user_id,
                  user_name: userData.user_name,
                },
              });

              call?.on("stream", (userStream) => {
                addUserStream({
                  peerId: call.peer,
                  stream: userStream,
                  isLocal: false,
                  userName: user_name,
                  userId: user_id,
                  isAudioEnabled: true,
                  isVideoEnabled: true,
                  currentVideo: false,
                  isScreenSharing: false,
                });
              });
            }, 100);
          },
        );

        socket.on("user-disconnected-from-call", (peer_id: string) => {
          removeUserStream(peer_id);
        });
        socket.on("call-changes", (data) => {
          updateUserStream(data?.peer_id!, {
            isAudioEnabled:
              data.isAudioEnabled != undefined ? data.isAudioEnabled : true,
            isVideoEnabled:
              data.isVideoEnabled != undefined ? data.isVideoEnabled : true,
          });
        });
      })
      .catch((err) => console.error("Media devices error:", err));
    console.log(userData.user_id, "outside open event userData.user_id");

    peerInstance.on("open", (id) => {
      console.log(userData.user_id, "userData.user_id");

      socket.emit("join-call", {
        room_id: room_id,
        peer_id: id,
        user_name: userData.user_name,
        user_id: userData.user_id,
      });
    });

    return () => {
      peerInstance?.destroy();
      socket.disconnect();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      peerInstance = null; // Reset singleton on cleanup
    };
  }, [userData.user_id]);

  // Toggle video without re-fetching stream
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = isVideoEnabled;
      });
      updateUserStream(peerInstance?.id!, { isVideoEnabled });
    }
  }, [isVideoEnabled]);

  // Toggle audio without re-fetching stream
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isAudioEnabled;
      });
      updateUserStream(myPeer.current?.id!, { isAudioEnabled });
    }
  }, [isAudioEnabled]);

  return { myPeer, streamRef };
};
