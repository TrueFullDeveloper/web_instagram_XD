import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../../hooks/useChat";
import { selectUserName } from "../../store/api/profileSlice";
import { selectCompanion, selectMessageList } from "../../store/api/chatSlice";
import MessageForm from "../../components/messageForm";
import MessageList from "../../components/messageList";

const ChatRoom = ({ chatId }) => {
  const { sendMessage, removeMessage } = useChat(chatId);
  const userName = useSelector(selectUserName);
  const companion = useSelector(selectCompanion);
  const messageList = useSelector(selectMessageList);

  return (
    <>
      <h2>{companion.companionName}</h2>
      <img src={companion.companionPhoto} alt="Nothing(" />

      <MessageList messageList={messageList} removeMessage={removeMessage} />
      <MessageForm userName={userName} sendMessage={sendMessage} />
    </>
  );
};

export default ChatRoom;
