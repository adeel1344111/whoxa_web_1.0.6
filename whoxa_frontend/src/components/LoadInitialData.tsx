import React, { useEffect } from "react";
import { socketInstance } from "../socket/socket";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { updateMessageOptions } from "../store/Slices/MessageOptionsSlice";

export default function LoadInitialData() {
  const dispatch = useAppDispatch();
  const currentConversationData = useAppSelector(
    (state) => state.CurrentConversation,
  );

  useEffect(() => {
    socketInstance().emit("ChatList", {});
  }, []);

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    socketInstance().emit("messageReceived", {
      conversation_id: currentConversationData.conversation_id,
      user_timezone: timeZone,
    });
    dispatch(
      updateMessageOptions({
        isMessageLoading: true,
      }),
    );
  }, [currentConversationData.conversation_id]);

  return <></>;
}
