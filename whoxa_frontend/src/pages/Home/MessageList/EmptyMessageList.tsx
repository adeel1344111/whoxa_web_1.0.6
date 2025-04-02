import React from "react";
import { useTheme } from "../../../context/ThemeProvider";
import { MessageList } from "../../../types/MessageListType";
import useApiPost from "../../../hooks/PostData";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { appendMessageWithDateCheck } from "../../../store/Slices/MessageListSlice";
import { updateSendMessageData } from "../../../store/Slices/SendMessageSlice";
import { socketInstance } from "../../../socket/socket";
import { useFile } from "../../../context/FileProvider";
import Button from "../../../components/Button";
import { useConversationInfo } from "../../../store/api/useConversationInfo";
import toast from "react-hot-toast";

export default function EmptyMessageList() {
  // @ts-ignore
  const { theme } = useTheme();
  const { loading: sendMessageLoading, postData } = useApiPost();
  const currentConversationData = useAppSelector(
    (state) => state.CurrentConversation,
  );
  const CreateGroup = useAppSelector((state) => state.CreateGroup);
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const { selectedFile, setSelectedFile } = useFile();
  let { refetch } = useConversationInfo();
  let ChatListArray = useAppSelector((state) => state.chatList);

  async function sendMessageApiCall() {
    let messageFormData = new FormData();

    if (currentConversationData.phone_number != "") {
      messageFormData.append(
        "phone_number",
        currentConversationData.phone_number,
      );
    } else {
      // Append conversation_id
      messageFormData.append(
        "conversation_id",
        currentConversationData.conversation_id.toString(),
      );
    }

    messageFormData.append("message_type", "text");
    messageFormData.append("message", "Hi");

    // Make the API call with the constructed FormData
    let sendMessageRes: MessageList = await postData(
      "send-message",
      messageFormData,
      "multipart/form-data",
    );

    // Handle the response (if needed)
    if (sendMessageRes) {
      console.log(sendMessageRes, "sendMessageRes");
      // append new message to message list
      dispatch(appendMessageWithDateCheck(sendMessageRes));
      // Remove Value from input box
      dispatch(
        updateSendMessageData({
          message: "",
          message_type: "",
        }),
      );
      // Remove selected files
      setSelectedFile(null);

      // Update Chat list
      socketInstance().emit("ChatList", {});
    } else {
      // Error handling here
    }
  }

  async function joinInGroup() {
    await postData("add-member-to-group", {
      multiple_user_id: String(userData.user_id),
      conversation_id: currentConversationData.conversation_id,
    });
    socketInstance().emit("ChatList", {});
    toast.success(`You joined this group`);
    refetch();
  }

  return (
    <div className="flex h-[83dvh] flex-col items-center justify-center gap-y-2 overflow-y-auto px-14 py-6">
      <div
        onClick={() => {
          if (
            currentConversationData.public_group &&
            !ChatListArray.some(
              (chatUser) =>
                chatUser.conversation_id ===
                currentConversationData.conversation_id,
            )
          ) {
            joinInGroup();
          } else {
            sendMessageApiCall();
          }
        }}
        className="cursor-pointer rounded-lg transition-all duration-500 hover:bg-primary"
      >
        <img
          className="h-52 object-contain lg:h-64"
          src={` ${theme == "dark" ? "/DarkIcons/start_conversations_dark.png" : "/LightIcons/start_conversation_light.png"} `}
          alt=""
        />
      </div>

      {currentConversationData.public_group &&
      !ChatListArray.some(
        (chatUser) =>
          chatUser.conversation_id === currentConversationData.conversation_id,
      ) ? (
        <Button
          onClickFunc={joinInGroup}
          className={"!h-10 !w-fit"}
          text={"Join Now"}
        />
      ) : (
        <div className="text-xl">Start Conversation</div>
      )}
    </div>
  );
}
