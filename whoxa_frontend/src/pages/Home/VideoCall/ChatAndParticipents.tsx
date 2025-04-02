import { useState } from "react";
import Participants from "./Participants";
import MessageBody from "../MessageList/MessageBody";
import { useAppSelector } from "../../../utils/hooks";

export default function ChatAndParticipents() {
  const [selectedTab, setSelectedTab] = useState(0);
  const ConnectedUser = useAppSelector((state) => state.ConnectedUser);

  return (
    <div className="w-[25%] rounded-lg shadow-xl">
      <div className="mb-5 flex w-full flex-col items-center gap-4 sm:mb-10 sm:justify-between">
        <div className="flex w-full justify-start gap-4 rounded-lg bg-[#FAE390] px-2 py-1 lg:gap-6">
          <div
            onClick={() => {
              setSelectedTab(0);
            }}
            className={`p-2 ${
              selectedTab == 0 ? "bg-primary" : ""
            } w-full cursor-pointer rounded-lg text-center text-sm font-medium`}
          >
            Chat
          </div>

          <div
            onClick={() => {
              setSelectedTab(1);
            }}
            className={`p-2 ${
              selectedTab == 1 ? "bg-primary" : " "
            } w-full cursor-pointer rounded-lg text-center text-sm font-medium`}
          >
            Participants({ConnectedUser.length})
          </div>
        </div>
        
        {selectedTab == 0 && <MessageBody />}

        {selectedTab == 1 && <Participants />}
      </div>
    </div>
  );
}
