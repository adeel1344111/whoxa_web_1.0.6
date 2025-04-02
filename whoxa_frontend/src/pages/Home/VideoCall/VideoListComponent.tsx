import React from "react";
import VideoGrid from "./VideoGrid";
import MainVideo from "./MainVideo";

export default function VideoListComponent() {
  return (
    <div className="w-[75%] max-h-screen space-y-5 ">
      <VideoGrid />
      <MainVideo />
    </div>
  );
}
