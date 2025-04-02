import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { updateSendMessageData } from "../../../../store/Slices/SendMessageSlice";
import { CiFaceSmile } from "react-icons/ci";
import OnClickOutside from "../../../../utils/OnClickOutSide";
import { useTheme } from "../../../../context/ThemeProvider";
import { useEffect, useRef } from "react";

export default function EmojiPickerCompo() {
  const dispatch = useAppDispatch();
  const SendMessageData = useAppSelector((state) => state.SendMessageData);
  const sendMessageDataRef = useRef(SendMessageData);

  // @ts-ignore
  const { theme } = useTheme();
  useEffect(() => {
    sendMessageDataRef.current = SendMessageData;
  }, [SendMessageData]);

  function handleEmojiClick(emoji: EmojiClickData) {
    const currentMessage = sendMessageDataRef.current.message || ""; // Default to an empty string if undefined
    dispatch(
      updateSendMessageData({
        message: currentMessage + emoji.emoji, // Append emoji to the current message
        message_type: "text",
      }),
    );
  }

  function closeEmojiPicker() {
    dispatch(
      updateSendMessageData({
        showEmojiPicker: false,
      }),
    );
  }

  return (
    <>
      <OnClickOutside className="my-auto" onClickOutside={closeEmojiPicker}>
        <CiFaceSmile
          onClick={() => {
            dispatch(
              updateSendMessageData({
                showEmojiPicker: !sendMessageDataRef.current.showEmojiPicker,
              }),
            );
          }}
          className="my-auto ml-3 cursor-pointer text-2xl"
        />
        <div
          className={` ${
            SendMessageData.showEmojiPicker
              ? "visible translate-y-3"
              : "invisible translate-y-20 opacity-0"
          } absolute -left-28 bottom-16 z-10 transition duration-500 sm:-left-0`}
        >
          <EmojiPicker
            theme={theme == "dark" ? Theme.DARK : Theme.LIGHT}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      </OnClickOutside>
    </>
  );
}
