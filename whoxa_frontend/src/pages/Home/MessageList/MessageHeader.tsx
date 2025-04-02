import React from "react";
import Profile from "./Profile";
import RightSideOptions from "./RightSideOptions";
import PinMessages from "./PinMessages/PinMessages";
import { usePinMessageList } from "../../../store/api/usePinMessageList";

export default function MessageHeader() {
  let { isLoading, data } = usePinMessageList();

  return (
    <div className="relative">
      <div className="flex h-20 w-full items-center justify-between border-b border-borderColor bg-messageHead p-5 px-2 lg:px-10 2xl:h-24">
        <Profile />
        <RightSideOptions />
      </div>
      {!isLoading && data?.PinMessageList.length != 0 && <PinMessages />}
    </div>
  );
}
