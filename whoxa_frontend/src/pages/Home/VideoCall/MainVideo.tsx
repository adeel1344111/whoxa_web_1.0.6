import { useEffect, useRef } from "react";
import { useStream } from "../../../context/StreamProvider";
import Controlls from "./Controlls";
import { useAppSelector } from "../../../utils/hooks";

export default function MainVideo() {
  const { userStreams } = useStream();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Find the first stream with `currentVideo: true`
  const currentStream = Object.values(userStreams).find(
    (user) => user.currentVideo,
  );
  const ConnectedUser = useAppSelector((state) => state.ConnectedUser);

  // Assign stream to videoRef when `currentStream` changes
  useEffect(() => {
    if (videoRef.current && currentStream?.stream) {
      videoRef.current.srcObject = currentStream.stream;
    }
  }, [currentStream]);
  console.log(currentStream?.userId, "currentStream?.userId");
  console.log(currentStream?.isVideoEnabled, "currentStream?.isVideoEnabled");

  return (
    <div className="relative h-[75%]">
      {currentStream?.isVideoEnabled ? (
        <video
          style={{ transform: "scaleX(-1)" }} // to mirror the camera
          className="h-full w-full rounded-lg object-cover"
          ref={videoRef}
          autoPlay
          // muted
          // playsInline
        />
      ) : (
        <div
          className={`z-20 h-full w-full overflow-hidden rounded-lg bg-[url('${
            ConnectedUser.find((user) => user.user_id == currentStream?.userId)
              ?.profile_image
          }')] bg-cover bg-center bg-no-repeat`}
        >
          <div className="grid h-full w-full place-content-center bg-white bg-opacity-40 backdrop-blur-sm">
            <div>
              <img
                src={
                  ConnectedUser.find(
                    (user) => user.user_id == currentStream?.userId,
                  )?.profile_image
                }
                className="h-44 w-44 rounded-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      )}

      <Controlls />
    </div>
  );
}
