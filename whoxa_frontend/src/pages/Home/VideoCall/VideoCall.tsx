import { usePeer } from "../../../hooks/usePeer";
import ChatAndParticipents from "./ChatAndParticipents";
import VideoListComponent from "./VideoListComponent";

export default function VideoCall() {
  usePeer(); // Initialize PeerJS and handle connections

  return (
    <>
      <div className="mx-auto flex h-screen w-full gap-8 p-8 xl:max-w-[90vw]">
        <VideoListComponent />
        <ChatAndParticipents />
      </div>
    </>
  );
}
