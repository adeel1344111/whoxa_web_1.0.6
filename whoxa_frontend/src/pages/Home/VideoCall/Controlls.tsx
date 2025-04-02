import { FiMic, FiMicOff } from "react-icons/fi";
import { LuVideo, LuVideoOff } from "react-icons/lu";
import { MdOutlineCallEnd } from "react-icons/md";
import { PiSpeakerSimpleHigh, PiSpeakerSimpleSlash } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { updatePeerData } from "../../../store/Slices/PeerJsSlice";
import { socketInstance } from "../../../socket/socket";
import { usePeer } from "../../../hooks/usePeer";

export default function Controlls() {
  const dispatch = useAppDispatch();
  // const = useAppSelector((state) => state.PeerJsSlice);
  const socket = socketInstance();
  const { myPeer } = usePeer();
  const { isVideoEnabled, isAudioEnabled, isScreenSharing, room_id } =
    useAppSelector((state) => state.PeerJsSlice);

  function endCall() {
    socket.emit("leave-call", {
      room_id: room_id,
      peer_id: myPeer?.current?.id,
      call_type: "video_call",
    });
  }

  return (
    <div className="absolute bottom-4 grid w-full place-content-center">
      <div className="flex gap-6 rounded-xl bg-black bg-opacity-60 px-7 py-3">
        <div
          className="grid h-12 w-12 cursor-pointer place-content-center rounded-full bg-gray-300 bg-opacity-60"
          onClick={() => {
            socket.emit("call-changes", {
              room_id: room_id,
              peer_id: myPeer?.current?.id,
              isAudioEnabled: !isAudioEnabled,
            });
            dispatch(updatePeerData({ isAudioEnabled: !isAudioEnabled }));
          }}
        >
          {isAudioEnabled ? (
            <FiMic className="text-2xl text-white" />
          ) : (
            <FiMicOff className="text-2xl text-white" />
          )}
        </div>

        <div
          className="grid h-12 w-12 cursor-pointer place-content-center rounded-full bg-gray-300 bg-opacity-60"
          onClick={() => {
            socket.emit("call-changes", {
              room_id: room_id,
              peer_id: myPeer?.current?.id,
              isVideoEnabled: !isVideoEnabled,
            });
            dispatch(updatePeerData({ isVideoEnabled: !isVideoEnabled }));
          }}
        >
          {isVideoEnabled ? (
            <LuVideo className="text-2xl text-white" />
          ) : (
            <LuVideoOff className="text-2xl text-white" />
          )}
        </div>

        <div
          className="grid h-12 w-12 cursor-pointer place-content-center rounded-full bg-gray-300 bg-opacity-60"
          onClick={() => {
            console.log("Screen share toggle action here");
          }}
        >
          {isScreenSharing ? (
            <PiSpeakerSimpleHigh className="text-2xl text-white" />
          ) : (
            <PiSpeakerSimpleSlash className="text-2xl text-white" />
          )}
        </div>

        <div
          className="grid h-12 w-20 cursor-pointer place-content-center rounded-full bg-[#FA4343]"
          onClick={endCall}
        >
          <MdOutlineCallEnd onClick={endCall} className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
}
