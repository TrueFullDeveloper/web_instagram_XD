import React from "react";
import { useRef, useEffect } from "react";

export const MessageList = ({ messageList, removeMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageList]);

  return (
    <div>
      {messages.map(msgItem => (
        <MessageListItem key={msgItem.messageId} msgItem={msgItem} removeMessage={removeMessage} />
      ))}
      <span ref={messagesEndRef}></span>
    </div>
  );
};

export default MessageList;
