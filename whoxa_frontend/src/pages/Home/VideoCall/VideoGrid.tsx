"use client";
import React, { useEffect } from "react";
import { useStream } from "../../../context/StreamProvider";
import { FiMic, FiMicOff } from "react-icons/fi";
import { usePeer } from "../../../hooks/usePeer";

export default function VideoGrid() {
  const { userStreams } = useStream();

  const { myPeer } = usePeer();

  const { updateCurrentStream } = useStream();

  useEffect(() => {
    console.log(userStreams, "userStreams+++++++++++++++");
  }, [userStreams]);
  return (
    <div className="flex h-[22%] gap-3 overflow-hidden overflow-x-scroll">
      {Object.values(userStreams)
        .filter((userStream) => userStream.currentVideo == false)
        .map(({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div
            className="relative w-64 shrink-0 overflow-hidden rounded-lg"
            id={peerId}
            key={peerId}
          >
            <div className="absolute bottom-2 left-4 z-10">
              {userName}
              {/* {peerId === "local" ? "(You)" : ""} */}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className="cursor-pointer"
              ref={(video) => video && (video.srcObject = stream)}
              onClick={() => {
                updateCurrentStream(peerId);
              }}
              autoPlay
              playsInline
            />
            <div className="absolute right-4 top-2 rounded-full bg-gray-300 bg-opacity-40 p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ))}
      {/* {Object.values(userStreams).map(
        ({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div className="relative shrink-0 w-64 overflow-hidden rounded-lg" key={peerId}>
            <div className="absolute bottom-2 left-4">
              {userName} {peerId === "local" ? "(You)" : ""}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className=""
              ref={(video) => video && (video.srcObject = stream)}
              autoPlay
              playsInline
            />
            <div className="absolute bg-gray-300 bg-opacity-40 right-4 top-2 rounded-full p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ),
      )}
      {Object.values(userStreams).map(
        ({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div className="relative shrink-0 w-64 overflow-hidden rounded-lg" key={peerId}>
            <div className="absolute bottom-2 left-4">
              {userName} {peerId === "local" ? "(You)" : ""}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className=""
              ref={(video) => video && (video.srcObject = stream)}
              autoPlay
              playsInline
            />
            <div className="absolute bg-gray-300 bg-opacity-40 right-4 top-2 rounded-full p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ),
      )}
      {Object.values(userStreams).map(
        ({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div className="relative shrink-0 w-64 overflow-hidden rounded-lg" key={peerId}>
            <div className="absolute bottom-2 left-4">
              {userName} {peerId === "local" ? "(You)" : ""}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className=""
              ref={(video) => video && (video.srcObject = stream)}
              autoPlay
              playsInline
            />
            <div className="absolute bg-gray-300 bg-opacity-40 right-4 top-2 rounded-full p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ),
      )}
      {Object.values(userStreams).map(
        ({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div className="relative shrink-0 w-64 overflow-hidden rounded-lg" key={peerId}>
            <div className="absolute bottom-2 left-4">
              {userName} {peerId === "local" ? "(You)" : ""}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className=""
              ref={(video) => video && (video.srcObject = stream)}
              autoPlay
              playsInline
            />
            <div className="absolute bg-gray-300 bg-opacity-40 right-4 top-2 rounded-full p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ),
      )}
      {Object.values(userStreams).map(
        ({ peerId, stream, userName, isAudioEnabled, isVideoEnabled }) => (
          <div className="relative shrink-0 w-64 overflow-hidden rounded-lg" key={peerId}>
            <div className="absolute bottom-2 left-4">
              {userName} {peerId === "local" ? "(You)" : ""}
            </div>
            <video
              style={{ transform: "scaleX(-1)" }} // to mirror the camera
              className=""
              ref={(video) => video && (video.srcObject = stream)}
              autoPlay
              playsInline
            />
            <div className="absolute bg-gray-300 bg-opacity-40 right-4 top-2 rounded-full p-1">
              {isAudioEnabled ? (
                <FiMic className="text-xl text-black" />
              ) : (
                <FiMicOff className="text-xl text-black" />
              )}
            </div>
          </div>
        ),
      )} */}

      {/* {video_url_array.map((url) => (
        <div className="relative h-full overflow-hidden rounded-lg">
          <div className="absolute bottom-2 left-4">You</div>
          <video
            style={{ transform: "scaleX(-1)" }} // to mirror the camera
            className="h-full object-cover"
            // ref={(video) => video && (video.srcObject = stream)}
            src={url}
            autoPlay
            loop
            playsInline
            muted
          />
          <div className="absolute right-4 top-2">Mic: {"On"}</div>
        </div>
      ))} */}
    </div>
  );
}
