import { FaArrowDown } from "react-icons/fa6";
import scrollToMessage from "../../../utils/scrollToMessage";
import { useAppSelector } from "../../../utils/hooks";
import { useEffect, useState } from "react";

export default function OnClickScrollToBottom() {
  const [isLastElementVisible, setIsLastElementVisible] = useState(false);
  let MessageList = useAppSelector((state) => state.MessageList);
  const [changeValueWhenParentScroll, setchangeValueWhenParentScroll] =
    useState(0);

  return (
    <>
      {!isLastElementVisible && (
        <div
          onClick={() => {
            scrollToMessage(
              MessageList[MessageList.length - 1].message_id,
              false,
              true,
            );
          }}
          className="absolute bottom-[4.5rem] right-5 z-10 grid h-7 w-7 cursor-pointer place-content-center rounded-full bg-otherMessageBg lg:bottom-5"
        >
          <FaArrowDown />
        </div>
      )}
    </>
  );
}
